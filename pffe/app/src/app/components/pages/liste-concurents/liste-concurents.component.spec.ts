import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConcurentsComponent } from './liste-concurents.component';

describe('ListeConcurentsComponent', () => {
  let component: ListeConcurentsComponent;
  let fixture: ComponentFixture<ListeConcurentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeConcurentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeConcurentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
