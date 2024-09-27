import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { InicioComponent } from './components/inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { MeserosComponent } from './components/administracion/meseros/meseros.component';
import { MesasComponent } from './components/administracion/mesas/mesas.component';
import { ProductosComponent } from './components/administracion/productos/productos.component';
import { ComandaComponent } from './components/ventas/comanda/comanda.component';
import { FacturacionComponent } from './components/ventas/facturacion/facturacion.component';

const routes: Routes = [
  { path: '', component: InicioComponent },  // Página de inicio
  { path: 'home', component: LayoutComponent,
    children: [
      { path: 'administracion/meseros', component: MeserosComponent },
      { path: 'administracion/mesas', component: MesasComponent },
      { path: 'administracion/productos', component: ProductosComponent },
      { path: 'ventas/comanda', component: ComandaComponent },
      { path: 'ventas/facturacion', component: FacturacionComponent },
    ]
   },

  { path: '**', redirectTo: '' },  // Redirige cualquier ruta no encontrada a la página de inicio
 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
