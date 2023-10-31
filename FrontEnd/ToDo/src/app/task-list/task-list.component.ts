import { Component,Input,OnInit } from '@angular/core';
import { TaskDetails } from '../task-details';
import { TaskListService } from './services/task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  // al iniciar el componente
  ngOnInit(): void {
    console.log(this.results)
    //mostrar todas las tareas al iniciar la aplicacion    <--------------
    this.showAll()
  }
  @Input() Tasks:TaskDetails[]=[];
  results:TaskDetails[]=[];
  showInputSearchField:boolean=true;
  showInputAddField: boolean=false;  
  //declaracion de inputs para limpiarlos
  newTaskInput: string="";
  taskDescriptionInput: string="";
  toDateInput: string="";
  //mensages al usuario para cada accion
  messageAdd: [boolean,string]=[false,""];
  messageSearch:[boolean,string]=[false,""];
  constructor(private taskListService: TaskListService){}
  //mostrar o no mostrat el campo input searhTask
  toggleSearchField(){
    this.showInputSearchField=!this.showInputSearchField;
    this.showInputAddField=false;
  }
  //mostrar o no mostrat el campo input addTask
  toggleAddField(){
    this.showInputAddField=!this.showInputAddField;
    this.showInputSearchField=false;
  }
  
  searchTask(searchText: string){
    if(!searchText) 
      return ;

    this.taskListService.sendData({search:searchText.toLowerCase()})
    .subscribe((response)=>{
      if(response!==null)
        this.results=[this.jsonToObject<TaskDetails>(response)];//this.results=response  
      if(response==null){
        this.messageSearch=[true,"No coincidence..."];
        this.results=[];
      }else
        this.messageSearch=[false,""];
    });
  }
  showAll(){
    this.taskListService.sendData({showAll:null})
    .subscribe((response)=>{
      if(response!==null){
        this.results=response
        console.log(this.results)
      }
      if(response==null){
        this.messageSearch=[true,"There's nothing to show..."];
        this.results=[];
      }else
        this.messageSearch=[false,""];
    });
  }
  addTask(taskName: string,taskDescription: string,toDate: string){
    console.log("Tarea a agregar: "+taskName+" descripcion: "+taskDescription)
    if(!taskName || !taskDescription || !toDate){
      this.messageAdd=[true,"please fill out all required fields..."];
      return ;
    }     
    this.taskListService.sendData({
      name: taskName,
      description: taskDescription,
      taskDate: toDate
    }).subscribe((response)=>{
      console.log("respuesa en add: ",response);
    });    
    //limpiar inputs
    this.newTaskInput=""
    this.taskDescriptionInput=""
    this.toDateInput=""

    this.messageAdd=[true,"Data has been entered correctly"]    
  }
  //convierte json en el tipo T (generico) siempre y cunado coincidan
  jsonToObject<T>(jsonData: any): T {
    return jsonData as T;
  }
}