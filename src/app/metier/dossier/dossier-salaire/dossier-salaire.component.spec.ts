import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSalaireComponent } from './dossier-salaire.component';

describe('DossierSalaireComponent', () => {
  let component: DossierSalaireComponent;
  let fixture: ComponentFixture<DossierSalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierSalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
