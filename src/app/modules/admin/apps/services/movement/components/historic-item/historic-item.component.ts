import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { getStatusNavigationDTOById, IStatusNavigationDTO, IStatusNavigationHistoricItem } from '../../models/movement-model';

@Component({
    selector: 'app-historic-item',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatTooltipModule],
    templateUrl: './historic-item.component.html',
    styleUrl: './historic-item.component.scss',
})
export class HistoricItemComponent {
    item = input<IStatusNavigationHistoricItem>();
    isFirst = input<boolean>(false);
    onUpdate = output<IStatusNavigationDTO>();
    onDownloadDIMP = output<number>();

    getStatusNavigationDTOById = getStatusNavigationDTOById;

    updateStatus(action: IStatusNavigationDTO) {
        this.onUpdate.emit(action)
    }

    onDownloadClick() {
        console.log(this.item())
        this.onDownloadDIMP.emit(this.item().arquivoDimpId);
    }
}
