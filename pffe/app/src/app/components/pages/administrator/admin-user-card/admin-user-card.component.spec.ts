import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserCardComponent } from './admin-user-card.component';

describe('AdminUserCardComponent', () => {
  let component: AdminUserCardComponent;
  let fixture: ComponentFixture<AdminUserCardComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
