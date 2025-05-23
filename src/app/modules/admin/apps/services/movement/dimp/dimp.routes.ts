import { Routes } from '@angular/router';
import { DimpDetailsComponent } from './details/details.component';
import { DimpMonthlyComponent } from './dimp-monthly/dimp-monthly.component';
import { DimpListComponent } from './list/list.component';

export const dimpMovementRoutes: Routes = [
    {
        path: '',
        component: DimpListComponent,
        title: 'Movimentos (DIMP)'
    },
    {
        path: 'monthly/:id',
        component: DimpMonthlyComponent,
        title: 'Movimento do mês (DIMP)',
    },
    {
        path: 'details/:id',
        component: DimpDetailsComponent,
        title: 'Detalhes',
    },
    {
        path: 'notification',
        loadChildren: () => import('./dimp-notification/dimp-notification.routes').then(m => m.dimpNoficationRoutes)
    }
];
