import { Component } from '@angular/core';
import { AuthComponent } from '../../layout/auth/auth.component';

@Component({
  selector: 'app-sign-up',
  imports: [AuthComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {}
