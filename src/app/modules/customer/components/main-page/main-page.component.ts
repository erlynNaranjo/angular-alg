import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = []; // Array para almacenar los resultados filtrados
  movieData: any = {};
  searchTerm: string = ''; 
  categoryFilter: string = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.customerService.getMovie().subscribe(
      (data: any) => {
        this.data = data;
        this.filteredData = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching movie data:', error);
      }
    );
  }

  deleteMovie(id: number) {
    this.customerService.deleteMovie(id).subscribe(
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
    this.customerService.createMovie(this.movieData).subscribe(
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
    this.customerService.updateMovie(this.movieData.id, this.movieData).subscribe(
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
  }
}

  



