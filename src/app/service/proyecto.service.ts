import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = environment.apiURL + 'proyecto/';

  constructor(private http: HttpClient) { }

  public getProyecto(): Observable<proyecto[]> {
    return this.http.get<proyecto[]>(this.apiUrl + 'traer');
  }

  public postProyecto(proyecto: proyecto): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'crear', proyecto);
  }

  public deleteProyecto(id: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + `borrar/${id}`);
  }

  public editProyecto(proyecto: proyecto): Observable<proyecto> {
    const url = `${this.apiUrl}editar/${proyecto.id}`;
    return this.http.put<proyecto>(url, proyecto);
  }
}
