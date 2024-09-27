import { Component } from '@angular/core';
import { Mesero } from 'src/app/interfaces/mesero';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalMeserosComponent } from '../modal-meseros/modal-meseros.component';
import { MeseroService } from 'src/app/services/administracion/mesero.service';
import { catchError, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomMessageService } from 'src/app/services/custom-message.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-meseros',
  templateUrl: './meseros.component.html',
  styleUrls: ['./meseros.component.css']
})
export class MeserosComponent {
  meseros: Mesero[] = [];
  selectedOption!: Mesero;

  constructor(
    private dialogService: DialogService,
    private _meseroServices: MeseroService,
    private spinner: NgxSpinnerService,
    private customMessageService: CustomMessageService,
  ) { 
  }


  ngOnInit(): void {
    // Simulación de datos de meseros
    this.meseros = [
      { id: 1, cedula: '1234567890', nombres: 'Juan', apellidos: 'Pérez', celular: '0991234567', activo: true },
      { id: 2, cedula: '0987654321', nombres: 'María', apellidos: 'García', celular: '0987654321', activo: false },
      { id: 3, cedula: '0987654321', nombres: 'María', apellidos: 'García', celular: '0987654321', activo: false },
      { id: 4, cedula: '0987654321', nombres: 'María', apellidos: 'García', celular: '0987654321', activo: false },
      { id: 5, cedula: '1122334455', nombres: 'Carlos', apellidos: 'Ramírez', celular: '0912345678', activo: true }
    ];

    this.obtenerMeseros();
  }

  obtenerMeseros(){
    this.spinner.show();

    this._meseroServices.todos()
    .pipe(
      catchError((response) => {
        if( response.status == HttpStatusCode.UnprocessableEntity ){
          this.customMessageService.showWarn( response.error );
        }else{
          this.customMessageService.showError('Ocurrio un error al intentar obtener los meseros');
        }
        return [];
      }),
      finalize(() => this.spinner.hide())
    ).subscribe( (response: Mesero[]) => { 
        this.meseros = response
      }
    );
  }
  

  editarMesero(mesero: Mesero) {
    this.selectedOption = mesero;
    const ref = this.dialogService.open(ModalMeserosComponent, {
      maximizable: true,
      header: 'Nuevo mesero',
      width: '25%',
      data: mesero,
    });
    ref.onClose.subscribe((res) => {
      mesero = res;
    });
  }

  nuevoMesero() {
    const ref = this.dialogService.open(ModalMeserosComponent, {
      maximizable: true,
      header: 'Nuevo mesero',
      width: '25%',
      data: null,
    });
    ref.onClose.subscribe((res) => {
      this.meseros.push(res);
    });
  }

  
  inactivarMesero(mesero: Mesero) {
    if( !mesero ) return;

    this.selectedOption = mesero;
    this.spinner.show();

    this._meseroServices.desactivar( mesero.id!  )
    .pipe(
      catchError((response) => {
        if( response.status == HttpStatusCode.UnprocessableEntity ){
          this.customMessageService.showWarn( response.error );
        }else{
          this.customMessageService.showError('Ocurrio un error al intentar desactivar el mesero');
        }
        return [];
      }),
      finalize(() => this.spinner.hide())
    ).subscribe( (response: any) => { 
      mesero.activo = false;
      }
    );
  }


}
