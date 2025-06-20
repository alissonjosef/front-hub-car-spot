import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { CnpjCpfPipe } from '@shared/pipes/cnpj-cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { SettingsService } from '../../services/settings.service';
import { IUsuarioInstituicao, NewUsuarioInstituicao } from '../../../services/files/models/usuario-instituicao.model';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-new',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FuseAlertComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        FuseDrawerComponent,
        CnpjCpfPipe,
        NgxMaskDirective,
        MatCheckboxModule,
        MatPaginatorModule,
        RouterModule,
        HeaderComponent,
    ],
    templateUrl: './new.component.html',
    styleUrl: './new.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
    breadcrumbs: HeaderBreadcrumb[] = [{ label: 'Configurações', first: true }, { label: 'Gerenciamento de Usuários' }];
    protected _settingsService = inject(SettingsService);
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
        private _router: Router
    ) {}

    save(): void {
        const raw = this.editForm.value;

        const userToCreate: NewUsuarioInstituicao  = {
            id: null,
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

        firstValueFrom(this._settingsService.create(userToCreate)).then((response) => {
            
            this._snackBar.open('Usuário criado com sucesso!', 'Fechar', {
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
