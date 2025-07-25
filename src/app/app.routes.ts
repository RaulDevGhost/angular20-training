import { Routes } from '@angular/router';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

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
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
];
