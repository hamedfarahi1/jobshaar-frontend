import { Component, Input, OnInit } from '@angular/core';
import { ResumeService } from '@app/core/service/resume/resume.service';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent implements OnInit {

  @Input() jobId: number = -1
  data = [];
  col: string[] = ['url', 'index'];
  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    if (this.jobId != -1)
      this.resumeService.getJobResumes(this.jobId).subscribe(res => this.data = res)
  }
}
