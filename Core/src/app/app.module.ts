import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { PopularItemsComponent } from './components/popular-items/popular-items.component';
import { HomeComponent } from './components/home/home.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OpenItemsDirective } from './directives/open-items.directive';
import { OpenItemDetailsDirective } from './directives/open-item-details.directive';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { JwtService } from './services/jwt-service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { EmployeeItemsComponent } from './components/employee-items/employee-items.component';
import { EmployeeCategoriesComponent } from './components/employee-categories/employee-categories.component';
import { EmployeeOffersComponent } from './components/employee-offers/employee-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    PopularItemsComponent,
    HomeComponent,
    ItemsComponent,
    ItemDetailsComponent,
    CartComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    OpenItemsDirective,
    OpenItemDetailsDirective,
    RegisterComponent,
    LoginComponent,
    OrderTrackingComponent,
    AdminUsersComponent,
    AddUsersComponent,
    EmployeeItemsComponent,
    EmployeeCategoriesComponent,
    EmployeeOffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        allowedDomains: ['localhost:7275'],
      },
    }),
  ],
  providers: [JwtService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
