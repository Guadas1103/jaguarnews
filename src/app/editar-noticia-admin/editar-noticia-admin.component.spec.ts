import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNoticiaAdminComponent } from './editar-noticia-admin.component';

describe('EditarNoticiaAdminComponent', () => {
  let component: EditarNoticiaAdminComponent;
  let fixture: ComponentFixture<EditarNoticiaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarNoticiaAdminComponent]
    });
    fixture = TestBed.createComponent(EditarNoticiaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
