import { Injectable } from '@angular/core';

interface Subscription {
  slot: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  // private slots:Slot[] = JSON.parse(localStorage.getItem('timeSlots') || '[]');

  // constructor() { }

  // getTimeSlots(): any[] {
  //   return this.slots;
  // }

  // addTimeSlot(slot: Slot): void {
  //   this.slots.push(slot);
  //   localStorage.setItem('timeSlots', JSON.stringify(this.slots));
  // }

  // updateSlot(slot: Slot): void {
  //   const index = this.slots.findIndex((s: Slot) => s.date === slot.date && s.category === slot.category);
  //   if (index > -1) {
  //     this.slots[index] = slot;
  //     localStorage.setItem('timeSlots', JSON.stringify(this.slots));
  //   }
  // }

  private timeSlots: any[] = [
    { date: '2025-02-15', category: 'Cat 1', slots: ['09:00', '11:00', '13:00', '15:00'], subscribed: [] },
    { date: '2025-02-16', category: 'Cat 1', slots: ['09:00', '11:00', '13:00', '15:00'], subscribed: [] },
    { date: '2025-02-17', category: 'Cat 1', slots: ['09:00', '11:00', '13:00', '15:00'], subscribed: [] },
    { date: '2025-02-18', category: 'Cat 1', slots: ['09:00', '11:00', '13:00', '15:00'], subscribed: [] },
    { date: '2025-02-19', category: 'Cat 1', slots: ['09:00', '11:00', '13:00', '15:00'], subscribed: [] },
    { date: '2025-02-20', category: 'Cat 1', slots: ['09:00', '11:00', '13:00', '15:00'], subscribed: [] },
    { date: '2025-02-21', category: 'Cat 1', slots: ['09:00', '11:00', '13:00', '15:00'], subscribed: [] },
    { date: '2025-02-15', category: 'Cat 2', slots: ['10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-16', category: 'Cat 2', slots: ['10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-17', category: 'Cat 2', slots: ['10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-18', category: 'Cat 2', slots: ['10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-19', category: 'Cat 2', slots: ['10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-20', category: 'Cat 2', slots: ['10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-21', category: 'Cat 2', slots: ['10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-15', category: 'Cat 3', slots: ['08:00', '10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-16', category: 'Cat 3', slots: ['08:00', '10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-17', category: 'Cat 3', slots: ['08:00', '10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-18', category: 'Cat 3', slots: ['08:00', '10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-19', category: 'Cat 3', slots: ['08:00', '10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-20', category: 'Cat 3', slots: ['08:00', '10:00', '12:00', '14:00'], subscribed: [] },
    { date: '2025-02-21', category: 'Cat 3', slots: ['08:00', '10:00', '12:00', '14:00'], subscribed: [] }
  ];
  private adminCredentials : any[] = [
    {email:'vamsi.preetham.140@gmail.com', password:'7702025635'}
  ];

  constructor() { }

  // Get all time slots for a particular category
  getTimeSlotsByCategory(category: string) {
    return this.timeSlots.filter(slot => slot.category === category);
  }

  // Get available time slots for a specific date and category
  getTimeSlotsByDate(date: string, category: string) {
    const slot = this.timeSlots.find(slot => slot.date === date && slot.category === category);
    return slot ? slot.slots : [];
  }

  // Subscribe to a time slot for a specific date, category, and user
  subscribeToSlot(date: string, category: string, slot: string, user: string) {
    const slotData = this.timeSlots.find(s => s.date === date && s.category === category);
    if (slotData && !slotData.subscribed.some((s:Subscription) => s.slot === slot)) {
      // Subscribe the user
      slotData.subscribed.push({ slot, user });
      this.saveToLocalStorage();
    }
  }

  // Unsubscribe from a time slot
  unsubscribeFromSlot(date: string, category: string, slot: string) {
    const slotData = this.timeSlots.find(s => s.date === date && s.category === category);
    if (slotData) {
      // Remove the subscription
      slotData.subscribed = slotData.subscribed.filter((s:Subscription) => s.slot !== slot);
      this.saveToLocalStorage();
    }
  }

  // Get the subscription of a user for a specific time slot
  getUserSubscription(date: string, category: string, user: string) {
    const slotData = this.timeSlots.find(s => s.date === date && s.category === category);
    return slotData ? slotData.subscribed.find((s:Subscription) => s.user === user) : null;
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

  addTimeSlot(date: string, category: string, slots: string[]) {
    // Find if the time slots for this category and date already exist
    const existingSlot = this.timeSlots.find(slot => slot.date === date && slot.category === category);
    console.log(existingSlot);
    if (existingSlot) {
      // Add the new slots to the existing ones, avoiding duplicates
      existingSlot.slots = [...new Set([...existingSlot.slots, ...slots])];
      console.log(existingSlot);
    } else {
      // Add a new entry for the time slot
      this.timeSlots.push({
        date,
        category,
        slots,
        subscribed: []
      });
      console.log(this.timeSlots);
    }
    this.saveToLocalStorage();
  }

  verifyAdmin(data: any){
    const result = this.adminCredentials.filter((credential)=> {
      return credential.email === data.email && credential.password === data.password;
    });
    if(result.length > 0){
      return true;
    }
    else{
    return false;
    }
  }
  
}
