import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {StopTrainingComponent} from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  dialog: MatDialog;
  @Output() trainingExit = new EventEmitter();

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
  }

  ngOnInit(): void {
   this.startOrResumeTimer();
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.trainingExit.emit();
      }else{
        this.startOrResumeTimer();
      }
    });
  }
  startOrResumeTimer(){
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100){
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
