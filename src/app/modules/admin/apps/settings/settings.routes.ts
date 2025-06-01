import { Routes } from "@angular/router";;
import { SettingsComponent } from "./settings.component";
import { UserManagementComponent } from "./user-management/user-management.component";

export const settingsRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent,
         children: [
            {
                path: 'user-management',
                component: UserManagementComponent,
                loadChildren: () => import('./user-management/user-management.routes').then((m) => m.UserManagementRoutes),
            },
          
        ],
    }
]
