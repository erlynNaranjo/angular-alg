import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 

const BASE_URL = "http://127.0.0.1:8000";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private https: HttpClient) { }
 
  getMovie() {
    return this.https.get(BASE_URL + '/movies');
}

  deleteMovie(id: number) {
  return this.https.delete(`${BASE_URL}/movies/${id}`);
}

createMovie(movieData: any) {
  return this.https.post(`${BASE_URL}/movies`, movieData);
}

updateMovie(id: number, movieData: any) {
  return this.https.put(`${BASE_URL}/movies/${id}`, movieData);
}

getMoviesByCategory(category: string) {
  return this.https.get(`${BASE_URL}/movies/?category=${category}`);
}


}
