import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from './todo.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    RouterOutlet,
    FormsModule
  ],
  standalone: true,
  providers: [TodoService], // Provide the TodoService
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Firebase Todo App';

  newTodoTitle: string = '';

  // Observable to get the list of todos
  // This will be used in the template to display the list of todos
  todos$: Observable<Todo[]>;
  todos: Todo[] = [];

  editingId: string | null = null;
  editingTitle: string = '';

  // Inject the TodoService to use its methods
  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(title: string) {
    const newTodo: Todo = { 
      title, 
      completed: false
    };

    this.todoService.addTodo(newTodo).then(() => {
      console.log('Todo added successfully');
    }).catch(error => {
      console.error('Error adding todo: ', error);
    });
  }
  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).then(() => {
      console.log(`Todo ${id} deleted successfully`);
    }).catch(error => {
      console.error('Error deleting todo: ', error);
    });
  }
  toggleTodo(todo: Todo) {
    const updatedTodo: Todo = { ...todo, completed: !todo.completed };
    
    console.log('Updated Todo:', updatedTodo);

    this.todoService.updateTodo(updatedTodo).then(() => {
      console.log('Todo updated successfully');
    }).catch(error => {
      console.error('Error updating todo: ', error);
    });
  }


  startEdit(todo: Todo) {
    this.editingId = todo.id!;
    this.editingTitle = todo.title;
  }

  async updateTodo() {

    console.log('Editing ID:', this.editingId);

    if (this.editingId) {
      const updatedTodo: Todo = { 
        id: this.editingId, 
        title: this.editingTitle, 
        completed: false 
      };

      try {
        await this.todoService.updateTodo(updatedTodo);
        console.log('Todo updated successfully');
      } catch (error) {
        console.error('Error updating todo: ', error);
      } finally {
        this.editingId = null;
        this.editingTitle = '';
      }
    }
  }
  cancelEdit() {
    this.editingId = null;
    this.editingTitle = '';
  }
}
