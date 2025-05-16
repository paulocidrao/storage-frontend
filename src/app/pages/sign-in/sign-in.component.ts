import { Component, inject } from '@angular/core';
import { AuthComponent } from '../../layout/auth/auth.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AuthComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  title = 'Sign In';
  private formService = inject(NonNullableFormBuilder);

  protected signForm = this.formService.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected submit() {
    const loginData = {
      email: this.signForm.controls.email.value,
      password: this.signForm.controls.password.value,
    };
  }
}
