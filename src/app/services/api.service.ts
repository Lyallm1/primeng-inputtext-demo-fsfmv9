import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';


interface AuthLoginResponse {
  success : boolean;
  username : string;
}

interface AuthRolesResponse extends AuthLoginResponse {
  roles : string[];
}


@Injectable( {
  providedIn: 'root'
} )
export class ApiService {
  constructor( private httpClient : HttpClient ) {}

  public getLoggedIn() : Observable<AuthLoginResponse> {
    return this.httpClient.get<AuthLoginResponse>( '/auth/isLoggedIn', { withCredentials: true } );
  }

  public getRoles() : Observable<AuthRolesResponse> {
    return this.httpClient.get<AuthRolesResponse>( '/auth/getRoles', { withCredentials: true } );
  }

  public login() : void {}

  public basicLogIn( user : UserModel ) : Observable<AuthLoginResponse> {
    const headers = { authorization: `Basic ${ btoa( `${user.username}:${user.password}` )}`,
      'content-Type': 'text/plain',
      withCredentials: 'true',
      responseType: 'json' };
    const options = { headers };
    const body = btoa( `${user.username}:${user.password}` );
    return this.httpClient.post<AuthLoginResponse>( '/auth/login', body, options );
  }
}
