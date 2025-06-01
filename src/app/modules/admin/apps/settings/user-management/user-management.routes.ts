import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";
import { NewComponent } from "./new/new.component";

export const UserManagementRoutes: Routes = [
    {
        path: 'list',
        title: 'Gerenciamento de Usuários',
        component: ListComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar',
        component: EditComponent,
        data: {
            new: false,
        }
    },
    {
        path: 'new',
        title: 'Novo',
        component: NewComponent,
        data: {
            new: true,
        }
    }
]
