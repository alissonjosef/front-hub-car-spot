import { Routes } from "@angular/router";
import { UserListComponent } from "./list/list.component";
import { UserEditComponent } from "./edit/edit.component";

export const userManagementRoutes: Routes = [
    {
        path: 'list',
        title: 'Usuários',
        component: UserListComponent
    },
    {
        path: 'edit/:login',
        title: 'Editar usuários',
        component: UserEditComponent,
        data:{
            isNew: false,
        },
    }
]
