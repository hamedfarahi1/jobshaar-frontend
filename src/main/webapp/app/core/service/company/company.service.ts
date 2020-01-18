import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../../model/company/company.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }
  add(company: Company) {
    console.log("Wefwegwq");
    return this.http.post('api/company', company);
  }
}
