import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from './material.module';
import { MenuModule } from './templates/menu-page/menu.module';
import { SignModule } from './templates/sign-page/sign.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    MenuModule,
    SignModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
