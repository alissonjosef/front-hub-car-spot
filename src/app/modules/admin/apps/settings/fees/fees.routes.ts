import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";

export const FeesRoutes: Routes = [
    {
        path: 'list',
        title: 'Taxas',
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
