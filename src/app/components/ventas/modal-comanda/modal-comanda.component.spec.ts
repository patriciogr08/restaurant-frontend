import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComandaComponent } from './modal-comanda.component';

describe('ModalComandaComponent', () => {
  let component: ModalComandaComponent;
  let fixture: ComponentFixture<ModalComandaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComandaComponent]
    });
    fixture = TestBed.createComponent(ModalComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
