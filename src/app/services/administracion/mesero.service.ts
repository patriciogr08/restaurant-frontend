import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesero } from 'src/app/interfaces/mesero';
import { environment } from 'src/environments/environment';

const MESEROS_URL: string = `${environment.baseUrl}/api/meseros`;


@Injectable({
  providedIn: 'root'
})
export class MeseroService {

  constructor(private http: HttpClient) {}

  todos(): Observable<Mesero[]>{
    const GRABAR: string = `${MESEROS_URL}/obtenerTodos`;
    return this.http.get<Mesero[]>(GRABAR);
  }

  obtener(): Observable<Mesero[]>{
    const GRABAR: string = `${MESEROS_URL}`;
    return this.http.get<Mesero[]>(GRABAR);
  }

  guardar(data: Mesero) : Observable<Mesero> {
    const GRABAR: string = `${MESEROS_URL}`;
    return this.http.post<Mesero>(GRABAR, data);
  }

  actualizar(id: number, data: Mesero) : Observable<Mesero> {
    const ACTUALIZAR: string = `${MESEROS_URL}/${id}`;
    return this.http.put<Mesero>(ACTUALIZAR, data);
  }

  desactivar(id: number) :  Observable<any>{
    const DESACTIVAR: string = `${MESEROS_URL}/${id}`;
    return this.http.put<any>(DESACTIVAR,{activo: false});
  }
}
