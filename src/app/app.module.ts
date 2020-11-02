import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MonetizePipe } from './pipes/monetize.pipe';
import { MatSelectModule } from '@angular/material/select';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

// ICONS
import { fas } from '@fortawesome/free-solid-svg-icons';

import { far } from '@fortawesome/free-regular-svg-icons';

import {
  faFacebook,
  faInstagram,
  faGoogle,
  fab,
} from '@fortawesome/free-brands-svg-icons';
import { ProductItemGenericComponent } from './components/product-item-generic/product-item-generic.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserMenuOverlayComponent } from './components/user-menu-overlay/user-menu-overlay.component';
import { CartMenuOverlayComponent } from './components/cart-menu-overlay/cart-menu-overlay.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { PaymentStepperComponent } from './components/payment-stepper/payment-stepper.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CategoriesMenuOverlayComponent } from './components/categories-menu-overlay/categories-menu-overlay.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent, 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { path: 'login', component: LoginComponent,  
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedInToItems } 
  },
  { path: 'register', component: RegisterComponent,     
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedInToItems }  
  } 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    ProductItemGenericComponent,
    LoginComponent,
    RegisterComponent,
    UserMenuOverlayComponent,
    MonetizePipe,
    CartMenuOverlayComponent,
    CartItemComponent,
    PaymentStepperComponent,
    OrderSuccessComponent,
    CategoriesMenuOverlayComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatStepperModule,
    MatDialogModule,
    MatRadioModule,
    MatAutocompleteModule,
    FontAwesomeModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
    library.addIcons(faFacebook, faGoogle, faInstagram);
  }
}
