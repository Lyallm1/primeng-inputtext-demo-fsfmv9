/** Angular Modules */
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** User-defined */
import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { LogicalTopologyComponent } from './components/logical-topology/logical-topology.component';
import { EquipmentDictionaryComponent } from './components/equipment-dictionary/equipment-dictionary.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/** PrimeNG Modules */
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule( {
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    SideBarComponent,
    LogicalTopologyComponent,
    EquipmentDictionaryComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    FormsModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
} )
export class AppModule { }
