import { Component, OnInit } from '@angular/core';
import { faCoffee, faRocket } from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {

  hide: boolean = true;

  faCoffee = faCoffee;

  constructor(private library: FaIconLibrary) {
    library.addIcons(faCoffee, faRocket);
   }

  ngOnInit(): void {
  }

}
