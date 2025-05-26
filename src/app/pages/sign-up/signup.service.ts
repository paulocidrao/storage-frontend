import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SingUpService {
  matchValues(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get('password');
      const confirmPasswordControl = control.get('confirmPassword');

      if (
        passwordControl &&
        confirmPasswordControl &&
        passwordControl.value !== confirmPasswordControl.value
      ) {
        return { valuesDoNotMatch: true };
      }
      return null;
    };
  }
}
