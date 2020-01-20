import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResume } from '@app/core/model/resume/resume.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient) { }

  addResume(resume: IResume) {
    // return this.http.post('api/resume/employee', { url: url })
    console.log(resume);
    return of(true);
  }

  updateResume(url: string) {
    return this.http.put('api/resume/employee', { url: url })
  }

  getResume(): Observable<IResume> {
    return of<IResume>({
      url: 'http://picofile.com/ERGeherhERERHehEHERheEHeTHrtjukyikyumGNR'
    })
    // return this.http.get('api/resume/employee')
  }

  sendResume(jobId: number) {
    console.log(jobId);
    return of(true);
    // return this.http.post(`api/resume/employee?${jobId}`, {})
  }
}
