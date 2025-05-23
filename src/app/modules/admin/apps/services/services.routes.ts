import { Routes } from '@angular/router';
import { ServiceComponent } from './services.component';

export const serviceRoutes: Routes = [
    {
        path: '',
        component: ServiceComponent,
        children: [
            {
                path: 'files',
                loadChildren: () => import('./files/files.routes').then((m) => m.filesRoutes),
            },
            {
                path: 'movement',
                loadChildren: () => import('./movement/movement.routes').then((m) => m.movementRoutes),
            },
        ],
    },
];
