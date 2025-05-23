import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";

export const establishmentsRoutes: Routes = [
    {
           path: 'list',
           title: 'Estabelicmentos',
           component: ListComponent,
       }
]
