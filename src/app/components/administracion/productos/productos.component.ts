import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { IProduct } from 'src/app/interfaces/product';
import { ModalProductosComponent } from '../modal-productos/modal-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  constructor(
    private dialogService: DialogService,

  ) {

  }

  selectedOption! : IProduct;

  productos: IProduct[] = [
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

  obtenerProductos() {
    return [];
  }

  nuevoProducto() {
    this.dialogService.open(ModalProductosComponent, {

    })
    console.log('nuevoProducto');
  }

  editarProducto(producto: IProduct) {
    this.dialogService.open(ModalProductosComponent, {
      data: producto
    })
  }

  inactivarProducto(producto: IProduct) {
    console.log('Inactivar producto');
  }
}
