import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditComponent } from "./edit/edit.component";

export const SellVehicleRoutes: Routes = [
    {
        path: 'list',
        title: 'Compra de Veículos',
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
