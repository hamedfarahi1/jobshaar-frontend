import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../model/employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getEmployee(): Observable<IEmployee> {
    return this.http.get<IEmployee>('api/employee');
  }
}
