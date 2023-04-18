import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPatientAppointmentComponent } from './book-patient-appointment.component';

describe('BookPatientAppointmentComponent', () => {
  let component: BookPatientAppointmentComponent;
  let fixture: ComponentFixture<BookPatientAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPatientAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
