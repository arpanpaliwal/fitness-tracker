import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exerciseList: Exercise[];
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseList = this.trainingService.getAvailableExercises();
  }
  onStartTraining(){
    console.log('on start training');
    this.trainingStart.emit();
  }
}
