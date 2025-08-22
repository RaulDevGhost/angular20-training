import {
  Component,
  QueryList,
  ElementRef,
  AfterContentInit,
  AfterViewInit,
  input,
  output,
  viewChild,
  contentChildren,
  effect,
  ContentChildren,
} from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.css',
})
export class FormWrapperComponent implements AfterContentInit, AfterViewInit {
  // Input signals
  title = input<string>('');
  description = input<string>('');
  submitText = input<string>('Submit');
  isLoading = input<boolean>(false);
  showDefaultButtons = input<boolean>(true);
  showDebug = input<boolean>(false);

  // Output signals
  onSubmit = output<any>();
  onCancel = output<void>();
  onFormChange = output<any>();

  // ViewChild for form reference
  formRef = viewChild.required<NgForm>('formRef');

  // ContentChildren using template reference variables
  @ContentChildren('titleInput', { descendants: true })
  titleInputs!: QueryList<ElementRef>;
  @ContentChildren('descriptionTextarea', { descendants: true })
  descriptionTextareas!: QueryList<ElementRef>;
  @ContentChildren('prioritySelect', { descendants: true })
  prioritySelects!: QueryList<ElementRef>;
  @ContentChildren('categorySelect', { descendants: true })
  categorySelects!: QueryList<ElementRef>;
  @ContentChildren('assigneeInput', { descendants: true })
  assigneeInputs!: QueryList<ElementRef>;
  @ContentChildren('dueDateInput', { descendants: true })
  dueDateInputs!: QueryList<ElementRef>;

  // Button references
  @ContentChildren('cancelButton', { descendants: true })
  cancelButtons!: QueryList<ElementRef>;
  @ContentChildren('saveButton', { descendants: true })
  saveButtons!: QueryList<ElementRef>;
  @ContentChildren('submitButton', { descendants: true })
  submitButtons!: QueryList<ElementRef>;

  ngAfterContentInit() {
    const totalElements = this.getProjectedElementsCount();
    if (totalElements > 0) {
      console.log(
        `✅ FormWrapper: ${totalElements} elements projected successfully`
      );
    }
  }

  ngAfterViewInit() {
    // Form value changes
    const form = this.formRef();
    if (form) {
      form.valueChanges?.subscribe((value) => {
        this.onFormChange.emit(value);
      });
    }
  }

  handleSubmit(): void {
    const form = this.formRef();
    if (form?.valid) {
      // Get form data from NgForm
      const formData = form.value;

      // Also get values directly from projected elements as backup
      const directValues = this.getDirectElementValues();

      // Combine both approaches to ensure we get all values
      const combinedData = { ...formData, ...directValues };

      console.log('📤 Form submitted (NgForm):', formData);
      console.log('📤 Direct element values:', directValues);
      console.log('📤 Combined data:', combinedData);

      this.onSubmit.emit(combinedData);
    } else if (form) {
      console.log('❌ Form is invalid');
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].markAsTouched();
      });
    }
  }

  // Method to get values directly from DOM elements
  getDirectElementValues(): any {
    const values: any = {};

    // Get values from projected elements
    if (this.titleInputs?.length > 0) {
      const titleEl = this.titleInputs.first.nativeElement as HTMLInputElement;
      values.title = titleEl.value;
    }

    if (this.descriptionTextareas?.length > 0) {
      const descEl = this.descriptionTextareas.first
        .nativeElement as HTMLTextAreaElement;
      values.description = descEl.value;
    }

    if (this.prioritySelects?.length > 0) {
      const priorityEl = this.prioritySelects.first
        .nativeElement as HTMLSelectElement;
      values.priority = priorityEl.value;
    }

    if (this.categorySelects?.length > 0) {
      const categoryEl = this.categorySelects.first
        .nativeElement as HTMLSelectElement;
      values.category = categoryEl.value;
    }

    if (this.assigneeInputs?.length > 0) {
      const assigneeEl = this.assigneeInputs.first
        .nativeElement as HTMLInputElement;
      values.assignee = assigneeEl.value;
    }

    if (this.dueDateInputs?.length > 0) {
      const dateEl = this.dueDateInputs.first.nativeElement as HTMLInputElement;
      values.dueDate = dateEl.value;
    }

    return values;
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  logProjectedElements(): void {
    console.log('📋 Projected Elements:');
    console.log('- Title Input:', this.titleInputs?.length || 0);
    console.log(
      '- Description Textarea:',
      this.descriptionTextareas?.length || 0
    );
    console.log('- Priority Select:', this.prioritySelects?.length || 0);
    console.log('- Category Select:', this.categorySelects?.length || 0);
    console.log('- Assignee Input:', this.assigneeInputs?.length || 0);
    console.log('- Due Date Input:', this.dueDateInputs?.length || 0);
    console.log('- Cancel Button:', this.cancelButtons?.length || 0);
    console.log('- Save Button:', this.saveButtons?.length || 0);
    console.log('- Submit Button:', this.submitButtons?.length || 0);

    // Also log current values
    const directValues = this.getDirectElementValues();
    console.log('📊 Current form values via @ContentChildren:', directValues);

    const ngFormValues = this.getFormData();
    console.log('📊 Current NgForm values:', ngFormValues);
  }

  // Public API methods
  getProjectedElementsCount(): number {
    return (
      (this.titleInputs?.length || 0) +
      (this.descriptionTextareas?.length || 0) +
      (this.prioritySelects?.length || 0) +
      (this.categorySelects?.length || 0) +
      (this.assigneeInputs?.length || 0) +
      (this.dueDateInputs?.length || 0) +
      (this.cancelButtons?.length || 0) +
      (this.saveButtons?.length || 0) +
      (this.submitButtons?.length || 0)
    );
  }

  // Element access methods
  getTitleInput(): ElementRef | null {
    return this.titleInputs?.first || null;
  }

  getDescriptionTextarea(): ElementRef | null {
    return this.descriptionTextareas?.first || null;
  }

  // Form methods
  getFormData() {
    const form = this.formRef();
    return form?.value || {};
  }

  isFormValid(): boolean {
    const form = this.formRef();
    return form?.valid || false;
  }

  getValidationErrors(): string[] {
    const errors: string[] = [];
    const form = this.formRef();

    if (form?.controls) {
      Object.keys(form.controls).forEach((key) => {
        const control = form.controls[key];
        if (control.invalid && control.touched) {
          if (control.errors?.['required']) {
            errors.push(`${key} is required`);
          }
          if (control.errors?.['email']) {
            errors.push(`${key} must be a valid email`);
          }
          if (control.errors?.['minlength']) {
            errors.push(
              `${key} must be at least ${control.errors?.['minlength'].requiredLength} characters`
            );
          }
        }
      });
    }

    return errors;
  }

  resetForm(): void {
    const form = this.formRef();
    form?.resetForm();
  }

  getFormControl(controlName: string) {
    const form = this.formRef();
    return form?.controls[controlName];
  }
}
