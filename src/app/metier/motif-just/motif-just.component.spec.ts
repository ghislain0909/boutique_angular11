import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifJustComponent } from './motif-just.component';

describe('MotifJustComponent', () => {
  let component: MotifJustComponent;
  let fixture: ComponentFixture<MotifJustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotifJustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifJustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
