import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { formatBytes, normalizeRegName, saveFile } from 'app/util/app.util';
import { env } from 'environments/env';
import { Subject, debounceTime, firstValueFrom, map, takeUntil } from 'rxjs';
import { DPSFilterPeriod, DPSFilterStatus, EDPSFileStatus, EFileTypeDPS, IFile, REGULATORIES_DPS } from '../../models/file.model';
import { ERegulatory, Regulatory, getRegulatoryType } from '../../models/regulatory.model';
import { FileService } from '../../services/files.service';

@Component({
    selector: 'app-file-list',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        ReactiveFormsModule,
        MatRadioModule,
        HeaderComponent,
        MatSelectModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatInputModule,
        DatePipe,
        FuseAlertComponent,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatButtonModule,
        MatSortModule,
        FormsModule,
        MatTooltipModule,
        RouterModule,
        MatSidenavModule,
        FuseScrollResetDirective,
        MatButtonModule,
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent implements OnInit, OnDestroy, AfterViewInit {
    drawer = viewChild<MatDrawer>('matDrawer');
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    private _fileService = inject(FileService);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    private _router = inject(Router);
    private _route = inject(ActivatedRoute);

    private searchSubject = new Subject<any>();

    errorTypes = {
        error: {
            message: 'Houve um erro ao carregar os dados',
            icon: 'heroicons_outline:exclamation-circle',
            alertType: 'error',
        },
        notFound: {
            message: 'Nenhum resultado encontrado para a busca realizada.',
            icon: 'mat_outline:search_off',
            alertType: 'primary',
        },
    };

    eType = signal<'notFound' | 'error'>('notFound');

    types = signal([]);

    pageSize = signal(25);
    pageIndex = signal(0);
    totalItems = signal(0);

    intervalList: DPSFilterPeriod[] = [
        { type: '24HS', label: 'últimas 24hs' },
        { type: '7D', label: 'últimos 7 dias' },
        { type: '15D', label: 'últimos 15 dias' },
        { type: '30D', label: 'últimos 30 dias' },
    ];

    statusList: DPSFilterStatus[] = [
        { label: 'Todos' },
        { status: EDPSFileStatus.ERROR, label: 'Erro', classes: '' },
        { status: EDPSFileStatus.PENDING, label: 'Pendente', classes: 'bg-yellow-400 text-white' },
        { status: EDPSFileStatus.PROCESSING, label: 'Em Processamento', classes: '' },
        { status: EDPSFileStatus.PROCESSED, label: 'Processado', classes: 'bg-green-400 text-white' },
    ];

    intervalFilter = signal<DPSFilterPeriod>(this.intervalList[3]);
    statusFilter = signal<DPSFilterStatus>(this.statusList[0]);

    private _fuseMediaWatcherService: FuseMediaWatcherService = inject(FuseMediaWatcherService);

    drawerMode = signal<'side' | 'over'>('side');
    drawerOpened = signal<boolean>(true);

    types$ = this._fileService.getArquivoFiltroTipoArquivo().pipe(
        map((response) => response.data ?? []),
        map((selectedTypes) => {
            console.log('chamou');
            const canShow = (regType: Regulatory) =>
                env.regulatories.map((el) => normalizeRegName(el)).includes(normalizeRegName(regType.name));

            const regulatoriesTypesMap = REGULATORIES_DPS();
            return Object.entries(regulatoriesTypesMap)
                .map(([key, fileTypes]) => {
                    const regType = getRegulatoryType(Number(key));
                    const label = `${regType.name} ${regType.name === 'DECRED' ? '(emissor)' : ''}`;

                    return {
                        key: normalizeRegName(regType.name),
                        label,
                        types: fileTypes.filter((type) => selectedTypes.includes(type.type)).map((type) => ({ ...type, selected: true })),
                        regType,
                    };
                })
                .filter((el) => canShow(el.regType));
        })
    );

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Serviços', first: true },
        { label: 'Arquivos', current: true },
    ];
    columns = ['name', 'type', 'size', 'auditCreatedAt', 'totalLines', 'totalProcessedLines', 'pending', 'status', 'transactions'];
    dataSource = new MatTableDataSource<IFile>();

    filterForm = new FormGroup({
        regulatory: new FormControl<string>(normalizeRegName(getRegulatoryType(ERegulatory.DIMP).name)),
        fileName: new FormControl(''),
    });

    fileTypes = signal<any[]>([]);

    searchControl = signal({
        afterSearch: false,
        hasResults: false,
    });

    sortState = signal<Sort>({
        active: 'auditCreatedAt',
        direction: 'desc',
    });

    constructor() {}

    async ngOnInit() {
        this.fileTypesByRegulatory();

        const [filename] = [this._route.snapshot.queryParams['f']];
        if (filename) {
            this.filterForm.patchValue({
                fileName: filename,
            });
        }

        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
            if (matchingAliases.includes('lg')) {
                this.drawerMode.set('side');
                this.drawerOpened.set(true);
            } else {
                this.drawerMode.set('over');
                this.drawerOpened.set(false);
            }
        });

        this.types.set(await firstValueFrom(this.types$));

        this.fileTypes.set(this.types().find((el) => el.key === this.filterForm.controls['regulatory'].value)?.types);

        this.getList();

        this.searchSubject.pipe(debounceTime(1000)).subscribe(() => {
            if (this.filterForm.value.fileName) {
                this._router.navigate([], {
                    queryParams: {
                        f: this.filterForm.value.fileName,
                    },
                    queryParamsHandling: 'merge',
                    onSameUrlNavigation: 'ignore',
                });
            }

            this.pageIndex.set(0);
            this.getList();
        });

        this.filterForm.controls['fileName'].valueChanges.subscribe(() => {
            this.searchSubject.next(true);
        });

        this.filterForm.controls['regulatory'].valueChanges.subscribe(async (data) => {
            this.fileTypes.set(this.types().find((el) => el.key === data)?.types);
            this.searchSubject.next(true);
        });
    }

    ngOnDestroy(): void {
        this.searchSubject.complete();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    onSortChange(event: Sort) {
        const current = this.sortState();

        // Se clicou na mesma coluna e direção vazia, inverte
        const newDirection =
            event.active === current.active && !event.direction ? (current.direction === 'asc' ? 'desc' : 'asc') : event.direction || 'asc';

        this.sortState.set({
            active: event.active,
            direction: newDirection,
        });

        this.getList();
    }

    async getList() {
        console.log('Filtros atuais:', this.filterForm.value);
        this.dataSource.data = [];

        if (this.filterForm) {
            this.searchControl.update((data) => ({
                ...data,
                afterSearch: false,
                hasResults: false,
            }));

            const selectedFileTypes = this.fileTypes()
                .filter((t) => t.selected)
                .map((t) => t.type);

            const { active: orderBy, direction: ascDesc } = this.sortState();

            console.log(`orderBy: ${orderBy}, ascDesc: ${ascDesc}`);

            const params = {
                StatusId: this.statusFilter()?.status ?? 0,
                UltimosQtdDias: this.getDaysFromPeriod(),
                page: this.pageIndex() + 1,
                size: this.pageSize(),
                TipoArquivosId: selectedFileTypes.length > 0 ? selectedFileTypes : [],
                orderBy,
                ascDesc,
                fileName: this.filterForm.get('fileName')?.value?.trim() ?? '',
            };

            try {
                const resp = await firstValueFrom(
                    this._fileService
                        .listFiles(
                            params.StatusId,
                            params.UltimosQtdDias,
                            params.page,
                            params.size,
                            params.TipoArquivosId,
                            params.orderBy,
                            params.ascDesc,
                            params.fileName
                        )
                        .pipe(
                            map((response) => ({
                                data: response.data ?? [],
                                pagination: response.pagination ?? { page: 1, size: 25, total: 0, totalPages: 0 },
                            }))
                        )
                );

                this.dataSource.data = resp.data.map((el) => ({ ...el, tamanhoBytes: formatBytes(el.tamanhoBytes) }));
                this.totalItems.set(resp.pagination.total ?? 0);
                this.pageIndex.set(resp.pagination.page - 1);

                if (this.paginator) {
                    this.paginator.length = this.totalItems();
                    this.paginator.pageIndex = this.pageIndex();
                }

                this.searchControl.update((data) => ({
                    ...data,
                    hasResults: this.dataSource.data.length > 0,
                    afterSearch: true,
                }));
            } catch (error) {
                console.error('Erro ao buscar arquivos:', error);
                this.searchControl.update((data) => ({
                    ...data,
                    hasResults: this.dataSource.data.length > 0,
                    afterSearch: true,
                }));

                this.eType.set('error');
            }
        }
    }

    onPageChange(event: any) {
        this.pageSize.set(event.pageSize);
        this.pageIndex.set(event.pageIndex);
        this.getList();
    }

    choosePeriod(e: DPSFilterPeriod) {
        this.intervalFilter.set(e);
        this.getList();
    }

    chooseStatus(e: DPSFilterStatus) {
        this.statusFilter.set(e);
        this.getList();
    }

    getDaysFromPeriod(): number {
        switch (this.intervalFilter()?.type) {
            case '24HS':
                return 1;
            case '7D':
                return 7;
            case '15D':
                return 15;
            case '30D':
                return 30;
            default:
                return 0;
        }
    }

    fileTypesByRegulatory() {
        firstValueFrom(this._fileService.getArquivoFiltroTipoArquivo())
            .then((response) => {
                const selectedTypes: number[] = response.data ?? [];
                const regulatoryKey = this.filterForm.controls['regulatory'].value;

                const allTypes = REGULATORIES_DPS();
                const regType = Object.keys(allTypes).find(
                    (key) => normalizeRegName(getRegulatoryType(Number(key)).name) === regulatoryKey
                );

                if (regType) {
                    const filteredFileTypes = allTypes[regType]
                        .filter((type) => selectedTypes.includes(type.type))
                        .map((type) => ({ ...type, selected: true }));

                    if (!this.fileTypes() || JSON.stringify(this.fileTypes()) !== JSON.stringify(filteredFileTypes)) {
                        this.fileTypes.set(filteredFileTypes);
                    }
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar tipos de arquivo:', error);
            });
    }

    changeFileType(type: any) {
        type.selected = !type.selected;

        const selectedTypes = this.fileTypes()
            .filter((t) => t.selected)
            .map((t) => t.type);

        this.searchSubject.next(selectedTypes);
    }

    toggleDrawer(): void {
        this.drawer().toggle();
    }

    async downloadFile(file: IFile) {
        const body = (await firstValueFrom(this._fileService.downloadInconsistences(file.id))).body;

        const { nome } = file;

        saveFile(body, `${nome.split('.')[0]}.csv`);
    }

    disabledNavigationButton(row: IFile) {
        if (![EFileTypeDPS.CANCEL, EFileTypeDPS.TRANSACTION].includes(row.tipoId)) {
            return true;
        }
    }

    clickRecords(row: IFile) {
        if ([EFileTypeDPS.CANCEL, EFileTypeDPS.TRANSACTION].includes(row.tipoId)) {
            this._router.navigate([`apps/services/files/file-transactions/${row.id}`]);
        }
    }

    async downloadErrors(row: IFile) {
        const body = (await firstValueFrom(this._fileService.downloadInconsistences(row.id))).body;

        const { nome } = row;
        saveFile(body, `LOG_ERROR_${nome.split('.')[0]}.csv`);
    }
}
