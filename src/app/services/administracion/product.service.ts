import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';

const PRODUCTS_URL: string = `${environment.baseUrl}/api/products`;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  todos(): Observable<IProduct[]>{
    const GRABAR: string = `${PRODUCTS_URL}/obtenerTodos`;
    return this.http.get<IProduct[]>(GRABAR);
  }

  obtener(): Observable<IProduct[]>{
    const GRABAR: string = `${PRODUCTS_URL}`;
    return this.http.get<IProduct[]>(GRABAR);
  }

  guardar(data: IProduct) : Observable<IProduct> {
    const GRABAR: string = `${PRODUCTS_URL}`;
    return this.http.post<IProduct>(GRABAR, data);
  }

  actualizar(id: number, data: IProduct) : Observable<IProduct> {
    const ACTUALIZAR: string = `${PRODUCTS_URL}/${id}`;
    return this.http.put<IProduct>(ACTUALIZAR, data);
  }

  desactivar(id: number) :  Observable<any>{
    const DESACTIVAR: string = `${PRODUCTS_URL}/${id}`;
    return this.http.put<any>(DESACTIVAR,{activo: false});
  }
}
