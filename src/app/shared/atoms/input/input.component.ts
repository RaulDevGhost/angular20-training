import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  placeholder = input<string>('');
  type = input<string>('text');
  initialValue = input<string>('', { alias: 'value' });
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  name = input<string>('');
  id = input<string>('');
  autocomplete = input<string>('off');
  autofocus = input<boolean>(false);
  readonly = input<boolean>(false);
  errorMessage = input<string>('');
  label = input<string>('');

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  // OUTPUT SIGNALS (emit to parent component)
  valueChange = output<string>();
  inputBlur = output<void>();
  inputFocus = output<void>();
  validationChange = output<boolean>();

  // INTERNAL SIGNALS (component state)
  private _currentValue = signal<string>('');
  private _touched = signal<boolean>(false);
  private _focused = signal<boolean>(false);

  // COMPUTED SIGNALS (derived state)
  currentValue = computed(() => this._currentValue());

  touched = computed(() => this._touched());

  focused = computed(() => this._focused());

  // Check if field is invalid (has error and been touched)
  isInvalid = computed(() => {
    return this.errorMessage().length > 0 && this.touched();
  });

  // Check if field is valid
  isValid = computed(() => {
    if (!this.required()) return true;
    return this.currentValue().trim().length > 0;
  });

  // Generate dynamic CSS classes
  inputClasses = computed(() => {
    return {
      'form-control': true,
      'is-invalid': this.isInvalid(),
      'is-valid': this.touched() && this.isValid() && !this.isInvalid(),
      focused: this.focused(),
    };
  });

  ngAfterViewInit() {
    if (this.autofocus()) {
      setTimeout(() => {
        this.inputRef?.nativeElement.focus();
      }, 0);
    }
  }

  // EFFECTS (side effects when signals change)
  constructor() {
    // Effect to sync initial value with internal value
    effect(
      () => {
        const initial = this.initialValue();
        if (initial !== this._currentValue()) {
          this._currentValue.set(initial);
        }
      },
      { allowSignalWrites: true }
    );

    // Effect to emit validation changes
    effect(() => {
      const isValid = this.isValid();
      this.validationChange.emit(isValid);
    });

    // Effect for debugging (remove in production)
    effect(() => {
      console.log('Input state changed:', {
        value: this.currentValue(),
        touched: this.touched(),
        focused: this.focused(),
        valid: this.isValid(),
        invalid: this.isInvalid(),
      });
    });
  }

  // EVENT HANDLERS
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;

    // Update internal signal
    this._currentValue.set(newValue);

    // Emit to parent
    this.valueChange.emit(newValue);
  }

  onBlur(): void {
    this._touched.set(true);
    this._focused.set(false);
    this.inputBlur.emit();
  }

  onFocus(): void {
    this._focused.set(true);
    this.inputFocus.emit();
  }

  // UTILITY METHODS
  reset(): void {
    this._currentValue.set('');
    this._touched.set(false);
    this._focused.set(false);
  }

  // setValue(value: string): void {
  //   this._currentValue.set(value);
  // }

  markAsTouched(): void {
    this._touched.set(true);
  }
}
