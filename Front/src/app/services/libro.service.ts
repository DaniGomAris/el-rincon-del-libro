import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private readonly apiUrl = 'https://openlibrary.org';

  constructor(private readonly http: HttpClient) { }

  buscarLibros(titulo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.json?title=${titulo}`);
  }
}