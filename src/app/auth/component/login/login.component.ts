import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login({ email: this.username, password: this.password }).subscribe(
      response => {
        // Almacenar el token en el local storage o en una cookie
        this.authService.setToken(response.token);

        // Mostrar el token en la consola
        console.log('Token recibido:', response.token);

        // Redirigir a la página admin después del inicio de sesión
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error:', error);
        this.errorMessage = 'Credenciales incorrectas';
      }
    );
  }
}
