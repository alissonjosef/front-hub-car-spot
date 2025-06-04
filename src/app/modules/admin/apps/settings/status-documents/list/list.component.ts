import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { CnpjCpfPipe } from '@shared/pipes/cnpj-cpf.pipe';
import { NgxMaskDirective } from 'ngx-mask';

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
        HeaderComponent,
    ],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
    breadcrumbs: HeaderBreadcrumb[] = [{ label: 'Configurações', first: true }, { label: 'Status Documentos' }];
}
