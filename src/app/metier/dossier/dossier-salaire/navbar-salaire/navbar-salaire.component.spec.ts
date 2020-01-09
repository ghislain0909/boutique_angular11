import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSalaireComponent } from './navbar-salaire.component';

describe('NavbarSalaireComponent', () => {
  let component: NavbarSalaireComponent;
  let fixture: ComponentFixture<NavbarSalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
