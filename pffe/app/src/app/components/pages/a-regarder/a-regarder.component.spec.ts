import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARegarderComponent } from './a-regarder.component';

describe('ARegarderComponent', () => {
  let component: ARegarderComponent;
  let fixture: ComponentFixture<ARegarderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ARegarderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ARegarderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
