import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarScolaireComponent } from './navbar-scolaire.component';

describe('NavbarScolaireComponent', () => {
  let component: NavbarScolaireComponent;
  let fixture: ComponentFixture<NavbarScolaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarScolaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
