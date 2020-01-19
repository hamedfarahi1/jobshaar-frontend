import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient) { }

  addResume(url: string) {
    return this.http.post('api/resume/employee', { url: url })
  }

  updateResume(url: string) {
    return this.http.put('api/resume/employee', { url: url })
  }
}
