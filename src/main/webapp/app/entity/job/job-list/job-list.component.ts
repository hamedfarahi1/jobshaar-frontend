import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatPaginatorIntl } from '@angular/material';
import { IJob } from '@app/core/model/job/job.model';
import { JobService } from '@app/core/service/job/job-service';
import { UserRoleService } from '@app/core/service/user-role.service';
import { Optional } from '@app/core/typings/optional';
import { ResumeListComponent } from '@app/entity/resume/resume-list/resume-list.component';
import { JobKeyValue } from '@app/shared/shared-common/key-value/job-key-value';
import { getCustomPaginatorIntl } from '@app/shared/shared-common/paginator/custom-paginator';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: getCustomPaginatorIntl }],
})
export class JobListComponent implements OnInit {


  categoryTypeIndexSelected: number[] = [];
  cooperationTypeIndexSelected: number[] = [];
  requiredGenderTypeIndexSelected: number[] = [];

  tileId = -1;
  filterTemp: KeyValue<string, string>[] = [];
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

  totalCount: Optional<number>;
  loading: Optional<number>;
  isEmployer = false;
  public page = 0;
  jobs: IJob[] = [];
  constructor(
    private jobService: JobService,
    private userRoleService: UserRoleService,
    jobKeyValueService: JobKeyValue,
    private dialog: MatDialog
  ) {
    jobKeyValueService.getCategoryTypes().subscribe(res => this.jobKeyValues.push({ id: 0, title: 'دسته بندی', data: res }));
    jobKeyValueService.getCooperationTypes().subscribe(res => this.jobKeyValues.push({ id: 1, title: 'زمان', data: res }));
    jobKeyValueService.getRequiredGenders().subscribe(res => this.jobKeyValues.push({ id: 2, title: 'جنسیت', data: res }));
  }

  ngOnInit(): void {
    this.readPage({ pageIndex: 0 }, this.filterTemp);
  }

  readPage(event: any, filter: KeyValue<string, string>[] | any) {
    this.totalCount = undefined;
    this.jobs = [];
    this.page = event.pageIndex;
    this.userRoleService.isEmployerObv().subscribe(res => {
      if (res) {
        this.isEmployer = true;
        this.jobService.getEmployerJobs(this.page, 10).pipe(delay(1000)).subscribe(res => {
          const totalcount = res.headers.get('total-count');
          if (totalcount)
            this.totalCount = +totalcount;
          if (res.body)
            this.jobs = res.body
        }, error => { console.log(error); this.totalCount = 0 });
      }
      else {
        const filterResult: KeyValue<string, string>[] = [];
        if (filter[0] != undefined) {
          filter[0].value.length != 0 ? filterResult.push(filter[0]) : '';
          filter[1].value.length != 0 ? filterResult.push(filter[1]) : '';
          filter[2].value.length != 0 ? filterResult.push(filter[2]) : '';
        }
        this.jobService.getEmployeeJobs(this.page, 10, filterResult).pipe(delay(1000)).subscribe(res => {
          const totalcount = res.headers.get('total-count');
          if (totalcount)
            this.totalCount = +totalcount;
          if (res.body)
            this.jobs = res.body
        }, error => { console.log(error); this.totalCount = 0 });
      }

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

  openTile(id: number) {
    if (this.tileId == id) {
      this.tileId = -1
      return
    }
    this.tileId = id;
  }

  showResumes(jobId: number) {
    const dialog = this.dialog.open(ResumeListComponent, { width: '500px', height: 'auto' });
    dialog.componentInstance.jobId = jobId;
  }
}

interface JobTypesObject {
  id: number;
  title: string,
  data: KeyValue<number, string>[];
}
