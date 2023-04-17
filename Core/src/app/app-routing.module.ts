import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemsComponent } from './components/items/items.component';
import { OrderComponent } from './components/order/order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { EmployeeItemsComponent } from './components/employee-items/employee-items.component';
import { EmployeeCategoriesComponent } from './components/employee-categories/employee-categories.component';
import { EmployeeOffersComponent } from './components/employee-offers/employee-offers.component';
import { AuthGuard } from './guards/auth.guard';
// import { OrderTrackingComponent } from './order-tracking/order-tracking.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item-details', component: ItemDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]  },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard]  },
  { path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard]},
  { path: 'addusers', component: AddUsersComponent, canActivate: [AuthGuard]},
  { path: 'listofitems', component: EmployeeItemsComponent, canActivate: [AuthGuard]},
  { path: 'listofcategories', component: EmployeeCategoriesComponent, canActivate: [AuthGuard]},
  { path: 'listofoffers', component: EmployeeOffersComponent, canActivate: [AuthGuard]},

  // { path: 'track', component: OrderTrackingComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
