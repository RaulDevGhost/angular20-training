import { Component, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormWrapperComponent } from '../../shared/organisms/form-wrapper/form-wrapper.component';

interface TicketData {
  title: string;
  description: string;
  priority: string;
  category: string;
  assignee: string;
  dueDate: string;
}

@Component({
  selector: 'app-ticket-form-page',
  standalone: true,
  imports: [FormsModule, CommonModule, FormWrapperComponent],
  templateUrl: './ticket-form-page.component.html',
  styleUrl: './ticket-form-page.component.css',
})
export class TicketFormPageComponent {
  formWrapper = viewChild<FormWrapperComponent>(FormWrapperComponent);

  // Component signals
  isSubmitting = signal(false);
  isEditing = signal(false);

  // Component properties
  formTitle = 'Create New Ticket';
  formDescription = 'Fill out the form below to create a new support ticket';
  minDate = new Date().toISOString().split('T')[0];

  // Ticket data model
  ticketData: TicketData = {
    title: '',
    description: '',
    priority: '',
    category: '',
    assignee: '',
    dueDate: '',
  };

  handleTicketSubmit(formData: any) {
    console.log('🎯 === TICKET SUBMISSION DEBUG ===');
    console.log('📦 Received form data:', formData);
    console.log('📊 Current component data:', this.ticketData);
    console.log('📋 Form data keys:', Object.keys(formData));
    console.log('📋 Form data values:', Object.values(formData));

    // Check which data source has values
    const hasFormData = Object.values(formData).some(
      (value) => value !== '' && value !== null && value !== undefined
    );
    const hasComponentData = Object.values(this.ticketData).some(
      (value) => value !== '' && value !== null && value !== undefined
    );

    console.log('✅ Form data has values:', hasFormData);
    console.log('✅ Component data has values:', hasComponentData);

    // Use the data source that has values
    const dataToSubmit = hasFormData ? formData : this.ticketData;

    console.log('📤 Final data to submit:', dataToSubmit);

    this.isSubmitting.set(true);

    // Simulate API call
    setTimeout(() => {
      console.log('✅ Ticket created/updated successfully:', dataToSubmit);
      alert(
        `Ticket ${
          this.isEditing() ? 'updated' : 'created'
        } successfully!\n\nData: ${JSON.stringify(dataToSubmit, null, 2)}`
      );
      this.isSubmitting.set(false);
    }, 2000);
  }

  handleCancel() {
    console.log('🚫 Ticket form cancelled');
    if (
      confirm(
        'Are you sure you want to cancel? Any unsaved changes will be lost.'
      )
    ) {
      this.clearForm();
    }
  }

  handleFormChange(formData: any) {
    console.log('🔄 Form data changed:', formData);
    // Update component data when form changes
    Object.assign(this.ticketData, formData);
  }

  saveDraft() {
    console.log('💾 Saving draft...');

    // Get current form values from the wrapper
    const wrapper = this.formWrapper();
    if (wrapper) {
      const currentFormData = wrapper.getFormData();
      const directValues = wrapper.getDirectElementValues();

      console.log('💾 Draft - NgForm data:', currentFormData);
      console.log('💾 Draft - Direct values:', directValues);

      // Use whichever has more complete data
      const draftData =
        Object.keys(directValues).length > Object.keys(currentFormData).length
          ? directValues
          : currentFormData;

      console.log('💾 Saving draft data:', draftData);
      alert(`Draft saved!\n\nData: ${JSON.stringify(draftData, null, 2)}`);
    }
  }

  loadSampleData() {
    this.ticketData = {
      title: 'Sample Ticket - Login Issue',
      description:
        'Users are experiencing difficulties logging into the application. The issue appears to be related to the authentication service.',
      priority: 'high',
      category: 'bug',
      assignee: 'john.doe@example.com',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };
    this.isEditing.set(true);
    this.formTitle = 'Edit Ticket';
    this.formDescription = 'Update the ticket information below';

    console.log('📝 Sample data loaded:', this.ticketData);
  }

  clearForm() {
    this.ticketData = {
      title: '',
      description: '',
      priority: '',
      category: '',
      assignee: '',
      dueDate: '',
    };
    this.isEditing.set(false);
    this.formTitle = 'Create New Ticket';
    this.formDescription =
      'Fill out the form below to create a new support ticket';

    const wrapper = this.formWrapper();
    if (wrapper) {
      wrapper.resetForm();
    }

    console.log('🗑️ Form cleared');
  }

  logFormStatus() {
    const wrapper = this.formWrapper();
    if (wrapper) {
      console.log('📊 === FORM STATUS DEBUG ===');
      console.log('✅ Form Valid:', wrapper.isFormValid());
      console.log('📦 NgForm Data:', wrapper.getFormData());
      console.log(
        '📋 Direct Element Values:',
        wrapper.getDirectElementValues()
      );
      console.log(
        '🎯 Projected Elements Count:',
        wrapper.getProjectedElementsCount()
      );
      console.log('📊 Component Data:', this.ticketData);

      // Check for discrepancies
      const ngFormData = wrapper.getFormData();
      const directData = wrapper.getDirectElementValues();

      console.log('🔍 Data Comparison:');
      console.log(
        '- NgForm vs Direct values match:',
        JSON.stringify(ngFormData) === JSON.stringify(directData)
      );
      console.log(
        '- NgForm vs Component data match:',
        JSON.stringify(ngFormData) === JSON.stringify(this.ticketData)
      );
    } else {
      console.log('❌ Form wrapper not found');
    }
  }
}
