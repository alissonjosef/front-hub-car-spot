import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseMasonryComponent } from '@fuse/components/masonry';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { saveFile } from '@util/app.util';
import moment from 'moment';
import { firstValueFrom, map, Subject, takeUntil } from 'rxjs';
import { CardDetailComponent } from '../../../../../../../shared/components/card-detail/card-detail.component';
import { DimpDetailsHistoryComponent } from '../../components/dimp-details-history/dimp-details-history.component';
import { HistoricItemComponent } from '../../components/historic-item/historic-item.component';
import { getStatusNavigationDTOById, IStatusNavigationDTO, IStatusNavigationHistoricItem } from '../../models/movement-model';
import { EStatusMovement } from '../../models/movement.enum';
import { MovementBase } from '../../movement-base';
import { EDrawerType } from '../../movement.component';
import { TransactionMovementService } from '../../services/transaction-movement.service';
import { IDimpMovement } from '../models/dimp-movement.model';
import { CURRENT_MOVEMENT } from './movement-detail-config';

@Component({
    selector: 'ecomm-details',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        HeaderComponent,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatMenuModule,
        HistoricItemComponent,
        CardDetailComponent,
        FuseAlertComponent,
        MatSnackBarModule,
        FuseMasonryComponent,
        MatTooltipModule,
        MatTabsModule,
        DimpDetailsHistoryComponent,
    ],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimpDetailsComponent extends MovementBase {
    @ViewChild('matDrawer') drawer: MatDrawer;
    private _transactionMovementService = inject(TransactionMovementService);
    private _router = inject(Router);
    private _route = inject(ActivatedRoute);
    private _fuseConfirmationService = inject(FuseConfirmationService);
    private _snackBar: MatSnackBar = inject(MatSnackBar);

    private _fuseMediaWatcherService = inject(FuseMediaWatcherService);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    movementId = this._route.snapshot.params['id'];

    fileMonth = this._route.snapshot.queryParams['m'];
    fileYears = this._route.snapshot.queryParams['y'];

    getStatusNavigationDTOById = getStatusNavigationDTOById;

    historyHasError = signal(false);

    columnsDetail = signal(1);

    statusNavigationHistory = signal<IStatusNavigationHistoricItem[]>([]);

    currentMovementConfig = CURRENT_MOVEMENT;

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Serviços', first: true },
        { label: 'Movimentos' },
        { label: 'DIMP', onClick: () => this.goBack() },
        { label: 'Detalhes', current: true },
    ];

    searchControl = signal({
        afterSearch: false,
        hasResults: false,
    });

    data = signal<IDimpMovement>(null);

    ngOnInit() {
        this.find();

        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened
            console.log(matchingAliases);
            if (matchingAliases.includes('xl')) {
                this.columnsDetail.set(3);
                setTimeout(() => {
                    this.movementComponent.closeDrawer();
                }, 1000);
            } else if (matchingAliases.includes('lg')) {
                this.columnsDetail.set(2);
                setTimeout(() => {
                    this.movementComponent.closeDrawer();
                }, 1000);
                this.columnsDetail.set(2);
            } else if (matchingAliases.includes('sm')) {
                this.columnsDetail.set(1);
            } else {
                this.columnsDetail.set(1);
            }
        });
    }

    compMovement = computed(() => {
        const data = this.data();
        if (!data) return '';
        const period = moment(data.periodo);
        return `${data.uf} - ${period.format('MMM/YYYY').toUpperCase()}`;
    });

    find() {
        firstValueFrom(this._transactionMovementService.getTransactionMovementById(this.movementId))
            .then((response) => {
                this.data.set({
                    ...response.data,
                    statusNavigation: getStatusNavigationDTOById(response.data.statusId),
                });

                this.searchControl.set({
                    afterSearch: true,
                    hasResults: !!response.data,
                });

                this.findStatusNavigationHistory();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    findStatusNavigationHistory() {
        firstValueFrom(
            this._transactionMovementService.getStatusNavigationHistory(this.movementId).pipe(
                map((resp) => {
                    (resp.data || []).forEach((el) => {
                        el.view = getStatusNavigationDTOById(el.statusId);
                    });

                    const sortedData = (resp.data || []).sort((a, b) => {
                        const dateA = moment(a.dataAlteracao);
                        const dateB = moment(b.dataAlteracao);
                        return dateB.isAfter(dateB) ? 1 : -1;
                    });

                    return sortedData;
                })
            )
        )
            .then((resp) => {
                this.statusNavigationHistory.set(resp);
                this.historyHasError.set(false);
            })
            .catch((error) => {
                this.historyHasError.set(true);
            });
    }

    goBack(): void {
        this._router.navigate(['/apps/services/movement/dimp'], {
            queryParams: {
                m: this.fileMonth,
                y: this.fileYears,
            },
        });
    }

    updateStatus(action: IStatusNavigationDTO) {
        if (action.id === EStatusMovement.CLOSED) {
            this.movementComponent.openDimpDrawer({
                title: this.compMovement(),
                type: EDrawerType.CLOSE_DIMP,
                data: [this.data()],
                afterClose: () => {
                    this.find();
                },
            });
        } else {
            const dialogRef = this._fuseConfirmationService.open({
                title: 'Confirmar Ação',
                message: `Deseja prosseguir com a ação de <strong>${action.actionLabel.toLowerCase()}</strong> este movimento?`,
                icon: {
                    show: true,
                    name: 'warning',
                    color: 'warning',
                },
                actions: {
                    confirm: {
                        label: `Sim, ${action.actionLabel}`,
                        color: 'primary',
                    },
                    cancel: {
                        label: 'Cancelar',
                    },
                },
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    firstValueFrom(
                        this._transactionMovementService.updateStatusMoviment([{ movimentoId: this.data().id, statusId: action.id }])
                    )
                        .then((resp) => {
                            this._snackBar.open('Status atualizado com sucesso', 'Fechar', {
                                duration: 3000,
                                panelClass: ['snackbar-success'],
                            });
                        }) // TODO: adicionar snackbar de sucesso
                        .finally(() => {
                            this.find();
                        });
                }
            });
        }
    }

    async downloadMovimentoErros() {
        const body = (await firstValueFrom(this._transactionMovementService.downloadMovimentoErros(this.movementId))).body;

        const { uf, periodo } = this.data();

        saveFile(body, `ERROR_LOG_${uf}_${moment(periodo).format('YYYYMM')}.csv`);
    }

    openFilesDrawer() {
        firstValueFrom(this._transactionMovementService.getFilesFromMovementId(this.data().id)).then((resp) => {
            if (resp.data.length > 0) {
                this.movementComponent.openDimpDrawer({
                    type: EDrawerType.FILE_LIST,
                    title: `DIMP | ${this.data().uf} | ${moment(this.data().periodo).format('MMM/YYYY')}`,
                    data: resp.data,
                });
            }
        });
    }

    async downloadDimp(item?: IStatusNavigationHistoricItem) {
        const body = (
            await firstValueFrom(
                this._transactionMovementService.downloadMovimentoDimp(item ? item.arquivoDimpId : this.data().arquivoDimpId)
            )
        ).body;
        saveFile(
            body,
            `DIMP_${moment(this.data().periodo).format('YYYY_MM')}_${this.data().uf}_${moment(item.dataAlteracao).format('YYYYMMDDmmss')}.txt`
        );
    }

    ngOnDestroy() {
        if(this._unsubscribeAll) {
            this._unsubscribeAll.unsubscribe();
        }
    }
}
