import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { CnpjCpfPipe } from '@shared/pipes/cnpj-cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { RepresentativesService } from '../../services/representatives.service';

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
export class RepresentativesListComponent {
    private _representativesService = inject(RepresentativesService);

    @ViewChild('previewDrawer') drawer: FuseDrawerComponent;
    representativesList = signal<any[]>([]);

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Cadastros', first: true },
        { label: 'Responsáveis e Representantes' },
    ];

    typeResponsible = [
        { type: 2, cod: 'DIMP  - [Responsável]' },
        { type: 3, cod: 'DOC-SP - [Responsável]' },
        { type: 4, cod: 'DECRED - [Responsável]' },
        { type: 5, cod: 'DECRED - [Representante]' },
        { type: 6, cod: 'ISSQN - [Responsável]' },
        { type: 7, cod: 'DOC-6334 - [Responsável]' }
      ];

    pageSize = signal(31);
    pageIndex = signal(0);
    totalItems = signal(0);
    opened = signal<boolean>(false);
    detailClient = signal<any>(null);

    searchControl = signal({
        afterSearch: false,
        hasResults: false,
    });

     dataSource = new MatTableDataSource<any>();

    columns = ['name', 'type', 'details', 'edit'];

    ngOnInit(): void {
        this.getRepresentatives();
    }

    getRepresentatives(page?: number): void {
         this._representativesService.getRepresentatives().then((response) => {
            this.representativesList.set(response);
            this.dataSource.data = response;
        });
    }

    onPageChange(event: PageEvent): void {
        this.pageSize.set(event.pageSize);
        this.pageIndex.set(event.pageIndex);
        this.getRepresentatives(event.pageIndex + 1);
    }

    detailToggle(representative?: any): void {
         if (representative) {
            this.detailClient.set(representative);
            this.drawer.open();
        } else {
            this.drawer.close();
        }
    }

    getCodTipo(codTipo: number, nmCargo?: string): string {
        const result = this.typeResponsible.find(item => item.type === codTipo);

        if (result) {
          if (codTipo === 7 && nmCargo) {
            return `${result.cod} - ${nmCargo}`;
          }
          return result.cod;
        }
        return '--';
      }
}
