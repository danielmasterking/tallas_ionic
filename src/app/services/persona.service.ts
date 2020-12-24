import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
    ) { }

  obtenerRegistros() {
    return this.http.get(this.baseUrl + 'accion=listado');
  }

  obtenerRegistro(id:number) {
    return this.http.get(this.baseUrl + 'accion=obtenerRegistro&id='+id);
  }

  actualizarRegistro(body) {
    return this.http.post(this.baseUrl + 'accion=actualizar', JSON.stringify(body));
  }

  crearRegistro(body) {
    return this.http.post(this.baseUrl + 'accion=crear', JSON.stringify(body));
  }

  eliminar(id){
    return this.http.get(this.baseUrl + 'accion=eliminar&id=' + id);
  }
} 
