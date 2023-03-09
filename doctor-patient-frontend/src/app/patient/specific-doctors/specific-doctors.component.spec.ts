import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDoctorsComponent } from './specific-doctors.component';

describe('SpecificDoctorsComponent', () => {
  let component: SpecificDoctorsComponent;
  let fixture: ComponentFixture<SpecificDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
