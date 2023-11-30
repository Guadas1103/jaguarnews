import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioquimicaComponent } from './bioquimica.component';

describe('BioquimicaComponent', () => {
  let component: BioquimicaComponent;
  let fixture: ComponentFixture<BioquimicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioquimicaComponent]
    });
    fixture = TestBed.createComponent(BioquimicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
