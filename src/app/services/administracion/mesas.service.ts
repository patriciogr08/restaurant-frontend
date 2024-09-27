import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa } from 'src/app/interfaces/mesa';
import { environment } from 'src/environments/environment';

const MESAS_URL: string = `${environment.baseUrl}/api/mesas`;


@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private http: HttpClient) {}

  todos(): Observable<Mesa[]>{
    const GRABAR: string = `${MESAS_URL}/obtenerTodos`;
    return this.http.get<Mesa[]>(GRABAR);
  }

  obtener(): Observable<Mesa[]>{
    const GRABAR: string = `${MESAS_URL}`;
    return this.http.get<Mesa[]>(GRABAR);
  }

  guardar(data: Mesa) : Observable<Mesa> {
    const GRABAR: string = `${MESAS_URL}`;
    return this.http.post<Mesa>(GRABAR, data);
  }

  actualizar(id: number, data: Mesa) : Observable<Mesa> {
    const ACTUALIZAR: string = `${MESAS_URL}/${id}`;
    return this.http.put<Mesa>(ACTUALIZAR, data);
  }

  desactivar(id: number) :  Observable<any>{
    const DESACTIVAR: string = `${MESAS_URL}/${id}`;
    return this.http.put<any>(DESACTIVAR,{activo: false});
  }
}
