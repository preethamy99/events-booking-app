import { Component } from '@angular/core';
import { EventServiceService } from '../event-service.service';
import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface TimeSlot {
  time: string;
  subscribed: boolean;
}

@Component({
  selector: 'app-calendar-view',
  imports: [MatCardModule, MatGridListModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css'
})
export class CalendarViewComponent {
  selectedCategory: string = 'null';
  currentWeek: Date[] = [];
  timeSlots: string[] = [];
  selectedDate: string  = '';
  date_selected = false;
  user = 'user1'; // For example, a hardcoded user
  isSubscribed: boolean = false;

  constructor(private route: ActivatedRoute, private eventService: EventServiceService, private router: Router) {}

  ngOnInit(): void {
    this.date_selected = false;
    // Get the selected category from the query parameter
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'];
      this.loadCurrentWeek();
    });
    
  }

  // Method to load the current week (starting from today's date)
  loadCurrentWeek(): void {
    const currentDate = new Date();
    const startOfWeek = this.getStartOfWeek(currentDate);
    
    // Generate an array of 7 dates for the current week
    this.currentWeek = this.generateWeek(startOfWeek);

    // Set today's date as the selected date
    this.selectedDate = this.currentWeek[0].toISOString().split('T')[0]; // Start of the week (Sunday)
    // this.loadTimeSlots();
  }

  // Method to get the start of the week (Sunday)
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day; // Adjust to get Sunday
    return new Date(date.setDate(diff));
  }

  // Generate the next 7 days starting from `startOfWeek`
  generateWeek(startOfWeek: Date): Date[] {
    let week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  }

  // Method to load the time slots for the selected category and date
  // loadTimeSlots(): void {
  //   if (this.selectedCategory) {
  //     this.timeSlots = this.eventService.getTimeSlotsByCategory(this.selectedCategory);
  //     this.checkUserSubscription();
  //   }
  // }

  // Method to select a date (when the user clicks on a date)
  subs : TimeSlot[] = [];
  onDateSelect(date: string): void {
    this.selectedDate = date;
    this.date_selected = true;
    this.eventService.getTimeSlotsByDate(date, this.selectedCategory || '').subscribe((resp:any)=>{
      this.timeSlots = resp;
    });
    console.log(this.timeSlots);
    if(this.timeSlots.length < 1){
      this.timeSlots.push('No Events');
    }
    // this.checkUserSubscription();
  }

  // Check if the user has already subscribed to an event
  // checkUserSubscription(): void {
  //   if (this.selectedDate && this.selectedCategory) {
  //     const subscription = this.eventService.getUserSubscription(this.selectedDate, this.selectedCategory, this.user);
  //     this.isSubscribed = !!subscription;
  //   }
  // }
  // getSubscribedSlots() {
  //   const subscriptions = this.eventService.getSubscriptions(this.selectedDate, this.selectedCategory);
  //   return subscriptions.filter(sub => sub.user === this.user).map(sub => sub.slot);
  // }

  // Method to navigate to the next week
  nextWeek(): void {
    this.selectedDate = '';
    this.date_selected = false;
    const lastDateOfCurrentWeek = this.currentWeek[6];
    const nextWeekStart = new Date(lastDateOfCurrentWeek);
    nextWeekStart.setDate(nextWeekStart.getDate() + 1); // Move to next week
    this.currentWeek = this.generateWeek(this.getStartOfWeek(nextWeekStart));
    this.selectedDate = this.currentWeek[0].toISOString().split('T')[0]; // Start of the next week
    // this.loadTimeSlots();
  }

  // Method to navigate to the previous week
  previousWeek(): void {
    this.selectedDate = '';
    this. date_selected = false;
    const firstDateOfCurrentWeek = this.currentWeek[0];
    const prevWeekStart = new Date(firstDateOfCurrentWeek);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7); // Move to previous week
    this.currentWeek = this.generateWeek(this.getStartOfWeek(prevWeekStart));
    this.selectedDate = this.currentWeek[0].toISOString().split('T')[0]; // Start of the previous week
    // this.loadTimeSlots();
  }

  // Subscribe to a time slot
  subscribed: any;
  subscribe(slot: string): void {
    if (this.selectedDate && this.selectedCategory) {
      let data = {
        'date': this.selectedDate,
        'category': this.selectedCategory,
        'slot': slot,
        'user': this.user
            }
      let ts: TimeSlot[] = [];
      for(let i = 0; i < this.timeSlots.length; i++){
        ts.push({'time': this.timeSlots[i], 'subscribed': false});
      }
      this.subs = ts;
      console.log(this.subs);
      for(let i = 0; i < this.subs.length; i++){
        if(this.subs[i].time === slot){
          this.subs[i].subscribed = true;
        }
        this.subs[i].subscribed = false;
      }
      // this.timeSlots = this.subscribed;
      console.log(this.subs);
      this.eventService.subscribeToSlot(data);
      // this.checkUserSubscription();
      // this.loadTimeSlots();
      this.isSubscribed = !this.isSubscribed;
    }
  }

  // Unsubscribe from a time slot
  unsubscribe(slot: string): void {
    let data = {
      'date': this.selectedDate,
      'category': this.selectedCategory,
      'slot': slot,
      'user': this.user
          }
    this.eventService.unsubscribeFromSlot(data);
    this.isSubscribed = !this.isSubscribed;
  //   if (this.selectedDate && this.selectedCategory) {
  //     this.eventService.unsubscribeFromSlot(this.selectedDate, this.selectedCategory, slot);
  //     this.checkUserSubscription();
  //     // this.loadTimeSlots();
  //   }
  }

  adminLogin = false;
  addEvent(){
    this.adminLogin = true;
    this.router.navigate(['admin']);
  }
}
