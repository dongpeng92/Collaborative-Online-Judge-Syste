import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

// declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'Hk4NO2w8X6RFeZmAVN3HTGzVcPbzG7_e',
    domain: 'doonnoop.auth0.com',
    responseType: 'token id_token',
    audience: 'https://doonnoop.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid profile email metadata'
  });

  constructor(public router: Router, private http: HttpClient) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/problems']);
      } else if (err) {
        this.router.navigate(['/problems']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


  userProfile: any;
  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        localStorage.setItem('profile', JSON.stringify(profile));
      }
      cb(err, profile);
    });
  }

  public resetPassword(): void {
    let url: string = `https://doonnoop.auth0.com/dbconnections/change_password`;
    const headers = new HttpHeaders({'content-type': 'application/json'});
    let body = {
      client_id: 'Hk4NO2w8X6RFeZmAVN3HTGzVcPbzG7_e',
      email: this.userProfile.email,
      connection: 'Username-Password-Authentication'
    };

    this.http.post(url, body, {headers: headers, responseType: 'text'})
      .toPromise()
      .then((res) => {
        console.log(res);
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}


