import { Exercise } from './exercise.model';
import {Subject} from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService{

  constructor(private http: HttpClient){
  }
  exerciseStarted = new Subject<Exercise>();
  // private availableExcercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 1800, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  //   { id: 'jumping-jack', name: 'Jumping Jack', duration: 2500, calories: 8 }
  // ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises(): Observable<any>{
    return this.http.get<Exercise[]>('http://localhost:8080/exercises');
  }

  startExercise(selectedId: string){
    this.getAvailableExercises().subscribe(data => {
      const exerciseList = data;
      this.runningExercise = exerciseList.find(ex => ex.id === selectedId);
      this.exerciseStarted.next({...this.runningExercise});
    });
  }

  getRunningExercise(): Exercise{
    return {...this.runningExercise};
  }

  completeExercise(){
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseStarted.next(null);
  }

  cancelExercise(progress: number){
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      calories: this.runningExercise.duration * (progress / 100),
      duration: this.runningExercise.duration * (progress / 100),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseStarted.next(null);
  }

  getCompletedOrCancelledExercises(){
    return this.exercises.slice();
  }
}
