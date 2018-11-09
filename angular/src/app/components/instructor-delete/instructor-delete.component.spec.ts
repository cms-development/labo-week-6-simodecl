import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeleteComponent } from './instructor-delete.component';

describe('InstructorDeleteComponent', () => {
  let component: InstructorDeleteComponent;
  let fixture: ComponentFixture<InstructorDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
