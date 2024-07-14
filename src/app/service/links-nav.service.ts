import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { linksNav } from '../models/linksNav.model';

@Injectable({
  providedIn: 'root'
})

  export class LinksNavService {
    private apiUrl = environment.apiURL + "linksNav/"

    constructor(private http: HttpClient) {}

    public getLinksNav(): Observable<linksNav[]>{
      return this.http.get<linksNav[]>(`${this.apiUrl}traer`);
    }

    public postLinksNav(linkNav: linksNav): Observable<string>{
      return this.http.post<string>(`${this.apiUrl}crear`, linkNav);
    }

    public deleteLinksNav(id: any): Observable<string> {
      return this.http.delete<string>(`${this.apiUrl}borrar/${id}`);
    }

    public editLinksNav(link: linksNav): Observable<linksNav> {
      const url = `${this.apiUrl}editar/${link.id}?title=${link.title}&url=${link.url}`;
      return this.http.put<linksNav>(url, null);
    }
}
