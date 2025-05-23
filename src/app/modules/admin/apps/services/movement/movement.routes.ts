import { Routes } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { MovementComponent } from './movement.component';

export const movementRoutes: Routes = [
    {
        path: '',
        component: MovementComponent,
        title: 'Movimentos',
        children: [
            {
                path: '',
                component: EmptyComponent
            },
            {
                path: 'dimp',
                loadChildren: () => import('./dimp/dimp.routes').then((m) => m.dimpMovementRoutes),
            },
        ],
    },
];
