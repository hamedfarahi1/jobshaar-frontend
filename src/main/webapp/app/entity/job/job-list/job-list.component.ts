import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { IJob } from '@app/core/model/job/job.model';
import { JobService } from '@app/core/service/job/job-service';
import { UserRoleService } from '@app/core/service/user-role.service';
import { JobKeyValue } from '@app/shared/shared-common/key-value/job-key-value';
import { getCustomPaginatorIntl } from '@app/shared/shared-common/paginator/custom-paginator';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: getCustomPaginatorIntl }]
})
export class JobListComponent implements OnInit {


  categoryTypeIndexSelected: number[] = [];
  cooperationTypeIndexSelected: number[] = [];
  requiredGenderTypeIndexSelected: number[] = [];

  filter: KeyValue<string, string>[] = [
    {
      key: 'categoryTypeIndex.in',
      value: ''
    },
    {
      key: 'cooperationTypeIndex.in',
      value: ''
    },
    {
      key: 'requiredGenderTypeIndex.in',
      value: ''
    }
  ];
  jobKeyValues: JobTypesObject[] = [];

  totalCount: number = 0;
  public page = 0;
  jobs: IJob[] = [];
  constructor(
    private jobService: JobService,
    private userRoleService: UserRoleService,
    jobKeyValueService: JobKeyValue
  ) {
    jobKeyValueService.getCategoryTypes().subscribe(res => this.jobKeyValues.push({ id: 0, title: 'دسته بندی', data: res }));
    jobKeyValueService.getCooperationTypes().subscribe(res => this.jobKeyValues.push({ id: 1, title: 'زمان', data: res }));
    jobKeyValueService.getRequiredGenders().subscribe(res => this.jobKeyValues.push({ id: 2, title: 'جنسیت', data: res }));
  }

  ngOnInit(): void {
    this.userRoleService.isEmployerObv().subscribe(res => {
      if (res)
        this.jobService.getEmployerJobs().subscribe(res => this.jobs = res, error => console.log(error));
      else
        this.jobService.getEmployeeJobs(0, 10, []).subscribe(res => {
          const totalcount = res.headers.get('total-count');
          if (totalcount)
            this.totalCount = +totalcount;
          if (res.body)
            this.jobs = res.body
        }, () => console.log('error'));
    })
  }

  readPage(event: any, filter: KeyValue<string, string>[]) {
    this.page = event.pageIndex;
    this.userRoleService.isEmployerObv().subscribe(res => {
      if (res)
        this.jobService.getEmployerJobs().subscribe(res => this.jobs = res, error => console.log(error));
      else
        this.jobService.getEmployeeJobs(this.page, 10, filter).subscribe(res => {
          const totalcount = res.headers.get('total-count');
          if (totalcount)
            this.totalCount = +totalcount;
          if (res.body)
            this.jobs = res.body
        }, () => console.log('error'));
    })
  }

  charAt_0(id: number) {
    return id % 5 + 1;
  }

  onChangeFilter(event: any, id: number, key: number) {
    if (event.checked)
      switch (id) {
        case 0: {
          this.categoryTypeIndexSelected.push(key);
          break;
        }

        case 1: {
          this.cooperationTypeIndexSelected.push(key);
          break;
        }
        case 2: {
          this.requiredGenderTypeIndexSelected.push(key);
          break;
        }
      }
    else
      switch (id) {
        case 0: {
          const index = this.categoryTypeIndexSelected.indexOf(key, 0);
          if (index > -1) {
            this.categoryTypeIndexSelected.splice(index, 1);
          }
          break;
        }

        case 1: {
          const index = this.cooperationTypeIndexSelected.indexOf(key, 0);
          if (index > -1) {
            this.cooperationTypeIndexSelected.splice(index, 1);
          }
          break;
        }
        case 2: {
          const index = this.requiredGenderTypeIndexSelected.indexOf(key, 0);
          if (index > -1) {
            this.requiredGenderTypeIndexSelected.splice(index, 1);
          }
          break;
        }
      }
    this.filter[0].value = this.categoryTypeIndexSelected.toString();
    this.filter[1].value = this.cooperationTypeIndexSelected.toString();
    this.filter[2].value = this.requiredGenderTypeIndexSelected.toString();
    this.readPage({ pageIndex: 0 }, this.filter);
  }
}

interface JobTypesObject {
  id: number;
  title: string,
  data: KeyValue<number, string>[];
}
