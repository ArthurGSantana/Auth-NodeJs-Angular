import { SignPageComponent } from './templates/sign-page/sign-page.component';
import { MenuPageComponent } from './templates/menu-page/menu-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menuPage', component: MenuPageComponent},
  {path: 'sign', component: SignPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
