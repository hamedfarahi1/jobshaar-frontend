import { KeyValue } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJob } from '@app/core/model/job/job.model';
import { createRequestOption } from '@app/core/util/request-util';
import { QueryParam } from '@app/shared/configs/interfaces.config';
import { Observable, of } from 'rxjs';
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

  getJob(id: number): Observable<IJob> {
    const job: IJob = {
      id: 24,
      categoryTypeIndex: 0,
      cooperationTypeIndex: 1,
      requiredGenderTypeIndex: 2,
      description: `<h4 class="o-box__title">&#1588;&#1585;&#1581; &#1605;&#1608;&#1602;&#1593;&#1740;&#1578; &#1588;&#1594;&#1604;&#1740;</h4><div class="o-box__text s-jobDesc "><div>- &#1591;&#1585;&#1575;&#1581;&#1740; &#1608; &#1578;&#1608;&#1587;&#1593;&#1607; &#1585;&#1575;&#1576;&#1591; &#1607;&#1575;&#1740; &#1705;&#1575;&#1585;&#1576;&#1585;&#1740; &#1580;&#1583;&#1740;&#1583; &#1576;&#1585;&#1575;&#1740; &#1587;&#1740;&#1587;&#1578;&#1605; &#1607;&#1575;&#1740; &#1662;&#1740;&#1670;&#1740;&#1583;&#1607; &#1705;&#1606;&#1608;&#1606;&#1740;<br></div></div>`,
      company: {
        id: 2,
        name: "عباس علی",
        categoryTypeIndex: 0,
        bio: "عباس علیعباس علیعباس علی",
        address: "عباس علیعباس علیعباس علی"
      }
    }
    return of(job);
  }
}


