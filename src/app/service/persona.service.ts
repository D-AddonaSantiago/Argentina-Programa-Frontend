import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = environment.apiURL + 'personas/';

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<persona> {
    return this.http.get<persona>(this.apiUrl + 'traer/perfil');
  }

  public editPersona(persona: persona): Observable<persona> {
    const url = `${this.apiUrl}editar/${persona.id}`;
    return this.http.put<persona>(url, persona);
  }
}
