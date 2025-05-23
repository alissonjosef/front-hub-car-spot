import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { getUFBy } from 'app/mock-api/uf.mock';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { IDimpMovement } from '../../dimp/models/dimp-movement.model';
import { EStatusMovement } from '../../models/movement.enum';
import { TransactionMovementService } from '../../services/transaction-movement.service';

@Component({
    selector: 'app-close-dimp',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, MatSlideToggle, MatChipsModule, MatFormFieldModule, MatButtonModule, FormsModule],
    templateUrl: './close-dimp.component.html',
    styleUrl: './close-dimp.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseDimpComponent {
    data = input<IDimpMovement[]>([]);
    dimpsModel = signal<IDimpMovement[]>([]);
    onCloseDrawer = output();

    private _fuseConfirmationService = inject(FuseConfirmationService);
    private _transactionMovementService = inject(TransactionMovementService);
    private _snackBar = inject(MatSnackBar);

    ufsMultipleControls = computed(() => ({
        triggerLabel: () => (this.dimpsModel().length > 0 ? `${this.dimpsModel().join(', ')}` : 'Todos'),
        indeterminate: this.dimpsModel().length > 0 && this.dimpsModel().length < this.data().length,
        allSelected: this.dimpsModel().length === this.data().length && this.dimpsModel().length > 0,
        checked: (uf: IDimpMovement) =>
            this.dimpsModel()
                .map((el) => el.id)
                .includes(uf.id),
    }));

    ngOnInit() {
        this.changeAll({ checked: true, source: null });
    }

    changeAll(event: MatCheckboxChange) {
        if (event.checked && this.data().length > 0) {
            this.dimpsModel.set(this.data().map((uf) => uf));
        } else {
            this.dimpsModel.set([]);
        }
    }

    retificadora = false;


    selectUF(event: MatChipSelectionChange, dimp: IDimpMovement) {
        this.dimpsModel.update((dimps) => {
            const newSet = new Set(dimps);
            event.selected ? newSet.add(dimp) : newSet.delete(dimp);
            return Array.from(newSet);
        });
    }

    closeDimp() {
        const penddingMessage = this.dimpsModel().some((el) => el.pendencia)
            ? `
                <br />
                <br />
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                    <p class="font-semibold text-red-600 text-lg">⚠️ Atenção:</p>
                    <p>Um ou mais movimentos possui pendência.</p>
                    <p class="mt-2">Fechar esses movimentos dessa forma pode impactar processos.
                    <br/>Tem certeza de que deseja continuar?</p>
                </div>
                <br />
            `
            : '';

        const dialogRef = this._fuseConfirmationService.open({
            title: 'Confirmar Ação em Lote',
            message: `Deseja prosseguir com a ação de <strong>FECHAR</strong> para os movimentos selecionados do período (${moment(this.dimpsModel()[0].periodo).format('MMM/yyyy').toUpperCase()}):
                        <br />
                        <br />
                        <div class="text-sm flex flex-col">
                            ${this.dimpsModel()
                                .map((el) => `<span>(${el.uf}) - ${getUFBy(el.uf).label}</span>`)
                                .join('')}
                        </div>

                        ${penddingMessage}

                        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mt-4">
                            <p class="font-semibold text-red-600 text-lg">⚠️ RETIFICADORA: ${this.retificadora ? 'Sim':'Não'}</p>
                        </div>
                    `,
            icon: {
                show: true,
                name: 'warning',
                color: 'warning',
            },
            actions: {
                confirm: {
                    label: `Sim, Fechar`,
                    color: 'primary',
                },
                cancel: {
                    label: 'Cancelar',
                },
            },
            dismissible: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                firstValueFrom(
                    this._transactionMovementService.updateStatusMoviment(
                        this.dimpsModel().map((el) => ({ movimentoId: el.id, statusId: EStatusMovement.CLOSED, retificadora: this.retificadora }))
                    )
                )
                    .then((resp) => {
                        this._snackBar.open('Status atualizado com sucesso', 'Fechar', {
                            duration: 3000,
                            panelClass: ['snackbar-success'],
                        });
                    })
                    .catch((error) => {
                        if (error.status !== 200) {
                            this._snackBar.open('Erro ao atualizar status', 'Fechar', {
                                duration: 3000,
                                panelClass: ['snackbar-error'],
                            });
                        } else {
                            this._snackBar.open('Status atualizado com sucesso', 'Fechar', {
                                duration: 3000,
                                panelClass: ['snackbar-success'],
                            });
                        }
                    })
                    .finally(() => {
                        this.onCloseDrawer.emit();
                    });
            }
        });
    }
}
