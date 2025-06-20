import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { CnpjCpfPipe } from '@shared/pipes/cnpj-cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { firstValueFrom, Observable } from 'rxjs';
import { EntityArrayResponseType, SettingsService } from '../../services/settings.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

export type SortOrder = 'asc' | 'desc';

export type SortState = { predicate?: string; order?: SortOrder };

@Component({
  selector: 'app-list',
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
    MatPaginatorModule,
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  protected _settingsService = inject(SettingsService);
  private _fuseConfirm = inject(FuseConfirmationService);
  breadcrumbs: HeaderBreadcrumb[] = [
    { label: 'Configurações', first: true },
    { label: 'Gerenciamento de Usuários' },
  ];

  dataSource = new MatTableDataSource<any>();

  columns = ['Access', 'Administrador', 'Profile', 'Read', 'Write', 'Update', 'edit', 'Delete'];

  constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {
    try {
      const resp = await firstValueFrom(this.queryBackend());
      this.dataSource.data = resp.body ?? [];
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
      this._snackBar.open('Erro ao carregar os dados', 'Fechar', { duration: 3000 });
    }
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    const queryObject: any = {
      eagerload: true,
      sort: this.buildSortParam(this.sortState()),
    };
    return this._settingsService.query(queryObject);
  }

  protected sortState(): any {
    return {};
  }

  public buildSortParam({ predicate, order }: SortState, fallback?: string): string[] {
    const sortParam = predicate && order ? [`${predicate},${order}`] : [];
    if (fallback && predicate !== fallback) {
      sortParam.push(`${fallback},asc`);
    }
    return sortParam;
  }



modalDeleteUser(user: any) {
    const dialogRef = this._fuseConfirm.open({
        title: 'Excluir usuário?',
        message: `Tem certeza que deseja excluir o usuário
            <strong class="text-black">${user.identificador}</strong>?
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
        if (result === 'confirmed') {
            firstValueFrom(this._settingsService.delete(user.id))
                .then(() => {
                    this.load();
                })
                .catch(error => {
                    console.error('Erro ao excluir usuário:', error);
                })
        }
    });
}


}
