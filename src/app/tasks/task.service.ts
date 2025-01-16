import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry, pipe, throwError } from 'rxjs';

import { Task } from './Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = 'http://localhost:8080/tasks';
  constructor(private http: HttpClient) { };


  getTasks(): Observable<any> {
    return this.http.get(`${this.api}`)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  };

  createTask(task: any): Observable<any>  {
    return this.http.post(`${this.api}`, task )
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  };

  updateTask(task: Task): Observable<any> {
    return this.http.put(`${this.api}/${task.id}`, task)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  };

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.api}/${taskId}`)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  };

}
