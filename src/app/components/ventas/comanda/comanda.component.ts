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
      ocupado: true,
    },
    {
      id: 2,
      ocupado: false,
    },
    {
      id: 3,
      ocupado: false,
    },
    {
      id: 4,
      ocupado: false,
    },
    {
      id: 5,
      ocupado: true,
    },
    {
      id: 6,
      ocupado: false,
    },
    {
      id: 7,
      ocupado: true,
    },
    {
      id: 8,
      ocupado: false,
    },
  ];

  openComanda(i: number, facturar: boolean) {
    this.dialogService.open(ModalComandaComponent, {
      data: {
        facturar
      },
      width: facturar ? '99%' : '49%'
    })
  }
}
