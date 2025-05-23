import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { saveFile } from '@util/app.util';
import { getUFBy } from 'app/mock-api/uf.mock';
import { IPagination } from 'app/models/api.model';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { getStatusNavigationDTOById, IStatusNavigationDTO, STATUS_NAVIGATION_DTO_OPTIONS } from '../../models/movement-model';
import { EStatusMovement } from '../../models/movement.enum';
import { MovementBase } from '../../movement-base';
import { EDrawerType } from '../../movement.component';
import { TransactionMovementService } from '../../services/transaction-movement.service';
import { IDimpMovement } from '../models/dimp-movement.model';
@Component({
    selector: 'app-list',
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
        FuseAlertComponent,
        MatSnackBarModule,
        MatCheckboxModule,
        RouterLink,
        MatTooltipModule,
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimpListComponent extends MovementBase {
    @ViewChild('matSort') sort: MatSort;

    private _route = inject(ActivatedRoute);
    private _transactionMovementService = inject(TransactionMovementService);
    private _fuseConfirmationService = inject(FuseConfirmationService);
    private _router = inject(Router);
    private _snackBar: MatSnackBar = inject(MatSnackBar);

    statusOptions: IStatusNavigationDTO[] = [
        {
            buttonLabel: 'Todos',
            id: 0,
            icon: 'public',
        },
        ...STATUS_NAVIGATION_DTO_OPTIONS,
    ];

    statusFilter = signal<IStatusNavigationDTO>(this.statusOptions[0]);

    amountPendingTransaction: number = 0;
    movementsSelected: IDimpMovement[] = [];

    getStatusNavigationDTOById = getStatusNavigationDTOById;
    columns = [
        'select',
        'uf',
        'qttEstablishment',
        'qttTransactions',
        'qttUntimely',
        'qttCancel',
        // 'rectifier',
        // 'dimpFile',
        'movementMonth',
        // 'fileList',
        'statusMovement',
        'details',
        
    ];

    selectedMonthYearDisplay = '';

    yearsOptions = Array.from({ length: new Date().getFullYear() - 2019 }, (v, k) => {
        return new Date().getFullYear() - k;
    });

    monthsOptions = Array.from({ length: 12 }, (v, k) => {
        return {
            value: k + 1,
            label: new Date(0, k).toLocaleString('default', { month: 'long' }),
        };
    });

    formFilter = new FormGroup({
        year: new FormControl(new Date().getFullYear()),
        month: new FormControl(new Date().getMonth() + 1),
    });

    formRequest = new FormGroup({
        year: new FormControl(new Date().getFullYear()),
        month: new FormControl(new Date().getMonth() + 1),
        uf: new FormControl(''),
        type: new FormControl<number>(1),
    });

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Serviços', first: true },
        { label: 'Movimentos' },
        { label: 'Movimentos (DIMP)', current: true },
    ];

    searchControl = signal({
        afterSearch: false,
        hasResults: false,
        message: 'Nenhum resultado encontrado para a busca realizada',
    });

    movimentoId = signal<number | null>(null);

    pagination = signal<IPagination>({
        page: 1,
        size: 100,
        total: 0,
        totalPages: 0,
    });

    opened = signal<boolean>(false);
    movement = signal<IDimpMovement>({} as IDimpMovement);
    movementComp = computed(() => {
        const { uf, periodo } = this.movement();
        const periodMoment = moment(periodo);
        return {
            uf,
            month: periodMoment.get('M'),
            year: periodMoment.get('year'),
        };
    });

    constructor() {
        super();

        this.dataSource = new MatTableDataSource<IDimpMovement>([]);
    }

    ngOnInit(): void {
        const [month, year] = [this._route.snapshot.queryParams['m'], this._route.snapshot.queryParams['y']];
        if (month && year) {
            this.formFilter.patchValue({
                year: parseInt(year, 10),
                month: parseInt(month, 10),
            });
        }
        this.find();

        this.formFilter.valueChanges.subscribe((value) => {
            this.filterChange();
        });
    }

    find(pageIndex = 0) {
        this.searchControl.set({
            afterSearch: false,
            hasResults: false,
            message: 'Nenhum resultado encontrado para a busca realizada.',
        });

        this.dataSource.data = [];

        const dateStart = moment()
            .year(this.formFilter.value.year)
            .month(this.formFilter.value.month - 1)
            .startOf('month')
            .format('YYYY-MM-DD');

        const dateEnd = moment()
            .year(this.formFilter.value.year)
            .month(this.formFilter.value.month - 1)
            .endOf('month')
            .format('YYYY-MM-DD');

        const filter = {
            dataInicial: dateStart,
            dataFinal: dateEnd,
            page: this.pagination()?.page ?? pageIndex,
            size: this.pagination().size,
            statusId: this.statusFilter().id,
        };

        if (this.statusFilter().id === 0) {
            delete filter.statusId;
        }

        firstValueFrom(this._transactionMovementService.getTransactionMovement(filter))
            .then((resp) => {
                this.dataSource.data = (Array.isArray(resp.data) ? resp.data : [resp.data]) ?? [];

                this.dataSource.data.forEach((row) => {
                    const initialStatus = this.statusOptions.find((option) => option.id === row.status);
                    if (initialStatus) {
                        row.statusNavigation = getStatusNavigationDTOById(initialStatus.id);
                    }
                });

                this.selectedMonthYearDisplay = this.selectedMonthYear;

                if (this.isAllSelected()) {
                    this.selection = new Set(this.dataSource.data);
                } else {
                    this.selection.clear();
                }
            })
            .catch((err) => {
                this.searchControl.update((curr) => ({
                    ...curr,
                    message: 'Um erro ocorreu para a busca realizada. Tente novamente em instantes.',
                }));
            })
            .finally(() => {
                this.searchControl.update((curr) => ({
                    ...curr,
                    afterSearch: true,
                    hasResults: this.dataSource.data.length > 0,
                }));
            });
    }

    chooseStatus(e: IStatusNavigationDTO) {
        this.statusFilter.set(e);
        this.find();
    }

    download() {
        alert('Download');
    }

    get selectedMonthYear(): string {
        const year = this.formFilter.value.year;
        const month = this.monthsOptions.find((m) => m.value === this.formFilter.value.month)?.label;

        return month && year ? `${month[0].toUpperCase()}${month.slice(1).toLowerCase()} de ${year}` : '';
    }

    filterChange() {
        // add query params
        this._router.navigate([], {
            queryParams: {
                m: this.formFilter.value.month,
                y: this.formFilter.value.year,
            },
            queryParamsHandling: 'merge',
            onSameUrlNavigation: 'ignore',
        });
    }

    updateStatus(row: IDimpMovement, action: IStatusNavigationDTO) {
        if (action.id === EStatusMovement.CLOSED) {
            this.movementComponent.openDimpDrawer({
                title: 'Fechar DIMP | ' + this.selectedMonthYearDisplay,
                type: EDrawerType.CLOSE_DIMP,
                data: [row],
                afterClose: () => {
                    this.find();
                },
            });
        } else {
            const penddingMessage =
                action.id === EStatusMovement.CLOSED && row.pendencia
                    ? `
                <br />
                <br />
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                <p class="font-semibold text-red-600 text-lg">⚠️ Atenção:</p>
                <p>O movimento possui pendência.</p>
                    <p class="mt-2">Fechar esses movimentos dessa forma pode impactar processos.
                    <br/>Tem certeza de que deseja continuar?</p>
                </div>
                <br />
            `
                    : '';

            const dialogRef: MatDialogRef<any> = this._fuseConfirmationService.open({
                title: 'Confirmar Ação',
                message: `Deseja prosseguir com a ação de <strong>${action.actionLabel.toUpperCase()}</strong> para este movimento?
                ${penddingMessage}
            `,
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
                        this._transactionMovementService.updateStatusMoviment([
                            {
                                movimentoId: row.id,
                                statusId: action.id,
                            },
                        ])
                    )
                        .catch((error) => {
                            if (error.status !== 200) {
                                this._snackBar.open('Erro ao atualizar status', 'Fechar', {
                                    duration: 3000,
                                    panelClass: ['snackbar-error'],
                                });
                            } else {
                                this._snackBar.open('Status atualizado com sucesso', 'Fechar', {
                                    duration: 3000,
                                    panelClass: ['snackbar-success'],
                                });
                            }
                        })
                        .finally(() => {
                            this.find();
                            
                            setTimeout(() => {
                                this.find();
                            }, 4000);
                        });
                }
            });
        }
    }

    getActionOptions(): IStatusNavigationDTO[] {
        const selectedMovements = Array.from(this.selection);

        if (selectedMovements.length === 0) {
            return [];
        }

        if (selectedMovements.length === 1) {
            const statusView = selectedMovements[0].statusNavigation as IStatusNavigationDTO;

            return statusView.actions.map((el) => getStatusNavigationDTOById(el));
        }

        // Verifica se todos os itens têm o mesmo statusId
        const allSameStatus = selectedMovements.every((row) => row?.statusId === selectedMovements[0].statusId);

        if (allSameStatus) {
            // Se todos os statusId forem iguais, retorna as actions do primeiro item
            const status = selectedMovements[0].statusNavigation as IStatusNavigationDTO;
            const statusMovement = status.actions.map((el) => getStatusNavigationDTOById(el));
            return statusMovement ? statusMovement : [];
        } else {
            // Se os statusId forem diferentes, encontra as actions em comum
            const commonActions = selectedMovements.reduce((commonActions, row, index) => {
                const statusMovement = getStatusNavigationDTOById(row.statusId);

                if (statusMovement) {
                    if (index === 0) {
                        // Inicializa com as actions do primeiro item
                        return [...statusMovement.actions];
                    } else {
                        // Filtra as actions em comum com o próximo status
                        return commonActions.filter((action) => statusMovement.actions.includes(action));
                    }
                }
                return commonActions;
            }, [] as number[]);

            // Retorna os STATUS_MOVEMENT_OPTIONS que contêm os actions em comum
            return STATUS_NAVIGATION_DTO_OPTIONS.filter((option) => commonActions.includes(option.id));
        }
    }

    updateStatusList(action: IStatusNavigationDTO): void {
        if (action.id === EStatusMovement.CLOSED) {
            this.movementComponent.openDimpDrawer({
                title: 'Fechar DIMP | ' + this.selectedMonthYearDisplay,
                type: EDrawerType.CLOSE_DIMP,
                data: Array.from(this.selection),
                afterClose: () => {
                    this.find();

                    setTimeout(() => {
                        this.find();
                    }, 4000);
                },
            });
        } else {
            const selecteds = Array.from(this.selection);
            const dialogRef = this._fuseConfirmationService.open({
                title: 'Confirmar Ação em Lote',
                message: `Deseja prosseguir com a ação de <strong>FECHAR</strong> para os movimentos selecionados do período (${moment(selecteds[0].periodo).format('MMM/yyyy').toUpperCase()}):
                                    <br />
                                    <br />
                                    <div class="text-sm flex flex-col">
                                        ${selecteds.map((el) => `<span>(${el.uf}) - ${getUFBy(el.uf).label}</span>`).join('')}
                                    </div>
                                `,
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
                dismissible: true,
            });

            dialogRef.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    firstValueFrom(
                        this._transactionMovementService.updateStatusMoviment(
                            selecteds.map((el) => ({ movimentoId: el.id, statusId: action.id }))
                        )
                    )
                        .then((resp) => {
                            this._snackBar.open('Status atualizado com sucesso', 'Fechar', {
                                duration: 3000,
                                panelClass: ['snackbar-success'],
                            });
                        })
                        .catch((error) => {
                            if (error.status !== 200) {
                                this._snackBar.open('Erro ao atualizar status', 'Fechar', {
                                    duration: 3000,
                                    panelClass: ['snackbar-error'],
                                });
                            } else {
                                this._snackBar.open('Status atualizado com sucesso', 'Fechar', {
                                    duration: 3000,
                                    panelClass: ['snackbar-success'],
                                });
                            }
                        })
                        .finally(() => {
                            this.find();

                            setTimeout(() => {
                                this.find();
                            }, 4000);
                        });
                }
            });
        }
    }

    filesToggle(row: IDimpMovement) {
        firstValueFrom(this._transactionMovementService.getFilesFromMovementId(row.id)).then((resp) => {
            if (resp.data.length > 0) {
                this.movementComponent.openDimpDrawer({
                    type: EDrawerType.FILE_LIST,
                    title: `DIMP | ${row.uf} | ${moment(row.periodo).format('MMM/YYYY')}`,
                    data: resp.data,
                });
            }
        });
    }

    get allSelectedAreGenerated() {
        const list = Array.from(this.selection) as IDimpMovement[];
        return list.length > 1 && list.every((el) => el.statusId === EStatusMovement.GENERATED);
    }

    async downloadMovimentoDimp(row: IDimpMovement) {
        const body = (await firstValueFrom(this._transactionMovementService.downloadMovimentoDimp(row.arquivoDimpId))).body;
        saveFile(body, `DIMP_${moment(row.periodo).format('YYYY_MM')}_${row.uf}.txt`);
    }
}
