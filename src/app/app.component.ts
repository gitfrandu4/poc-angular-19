import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from './todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  standalone: true,
  providers: [TodoService], // Provide the TodoService
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Firebase Todo App';

  // Observable to get the list of todos
  // This will be used in the template to display the list of todos
  todos$: Observable<Todo[]>;
  todos: Todo[] = [];
  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }
  // addTodo(title: string) {
  //   const newTodo: Todo = { title, completed: false };
  //   this.todoService.addTodo(newTodo).then(() => {
  //     console.log('Todo added successfully');
  //   }).catch(error => {
  //     console.error('Error adding todo: ', error);
  //   });
  // }
  // deleteTodo(id: string) {
  //   this.todoService.deleteTodo(id).then(() => {
  //     console.log('Todo deleted successfully');
  //   }).catch(error => {
  //     console.error('Error deleting todo: ', error);
  //   });
  // }
  // toggleTodo(todo: Todo) {
  //   const updatedTodo: Todo = { ...todo, completed: !todo.completed };
  //   this.todoService.updateTodo(updatedTodo).then(() => {
  //     console.log('Todo updated successfully');
  //   }).catch(error => {
  //     console.error('Error updating todo: ', error);
  //   });
  // }
}
