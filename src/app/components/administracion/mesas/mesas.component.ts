import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, finalize } from 'rxjs';
import { Mesa } from 'src/app/interfaces/mesa';
import { MesasService } from 'src/app/services/administracion/mesas.service';
import { CustomMessageService } from 'src/app/services/custom-message.service';
import { ModalMesasComponent } from '../modal-mesas/modal-mesas.component';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent {
  mesas: Mesa[] = [];
  selectedOption!: Mesa;

  constructor(
    private dialogService: DialogService,
    private _mesasServices: MesasService,
    private spinner: NgxSpinnerService,
    private customMessageService: CustomMessageService,
  ) { 
  }

  ngOnInit(): void {
    // Simulación de datos de meseros
    this.mesas = [
      {id: 1, codigo: '1', capacidad: 4, activo: true},
      {id: 2, codigo: '2', capacidad: 4, activo: true},
      {id: 3, codigo: '3', capacidad: 4, activo: true},
      {id: 4, codigo: '4', capacidad: 4, activo: false},
      {id: 5, codigo: '5', capacidad: 4, activo: true},
      {id: 6, codigo: '6', capacidad: 4, activo: true},
      
    ];

    this.obtenerMesas();
   
  }

  obtenerMesas(){ 
    this.spinner.show();

    this._mesasServices.todos()
    .pipe(
      catchError((response) => {
        if( response.status == HttpStatusCode.UnprocessableEntity ){
          this.customMessageService.showWarn( response.error );
        }else{
          this.customMessageService.showError('Ocurrio un error al intentar obtener las mesas');
        }
        return [];
      }),
      finalize(() => this.spinner.hide())
    ).subscribe( (response: Mesa[]) => { 
        this.mesas = response
      }
    );
  }

  nuevaMesa(){
    const ref = this.dialogService.open(ModalMesasComponent, {
      maximizable: true,
      header: 'Nueva mesa',
      width: '25%',
      data: null,
    });
    ref.onClose.subscribe((res) => {
      this.mesas.push(res);
    });
  }

  editarMesa(mesa: Mesa) {
    this.selectedOption = mesa;
    const ref = this.dialogService.open(ModalMesasComponent, {
      maximizable: true,
      header: 'Editar mesa',
      width: '25%',
      data: mesa,
    });
    ref.onClose.subscribe((res) => {
      mesa = res;
    });
  }

  inactivarMesa(mesa: Mesa) {
    if( !mesa ) return;

    this.selectedOption = mesa;
    this.spinner.show();

    this._mesasServices.desactivar( mesa.id!  )
    .pipe(
      catchError((response) => {
        if( response.status == HttpStatusCode.UnprocessableEntity ){
          this.customMessageService.showWarn( response.error );
        }else{
          this.customMessageService.showError('Ocurrio un error al intentar desactivar la mesa');
        }
        return [];
      }),
      finalize(() => this.spinner.hide())
    ).subscribe( (response: any) => { 
      mesa.activo = false;
    });
  }


}
