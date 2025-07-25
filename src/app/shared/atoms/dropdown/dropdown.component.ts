import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  // INPUT SIGNALS (from parent component)
  placeholder = input<string>('Select an option');
  options = input<DropdownOption[]>([]);
  initialValue = input<string | string[]>('', { alias: 'value' });
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  name = input<string>('');
  id = input<string>('');
  errorMessage = input<string>('');
  label = input<string>('');
  searchable = input<boolean>(false);
  clearable = input<boolean>(false);
  multiple = input<boolean>(false);
  maxHeight = input<string>('200px');

  @ViewChild('dropdownRef') dropdownRef!: ElementRef<HTMLDivElement>;
  @ViewChild('searchInputRef') searchInputRef!: ElementRef<HTMLInputElement>;

  // OUTPUT SIGNALS (emit to parent component)
  valueChange = output<string | string[]>();
  selectionChange = output<DropdownOption | DropdownOption[]>();
  dropdownOpen = output<void>();
  dropdownClose = output<void>();
  validationChange = output<boolean>();

  // INTERNAL SIGNALS (component state)
  private _currentValue = signal<string | string[]>('');
  private _touched = signal<boolean>(false);
  private _focused = signal<boolean>(false);
  private _isOpen = signal<boolean>(false);
  private _searchTerm = signal<string>('');

  // COMPUTED SIGNALS (derived state)
  currentValue = computed(() => this._currentValue());
  touched = computed(() => this._touched());
  focused = computed(() => this._focused());
  isOpen = computed(() => this._isOpen());
  searchTerm = computed(() => this._searchTerm());

  // Get selected option(s) for display
  selectedOptions = computed(() => {
    const value = this.currentValue();
    const options = this.options();

    if (this.multiple()) {
      const values = Array.isArray(value) ? value : [];
      return options.filter((option) => values.includes(option.value));
    } else {
      return options.find((option) => option.value === value) || null;
    }
  });

  // Display text for the dropdown button
  displayText = computed(() => {
    const selected = this.selectedOptions();

    if (this.multiple() && Array.isArray(selected)) {
      if (selected.length === 0) return this.placeholder();
      if (selected.length === 1) return selected[0].label;
      return `${selected.length} items selected`;
    } else if (selected && !Array.isArray(selected)) {
      return selected.label;
    }

    return this.placeholder();
  });

  // Filter options based on search term
  filteredOptions = computed(() => {
    const options = this.options();
    const search = this.searchTerm().toLowerCase();

    if (!search || !this.searchable()) return options;

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(search) ||
        option.value.toLowerCase().includes(search)
    );
  });

  // Check if field is invalid (has error and been touched)
  isInvalid = computed(() => {
    return this.errorMessage().length > 0 && this.touched();
  });

  // Check if field is valid
  isValid = computed(() => {
    if (!this.required()) return true;
    const value = this.currentValue();

    if (this.multiple()) {
      return Array.isArray(value) && value.length > 0;
    }

    return typeof value === 'string' && value.trim().length > 0;
  });

  // Generate dynamic CSS classes for the dropdown button
  dropdownClasses = computed(() => {
    return {
      'dropdown-toggle': true,
      'is-invalid': this.isInvalid(),
      'is-valid': this.touched() && this.isValid() && !this.isInvalid(),
      focused: this.focused(),
      disabled: this.disabled(),
      open: this.isOpen(),
    };
  });

  // Simple computed for showing clear button
  showClearButton = computed(() => {
    if (!this.clearable()) return false;

    const value = this.currentValue();
    if (this.multiple()) {
      console.log('this.currentValue()', this.currentValue());
      console.log('showClearButton Array.isArray(value)', Array.isArray(value));
      console.log('showClearButton value.length', value.length);
      return Array.isArray(value) && value.length > 0;
    }
    return value !== '';
  });

  // Simple computed for debug display
  debugValue = computed(() => {
    const value = this.currentValue();
    if (this.multiple()) {
      return Array.isArray(value) ? value.join(', ') : 'None';
    }
    return `"${value}"`;
  });

  // EFFECTS (side effects when signals change)
  constructor() {
    // Effect to sync initial value with internal value
    effect(
      () => {
        const initial = this.initialValue();
        const currentVal = this._currentValue();

        if (this.multiple()) {
          // For multiple selection, ensure we have an array
          const initialArray = Array.isArray(initial)
            ? initial
            : initial
            ? [initial]
            : [];
          if (JSON.stringify(initialArray) !== JSON.stringify(currentVal)) {
            this._currentValue.set(initialArray);
          }
        } else {
          // For single selection, take first value if array is passed
          const initialString = Array.isArray(initial)
            ? initial[0] || ''
            : initial;
          if (initialString !== currentVal) {
            this._currentValue.set(initialString);
          }
        }
      },
      { allowSignalWrites: true }
    );

    // Effect to emit validation changes
    effect(() => {
      const isValid = this.isValid();
      this.validationChange.emit(isValid);
    });

    // Effect to handle dropdown open/close events
    effect(
      () => {
        const isOpen = this.isOpen();
        if (isOpen) {
          this.dropdownOpen.emit();
          // Focus search input if searchable
          if (this.searchable()) {
            setTimeout(() => {
              this.searchInputRef?.nativeElement?.focus();
            }, 0);
          }
        } else {
          this.dropdownClose.emit();
          this._searchTerm.set('');
        }
      },
      { allowSignalWrites: true }
    );

    // Effect for debugging (remove in production)
    effect(() => {
      console.log('Dropdown state changed:', {
        value: this.currentValue(),
        touched: this.touched(),
        focused: this.focused(),
        isOpen: this.isOpen(),
        valid: this.isValid(),
        invalid: this.isInvalid(),
      });
    });
  }

  // Click outside to close dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.dropdownRef.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  // EVENT HANDLERS
  toggleDropdown(): void {
    if (this.disabled()) return;

    this._isOpen.set(!this.isOpen());
    this._focused.set(this.isOpen());

    if (!this.isOpen()) {
      this._touched.set(true);
    }
  }

  openDropdown(): void {
    if (this.disabled()) return;
    this._isOpen.set(true);
    this._focused.set(true);
  }

  closeDropdown(): void {
    this._isOpen.set(false);
    this._focused.set(false);
    this._touched.set(true);
  }

  selectOption(option: DropdownOption): void {
    if (option.disabled) return;

    if (this.multiple()) {
      const currentValues = Array.isArray(this.currentValue())
        ? [...(this.currentValue() as string[])]
        : [];

      const index = currentValues.indexOf(option.value);
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }

      this._currentValue.set(currentValues);
      this.valueChange.emit(currentValues);
      this.selectionChange.emit(this.selectedOptions() as DropdownOption[]);
    } else {
      this._currentValue.set(option.value);
      this.valueChange.emit(option.value);
      this.selectionChange.emit(option);
      this.closeDropdown();
    }
  }

  onBlur(): void {
    if (!this.isOpen()) {
      this._touched.set(true);
      this._focused.set(false);
    }
  }

  onFocus(): void {
    this._focused.set(true);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._searchTerm.set(target.value);
  }

  clearSelection(): void {
    if (this.disabled()) return;

    if (this.multiple()) {
      this._currentValue.set([]);
      this.valueChange.emit([]);
      this.selectionChange.emit([]);
    } else {
      this._currentValue.set('');
      this.valueChange.emit('');
      this.selectionChange.emit(null as any);
    }
  }

  // Check if option is selected
  isOptionSelected(option: DropdownOption): boolean {
    const value = this.currentValue();

    if (this.multiple()) {
      return Array.isArray(value) && value.includes(option.value);
    }

    return value === option.value;
  }

  // UTILITY METHODS
  reset(): void {
    if (this.multiple()) {
      this._currentValue.set([]);
    } else {
      this._currentValue.set('');
    }
    this._touched.set(false);
    this._focused.set(false);
    this._isOpen.set(false);
    this._searchTerm.set('');
  }

  markAsTouched(): void {
    this._touched.set(true);
  }

  // Keyboard navigation
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!this.isOpen()) {
          event.preventDefault();
          this.openDropdown();
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.closeDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openDropdown();
        }
        // TODO: Implement option navigation
        break;
      case 'ArrowUp':
        event.preventDefault();
        // TODO: Implement option navigation
        break;
    }
  }
}
