import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthService{
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router, private http: HttpClient){}

  registerUser(authData: AuthData){
    this.user = {
      email: authData.email,
      userId: 'djfkdjfk',
      password: authData.password
    };
    // create http options
    const httpOptions: { headers: HttpHeaders; observe: any; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };
    const myAuthData = JSON.stringify(authData);
    this.http.post('http://localhost:8080/signup', myAuthData , httpOptions)
    .subscribe((res: HttpResponse<any>) => {
      if (res.status === 200){
        this.postAuth();
      }
    });
  }

  private postAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(authData: AuthData){
    this.user = {
      email: authData.email,
      password: authData.password
    };
    this.postAuth();
  }
  logout(){
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(){
    return { ...this.user };
  }

  isAuth(){
    return this.user != null;
  }

}
