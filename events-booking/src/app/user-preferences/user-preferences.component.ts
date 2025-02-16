import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { EventServiceService } from '../event-service.service';

@Component({
  selector: 'app-user-preferences',
  imports: [MatCardModule, MatCheckboxModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.css'
})
export class UserPreferencesComponent implements OnInit {
  categories: any = [];
  selectedCategory: string = '';

  constructor(private router: Router, private eventservice:EventServiceService) { 
    
  }

  ngOnInit(): void {
    this.eventservice.get_all_categories().subscribe((resp)=>{
      this.categories = resp;
    });
  }
  

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    if(this.selectedCategory){
      this.router.navigate(['calendar'], { queryParams: { category: this.selectedCategory}});
    }
    else{
      console.error('Router is not defined');
    }
  }
}
