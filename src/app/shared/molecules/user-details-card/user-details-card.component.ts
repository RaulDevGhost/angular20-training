import { Component, computed, Input, signal } from '@angular/core';
import { CardComponent } from '../../atoms/card/card.component';
import { User } from '../../../dummy-users';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';
import { DropdownComponent } from '../../atoms/dropdown/dropdown.component';

@Component({
  selector: 'app-user-details-card',
  standalone: true,
  imports: [CardComponent, ButtonComponent, InputComponent, DropdownComponent],
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

  // TEST FOR THE INPUT COMPONENT
  // Form field signals
  username = signal<string>('');
  email = signal<string>('');
  password = signal<string>('');

  // Validation state signals
  private usernameValid = signal<boolean>(false);
  private emailValid = signal<boolean>(false);
  private passwordValid = signal<boolean>(false);

  // Computed error messages
  usernameError = computed(() => {
    const value = this.username();
    if (!value) return 'Username is required';
    if (value.length < 3) return 'Username must be at least 3 characters';
    return '';
  });

  emailError = computed(() => {
    const value = this.email();
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return '';
  });

  passwordError = computed(() => {
    const value = this.password();
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  });

  // Computed validation states
  isUsernameValid = computed(() => !this.usernameError());
  isEmailValid = computed(() => !this.emailError());
  isPasswordValid = computed(() => !this.passwordError());

  // Overall form validation
  isFormValid = computed(
    () =>
      this.isUsernameValid() && this.isEmailValid() && this.isPasswordValid()
  );

  // Event handlers
  onUsernameChange(value: string): void {
    this.username.set(value);
    console.log('Username changed:', value);
  }

  onUsernameBlur(): void {
    console.log('Username field blurred');
  }

  onUsernameValidation(isValid: boolean): void {
    this.usernameValid.set(isValid);
    console.log('Username validation:', isValid);
  }

  onEmailChange(value: string): void {
    this.email.set(value);
  }

  onEmailValidation(isValid: boolean): void {
    this.emailValid.set(isValid);
  }

  onPasswordChange(value: string): void {
    this.password.set(value);
  }

  submitForm(): void {
    if (this.isFormValid()) {
      console.log('Form submitted:', {
        username: this.username(),
        email: this.email(),
        password: this.password(),
      });
      alert('Form submitted successfully!');
    }
  }

  //test for the dropdown component
  selectedCountry = signal<string>('');
  selectedCity = signal<string>('');
  selectedSkills = signal<string[]>([]);
  countryError = signal<string>('');

  countries = signal<any[]>([
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan', disabled: true }, // Disabled option
  ]);

  cities = signal<any[]>([
    { value: 'ny', label: 'New York' },
    { value: 'la', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' },
    { value: 'phoenix', label: 'Phoenix' },
  ]);

  skills = signal<any[]>([
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
  ]);

  onCountrySelected(option: any | null) {
    console.log('Selected country:', option);

    if (option) {
      this.selectedCountry.set(option.value);
      this.countryError.set('');
    } else {
      this.selectedCountry.set('');
      this.countryError.set('Please select a country');
    }
  }

  onCitySelected(option: any | null) {
    console.log('Selected city:', option);
    this.selectedCity.set(option?.value || '');
  }

  onSkillsSelected(options: any | any[]) {
    console.log('Selected skills:', options);

    // Since we know this is multiple selection, cast to array
    const skillsArray = Array.isArray(options) ? options : [options];
    this.selectedSkills.set(skillsArray.map((option) => option.value));
  }
}
