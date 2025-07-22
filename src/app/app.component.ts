import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserButtonComponent } from './shared/molecules/user-button/user-button.component';
import { DUMMY_USERS, User } from './dummy-users';
import { UserDetailsCardComponent } from './shared/molecules/user-details-card/user-details-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UserButtonComponent,
    UserDetailsCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = signal<User[]>(DUMMY_USERS);

  selectedUserId = signal<string>('');

  selectedUser = computed(() => {
    const userId = this.selectedUserId();
    return this.users().find((user) => user.id === userId);
  });

  onUserSelected(userId: string) {
    this.selectedUserId.set(userId);
    console.log('Selected user:', this.selectedUser()?.name);
  }

  isUserActive(userId: string): boolean {
    return this.selectedUserId() === userId;
  }
}
