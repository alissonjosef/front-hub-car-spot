import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { MY_FORMATS } from '../../list/list.component';

@Component({
    selector: 'app-dimp-notification-request',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatCheckboxModule,
    ],
    providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ],
    templateUrl: './dimp-notification-request.component.html',
    styleUrl: './dimp-notification-request.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimpNotificationRequestComponent {
    _snackBar: MatSnackBar = inject(MatSnackBar);
    onCloseDrawer = output();

    formRequest = new FormGroup({
        start: new FormControl<Date | null>(moment().subtract(1, 'day').toDate()),
        end: new FormControl<Date | null>(new Date()),
        cnpj: new FormControl(''),
        taxProcedure: new FormControl(''),
    });

    constructor() {}

    ngOnInit() {}

    sendRequest(): void {
        if (this.formRequest.valid) {
            const requestData = this.formRequest.value;

            console.log('Dados da requisição:', requestData);

            this._snackBar.open('Solicitação enviada com sucesso!', 'Fechar', {
                duration: 3000,
                panelClass: ['snackbar-success'],
            });

            this.formRequest.reset({
                start: moment().subtract(1, 'day').toDate(),
                end: new Date(),
                cnpj: '',
                taxProcedure: '',
            });
        }
    }

    closeDrawer() {
        this.onCloseDrawer.emit();
    }
}
