import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Generic<T> {
  private apiUrl: string = 'https://localhost:7073/api';

  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`);
  }

  getById(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  create(endpoint: string, entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/${endpoint}`,
      entity
    );
  }

  update(endpoint: string, id: number, entity: T): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${endpoint}/${id}`,
      entity
    );
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${endpoint}/${id}`
    );
  }
}