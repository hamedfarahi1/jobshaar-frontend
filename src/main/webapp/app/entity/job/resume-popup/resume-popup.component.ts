import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-resume-popup',
  templateUrl: './resume-popup.component.html',
  styleUrls: ['./resume-popup.component.scss']
})
export class ResumePopupComponent implements OnInit {

  @Input() id?: number;
  constructor(private dialogRef: MatDialogRef<ResumePopupComponent>,
    private resumeService: ResumeService) { }
  ngOnInit(): void { }

  submit(url: string) {
    this.resumeService.addResume(url).subscribe(res => this.dialogRef.close(true), error => {
      console.log(error);
      this.dialogRef.close(false);
    })
  }

  close() {
    this.dialogRef.close(null);
  }
}
