import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResume } from '@app/core/model/resume/resume.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient) { }

  addResume(resume: IResume) {
    return this.http.post('api/resume/employee', { url: resume.url })
  }

  updateResume(resume: IResume) {
    return this.http.put('api/resume/employee', { url: resume.url })
  }

  getResume(): Observable<IResume> {
    return this.http.get('api/employee/resume')
  }

  sendResume(jobId: number) {
    const option = { responseType: 'text' as 'text' };
    return this.http.post(`api/employee/apply-job?jobId=${jobId}`, null, option);
  }
}
