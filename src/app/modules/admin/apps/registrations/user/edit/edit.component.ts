import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { User } from 'app/core/user/user.types';
import { NgxMaskDirective } from 'ngx-mask';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    HeaderComponent,
    NgxMaskDirective
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent {
    private _userService = inject(UserService);
    authorities: string[] = [];
    isSaving = false;
    isUpdate = true;
    _route = inject(ActivatedRoute);

    isNew: boolean = this._route.snapshot.data['isNew'];
    userLogin: string = this._route.snapshot.params['login'];

    breadcrumbs: HeaderBreadcrumb[] = [{ label: 'Administração', first: true }, { label: 'Usuários' }];

    profiles = [
        { name: 'Administrador', value: 'ROLE_ADMIN' },
        { name: 'Técnico', value: 'ROLE_TI' },
        { name: 'Contabilidade', value: 'ROLE_CONTABILIDADE' },
        { name: 'Regulatório', value: 'ROLE_REGULATORIO' },
    ];

    editForm = this._formBuilder.group({
        id: [],
        login: [
            { value: '', disabled: !this.isNew },
            [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')],
        ],
        firstName: ['', [Validators.maxLength(50)]],
        lastName: ['', [Validators.maxLength(50)]],
        email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
        activated: [],
        langKey: [],
        profiles: this._formBuilder.group({
            ROLE_ADMIN: [false],
            ROLE_TI: [false],
            ROLE_CONTABILIDADE: [false],
            ROLE_REGULATORIO: [false],
        }),
    });

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this._userService.getUsersById(this.userLogin).then((user) => {
                this.updateForm(user);
            });
    }

    updateForm(user: IUser): void {
        this.editForm.patchValue({
            id: user.id,
            login: user.login,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            activated: user.activated,
            langKey: user.langKey,
            profiles: {
                ROLE_ADMIN: user.authorities.includes('ROLE_ADMIN'),
                ROLE_TI: user.authorities.includes('ROLE_TI'),
                ROLE_CONTABILIDADE: user.authorities.includes('ROLE_CONTABILIDADE'),
                ROLE_REGULATORIO: user.authorities.includes('ROLE_REGULATORIO'),
            },
        });
    }

    goBack(): void {
        this._router.navigate(['/apps/registrations/user-management/list']);
      }

}
