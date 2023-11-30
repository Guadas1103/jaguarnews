import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresarialComponent } from './empresarial.component';

describe('EmpresarialComponent', () => {
  let component: EmpresarialComponent;
  let fixture: ComponentFixture<EmpresarialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresarialComponent]
    });
    fixture = TestBed.createComponent(EmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
