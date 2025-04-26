// src/app/todo.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';
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
}
