import { Routes } from '@angular/router';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: '', component: UserPreferencesComponent },
    { path: 'calendar', component: CalendarViewComponent },
    { path: 'admin', component: AdminComponent }
];
