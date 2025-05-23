import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITableUfMovementDetail, UF_MOVEMENT_DETAIL } from './uf-movement.mock';

@Component({
    selector: 'app-uf-movement-detail',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './uf-movement-detail.component.html',
    styleUrl: './uf-movement-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UfMovementDetailComponent {
    columns = ['category', 'establishment', 'transactions', 'cancel', 'joint_account', 'marketplace'];
    dataSource = new MatTableDataSource<ITableUfMovementDetail>(UF_MOVEMENT_DETAIL());
}
