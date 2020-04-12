import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthService{
  authenticated = false;
   httpOptions: { headers: HttpHeaders; observe: any; } = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    observe: 'response'
  };
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
    const myAuthData = JSON.stringify(authData);
    this.http.post('http://localhost:8080/signup', myAuthData , this.httpOptions)
    .subscribe((res: HttpResponse<any>) => {
      if (res.status === 200){
        console.log(res.body);
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
    const authString = 'Basic ' + btoa(authData.email + ':' + authData.password);
    const headers = new HttpHeaders(authData ? {
      authorization : authString
  } : {});
    this.http.get('http://localhost:8080/user', {headers})
    .subscribe(response => {
      if (response['name']){
        sessionStorage.setItem('name', response['name']);
        sessionStorage.setItem('authString', authString);
        this.authenticated = true;
        console.log(response);
        this.postAuth();
      }else{
        this.authenticated = false;
      }
    });
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
