import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() set variant(value: ButtonVariant) {
    this.variantSignal.set(value);
  }

  @Input() set size(value: ButtonSize) {
    this.sizeSignal.set(value);
  }

  @Input() set disabled(value: boolean) {
    this.disabledSignal.set(value);
  }

  @Input() set loading(value: boolean) {
    this.loadingSignal.set(value);
  }

  @Input() set icon(value: string) {
    this.iconSignal.set(value);
  }

  @Output() clicked = new EventEmitter<void>();

  // Internal signals
  private variantSignal = signal<ButtonVariant>('primary');
  private sizeSignal = signal<ButtonSize>('medium');
  private disabledSignal = signal<boolean>(false);
  private loadingSignal = signal<boolean>(false);
  private iconSignal = signal<string>('');

  // Public computed signals
  variant$ = computed(() => this.variantSignal());
  size$ = computed(() => this.sizeSignal());
  disabled$ = computed(() => this.disabledSignal());
  loading$ = computed(() => this.loadingSignal());
  icon$ = computed(() => this.iconSignal());

  // Computed signal for button classes
  buttonClasses$ = computed(() => ({
    btn: true,
    [`btn--${this.variant$()}`]: true,
    [`btn--${this.size$()}`]: true,
    'btn--disabled': this.disabled$(),
    'btn--loading': this.loading$(),
    'btn--with-icon': this.icon$() !== '',
  }));

  // Computed signal to check if button should be disabled
  isDisabled$ = computed(() => this.disabled$() || this.loading$());

  onClick() {
    if (!this.isDisabled$()) {
      this.clicked.emit();
    }
  }
}
