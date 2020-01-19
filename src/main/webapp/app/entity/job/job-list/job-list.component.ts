import { animate, state, style, transition, trigger } from '@angular/animations';
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatPaginatorIntl } from '@angular/material';
import { IJob } from '@app/core/model/job/job.model';
import { JobService } from '@app/core/service/job/job-service';
import { UserRoleService } from '@app/core/service/user-role.service';
import { Optional } from '@app/core/typings/optional';
import { JobKeyValue } from '@app/shared/shared-common/key-value/job-key-value';
import { getCustomPaginatorIntl } from '@app/shared/shared-common/paginator/custom-paginator';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { ResumePopupComponent } from '../resume-popup/resume-popup.component';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: getCustomPaginatorIntl }],
  animations: [
    trigger('openDescription', [
      state('open', style({
        visibility: 'visible',
        width: '90%',
        backgroundColor: '#f4f4f4',
        height: '65%',
        margin: 'auto',
        paddingRight: '12px'
      })),
      state('close', style({
        backgroundColor: 'gray',
        visibility: 'hidden',
        width: '90%',
        borderRadius: '20%',
        height: '0px',
        margin: 'auto'
      })),
      transition('open => close', [
        animate('0.5s')
      ]),
      transition('close => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class JobListComponent implements OnInit {


  categoryTypeIndexSelected: number[] = [];
  cooperationTypeIndexSelected: number[] = [];
  requiredGenderTypeIndexSelected: number[] = [];

  tileId = -1;
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
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    jobKeyValueService.getCategoryTypes().subscribe(res => this.jobKeyValues.push({ id: 0, title: 'دسته بندی', data: res }));
    jobKeyValueService.getCooperationTypes().subscribe(res => this.jobKeyValues.push({ id: 1, title: 'زمان', data: res }));
    jobKeyValueService.getRequiredGenders().subscribe(res => this.jobKeyValues.push({ id: 2, title: 'جنسیت', data: res }));
  }

  ngOnInit(): void {
    this.readPage(0, []);
  }

  readPage(event: any, filter: KeyValue<string, string>[]) {
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
        }, error => console.log(error));
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
        }, () => console.log('error'));
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

  openResumeDialog(event: any, employeeId: number) {
    event.stopPropagation();
    const dialog = this.dialog.open(ResumePopupComponent, {
      width: '600px',
      height: '400px'
    });
    dialog.componentInstance.id = employeeId;
    dialog.afterClosed().subscribe(res => {
      if (res == null)
        this.toastr.info('ثبت رزومه لغو شد', 'ثبت رزومه')
      else if (res)
        this.toastr.success('رزومه ی شما با موفقیت ثبت شد', 'ثبت رزومه');
      else
        this.toastr.error('خطا در ااتصال به سرور', 'ثبت رزومه');
    });
  }
}

interface JobTypesObject {
  id: number;
  title: string,
  data: KeyValue<number, string>[];
}
