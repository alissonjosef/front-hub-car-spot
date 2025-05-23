import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { CnpjCpfPipe } from '@shared/pipes/cnpj-cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { EstablishmentService } from '../../services/establishment.service';

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
        HeaderComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
    private _establishmentService = inject(EstablishmentService);
    @ViewChild('previewDrawer') drawer: FuseDrawerComponent;

    opened = signal<boolean>(false);
    detailClient = signal<any>(null);
    establishmentsyList = signal<any>([]);

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Consulta', first: true },
        { label: 'Estabelicimento' },
    ];

      searchControl = signal({
        afterSearch: false,
        hasResults: false,
    });

    dataSource = new MatTableDataSource<any>();

    columns = ['id', 'cnpj/cpf', 'registrationData', 'referenceData', 'companyName', 'city', 'state', 'accreditedSince', 'details'];

    formFilter = new FormGroup({
        cnpj: new FormControl('86786632000148'),
    });

    constructor() {}

    ngOnInit() {
        this.getEstablishments();
    }

    getEstablishments(){
         this._establishmentService.getInstitutions().then((response: any) => {
            console.log('response', response);
            this.establishmentsyList.set(response);
            this.dataSource.data = response || [];
            console.log('dataSource', this.dataSource.data);
        });
    }

    detailToggle = (establishment?: any) => {
        if (establishment) {
            this.detailClient.set(establishment);
            this.drawer.open();
        } else {
            this.drawer.close();
        }
    };
}
