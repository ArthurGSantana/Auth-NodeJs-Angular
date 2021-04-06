import { Component, OnInit } from '@angular/core';
//import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() { }

  conditionCard: boolean = false;
  conditionShip: boolean = false;

  ngOnInit(): void {
    this.conditionShip = true
  }

  click(): void {
    let img = document.querySelector(".target") as HTMLImageElement;
    let card = document.querySelector('.card')as HTMLElement;
    img.className = 'bounceOutUp';
    setTimeout(() => {
      this.conditionShip = false
      this.conditionCard = true

    }, 2000);
  }
}
