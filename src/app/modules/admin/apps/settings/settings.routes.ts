import { Routes } from "@angular/router";;
import { SettingsComponent } from "./settings.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { StatusDocumentsComponent } from "./status-documents/status-documents.component";
import { FeesComponent } from "./fees/fees.component";
import { BrandsComponent } from "./brands/brands.component";
import { FinancialComponent } from "./financial/financial.component";

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
            {
                path: 'suppliers',
                component: SuppliersComponent,
                loadChildren: () => import('./suppliers/suppliers.routes').then((m) => m.SuppliersRoutes),
            },
            {
                path: 'status-documents',
                component: StatusDocumentsComponent,
                loadChildren: () => import('./status-documents/status-documents.routes').then((m) => m.StatusDocumentsRoutes),
            },
            {
                path: 'fees',
                component: FeesComponent,
                loadChildren: () => import('./fees/fees.routes').then((m) => m.FeesRoutes),
            },
            {
                path: 'places',
                component: FeesComponent,
                loadChildren: () => import('./places/places.routes').then((m) => m.PlacesRoutes),
            },
            {
                path: 'financial',
                component: FinancialComponent,
                loadChildren: () => import('./financial/financial.routes').then((m) => m.FinancialRoutes),
            },
            {
                path: 'brands',
                component: BrandsComponent,
                loadChildren: () => import('./brands/brands.routes').then((m) => m.BrandsRoutes),
            },
            {
                path: 'branches',
                component: BrandsComponent,
                loadChildren: () => import('./branches/branches.routes').then((m) => m.BranchesRoutes),
            },
          
        ],
    }
]
