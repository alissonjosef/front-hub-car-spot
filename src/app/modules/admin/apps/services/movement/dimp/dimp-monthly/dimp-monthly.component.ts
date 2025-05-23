import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { FuseMasonryComponent } from '@fuse/components/masonry';
import { CardDetailComponent } from '@shared/components/card-detail/card-detail.component';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { IPagination } from 'app/models/api.model';
import moment from 'moment';
import 'moment/locale/pt-br';
import { firstValueFrom } from 'rxjs';
import { MovementBase } from '../../movement-base';
import { EDrawerType } from '../../movement.component';
import { TransactionMovementService } from '../../services/transaction-movement.service';
import { IDimpMovementMonthly } from '../models/dimp-movement.model';
import { dimpMovementMonthlyConfig } from './movement-monthly-config';

moment.locale('pt-br');

@Component({
    selector: 'ecomm-dimp-monthly',
    standalone: true,
    imports: [
        FuseDrawerComponent,
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
        FuseMasonryComponent,
        CardDetailComponent,
        MatTooltipModule
    ],
    templateUrl: './dimp-monthly.component.html',
    styleUrl: './dimp-monthly.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimpMonthlyComponent extends MovementBase {
    private _transactionMovementService = inject(TransactionMovementService);
    private _router = inject(Router);
    private _route = inject(ActivatedRoute);

    @ViewChild('previewDrawer') drawer: FuseDrawerComponent;

    expandableDay = signal<IDimpMovementMonthly | null>(null);

    fileId = this._route.snapshot.params['id'];

    fileMonth = this._route.snapshot.queryParams['m'];
    fileYears = this._route.snapshot.queryParams['y'];

    cardDetailConfig = dimpMovementMonthlyConfig;

    opened = signal<boolean>(false);
    detailMovement = signal<any>(null);

    columns = ['day', 'qttTransactions', 'qttUntimely', 'qttCancel', 'fileList', /* 'expand' */];

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Serviços', first: true },
        { label: 'Movimentos' },
        { label: 'DIMP', onClick: () => this.goBack() },
        { label: `Movimentos do mês (DIMP)`, current: true },
    ];

    searchControl = signal({
        afterSearch: false,
        hasResults: false,
    });

    pagination = signal<IPagination>({
        page: 1,
        size: 100,
        total: 0,
        totalPages: 0,
    });

    monthLabel = signal('');

    constructor() {
        super();
        this.dataSource = new MatTableDataSource<IDimpMovementMonthly>([]);
    }

    ngOnInit() {
        this.find();
    }

    find() {
        firstValueFrom(this._transactionMovementService.getMovimentDetailsByMovimentId(this.fileId))
            .then((response) => {
                this.dataSource.data = response.data;
                this.dataSource.data = response.data.sort((a, b) => {
                    return new Date(a.dataTransacao).getTime() - new Date(b.dataTransacao).getTime();
                });

                if (response.data.length > 0) {
                    this.monthLabel.set(
                        `${response.data[0].movimento.uf} | ${moment(response.data[0]?.movimento.periodo).locale('pt-br').format('MMMM/YYYY')}`.toUpperCase()
                    );
                }

                this.searchControl.update((data) => ({
                    ...data,
                    hasResults: this.dataSource.data.length > 0,
                    afterSearch: true,
                }));

                if (this.dataSource.data.length === 1) {
                    this.toggle(this.dataSource.data.at(0));
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar arquivos:', error);
                this.searchControl.update((data) => ({
                    ...data,
                    hasResults: this.dataSource.data.length > 0,
                    afterSearch: true,
                }));

                this.eType.set('error');
            });
    }

    detailToggle = (detail?: any) => {
        if (detail) {
            this.drawer.open();
            this.detailMovement.set(detail);
        } else {
            this.drawer.close();
        }
    };

    goBack(): void {
        this._router.navigate(['/apps/services/movement/dimp'], {
            queryParams: {
                m: this.fileMonth,
                y: this.fileYears,
            },
        });
    }

    filesToggle(row: IDimpMovementMonthly) {
        firstValueFrom(this._transactionMovementService.getFilesFromMovementMonthyId(row.id)).then((resp) => {
            if (resp.data.length > 0) {
                this.movementComponent.openDimpDrawer({
                    type: EDrawerType.FILE_LIST,
                    data: resp.data,
                    title: `DIMP | ${row.movimento?.uf} | ${moment(row.dataTransacao).format('MMM/YYYY').toUpperCase()}`,
                });
            }
        });
    }

    /** Checks whether an element is expanded. */
    isExpanded(element: IDimpMovementMonthly) {
        return this.expandableDay()?.id === element.id;
    }

    /** Toggles the expanded state of an element. */
    toggle(element: IDimpMovementMonthly) {
        this.expandableDay.set(this.isExpanded(element) ? null : element);
    }
}
