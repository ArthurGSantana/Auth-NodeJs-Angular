import { Router } from '@angular/router';
import { ServiceHomeService } from './../services/service-home.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
//import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private servHome: ServiceHomeService, private router: Router) {}

  conditionCard: boolean = false;
  conditionShip: boolean = false;

  ngOnInit(): void {
    this.conditionShip = true;
  }

  name: string = '';
  email: string = '';
  age: number = null!;

  click(): void {
    let img = document.querySelector('.target') as HTMLImageElement;
    //let card = document.querySelector('.card') as HTMLElement;
    img.className = 'bounceOutUp';
    setTimeout(() => {
      this.conditionShip = false;
      this.conditionCard = true;
    }, 2000);
  }

  login(): void {
    if(this.servHome.loginValidation(this.name, this.email, this.age)){
      this.router.navigate(['/menuPage'])
    }
  }

  sign(): void {
    this.router.navigate(['/sign']);
  }

}
