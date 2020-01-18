import { KeyValue } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJob } from '@app/core/model/job/job.model';
import { createRequestOption } from '@app/core/util/request-util';
import { QueryParam } from '@app/shared/configs/interfaces.config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private http: HttpClient) { }
  add(job: IJob) {
    return this.http.post('api/jobs', job);
  }

  getEmployerJobs(pageIndex: number, pageSize: number) {
    const query = <QueryParam>{
      page: pageIndex,
      size: pageSize
    }
    const param = createRequestOption(query);
    return this.http.get<IJob[]>('api/jobs/employer', { params: param, observe: 'response' });
  }
  getEmployeeJobs(pageIndex: number, pageSize: number, filter: KeyValue<string, string>[]): Observable<HttpResponse<IJob[]>> {
    const query = <QueryParam>{
      page: pageIndex,
      size: pageSize,
      filter: filter
    }
    const param = createRequestOption(query);
    return this.http.get<IJob[]>(`api/jobs/employee`, { params: param, observe: 'response' });
  }
}
