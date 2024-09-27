import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, finalize } from 'rxjs';
import { Mesero } from 'src/app/interfaces/mesero';
import { MeseroService } from 'src/app/services/administracion/mesero.service';
import { CustomMessageService } from 'src/app/services/custom-message.service';

@Component({
  selector: 'app-modal-meseros',
  templateUrl: './modal-meseros.component.html',
  styleUrls: ['./modal-meseros.component.css']
})
export class ModalMeserosComponent implements OnInit {

  mesero ?: Mesero;

  formMesero: FormGroup = this.fb.group({
    id               : [{ value: null, disabled: true } ],
    cedula           : [null, ],
    nombres          : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    apellidos        : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    celular          : [null, ],
    activo           : [true, Validators.required],
  });

  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private customMessageService: CustomMessageService,
    private _meseroServices: MeseroService,

  ) {
      this.mesero =this.config.data;
   }


  ngOnInit(): void {
    this.setValueForm();
  }

  setValueForm(){
    if( this.mesero ){
      this.formMesero.patchValue({
        id       : this.mesero.id,
        cedula   : this.mesero.cedula,
        nombres  : this.mesero.nombres,
        apellidos: this.mesero.apellidos,
        celular  : this.mesero.celular,
        activo   : this.mesero.activo
      });
    }
  }

  saveOrUpdate(){
    this.formMesero.markAllAsTouched();
    
    if ( this.formMesero.invalid ){
      this.customMessageService.showWarn('Llenar los datos Obligatorios!');
      return;
    }

    const ID = this.formMesero.get('id')?.value
    const BODY = this.formMesero.getRawValue();
    if( !ID )
      this.save(BODY);
    else
      this.update(ID,BODY)

  }

  save(data : Mesero ){
    this.spinner.show();
    this._meseroServices.guardar(data)
    .pipe(
      catchError((response) => {
        if( response.status == HttpStatusCode.UnprocessableEntity ){
          this.customMessageService.showWarn( response.error );
        }else{
          this.customMessageService.showError('No se pudo guardar la información');
        }
        return [];
      }),
      finalize(() => this.spinner.hide())
    ).subscribe( (response: Mesero) => { 
        this.customMessageService.showSuccess('Mesero guardado');
        this.ref.close(response);
      }
    );
  }

  update(id:number , data: Mesero ){
    this.spinner.show();
    this._meseroServices.actualizar(id,data)
    .pipe(
      catchError((response) => {
        if( response.status == HttpStatusCode.UnprocessableEntity ){
          this.customMessageService.showWarn( response.error );
        }else{
          this.customMessageService.showError('No se pudo actualizar la información');
        }
        return [];
      }),
      finalize(() => this.spinner.hide())
    ).subscribe( (response: Mesero) => { 
        this.customMessageService.showSuccess('Mesero actualizado');
        this.ref.close(response);
      }
    );
  }


  closeModal(): void {
    this.ref.close(null);
  }

}
