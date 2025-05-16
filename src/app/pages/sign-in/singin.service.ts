import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SignInRequest, SignInResponse } from './SingIn.model';
@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private url = environment.api;

  constructor(private http: HttpClient, private router: Router) {}

  userSingIn(data: SignInRequest) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<SignInResponse>(
      `${this.url}/user/login`,
      data,
      header
    );
  }
  navigateToHome() {
    console.log('Chamou!');
    this.router.navigate(['home']);
  }
}
