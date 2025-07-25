import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms/input/input.component';
import {
  DropdownComponent,
  DropdownOption,
} from '../../atoms/dropdown/dropdown.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import {
  UserFormService,
  User,
  ProjectFormData,
} from '../../../services/forms/user-form.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, InputComponent, DropdownComponent, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  private readonly userFormService = inject(UserFormService);

  private _technologyInput = signal<string>('');
  private _isSubmitting = signal<boolean>(false);

  readonly formData = this.userFormService.formData;
  readonly projectInputs = this.userFormService.projectInputs;
  readonly currentProject = this.userFormService.currentProject;
  readonly actualPreviousProjects = this.userFormService.actualPreviousProjects;
  readonly formValidation = this.userFormService.formValidation;

  readonly technologyInput = computed(() => this._technologyInput());
  readonly isSubmitting = computed(() => this._isSubmitting());

  readonly technologiesText = computed(
    () => this.formData().technologies?.join(', ') || ''
  );

  readonly clientOptions: DropdownOption[] = [
    { value: 'Siemens', label: 'Siemens' },
    { value: 'Bayern', label: 'Bayern' },
    { value: '3M', label: '3M' },
    { value: 'Bosch', label: 'Bosch' },
  ];

  readonly specialistOptions: DropdownOption[] = [
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'fullstack', label: 'Fullstack Developer' },
    { value: 'mobile', label: 'Mobile Developer' },
    { value: 'qa', label: 'QA Engineer' },
    { value: 'architect', label: 'Solution Architect' },
  ];

  readonly levelOptions: DropdownOption[] = [
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid-Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
    { value: 'principal', label: 'Principal' },
  ];

  readonly languageOptions: DropdownOption[] = [
    { value: 'english', label: 'English' },
    { value: 'german', label: 'German' },
  ];

  constructor() {
    // Effect for debugging (remove in production)
    effect(() => {
      console.log('Form state:', {
        formData: this.formData(),
        projectInputs: this.projectInputs(),
        actualProjects: this.actualPreviousProjects(),
        currentProject: this.currentProject(),
        validation: this.formValidation(),
      });
    });
  }

  // Basic field updates
  updateField<K extends keyof User>(field: K, value: User[K]): void {
    this.userFormService.updateField(field, value);
  }

  // Specialized dropdown updates
  updateSpecialist(value: string | string[]): void {
    this.userFormService.updateSpecialist(value);
  }

  updateLevel(value: string | string[]): void {
    this.userFormService.updateLevel(value);
  }

  updateLanguages(value: string | string[]): void {
    this.userFormService.updateLanguages(value);
  }

  updateNumericField(
    field: 'years_in_company' | 'client_satisfaction' | 'job_happiness',
    value: string
  ): void {
    this.userFormService.updateNumericField(field, value);
  }

  // Current project updates
  updateCurrentProject<K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ): void {
    this.userFormService.updateCurrentProject(field, value);
  }

  updateCurrentProjectClient(value: string | string[]): void {
    this.userFormService.updateCurrentProjectClient(value);
  }

  // Technology management (UI + Service)
  updateTechnologyInput(value: string): void {
    this._technologyInput.set(value);
  }

  addTechnology(): void {
    const tech = this.technologyInput().trim();
    if (!tech) return;

    const success = this.userFormService.addTechnology(tech);
    if (!success) {
      alert(`"${tech}" is already added!`);
      return;
    }

    this._technologyInput.set(''); // Clear UI input
  }

  removeTechnology(index: number): void {
    this.userFormService.removeTechnology(index);
  }

  // Project management
  addProject(): void {
    this.userFormService.addProject();
  }

  removeProject(projectId: string): void {
    this.userFormService.removeProject(projectId);
  }

  updateProject(projectId: string, field: any, value: string): void {
    this.userFormService.updateProject(projectId, field, value);
  }

  updateProjectClient(projectId: string, value: string | string[]): void {
    this.userFormService.updateProjectClient(projectId, value);
  }

  // Utility methods
  trackByProjectId(index: number, project: any): string {
    return project.id;
  }

  getFieldError(field: string): string {
    return this.userFormService.getFieldError(field);
  }

  async onSubmit(): Promise<void> {
    if (!this.formValidation().isValid) {
      console.error('Form is invalid:', this.formValidation().errors);
      return;
    }

    this._isSubmitting.set(true);

    try {
      const userData = this.userFormService.prepareFormDataForSubmission();

      console.log('Submitting user data:', userData);
      console.log('Projects from form data:', userData.projects);
      console.log('Project inputs (UI state):', this.projectInputs());

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('User data submitted successfully!');
      this.resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      this._isSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.userFormService.resetForm();
    this._technologyInput.set('');
  }

  // Method to load existing user data (for edit mode)
  loadUser(user: User): void {
    this.userFormService.loadUserData(user);
  }
}
