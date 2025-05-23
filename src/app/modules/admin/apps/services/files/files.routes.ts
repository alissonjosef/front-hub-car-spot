import { Routes } from '@angular/router';
import { FilesComponent } from './files.component';
import { FileTransactionsComponent } from './pages/file-transactions/file-transactions.component';
import { FileListComponent } from './pages/list/list.component';

export const filesRoutes: Routes = [
    {
        path: '',
        component: FilesComponent,
        children: [
            {
                path: '',
                component: FileListComponent,
                title: 'Arquivos enviados',
            },
            {
                path: 'file-transactions/:id',
                component: FileTransactionsComponent,
                title: 'Transações de arquivo',
            },
        ],
    },
];
