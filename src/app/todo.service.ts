// src/app/todo.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc
} from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosColl;

  constructor(private firestore: Firestore) {
    this.todosColl = collection(this.firestore, 'todos');
  }

  /** Returns a real-time stream of all todos (with id field) */
  getTodos(): Observable<Todo[]> {
    return collectionData(this.todosColl, { idField: 'id' }) as Observable<Todo[]>;
  }

  addTodo(todo: Todo): Promise<void> {
    const docRef = doc(this.todosColl);
    return setDoc(docRef, todo);
  }

  deleteTodo(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'todos', id);
    return deleteDoc(docRef);
  }

  updateTodo(todo: Todo): Promise<void> {
    const docRef = doc(this.firestore, 'todos', todo.id || '');
    return setDoc(docRef, todo, { merge: true });
  }
  

  // updateTodo(todo: Todo): Promise<void> {
  // }
}
