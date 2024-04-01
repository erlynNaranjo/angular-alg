import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  data: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getMovie().subscribe((data:any) => {
      this.data = data;
      console.log(data);
    });
    
  }
}

