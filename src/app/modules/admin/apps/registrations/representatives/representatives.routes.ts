import { Routes } from "@angular/router";
import { RepresentativesListComponent } from "./list/list.component";
import { RepresentativesEditComponent } from "./edit/edit.component";

export const representativesRoutes: Routes = [
    {
        path: 'list',
        title: 'Responsáveis e Representantes',
        component: RepresentativesListComponent
    },
    {
        path: 'edit/:id',
        title: 'Editar',
        component: RepresentativesEditComponent,
        data: {
            new: false,
        }
    }
]
