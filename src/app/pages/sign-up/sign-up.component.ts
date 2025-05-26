import { Component, inject } from '@angular/core';
import { AuthComponent } from '../../layout/auth/auth.component';
import { SingUpService } from './signup.service';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [AuthComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private signupFormBuilder = inject(NonNullableFormBuilder);
  private signupService = inject(SingUpService);
  protected signupForm = this.signupFormBuilder.group(
    {
      userName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.signupService.matchValues(),
    }
  );
}
