import { Routes } from "@angular/router";
import { AdministrativeComponent } from "./administrative.component";
import { BuyVehicleComponent } from "./buy-vehicle/buy-vehicle.component";
import { SellVehicleComponent } from "./sell-vehicle/sell-vehicle.component";
import { VehicleComponent } from "./vehicle/vehicle.component";

export const AdministrativeRoutes: Routes = [
    {
        path: '',
        component: AdministrativeComponent,
         children: [
            {
                path: 'buy-vehicle',
                component: BuyVehicleComponent,
                loadChildren: () => import('./buy-vehicle/buy-vehicle.routes').then((m) => m.BuyVehicleRoutes),
            },
            {
                path: 'vehicle',
                component: VehicleComponent,
                loadChildren: () => import('./vehicle/vehicle.routes').then((m) => m.VehicleRoutes),
            },
            {
                path: 'sell-vehicle',
                component: SellVehicleComponent,
                loadChildren: () => import('./sell-vehicle/sell-vehicle.routes').then((m) => m.SellVehicleRoutes),
            },
            {
                path: 'exchange-vehicle',
                component: SellVehicleComponent,
                loadChildren: () => import('./exchange-vehicle/exchange-vehicle.routes').then((m) => m.ExchangeVehicleRoutes),
            },
           
          
        ],
    }
]
