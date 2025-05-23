import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { IFile } from '../../../files/models/file.model';

@Component({
    selector: 'app-file-list',
    standalone: true,
    imports: [MatIcon, CommonModule, RouterLink],
    templateUrl: './file-list.component.html',
    styleUrl: './file-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
    files = input<IFile[]>([]);

    /*  async downloadFile(file: IFile) {
        const body = (await firstValueFrom(this._transactionMovementService.downloadMovimentoErros(this.movementId))).body;

        const { uf, periodo } = this.data();

        saveFile(body, `ERROR_LOG_${uf}_${moment(periodo).format('YYYYMM')}.xlsx`);
    } */
}
