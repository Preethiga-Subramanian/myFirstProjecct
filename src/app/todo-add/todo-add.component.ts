import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent {
  todoObs:Observable<Todo[]> | undefined;
  todoForm:FormGroup;
  constructor(private todoService:TodoService,private formBuilder:FormBuilder){
    this.todoForm = this.formBuilder.group({
      id: [""],
      item: ["", Validators.required]
    });
  }

  ngOnInit(){
    this.todoObs = this.todoService.todoObs;
  }

  onSubmit(){
    this.todoService.createTodoItem(this.todoForm.value);
    console.log(this.todoForm.value);
    // if(this.todoForm.get("value") != null ){
    //   this.todoForm.get("value").setValue("");
    // }
  }

}
