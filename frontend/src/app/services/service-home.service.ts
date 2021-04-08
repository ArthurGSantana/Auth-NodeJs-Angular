import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ServiceHomeService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnack(type: string): void {
    this._snackBar.open(`${type} incorrect!`, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'my-snack-bar'
    })
  }

  loginValidation(name: string, email: string, age: number ): boolean{
    if(name===''){
      this.openSnack('Name');
      return false;
    }

    if(email===''){
      this.openSnack('E-mail');
      return false;
    }

    if(age===null){
      this.openSnack('Age');
      return false;
    }
    return true
  }

}
