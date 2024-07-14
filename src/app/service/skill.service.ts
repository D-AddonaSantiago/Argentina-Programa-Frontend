import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = environment.apiURL + "skill/"

  constructor(private http: HttpClient) { }

  public getSkill(): Observable<skill[]> {
    return this.http.get<skill[]>(this.apiUrl+'traer');
  }

  public postSkill(skill: skill): Observable<string>{
    return this.http.post<string>(`${this.apiUrl}crear`,skill);
  }

  public deleteSkill(id: any): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}borrar/${id}`);
  }

  public editSkill(skill: skill): Observable<skill> {
    const url = `${this.apiUrl}editar/${skill.id}?nombre=${skill.nombre}&valor=${skill.valor}`;
    return this.http.put<skill>(url, null);
  }
}
