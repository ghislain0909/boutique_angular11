import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneurComponent } from './donneur.component';

describe('DonneurComponent', () => {
  let component: DonneurComponent;
  let fixture: ComponentFixture<DonneurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonneurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
