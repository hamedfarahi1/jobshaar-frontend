import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/core/auth/account.service';
import { IUserIdentity } from '@app/core/auth/user-indentity.model';
import { IResume } from '@app/core/model/resume/resume.model';
import { JobService } from '@app/core/service/job/job-service';
import { ResumeService } from '@app/core/service/resume/resume.service';
import { JobKeyValue } from '@app/shared/shared-common/key-value/job-key-value';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-crud',
  templateUrl: './job-crud.component.html',
  styleUrls: ['./job-crud.component.scss']
})
export class JobCrudComponent implements OnInit {


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: '300px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'شرح شغلی ...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [{
      name: 'IRANSans',
      class: 'IRANSans'
    }],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  requiredResume: boolean = false;
  editMode: boolean = true;
  selected: number[] = [0, 1, 2];
  categoryTypes: KeyValue<number, string>[] = [];
  cooperationTypes: KeyValue<number, string>[] = [];
  requiredGenders: KeyValue<number, string>[] = [];

  resume: IResume = { url: 'Url Not Found' }
  newResume = new FormGroup({
    url: new FormControl('', [Validators.required])
  })
  userDetail: IUserIdentity = {
    id: '',
    displayName: '',
    authorities: [],
    rpDisplayName: ''
  };
  jobForm = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    categoryTypeIndex: new FormControl('0', [
      Validators.required
    ]),
    cooperationTypeIndex: new FormControl('1', [
      Validators.required
    ]),
    requiredGenderTypeIndex: new FormControl('2', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators
        .minLength(200)
    ])
  })

  job: any = {}
  constructor(
    private jobKeyValues: JobKeyValue,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private resumeService: ResumeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.editMode = false;
        this.jobService.getJob(param.id).subscribe(res => {
          this.job = res;
        });
        this.resumeInit();
        this.accountService.get().subscribe(res => res.body ? this.userDetail = res.body : '', error => console.log(error));
      }
      else {
        this.jobKeyValues.getCategoryTypes().subscribe(
          res => this.categoryTypes = res
        )
        this.jobKeyValues.getCooperationTypes().subscribe(
          res => this.cooperationTypes = res
        )
        this.jobKeyValues.getRequiredGenders().subscribe(
          res => this.requiredGenders = res
        )
      }
    });
  }

  submit() {
    this.jobService.add(this.jobForm.value).subscribe(() => {
      this.router.navigate(['job', 'list']);
    }, error => console.log(error));
  }

  resumeInit() {
    this.requiredResume = false;
    this.resumeService.getResume().subscribe(res => {
      if (res !== null)
        this.resume = res
      else this.requiredResume = true;
    }, error => {
      this.requiredResume = true;
      console.log(error);
    })
  }

  sendResume() {
    if (this.requiredResume)
      this.resumeService.addResume(this.newResume.value).subscribe(res => {
        if (res) {
          this.toastr.info('رزومه ی شما با موفقیت ثبت شد', 'ثبت رزومه');
          this.resumeInit();
        }
      });
    else this.resumeService.sendResume(this.job.id).subscribe(() => {
      this.toastr.success('رزومه ی شما با موفقیت ارسال شد', 'ارسال رزومه');
    })
  }
}
