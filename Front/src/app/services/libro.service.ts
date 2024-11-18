// src/app/services/libro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) { }

  // Buscar libros por titulo
  buscarLibros(titulo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.json?title=${titulo}`);
  }
}
