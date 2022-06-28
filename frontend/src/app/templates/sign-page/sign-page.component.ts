import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './../../shared/User.model';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {

  hidePass: boolean = true;
  hidePassConfirm: boolean = true;

  signForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createFormInstance();
  }

  createFormInstance(): void {
    this.signForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      birthDate: ['', Validators.required]
    })
  }

  submitForm(): void {
    const newUser: User = this.signForm.value;
    newUser.birthDate = this.signForm.get('birthDate')?.value.toISOString();
    
    
  }

}
