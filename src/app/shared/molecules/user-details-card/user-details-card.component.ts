import { Component, computed, Input, signal } from '@angular/core';
import { CardComponent } from '../../atoms/card/card.component';
import { User } from '../../../dummy-users';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-user-details-card',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './user-details-card.component.html',
  styleUrl: './user-details-card.component.css',
})
export class UserDetailsCardComponent {
  @Input({ required: true }) set user(value: User) {
    this.userSignal.set(value);
  }

  private userSignal = signal<User>({} as User);

  user$ = computed(() => this.userSignal());

  sendEmail() {
    console.log('send email');
  }

  deleteUser() {
    console.log('delete');
  }
}
