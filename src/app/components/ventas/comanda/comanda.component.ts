import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { IComanda } from 'src/app/interfaces/comanda';
import { ModalComandaComponent } from '../modal-comanda/modal-comanda.component';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css']
})
export class ComandaComponent {

  constructor(
    private dialogService: DialogService,
  ) {

  }

  comandas : IComanda[] = [
    {
      id: 1,
    },
    {
      id: 2
    },
    {
      id: 2
    },
    {
      id: 2
    },
    {
      id: 2
    },
    {
      id: 2
    },
    {
      id: 2
    },
    {
      id: 2
    },
  ];

  openComanda(i: number) {
    this.dialogService.open(ModalComandaComponent, {})
  }
}
