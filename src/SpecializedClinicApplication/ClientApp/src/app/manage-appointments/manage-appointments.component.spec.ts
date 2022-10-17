import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageAppointmentsComponent } from './manage-appointments.component';

describe('ManageClientsComponent', () => {
  let component: ManageAppointmentsComponent;
  let fixture: ComponentFixture<ManageAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
