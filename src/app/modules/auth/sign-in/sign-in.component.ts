import { CommonModule } from '@angular/common';
import { Component, OnInit, viewChild, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { HeaderComponent } from '@shared/components/header/header.component';
import { AuthService } from 'app/core/auth/auth.service';
import { IS_DEV } from 'app/core/consts/app.const';
import { IUsuarioInstituicao } from 'app/modules/admin/apps/services/files/models/usuario-instituicao.model';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    styleUrls: ['./sign-in.component.scss'],
    imports: [
        RouterLink,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        CommonModule,
        MatTableModule,
        HeaderComponent,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatMenuModule,
        FuseAlertComponent,
        MatSnackBarModule,
        MatCheckboxModule,
        RouterLink,
        MatTooltipModule,
        MatExpansionModule
    ],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    @ViewChild('accordion') accordion: MatAccordion;

    usuarioEncontrado = false;
    instituicoesList: IUsuarioInstituicao[] = [];

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            username: [IS_DEV ? 'admin' : '', { nonNullable: true, validators: [Validators.required] }],
            usuarioInstituicao: ['', { nonNullable: true, validators: [Validators.required] }],
            password: [IS_DEV ? 'admin' : '', { nonNullable: true, validators: [Validators.required] }],
            rememberMe: [false, { nonNullable: true, validators: [Validators.required] }],
        });
    }


    /* validarLogin(): void {
    const username = this.signInForm.get('username')?.value;

    this._authService.listarInstiuicoes(username).subscribe((instituicoes) => {
        this.instituicoesList = instituicoes.body ?? [];

        if (this.instituicoesList.length > 0) {
            this.usuarioEncontrado = true;
        } else {
            this.usuarioEncontrado = false;
        }
    });
} */

validarLogin(): void {
    const username = this.signInForm.get('username')?.value;

    this._authService.listarInstiuicoes(username).subscribe(usuario => {
        if (usuario && usuario.body?.length > 0) {
            this.usuarioEncontrado = true;
            this.instituicoesList = usuario.body;

            // Habilita campos
            this.signInForm.get('usuarioInstituicao')?.enable();
            this.signInForm.get('password')?.enable();

            // Aguarda a view atualizar e então expande
            setTimeout(() => {
                this.accordion.openAll(); // opcional, pois usamos [expanded]="true" no HTML
            });
        } else {
            this.usuarioEncontrado = false;
            this.instituicoesList = [];

            this.signInForm.get('usuarioInstituicao')?.disable();
            this.signInForm.get('password')?.disable();
        }
    });
}


    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

         const loginPayload = {
        username: this.signInForm.value.username,
        password: this.signInForm.value.password,
        usuarioInstituicao: this.signInForm.value.usuarioInstituicao.id,
        rememberMe: this.signInForm.value.rememberMe
    };

        // Sign in
        firstValueFrom(this._authService.signIn(loginPayload))
            .then((e) => {
                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                // Navigate to the redirect url
                this._router.navigateByUrl(redirectURL);
            })
            .catch((response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                //this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Usuário ou senha inválidos.',
                };

                // Show the alert
                this.showAlert = true;
            });
    }
}
