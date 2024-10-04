import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IProduct } from 'src/app/interfaces/product';

@Component({
  selector: 'app-modal-comanda',
  templateUrl: './modal-comanda.component.html',
  styleUrls: ['./modal-comanda.component.css']
})
export class ModalComandaComponent implements OnInit {

  tax         : number = 12; // CAMBIAR POR UN PARAMETRO EN LA BASE DE DATOS
  formComanda : FormGroup;
  filteredProducts!: any[];
  productsSelecteds: IProduct[] = [];
  productSelect!   : IProduct;
  clienteDrop: any;

  products    : IProduct[] = [
    {
      id: 1,
      name: "Smartphone X200",
      code: "SPX200",
      price: 599.99,
      description: "A powerful smartphone with a sleek design.",
      active: true,
      haveTax: true,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      code: "WH500",
      price: 99.99,
      description: "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
      active: true,
      haveTax: false,
    },
    {
      id: 3,
      name: "Laptop Pro 15",
      code: "LP1500",
      price: 1299.99,
      description: "A high-performance laptop for professionals.",
      active: true,
      haveTax: true,
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      code: "MK101",
      price: 74.99,
      description: "A durable and responsive mechanical keyboard with RGB lighting.",
      active: false,
      haveTax: false,
    },
    {
      id: 5,
      name: "Smartwatch G300",
      code: "SWG300",
      price: 199.99,
      description: "A stylish smartwatch with health tracking features.",
      active: true,
      haveTax: true,
    },
  ];
  
  productsCliente: any[] = [
    {
      cliente: 1,
      productos: [

      ]
    }
  ]

  constructor(
    private fb: FormBuilder
  ) {
    this.formComanda = this.fb.group({
      number            : [null],
      selectedProduct   : [null],
      selectedsProducts : this.fb.array([]),
      tax               : [null],
      subTotal          : [null],
    })
    this.filteredProducts = this.products;
  }

  ngOnInit(): void {
    this.suscribeValueChangesFormComanda();
  }

  get selectedsProducts() : FormArray {
    return this.formComanda.get('selectedsProducts') as FormArray;
  }

  addCliente() {
    this.productsCliente.push({
      cliente: this.productsCliente.length + 1,
      productos: []
    })
  }
  
  search(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.products as any[]).length; i++) {
        let product = (this.products as any[])[i];
        if (product.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(product);
        }
    }
    this.filteredProducts = filtered;
  }

  selectProduct(event: any) {
    const SELECTED_PRODUCT_FORM = this.formComanda.get('selectedProduct');
    const SELECTED_PRODUCT_VALUE : IProduct =  SELECTED_PRODUCT_FORM?.value; 
    const PRODUCT_EXIST_CONTROL  = this.existProductInSelectedsProducts(SELECTED_PRODUCT_VALUE.id);
    SELECTED_PRODUCT_FORM?.setValue(null);

    if( PRODUCT_EXIST_CONTROL ) {
      PRODUCT_EXIST_CONTROL.get('quantity')?.setValue(PRODUCT_EXIST_CONTROL.get('quantity')?.value + 1 );
      return;
    }
 
    const PRODUCT_ROW = this.fb.group({
      id           : SELECTED_PRODUCT_VALUE.id,
      name         : SELECTED_PRODUCT_VALUE.name,
      price        : SELECTED_PRODUCT_VALUE.price,
      quantity     : 1,
      // discount     : 0,
      tax          : this.tax,
      total        : this.calculateProductPiceWithTax(SELECTED_PRODUCT_VALUE.price)
    });
    this.suscribeValueChangesProduct(PRODUCT_ROW);
    this.selectedsProducts.push(PRODUCT_ROW);
  }

  existProductInSelectedsProducts(id: number) {
    return this.selectedsProducts.controls.find( controlProduct => controlProduct.get('id')?.value === id);
  }

  suscribeValueChangesProduct(formGroup: FormGroup) {
    formGroup.get('quantity')?.valueChanges.subscribe( resp => {
      formGroup.patchValue({
        total: this.calculateProductPiceWithTax(formGroup.get('price')?.value) * resp
      })
    })

    formGroup.get('price')?.valueChanges.subscribe( resp => {
      formGroup.patchValue({
        total: this.calculateProductPiceWithTax(resp) * formGroup.get('quantity')?.value   
      })
    })
  }

  suscribeValueChangesFormComanda() {
    
    this.selectedsProducts.valueChanges.subscribe( resp => {
      this.calculateTotals();
    })
  }

  calculateTotals() {
    let subTotalComanda = 0;
    let taxComanda      = 0;
    this.selectedsProducts.controls.forEach( product => {
      const PRODUCT_PRICE = product.get('price')?.value * product.get('quantity')?.value ; 
      taxComanda          =   this.calculateTaxProduct(PRODUCT_PRICE) + taxComanda;
      subTotalComanda     =   ( PRODUCT_PRICE ) + subTotalComanda;
    })
    this.formComanda.get('subTotal')?.setValue(subTotalComanda);
    this.formComanda.get('tax')?.setValue(taxComanda);
  }

  removeItem(index: number) {
    this.selectedsProducts.removeAt(index)
  }

  calculateProductPiceWithTax(price: number): number {
    return this.calculateTaxProduct(price) + price;
  }

  calculateTaxProduct(price: number): number {
    return price * (this.tax / 100);
  }

  dragStart(product: IProduct) {
    console.log(product)
  }

  dragEnd(product: IProduct) {
    if( this.clienteDrop )
      this.clienteDrop.productos.push(product);
  }

  drop(cliente: any) {
    this.clienteDrop = cliente;
    console.log('DROP');
  }
}
