import { Routes } from "@angular/router";

import { SearchComponent } from "./search.component";
import { EstablishmentsComponent } from "./establishment/establishments.component";

export const searchRoutes: Routes = [
    {
        path: '',
        component: SearchComponent,
         children: [
            {
                path: 'establishments',
                component: EstablishmentsComponent,
                loadChildren: () => import('./establishment/establishments.routes').then((m) => m.establishmentsRoutes),
            },

        ],
    }
]
