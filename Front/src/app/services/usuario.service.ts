import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // Iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, { email, password });
  }

  // Registrar un nuevo usuario
  register(nombre: string, apellido: string, email: string, password: string): Observable<any> {
    const userData = { nombre, apellido, email, password };
    return this.http.post(`${this.apiUrl}/user/create`, userData);
  }

  // Actualizar el usuario
  updateUser(nombre: string, apellido: string, email: string, password: string, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/user/update`, { nombre, apellido, email, password }, { headers });
  }

  // Guardar la sesión del usuario en el LocalStorage, solo en el navegador
  setSession(userData: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }

  // Cerrar sesión, solo en el navegador
  logout(): void {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user) {
        user.isLoggedIn = false;
        localStorage.setItem('user', JSON.stringify(user));
      }
      localStorage.removeItem('user');
    }
  }
  
  // Verificar si el usuario está logueado, solo en el navegador
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user') !== null;
    }
    return false;
  }

  // Obtener el nombre del usuario logueado, solo en el navegador
  getUsername(): string | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).nombre : null;
    }
    return null;
  }
}
