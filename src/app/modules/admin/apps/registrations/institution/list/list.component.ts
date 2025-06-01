import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { CnpjCpfPipe } from '@shared/pipes/cnpj-cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { InstitutionService } from '../../services/institution.service';

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
        HeaderComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionListComponent {
    private _institutionService = inject(InstitutionService);

    @ViewChild('previewDrawer') drawer: FuseDrawerComponent;
    eventSubscriber?: Subscription;
    regulatoryList = signal<any[]>([]);

    opened = signal<boolean>(false);
    detailPaymentInstitution = signal<any>(null);

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Configurações', first: true },
        { label: 'Gerenciamento de Usuários' }
    ];

    dataSource = new MatTableDataSource<any>();

    columns = ['companyName', 'fantasy', 'CNPJ', 'state', 'type', 'details', 'edit'];

    constructor() {}

    ngOnInit(): void {
        this.getInstitutionsAll();
    }

    getInstitutionsAll(){
        this._institutionService.getInstitutions().then((response) => {
            this.regulatoryList.set(response);
            this.dataSource.data = response;
        });
    }

    detailToggle = (institution?: any) => {
        if (institution) {
            this.detailPaymentInstitution.set(institution);
            this.drawer.open();

        } else {
            this.drawer.close();
        }
    };

}
