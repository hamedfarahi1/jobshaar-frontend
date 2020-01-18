import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserIdentity } from './user-indentity.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(private http: HttpClient) { }

  get(): Observable<HttpResponse<IUserIdentity>> {
    return this.http.get<IUserIdentity>('api/account', {
      observe: 'response'
    });
  }
}
