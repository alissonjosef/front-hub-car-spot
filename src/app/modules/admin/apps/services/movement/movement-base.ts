import { inject, signal } from '@angular/core';
import { Table } from '@util/table';
import { MovementComponent } from './movement.component';

export class MovementBase extends Table {
    public movementComponent = inject(MovementComponent);

    toggleDrawerReg() {
        this.movementComponent.toggleDrawer();
    }

    errorTypes = {
        error: {
            message: 'Houve um erro ao carregar os dados',
            icon: 'heroicons_outline:exclamation-circle',
            alertType: 'error',
        },
        notFound: {
            message: 'Nenhum resultado encontrado para a busca realizada.',
            icon: 'mat_outline:search_off',
            alertType: 'primary',
        },
    };

    eType = signal<'notFound' | 'error'>('notFound');

}
