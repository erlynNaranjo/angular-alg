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
}