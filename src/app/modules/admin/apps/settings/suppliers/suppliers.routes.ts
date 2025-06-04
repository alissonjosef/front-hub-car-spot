import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";

export const SuppliersRoutes: Routes = [
    {
        path: 'list',
        title: 'Fornecedores',
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
]
