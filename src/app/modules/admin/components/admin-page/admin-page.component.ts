import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = []; // Array para almacenar los resultados filtrados
  movieData: any = {};
  searchTerm: string = ''; 
  categoryFilter: string = '';
  pageSize: number = 5; // Tamaño de página
  currentPage: number = 1;

  constructor(private adminservice: AdminService, private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.adminservice.getMovie().subscribe(
      (data: any) => {
        this.data = data;
        this.filteredData = data;
        // Llamar a la función para actualizar los datos filtrados al obtener nuevos datos
        this.updateFilteredData();
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching movie data:', error);
      }
    );
  }

    // Función para actualizar los datos filtrados basados en la página actual
    updateFilteredData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.filteredData = this.data.slice(startIndex, startIndex + this.pageSize);
    }
  
    // Funciones para navegar a la página anterior y siguiente
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredData();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredData();
    }
  }

  // Calcular el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  deleteMovie(id: number) {
    this.adminservice.deleteMovie(id).subscribe(
      () => {
        // Elimina el elemento de la lista después de la eliminación exitosa
        this.data = this.data.filter(movie => movie.id !== id);
        console.log('Movie deleted successfully');
      },
      (error: any) => {
        console.error('Error deleting movie:', error);
      }
    );
  }

  createMovie() {
    this.adminservice.createMovie(this.movieData).subscribe(
      (response: any) => {
        console.log('Movie created successfully');
        // Actualizar la lista de películas llamando al método getMovies
        this.getMovies();
        // Reiniciar el objeto movieData
        this.movieData = {};
      },
      (error: any) => {
        console.error('Error creating movie:', error);
      }
    );
  }
  loadMovieData(movie: any) {
    this.movieData = { ...movie 
    }; // Clonamos el objeto para evitar cambiar los datos directamente en la lista
  }
  updateMovie() {
    this.adminservice.updateMovie(this.movieData.id, this.movieData).subscribe(
      (response: any) => {
        console.log('Movie updated successfully');
        // Actualizar la lista de películas llamando al método getMovies
        this.getMovies();
        // Reiniciar el objeto movieData
        this.movieData = {};
      },
      (error: any) => {
        console.error('Error updating movie:', error);
      }
    );
  }

  searchMovies() {
    // Filtrar los datos basados en el término de búsqueda
    this.filteredData = this.data.filter(movie =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      
    );
    console.log(this.filteredData);
  }


  filterByCategory() {
    if (this.categoryFilter.trim() !== '') {
      this.filteredData = this.data.filter(movie =>
        movie.category.toLowerCase().includes(this.categoryFilter.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
    }
    console.log(this.filteredData);
  }


  logout(): void {
    // Eliminar el token del local storage o de la cookie
    this.authService.removeToken();

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}

  



