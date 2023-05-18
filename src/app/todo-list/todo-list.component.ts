import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo,TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todoObs:Observable<Todo[]> | undefined;

  constructor(private todoService:TodoService){}

  ngOnInit(){
    this.todoObs = this.todoService.todoObs;
    console.log(this.todoObs);
  }

  deleteTodoItem(todoId:number){
    this.todoService.removeTodoItem(todoId);
  }

}
