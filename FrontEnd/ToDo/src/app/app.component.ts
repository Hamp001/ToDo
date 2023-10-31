import { Component } from '@angular/core';
import { TaskDetails } from './task-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo';

  taskDetails: TaskDetails[]=[]


}
