import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseMasonryComponent } from '@fuse/components/masonry';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CardDetailComponent } from '@shared/components/card-detail/card-detail.component';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { saveFile } from '@util/app.util';
import { IAPIResponse } from 'app/models/api.model';
import moment from 'moment';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { getStatusNavigationDTOById } from '../../../movement/models/movement-model';
import { UfDateFilterComponent } from '../../components/uf-date-filter/uf-date-filter.component';
import { IFileTransactionDay } from '../../models/file.model';
import { FileService } from '../../services/files.service';
import { fileTransactionDayDetailConfig } from './file-transactions-detail-config';

moment.locale('pt-br');
@Component({
    selector: 'app-file-transactions',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HeaderComponent,
        RouterModule,
        MatButtonModule,
        MatSidenavModule,
        FuseScrollResetDirective,
        FuseAlertComponent,
        MatTooltipModule,
        UfDateFilterComponent,
        MatExpansionModule,
        MatIconModule,
        CardDetailComponent,
        MatTableModule,
        FuseMasonryComponent,
    ],
    templateUrl: './file-transactions.component.html',
    styleUrl: './file-transactions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTransactionsComponent implements OnInit, OnDestroy {
    drawer = viewChild<MatDrawer>('matDrawer');
    _fileService = inject(FileService);
    private _route = inject(ActivatedRoute);
    private _router = inject(Router);

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    fileId = this._route.snapshot.params['id'];

    private _fuseMediaWatcherService: FuseMediaWatcherService = inject(FuseMediaWatcherService);

    drawerMode = signal<'side' | 'over'>('side');
    drawerOpened = signal<boolean>(true);

    columns: string[] = [
        'referenceDate',
        'uf',
        'errorsQuantity',
        // 'errorsValue',
        'transactionsQuantity',
        // 'transactionsValue',
        // 'movementStatus',
        'expand',
    ];
    dataSource = new MatTableDataSource<IFileTransactionDay>();

    cardDetailConfig = fileTransactionDayDetailConfig;

    expandableFileTransactionDay = signal<IFileTransactionDay | null>(null);

    searchControl = signal({
        afterSearch: false,
        hasResults: false,
    });

    fileHasError = signal(false);

    menu = signal<FuseNavigationItem[]>([]);

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Serviços', first: true },
        { label: 'Data entry' },
        { label: 'Arquivos enviados', onClick: () => this._router.navigate(['/apps/services/files']) },
        { label: 'Transações do arquivo', current: true },
    ];

    pageDescription = signal('');

    arquivo = computed(() => {
        const first = this.dataSource.data[0];
        if (first) {
            return first.arquivo;
        }
        return undefined;
    });

    get idArquivo(): number {
        return this.arquivo()?.id;
    }

    get divergenceOfLines(): number {
        return this.arquivo()?.totalLinhasDivergencia;
    }

    getTransactions({ ufs, dates }: { ufs?: string[]; dates?: Date[] }): void {
        const filters: { ufs?: string[]; dates?: Date[] } = {};

        if (ufs?.length) {
            filters.ufs = ufs;
        }

        if (dates?.length) {
            filters.dates = dates;
        }

        firstValueFrom(this._fileService.getTransactions(this.fileId, filters))
            .then((resp: IAPIResponse<IFileTransactionDay[]>) => {
                this.dataSource.data = resp.data.map((el) => {
                    if (el.movimento) {
                        el.movimento['statusView'] = getStatusNavigationDTOById(el.movimento.statusId);
                    }
                    return el;
                });

                if (resp.data.length > 0) {
                    this.pageDescription.set(
                        `${resp.data[0]?.arquivo.nome.substring(0, resp.data[0]?.arquivo.nome.lastIndexOf('.'))} - Data Processamento: ${moment(resp.data[0]?.auditCreatedAt).locale('pt-br').format('DD/MM/YYYY HH:mm')}`
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

                this.fileHasError.set(false);
            })
            .catch((error) => {
                this.fileHasError.set(true);
            });
    }

    ngOnInit(): void {
        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
            if (matchingAliases.includes('lg')) {
                this.drawerMode.set('side');
                this.drawerOpened.set(true);
            } else {
                this.drawerMode.set('over');
                this.drawerOpened.set(false);
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleDrawer(): void {
        this.drawer().toggle();
    }

    /** Checks whether an element is expanded. */
    isExpanded(element: IFileTransactionDay) {
        return this.expandableFileTransactionDay() === element;
    }

    /** Toggles the expanded state of an element. */
    toggle(element: IFileTransactionDay) {
        this.expandableFileTransactionDay.set(this.isExpanded(element) ? null : element);
    }

    movementStatusViewDto(statusId: number) {
        return getStatusNavigationDTOById(statusId);
    }

    async downloadErrors() {
        const body = (await firstValueFrom(this._fileService.downloadInconsistences(this.idArquivo))).body;
        const nameFile = this.arquivo()?.nome || 'ERROS';
        saveFile(body, `LOG_ERROR_${nameFile.split('.')[0]}.csv`);
    }
}
