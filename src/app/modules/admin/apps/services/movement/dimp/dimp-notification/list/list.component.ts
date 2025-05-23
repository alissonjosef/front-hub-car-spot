import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FuseAlertComponent } from '@fuse/components/alert';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { firstValueFrom } from 'rxjs';
import { MovementBase } from '../../../movement-base';
import { TransactionMovementService } from '../../../services/transaction-movement.service';
import { DimpNotificationComponent } from '../dimp-notification.component';
import { getStatusById, RequestDimp } from '../requestDimp.model';

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
        HeaderComponent,
        FuseAlertComponent,
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimpNotificationListComponent extends MovementBase {
    dimpNotificationComponent = inject(DimpNotificationComponent);
    private _transactionMovementService = inject(TransactionMovementService);

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Serviços', first: true },
        { label: 'Movimentos' },
        { label: 'Notificação (DIMP)', current: true },
    ];

    searchControl = signal({
        afterSearch: false,
        hasResults: false,
        message: 'Nenhum resultado encontrado para a busca realizada',
    });

    data = new MatTableDataSource<RequestDimp>([]);

    columns = ['id', 'name', 'institution', 'user', 'dataRequest', 'regulatory', 'type', 'status', 'parameters'];

    getStById = getStatusById;

    ngOnInit(): void {
        this.find();
    }

    find() {
        this.searchControl.set({
            ...this.searchControl(),
            afterSearch: true,
            hasResults: true,
            message: 'Nenhum resultado encontrado para a busca realizada.',
        });

        this.data.data = [];

        firstValueFrom(this._transactionMovementService.getNotificationDimp())
            .then((res) => {
                console.log('res', res);
                this.data.data = res;
            })
            .catch((err) => {
                this.searchControl.set({
                    ...this.searchControl(),
                    afterSearch: true,
                    hasResults: false,
                    message: 'Erro ao buscar os dados.',
                });
            })
            .finally(() => {
                this.searchControl.set({
                    ...this.searchControl(),
                    afterSearch: true,
                    hasResults: true,
                    message: 'Nenhum resultado encontrado para a busca realizada.',
                });
            });
    }
}
