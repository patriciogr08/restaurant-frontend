import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, finalize } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/administracion/product.service';
import { CustomMessageService } from 'src/app/services/custom-message.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit{

  constructor(
    private config               : DynamicDialogConfig,
    private fb                   : FormBuilder,
    private ref                  : DynamicDialogRef,
    private spinner              : NgxSpinnerService,
    private customMessageService : CustomMessageService,
    private _productService      : ProductService

  ) {
    this.product = this.config.data;
  }

  product ?: IProduct;
  
  formProduct: FormGroup = this.fb.group({
    id               : [{ value: null, disabled: true } ],
    name             : [null, ],
    code             : [null, ],
    description      : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    price            : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    haveTax          : [true, ],
    active           : [true, Validators.required],
  });

  ngOnInit(): void {
    this.setValueForm();
  }

  setValueForm() {
    if( this.product ) {
      this.formProduct.patchValue(this.product);
    }
  }

  saveOrUpdate( ){
    this.formProduct.markAllAsTouched();

    if( this.formProduct.invalid ) {
      this.customMessageService.showWarn('Llenar los datos obligatorios');
      return;
    }

    const ID = this.formProduct.get('id')?.value;
    const BODY = this.formProduct.getRawValue();

    if( !ID ) this.save(BODY);
    else this.update(ID, BODY);
  }

  save(data : IProduct ){
    this.spinner.show();
    this._productService.guardar(data)
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
    ).subscribe( (response: IProduct) => { 
        this.customMessageService.showSuccess('Producto guardado');
        this.ref.close(response);
      }
    );
  }

  update(id:number , data: IProduct ){
    this.spinner.show();
    this._productService.actualizar(id,data)
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
    ).subscribe( (response: IProduct) => { 
        this.customMessageService.showSuccess('Mesero actualizado');
        this.ref.close(response);
      }
    );
  }


  closeModal() {
    this.ref.close();
  }
}
