import { Routes } from "@angular/router";
import { InstitutionListComponent } from "./list/list.component";
import { InstitutionEditComponent } from "./edit/edit.component";

export const institutionRoutes: Routes = [
    {
        path: 'list',
        title: 'Instituição de Pagamento',
        component: InstitutionListComponent
    },
    {
        path: 'edit/:id',
        title: 'Edição de Instituição',
        component: InstitutionEditComponent,
        data: {
            isNew: false,
        },
    },
]
