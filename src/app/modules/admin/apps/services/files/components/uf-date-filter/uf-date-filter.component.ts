import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, input, output, signal } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatLabel } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertComponent } from '@fuse/components/alert';
import { getUFBy } from 'app/mock-api/uf.mock';
import { IAPIResponse } from 'app/models/api.model';
import moment from 'moment';
import { Subject, debounceTime, firstValueFrom, takeUntil } from 'rxjs';
import { FileService } from '../../services/files.service';

@Component({
    selector: 'app-uf-date-filter',
    standalone: true,
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatLabel,
        MatCheckboxModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        FuseAlertComponent,
    ],
    templateUrl: './uf-date-filter.component.html',
    styleUrl: './uf-date-filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UfDateFilterComponent {
    _fileService = inject(FileService);
    @Input() fileId!: number;

    onFilterChange = output<any>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _filterChanges$: Subject<void> = new Subject<void>(); // Debounce para getTransactions
    private _getDatesTrigger$: Subject<void> = new Subject<void>(); // Debounce para getDates

    ufs = signal([]); // Lista de UFs disponíveis
    dates = signal<Date[]>([]); // Lista de datas disponíveis

    datesModel = signal<Date[]>([]); // Datas selecionadas
    ufsModel = signal<string[]>([]); // UFs selecionadas

    ufsMultipleControls = computed(() => ({
        triggerLabel: () => (this.ufsModel().length > 0 ? `${this.ufsModel().join(', ')}` : 'Todos'),
        indeterminate: this.ufsModel().length > 0 && this.ufsModel().length < this.ufs.length,
        allSelected: this.ufsModel().length === this.ufs.length && this.ufsModel().length > 0,
        checked: (uf: string) => this.ufsModel().includes(uf),
    }));

    datesMultipleControls = computed(() => ({
        triggerLabel: () => (this.datesModel().length > 0 ? `${this.datesModel().join(', ')}` : 'Todas'),
        indeterminate: this.datesModel().length > 0 && this.datesModel().length < this.dates.length,
        allSelected: this.datesModel().length === this.dates.length && this.datesModel().length > 0,
        checked: (date: string) =>
            this.datesModel()
                .map((el) => moment(el).format('DD/MM/YYYY'))
                .includes(moment(date).format('DD/MM/YYYY')),
    }));

    constructor() {

        // Debounce para evitar múltiplas chamadas ao buscar transações
        this._filterChanges$.pipe(debounceTime(300), takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.onFilterChange.emit({ ufs: this.ufsModel(), dates: this.datesModel() });
        });

        // Debounce para evitar múltiplas chamadas ao buscar datas
        this._getDatesTrigger$.pipe(debounceTime(300), takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.getDates();
        });

        // Sempre que `ufsModel` ou `datesModel` mudarem, chamamos `getTransactions`
        effect(() => {
            this._filterChanges$.next();
        });
    }

    ngOnInit() {
        this.getUfs();
    }

    getUfs() {
        firstValueFrom(this._fileService.getUFFilterTransactions(this.fileId)).then((resp: IAPIResponse<string[]>) => {
            console.log('Buscando UFs...', resp.data);
            this.ufs.set((resp.data ?? []));
        });
    }

    getDates() {
        console.log('Buscando Datas...');
        firstValueFrom(this._fileService.getDateFilterTransactions(this.fileId, this.ufs())).then((resp: IAPIResponse<Date[]>) => {
            this.dates.set(resp.data ?? []);

            console.log('Datas das UFs [' + this.ufsModel().join(', ') + ']', this.dates().map((el) => moment(el).format('DD/MM/YYYY')));
        });
    }

    selectUF(event: MatChipSelectionChange, uf: string) {
        this.ufsModel.update((ufs) => {
            const newSet = new Set(ufs);
            event.selected ? newSet.add(uf) : newSet.delete(uf);
            return Array.from(newSet);
        });

        this._getDatesTrigger$.next(); // Agora só chamamos `getDates()` após um pequeno intervalo
        this._filterChanges$.next();
    }

    changeAll(event: MatCheckboxChange) {
        if (event.checked && this.ufs().length > 0) {
            this.ufsModel.set(this.ufs().map((uf) => uf));
        } else {
            this.ufsModel.set([]);
        }

        this._getDatesTrigger$.next(); // Evita chamadas duplicadas ao selecionar todas
        this._filterChanges$.next();
    }

    selectDate(event: MatChipSelectionChange, date: Date) {
        this.datesModel.update((dates) => {
            const newSet = new Set(dates);
            event.selected ? newSet.add(date) : newSet.delete(date);
            return Array.from(newSet);
        });

        this._filterChanges$.next();
    }

    changeAllDates(event: MatCheckboxChange) {
        this.datesModel.set(event.checked ? [...this.dates()] : []);
        this._filterChanges$.next();
    }
}
