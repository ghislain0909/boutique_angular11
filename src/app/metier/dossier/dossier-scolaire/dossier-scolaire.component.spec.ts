import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierScolaireComponent } from './dossier-scolaire.component';

describe('DossierScolaireComponent', () => {
  let component: DossierScolaireComponent;
  let fixture: ComponentFixture<DossierScolaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierScolaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
