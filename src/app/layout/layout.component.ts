import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  headerMenuItems: MenuItem[] = [];
  sideMenuItems: MenuItem[] = [];
  sidebarVisible: boolean = false;

  ngOnInit() {
    // Menú del header
    this.headerMenuItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Facebook', icon: 'pi pi-facebook', url: 'https://www.facebook.com', target: '_blank' },
      { label: 'About', icon: 'pi pi-info-circle', routerLink: ['/about'] }
    ];

    // Menú del sidebar con Administración y Ventas
    this.sideMenuItems = [
      {
        label: 'Administración',
        icon: 'pi pi-fw pi-briefcase',
        expanded: true,
        items: [
          { label: 'Personal', icon: 'pi pi-fw pi-users', routerLink: ['administracion/personal'] },
          { label: 'Meseros', icon: 'pi pi-fw pi-users', routerLink: ['administracion/meseros'] },
          { label: 'Mesas', icon: 'pi pi-fw pi-table', routerLink: ['administracion/mesas'] },
          { label: 'Productos', icon: 'pi pi-fw pi-box', routerLink: ['administracion/productos'] }
        ]
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-shopping-cart',
        expanded: true,
        items: [
          { label: 'Registro Clientes', icon: 'pi pi-fw pi-pencil', routerLink: ['ventas/comanda'] },
          { label: 'Registro Comanda', icon: 'pi pi-fw pi-pencil', routerLink: ['ventas/comanda'] },
          { label: 'Facturación', icon: 'pi pi-fw pi-file', routerLink: ['ventas/facturacion'] }
        ]
      },
      {
        label :'Reportes',
        icon : 'pi pi-fw pi-database',
        expanded : true,
        items : [
          { label: 'Ventas Diarias', icon: 'pi pi-fw pi-dollar', routerLink: ['home'] },
          { label: 'Ventas Mensuales', icon: 'pi pi-fw pi-dollar', routerLink: ['home'] }
        ]
      }
    ];
  }
}
