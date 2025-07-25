import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { UserButtonComponent } from '../../shared/molecules/user-button/user-button.component';
import { UserDetailsCardComponent } from '../../shared/molecules/user-details-card/user-details-card.component';
import { DUMMY_USERS, User } from '../../dummy-users';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, UserButtonComponent, UserDetailsCardComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {
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
