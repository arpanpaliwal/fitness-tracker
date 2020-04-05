import { Exercise } from './exercise.model';
import {Subject} from 'rxjs/Subject';

export class TrainingService{

  exerciseStarted = new Subject<Exercise>();
  private availableExcercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'jumping-jack', name: 'Jumping Jack', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise;

  getAvailableExercises(): Exercise[]{
    return this.availableExcercises.slice();
  }

  startExercise(selectedId: string){
    this.runningExercise = this.availableExcercises.find(ex => ex.id === selectedId);
    this.exerciseStarted.next({...this.runningExercise});
  }
}
