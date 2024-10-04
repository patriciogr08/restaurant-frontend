import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu'; 
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'; 
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { NgxSpinnerModule } from 'ngx-spinner';


import { MeserosComponent } from './components/administracion/meseros/meseros.component';
import { MesasComponent } from './components/administracion/mesas/mesas.component';
import { ProductosComponent } from './components/administracion/productos/productos.component';
import { ComandaComponent } from './components/ventas/comanda/comanda.component';
import { FacturacionComponent } from './components/ventas/facturacion/facturacion.component';
import { ModalMeserosComponent } from './components/administracion/modal-meseros/modal-meseros.component';
import { FormControlPipe } from './pipe/form-control.pipe';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ModalMesasComponent } from './components/administracion/modal-mesas/modal-mesas.component';
import { ModalProductosComponent } from './components/administracion/modal-productos/modal-productos.component';
import { ModalComandaComponent } from './components/ventas/modal-comanda/modal-comanda.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DragDropModule } from 'primeng/dragdrop';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LayoutComponent,
    MeserosComponent,
    MesasComponent,
    ProductosComponent,
    ComandaComponent,
    FacturacionComponent,
    ModalMeserosComponent,
    FormControlPipe,
    ModalMesasComponent,
    ModalProductosComponent,
    ModalComandaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MenubarModule,     // Módulo para el Menubar (header)
    PanelMenuModule,   // Módulo para el PanelMenu (sidebar)
    ToolbarModule,
    SidebarModule,   // Módulo del Sidebar
    ButtonModule,    // Módulo del botón
    TableModule,  // Importa el módulo para las tablas
    InputTextModule,
    ToastModule,
    AutoCompleteModule,
    FormsModule,
    InputNumberModule,
    InputMaskModule,
    DragDropModule
  ],
  providers: [
    DialogService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
