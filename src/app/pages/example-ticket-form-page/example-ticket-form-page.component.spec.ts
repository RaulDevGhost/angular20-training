import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTicketFormPageComponent } from './example-ticket-form-page.component';

describe('ExampleTicketFormPageComponent', () => {
  let component: ExampleTicketFormPageComponent;
  let fixture: ComponentFixture<ExampleTicketFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTicketFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleTicketFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
