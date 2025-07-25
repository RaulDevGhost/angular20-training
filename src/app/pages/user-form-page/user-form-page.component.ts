import { Component } from '@angular/core';
import { UserFormComponent } from '../../shared/organisms/user-form/user-form.component';

@Component({
  selector: 'app-user-form-page',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './user-form-page.component.html',
  styleUrl: './user-form-page.component.css',
})
export class UserFormPageComponent {}
