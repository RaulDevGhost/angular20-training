import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  computed,
} from '@angular/core';
import { User } from '../../../dummy-users';

@Component({
  selector: 'app-user-button',
  standalone: true,
  imports: [],
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.css',
})
export class UserButtonComponent {
  @Input({ required: true }) set user(value: User) {
    this.userSignal.set(value);
  }
  @Input({ required: true }) set isActive(value: boolean) {
    this.isActiveSignal.set(value);
  }
  @Output() userSelected = new EventEmitter<string>();

  private userSignal = signal<User>({} as User);
  private isActiveSignal = signal<boolean>(false);

  user$ = computed(() => this.userSignal());
  isActive$ = computed(() => this.isActiveSignal());

  onUserSelected() {
    const user = this.user$();
    if (user.id) {
      this.userSelected.emit(user.id);
    }
  }
}
