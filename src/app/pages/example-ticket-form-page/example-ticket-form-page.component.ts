import { Component, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketFormPageComponent } from '../ticket-form-page/ticket-form-page.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example-ticket-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketFormPageComponent],
  templateUrl: './example-ticket-form-page.component.html',
  styleUrl: './example-ticket-form-page.component.css',
})
export class ExampleTicketFormPageComponent {}
