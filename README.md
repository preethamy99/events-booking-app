# Event Booking Web Application

## Description
This web application allows users to book events from pre-defined slots in a calendar. Built using Angular 2+ and Angular Material, it provides a robust and responsive UI. Backend data such as time slot definitions, user lists, and other details are mocked, and database saves are simulated using local storage.

## Features
- **User Preferences:** Users can select the event categories they are interested in (categories: "Cat 1", "Cat 2", "Cat 3").
- **Calendar View:** Displays time slots for event categories selected in user preferences. Users can sign up for and unsubscribe from these events.
- **Admin View:** Allows admins to add time slots for given event categories.

## Requirements

### Functional
1. Users can sign up for a time slot.
2. The calendar view is scoped to a week, with the ability to change the week.
3. The calendar includes an event category filter.
4. Admins can view all time slots and see if any user has signed up for them.
5. Each time slot accepts only one user. If a slot is already booked, it remains visible but does not allow new sign-ups.

### Technical
- **Frontend:** Angular 2+ with Angular Material for UI components.
- **Mock Data:** Used for time slot definitions, user lists, and other backend data.
- **Local Storage:** Simulates database saves.



1. Install dependencies:

    npm install
    Start the application:

2. Start the application:

    ng serve
    Navigate to http://localhost:4200/ in your web browser.

Usage

3. User Preferences
    Navigate to the "User Preferences" view to select event categories of interest.

    When user selects one Category and redirect to calendar view.


4. Calendar View
    View and select time slots for events within the chosen categories.

    User can select move from this week or to previous week or to next week.

    Sign up for available slots and unsubscribe if needed.

5. Admin View
    Navigate to the "Admin View" and login with user credientials to add the time slots.

    After verifiction navigte to add new time slots for event categories.

    credientials: [email: vamsi.preetham.140@gmail.com, password: 7702025635]

    This is the dummy data added in the Application.
    




