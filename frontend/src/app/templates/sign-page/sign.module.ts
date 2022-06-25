import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './../../app-routing.module';
import { MaterialModule } from './../../material.module';
import { SignPageComponent } from './sign-page.component';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SignPageComponent
  ],
  exports: []
})
export class SignModule { }
