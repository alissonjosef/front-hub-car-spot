import { Routes } from "@angular/router";
import { RepresentativesComponent } from "./representatives/representatives.component";
import { RegistrationsComponent } from "./registrations.component";
import { InstitutionComponent } from "./institution/institution.component";
import { UserManagementListComponent } from "./user/user-management.component";

export const registrationsRoutes: Routes = [
    {
        path: '',
        component: RegistrationsComponent,
         children: [
            {
                path: 'representatives',
                component: RepresentativesComponent,
                loadChildren: () => import('./representatives/representatives.routes').then((m) => m.representativesRoutes),
            },
             {
                path: 'institution',
                component: InstitutionComponent,
                loadChildren: () => import('./institution/institution.routes').then((m) => m.institutionRoutes),
            },
             {
                path: 'user-management',
                component: UserManagementListComponent,
                loadChildren: () => import('./user/user-management.routes').then((m) => m.userManagementRoutes),
            },

        ],
    }
]
