import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, finalize } from 'rxjs';
import { Mesa } from 'src/app/interfaces/mesa';
import { MesasService } from 'src/app/services/administracion/mesas.service';
import { CustomMessageService } from 'src/app/services/custom-message.service';

@Component({
  selector: 'app-modal-mesas',
  templateUrl: './modal-mesas.component.html',
  styleUrls: ['./modal-mesas.component.css']
})
export class ModalMesasComponent implements OnInit {

  mesa ?: Mesa;

  formMesa: FormGroup = this.fb.group({
    id               : [{ value: null, disabled: true } ],
    codigo           : [null, [Validators.required] ],
    capacidad        : [null,],
    activo           : [true, Validators.required],
  });

  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private customMessageService: CustomMessageService,
    private _mesasServices: MesasService,
  ) { 
    this.mesa = this.config.data;
  }


  ngOnInit(): void {
    this.setValuesForm();
  }

  setValuesForm(){
    if( this.mesa ){
      this.formMesa.patchValue({
        id        : this.mesa.id,
        codigo    : this.mesa.codigo,
        capacidad : this.mesa.capacidad,
        activo    : this.mesa.activo
      });
    }
  }

  saveOrUpdate(){
    this.formMesa.markAllAsTouched();
    if( this.formMesa.invalid ){
      this.customMessageService.showWarn('Llenar los datos Obligatorios!');
      return;
    }

    const ID = this.formMesa.get('id')?.value
    const BODY = this.formMesa.getRawValue();

    if( !ID )
      this.save(BODY);
    else
      this.update(ID,BODY)

  }

  save(body: Mesa){
    this.spinner.show();
    this._mesasServices.guardar( body )
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
    ).subscribe( (response: Mesa) => { 
        this.customMessageService.showSuccess('Mesa guardada');
        this.ref.close(response);
      }
    );
  }
  
  update(id:number , data: Mesa ){
    this.spinner.show();
    this._mesasServices.actualizar(id,data)
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
    ).subscribe( (response: Mesa) => { 
      this.customMessageService.showSuccess('Mesa actualizada');
        this.ref.close(response);
      }
    );
  }

  closeModal(): void {
    this.ref.close(null);
  }

}
