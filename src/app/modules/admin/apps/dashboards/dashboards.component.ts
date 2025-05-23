import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { findByAcronym, STATES_BR } from 'app/mock-api/api/states.mock';
import moment from 'moment';
import 'moment/locale/pt';
import { DPSFilterPeriod } from '../services/files/models/file.model';
import { FileListComponent } from '../services/movement/components/file-list/file-list.component';
import { PendingBoxComponent } from './components/pending-box/pending-box.component';
import { UfMovementDetailComponent } from './components/uf-movement-detail/uf-movement-detail.component';
import { UfsResumeComponent } from './components/ufs-resume/ufs-resume.component';

@Component({
    selector: 'app-dashboards',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        HeaderComponent,
        MatMenuModule,
        MatTooltipModule,
        PendingBoxComponent,
        UfsResumeComponent,
        UfMovementDetailComponent,
        RouterModule,
        FileListComponent,
        FuseDrawerComponent,
    ],
    templateUrl: './dashboards.component.html',
    styleUrl: './dashboards.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardsComponent implements OnInit {
    @ViewChild('fileDrawer') fileDrawer: FuseDrawerComponent;

    drawerMode = signal<'side' | 'over'>('side');
    drawerOpened = signal<boolean>(false);

    private _router = inject(Router);
    private _route = inject(ActivatedRoute);

    breadcrumbs: HeaderBreadcrumb[] = [{ label: 'Painel de controle', first: true, current: true }];

    searchControl = signal({
        isAllUfs: true,
        afterSearch: false,
        hasResults: false,
        labelSelected: '',
    });

    yearsOptions = Array.from({ length: new Date().getFullYear() - 2019 }, (v, k) => {
        return new Date().getFullYear() - k;
    });

    monthsOptions = Array.from({ length: 12 }, (v, k) => {
        return {
            value: k + 1,
            label: new Date(0, k).toLocaleString('default', { month: 'long' }),
        };
    });

    statesOptions = [{ id: '', acronym: '', name: `Todas as UF's` }, ...STATES_BR];

    intervalList: DPSFilterPeriod[] = [
        { type: '7D', label: 'últimos 7 dias' },
        { type: '15D', label: 'últimos 15 dias' },
        { type: '30D', label: 'últimos 30 dias' },
    ];

    formFilter = new FormGroup({
        year: new FormControl(new Date().getFullYear()),
        month: new FormControl(new Date().getMonth() + 1),
        uf: new FormControl(''),
        lastSendedFiles: new FormControl('30D'),
    });

    navigation = computed(() => {
        const formRaw = this.formFilter.getRawValue();
        const query = {
            m: formRaw.month,
            y: formRaw.year,
            uf: formRaw.uf,
        };
        return {
            generateRegulatory: {
                link: '/apps/services/movement/dimp',
                query,
            },
        };
    });

    ngOnInit(): void {
        const [month, year, uf] = [
            this._route.snapshot.queryParams['m'],
            this._route.snapshot.queryParams['y'],
            this._route.snapshot.queryParams['uf'],
        ];
        if (month && year) {
            this.formFilter.patchValue({
                year: parseInt(year, 10),
                month: parseInt(month, 10),
                uf,
            });
        }

        this.find();

        this.formFilter.valueChanges.subscribe((value) => {
            this.filterChange();
        });
    }

    openDimpDrawer() {
        this.fileDrawer.toggle();
    }

    filterChange() {
        const formRaw = this.formFilter.getRawValue();
        // add query params
        this._router.navigate([], {
            queryParams: {
                m: formRaw.month,
                y: formRaw.year,
                uf: formRaw.uf,
            },
            queryParamsHandling: 'merge',
            onSameUrlNavigation: 'ignore',
        });
    }

    find() {
        const formRaw = this.formFilter.getRawValue();
        const uf = findByAcronym(formRaw.uf);
        this.searchControl.update((curr) => ({
            ...curr,
            afterSearch: true,
            isAllUfs: !uf,
            labelSelected:
                (!uf ? `Todas as UF's` : `${uf.name} (${uf.acronym.toLocaleUpperCase()})`) +
                ' | ' +
                moment(new Date()).locale('pt').format('MMMM/YYYY'),
        }));
    }
}
