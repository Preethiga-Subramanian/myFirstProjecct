import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id: any;
  item: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoSub = new BehaviorSubject<Todo[]>([]);
  readonly todoObs = this.todoSub.asObservable();

  private todos:Todo[] = [];
  private nextId  = 0;
  constructor() { }

  loadAllValues(){
    this.todos = [];
    this.todoSub.next(this.todos);
  }

  createTodoItem(item:Todo){
    item.id = ++this.nextId;
    this.todos.push(item);
    this.todoSub.next(Object.assign([],this.todos));
  }

  removeTodoItem(id:number){
    this.todos.forEach((ele,i) => {
      if(ele.id === id){
        this.todos.splice(i,1);
      }
      this.todoSub.next(Object.assign([],this.todos));
    })
  }
}
