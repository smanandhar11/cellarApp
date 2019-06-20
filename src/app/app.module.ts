import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
// Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule,
  MatMenuModule, MatCheckboxModule, MatToolbarModule,
  MatFormFieldModule, MatExpansionModule, MatInputModule, MatGridListModule, MatSelectModule , MatOptionModule, MatRadioModule
} from '@angular/material';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
// angular-fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import {AuthService} from './services/auth.service';
import { PassComponent } from './comp/pass/pass.component';
import { DialogxComponent } from './comp/dialogx/dialogx.component';
import { WeatherComponent } from './comp/weather/weather.component';
import { FormsModule } from '@angular/forms';
import {ProditemService} from './services/proditem.service';
import { ProddisplayComponent } from './comp/proddisplay/proddisplay.component';
import {ProddisplayFilterPipe} from './shared/gallerize/pipes/proddisplay-filter.pipe';
import {ProddisplayPricefilterPipe} from './shared/gallerize/pipes/proddisplay-pricefilter.pipe';
import { ProddetailsComponent } from './comp/proddisplay/proddetails/proddetails.component';
import {ProddisplayColorfilterPipe} from './shared/gallerize/pipes/proddisplay-colorfilter.pipe';
import { LoginComponent } from './comp/login/login.component';
import { BillInfoComponent } from './comp/proddisplay/proddetails/bill-info/bill-info.component';
import {UserService} from './services/user.service';
import { WishlistComponent } from './shared/wishlist/wishlist.component';
import { CartComponent } from './shared/cart/cart.component';
import { GallerizeComponent } from './shared/gallerize/gallerize.component';
import {UserDataService} from './services/user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PassComponent,
    DialogxComponent,
    WeatherComponent,
    ProddisplayComponent,
    ProddisplayFilterPipe,
    ProddisplayPricefilterPipe,
    ProddisplayColorfilterPipe,
    ProddetailsComponent,
    LoginComponent,
    BillInfoComponent,
    WishlistComponent,
    CartComponent,
    GallerizeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, ProditemService, UserService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
