import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { firstValueFrom } from 'rxjs';
import { IUsuarioInstituicao } from '../../../services/files/models/usuario-instituicao.model';
import { SettingsService } from '../../services/settings.service';

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
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
    protected _settingsService = inject(SettingsService);
    _route = inject(ActivatedRoute);
    breadcrumbs: HeaderBreadcrumb[] = [{ label: 'Configurações', first: true }, { label: 'Gerenciamento de Usuários' }];

    id: string = this._route.snapshot.params['id'];

    settings = [
        { value: 'isMaster', label: 'Perfil Administrador' },
        { value: 'status', label: 'Usuário ativo' },
    ];

    permissions = [
        { value: 'write', label: 'Editar' },
        { value: 'delete', label: 'Remover' },
        { value: 'update', label: 'Atualizar' },
        { value: 'read', label: 'visualizar' },
    ];

    editForm = this._formBuilder.group({
        id: [''],
        identificador: ['', Validators.required],
        role: ['', [Validators.maxLength(50)]],
        filial: [''],
        isMaster: [false],
        status: [false],
        write: [false],
        delete: [false],
        update: [false],
        read: [false],
    });

    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _router: Router,
    ) {}

    ngOnInit(): void {
        this.setSettingsUserById(this.id);
    }

    setSettingsUserById(id: string): void {
        firstValueFrom(this._settingsService.getUserById(id)).then((response) => {
            const user = response.body as IUsuarioInstituicao;
            if (!user) return;

            this.editForm.patchValue({
                id: user.id,
                identificador: user.identificador,
                role: user.role,
                filial: user.filial?.id,
                isMaster: user.isMaster,
                status: user.status,
                write: user.write,
                delete: user.delete,
                update: user.update,
                read: user.read,
            });
        });
    }

    save(): void {
        const raw = this.editForm.value;

        const usuarioToUpdate: IUsuarioInstituicao = {
            id: raw.id,
            identificador: raw.identificador,
            role: raw.role,
            filial: raw.filial ? { id: raw.filial } : null,
            isMaster: raw.isMaster,
            status: raw.status,
            write: raw.write,
            delete: raw.delete,
            update: raw.update,
            read: raw.read,
        };

        firstValueFrom(this._settingsService.update(usuarioToUpdate)).then((response) => {
            
            this._snackBar.open('Usuário salvo com sucesso!', 'Fechar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
            });

            setTimeout(() => {
            this._router.navigate(['/apps/settings/user-management/list']);
        }, 500);
        });
    }

    cancel(): void {
      this.editForm.reset();
        this._router.navigate(['/apps/settings/user-management/list']);
    }


}
