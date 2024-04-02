import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  data: any[] = [];
  movieData: any = {};

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getMovie().subscribe(
      (data: any) => {
        this.data = data;
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
        // Actualizar la lista de películas llamando al método getMovie del servicio
        this.customerService.getMovie().subscribe(
          (data: any) => {
            this.data = data;
          },
          (error: any) => {
            console.error('Error fetching movie data:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error creating movie:', error);
      }
    );
  }
  
  
}

