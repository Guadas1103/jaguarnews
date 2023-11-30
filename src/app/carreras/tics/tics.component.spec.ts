import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicsComponent } from './tics.component';

describe('TicsComponent', () => {
  let component: TicsComponent;
  let fixture: ComponentFixture<TicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicsComponent]
    });
    fixture = TestBed.createComponent(TicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
