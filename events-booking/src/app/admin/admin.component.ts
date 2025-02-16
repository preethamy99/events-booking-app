import { Component } from '@angular/core';
import {EventServiceService} from '../event-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [MatCardModule, MatFormFieldModule, FormsModule, MatSelectModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  newSlot = { date: '', category: '', isBooked: false };
  date: string = '';
  category: string = '';
  slots: string[] = [];
  availableCategories: string[] = ['Cat 1', 'Cat 2', 'Cat 3'];

  constructor(private eventService: EventServiceService) {}

  ngOnInit(): void { }

  adminLogin = false;
  admin = {
    'email':'',
    'password':''
  }
  onSubmit(){
    let val = this.eventService.verifyAdmin(this.admin); 
    this.adminLogin = true;
    if(val === false){
      alert('Enter correct email or password');
    }

  }

  addTimeSlot() {
    if (this.date && this.category && this.slots.length > 0) {
    let data = {
      "date": this.date,
      "category": this.category,
      "slots": this.slots
    }
      let val = this.eventService.addTimeSlot(data);
      if(val){
        alert('Time slots added successfully!');
      }
      else{
        alert('Time slot is not added');
      }
    }
    else {
        alert('Please fill in all fields.');
    }
  }
}

