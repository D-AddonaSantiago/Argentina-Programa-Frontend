import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { educacion } from '../models/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiUrl = environment.apiURL + "educacion/"

  constructor(private http: HttpClient) { }

  public getEducacion(): Observable<educacion[]> {
    return this.http.get<educacion[]>(this.apiUrl+'traer');
  }

  public postEducacion(educacion: educacion): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}crear`, educacion);
  }

  public deleteEducacion(id: any): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}borrar/${id}`);
  }

  public editEducacion(educacion: educacion): Observable<educacion> {
    const url = `${this.apiUrl}editar/${educacion.id}`;
    return this.http.put<educacion>(url,educacion);
  }
}
