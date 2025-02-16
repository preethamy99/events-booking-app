import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

interface Subscription {
  slot: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private timeSlots: any = [];
  private adminCredentials : any[] = [
    {email:'vamsi.preetham.140@gmail.com', password:'7702025635'}
  ];

  constructor(private http: HttpClient) { }

  // Get available time slots for a specific date and category
  getTimeSlotsByDate(date: string, category: string):  Observable<any> {
    let data = {'date': date, 'category': category};
    return this.http.post<any>('http://127.0.0.1:5000/getslots', data);
  }

  // Subscribe to a time slot for a specific date, category, and user
  subcribedslot: any = [];
  subscribeToSlot(data: any) {
    if (data.date && data.category && data.slot) {
      // Subscribe the user
      this.subcribedslot.push(data);
    }
    // let bookings;
    // this.http.post('http://127.0.0.1:5000/eventbooking', data).subscribe((response)=>{
    //   bookings = response;
    // });
      this.saveToLocalStorage();
    }

  // Unsubscribe from a time slot
  unsubscribeFromSlot(data: any) {
    if (data) {
      // Remove the subscription
      this.subcribedslot = this.subcribedslot.filter((s:any) => s.slot !== data.slot && s.date !== data.date);
      this.saveToLocalStorage();
    }
    // this.http.post('http://127.0.0.1:5000/unsubscribe', date);
  }

  // Save the updated time slot data to localStorage
  private saveToLocalStorage() {
    localStorage.setItem('timeSlots', JSON.stringify(this.timeSlots));
  }

  // Initialize time slots data from localStorage (optional)
  loadFromLocalStorage() {
    const savedData = localStorage.getItem('timeSlots');
    if (savedData) {
      this.timeSlots = JSON.parse(savedData);
    }
  }

  slot_add: any;
  addTimeSlot(data: any) {
    if(data){
      this.http.post('http://127.0.0.1:5000/addevent', data).subscribe((resp)=>{
        this.slot_add = resp;
      });
    this.saveToLocalStorage();
    return this.slot_add;
  }
}
  val: any = '';
  verifyAdmin(data: any){
    if(data){
      this.http.post('http://127.0.0.1:5000/adminlogin', data).subscribe((resp)=>{
        this.val = resp;
      });
    }
    return this.val;
  }

  cat: any;
  get_all_categories(): Observable<any>{
    this.cat = this.http.get('http://127.0.0.1:5000/getcategory');
    return this.cat;
  }
  
}
