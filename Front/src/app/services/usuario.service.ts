// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, { email, password });
  }

  register(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/create`, {
      nombre,
      email,
      password,
    });
  }

  updateUser(nombre: string, email: string, fecha_nacimiento: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-token', token || '');
    return this.http.post(
      `${this.apiUrl}/user/update`,
      { nombre, email, fecha_nacimiento },
      { headers }
    );
  }

  setSession(response: any): void {
    if (response.ok && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsername(): string | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario).nombre : null;
  }
}
