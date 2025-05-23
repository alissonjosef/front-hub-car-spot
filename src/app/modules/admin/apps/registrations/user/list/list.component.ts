import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { User } from 'app/core/user/user.types';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        FuseDrawerComponent,
        MatPaginatorModule,
        RouterModule,
        MatDialogModule,
        HeaderComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
    private _userService = inject(UserService);
    private _fuseConfirm = inject(FuseConfirmationService);
     @ViewChild('detailsDrawer') drawer: FuseDrawerComponent;
     usersList = signal<any[]>([]);

    breadcrumbs: HeaderBreadcrumb[] = [{ label: 'Administração', first: true }, { label: 'Usuários' }];

    userManagement = signal<any>(null);
    opened = signal<boolean>(false);
    account = signal<User | null>(null);

    itemsPerPage = 31;
    totalItems = 0;
    page: number = 1;
    predicate: string = 'id';
    ascending: boolean = true;
    previousPage!: number;

    listProfile = [
        {
            name: 'Administrador',
            value: 'ROLE_ADMIN',
        },
        {
            name: 'Técnico',
            value: 'ROLE_TI',
        },
        {
            name: 'Contabilidade',
            value: 'ROLE_CONTABILIDADE',
        },
        {
            name: 'Regulatório',
            value: 'ROLE_REGULATORIO',
        },
    ];

    dataSource = new MatTableDataSource<any>();

    columns = ['login', 'email', 'active', 'profile', 'details', 'edit', 'delete'];

    constructor() {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(){
         this._userService.getUsers().then((response) => {
            console.log(response, "Tudo");
            this.usersList.set(response);
            this.dataSource.data = response;
        });
    }

    detailToggle = (user?: any) => {
        if (user) {
            this.userManagement.set(user);
            this.drawer.open();
        } else {
            this.drawer.close();
        }
    };

    getProfileName(authority: string): string {
        const profile = this.listProfile.find((profile) => profile.value === authority);
        return profile ? profile.name : authority;
    }

    modalDeleteUser(userLogin: any) {
        const dialogRef = this._fuseConfirm.open({
            title: 'Excluir usuário?',
            message: `Tem certeza que deseja excluir o usuário
                <strong class="text-black">${userLogin.login}</strong>?
            <br /> <br />Essa ação não poderá ser desfeita!`,
            icon: {
                show: true,
                color: 'warning',
                name: 'warning',
            },
            actions: {
                confirm: {
                    label: 'Excluir',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'Cancelar',
                },
            },
        });

        dialogRef.afterClosed().subscribe((result: 'confirmed' | 'canceled') => {
           /*  if (result === 'confirmed') {
                firstValueFrom(this._userManagementService.delete(userLogin.login)).finally(() => {
                    this.loadAllUsers();
                });
            } */
        });
    }
}
