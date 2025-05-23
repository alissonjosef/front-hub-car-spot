import { Routes } from '@angular/router';
import { DimpNotificationComponent } from './dimp-notification.component';
import { DimpNotificationListComponent } from './list/list.component';

export const dimpNoficationRoutes: Routes = [
    {
        path: '',
        title: 'Dimp notificação',
        component: DimpNotificationComponent,
        children: [
            {
                path: '',
                component: DimpNotificationListComponent,
            },
        ],
    },
];
