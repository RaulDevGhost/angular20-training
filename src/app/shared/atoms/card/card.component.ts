import { Component, computed, Input, signal } from '@angular/core';
import { User } from '../../../dummy-users';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) set user(value: User) {
    this.userSignal.set(value);
  }

  private userSignal = signal<User>({} as User);

  user$ = computed(() => this.userSignal());
}
