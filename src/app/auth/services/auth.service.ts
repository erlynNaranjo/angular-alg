import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // URL de tu backend

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token); // Almacenar token en localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Obtener token de localStorage
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Comprobar si hay un token almacenado
  }

  removeToken(): void {
    localStorage.removeItem('token'); // Eliminar token del almacenamiento local
  }
}
