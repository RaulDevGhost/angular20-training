import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFormPageComponent } from './ticket-form-page.component';

describe('TicketFormPageComponent', () => {
  let component: TicketFormPageComponent;
  let fixture: ComponentFixture<TicketFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
