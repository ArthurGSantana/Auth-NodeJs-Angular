import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../material.module';
import { SignPageComponent } from './sign-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    SignPageComponent
  ],
  exports: []
})
export class SignModule { }
