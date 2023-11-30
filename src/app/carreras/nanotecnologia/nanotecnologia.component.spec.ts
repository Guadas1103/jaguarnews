import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanotecnologiaComponent } from './nanotecnologia.component';

describe('NanotecnologiaComponent', () => {
  let component: NanotecnologiaComponent;
  let fixture: ComponentFixture<NanotecnologiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NanotecnologiaComponent]
    });
    fixture = TestBed.createComponent(NanotecnologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
