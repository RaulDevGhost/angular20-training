import { Routes } from '@angular/router';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { TicketFormPageComponent } from './pages/ticket-form-page/ticket-form-page.component';
import { ExampleTicketFormPageComponent } from './pages/example-ticket-form-page/example-ticket-form-page.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersPageComponent,
  },
  {
    path: 'user-form',
    component: UserFormPageComponent,
  },
  {
    path: 'ticket-form',
    component: TicketFormPageComponent,
  },
  {
    path: 'example-ticket-form',
    component: ExampleTicketFormPageComponent,
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
];
