import { Component, inject } from '@angular/core';
import { AuthComponent } from '../../layout/auth/auth.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignInService } from './singin.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AuthComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  protected ErrorMessage: string = '';
  protected CodeStatus: number = 0;
  title = 'Sign In';
  private formService = inject(NonNullableFormBuilder);

  protected signForm = this.formService.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  private signInService = inject(SignInService);

  protected submit() {
    this.ErrorMessage = '';
    const loginData = {
      email: this.signForm.controls.email.value,
      password: this.signForm.controls.password.value,
    };
    this.signInService.userSingIn(loginData).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.signInService.navigateToHome();
        }
      },
      error: (error) => {
        if (!error.ok) {
          this.ErrorMessage = error.error.message;
        }
      },
    });
  }
}
