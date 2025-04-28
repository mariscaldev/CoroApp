import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://coroweb.mariscaldev.cl/api';

  constructor(private http: HttpClient) { }

  // 🔹 Obtener todas las canciones
  getCanciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/canciones`);
  }

  // 🔹 Obtener una canción por ID
  getCancion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/canciones/${id}`);
  }

  // 🔹 Obtener todas las listas
  getListas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listas`);
  }

  // 🔹 Obtener una lista por ID
  getLista(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/listas/${id}`);
  }

  getMultiplesCanciones(ids: string) {
    return this.http.get<any[]>(`https://coroweb.mariscaldev.cl/api/canciones/multiples/${ids}`);
  }
  
}
