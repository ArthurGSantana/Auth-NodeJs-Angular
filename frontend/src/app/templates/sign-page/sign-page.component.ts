import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {

  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
