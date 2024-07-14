import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit{

  personaLocal: persona = new persona("","","","")
  editing:boolean = false;
  tempContentMe: persona = new persona("","","","");

  constructor(public personaService: PersonaService,
    private tokenService: TokenService){}

  isLogged = false;

  ngOnInit(): void {
    this.personaService.getPersona().subscribe((data) => this.personaLocal = data);
    this.isLogged = !!this.tokenService.getToken();
  }

  loadAboutMe(): void {
    this.personaService.getPersona().subscribe({
      next: (data) => this.personaLocal = data,
      error: (error) => console.error('Error al Cargar la persona (about-me):', error)
    });
  }

  editarPersona(){
    this.personaLocal.about_me = this.tempContentMe.about_me;
    this.personaService.editPersona(this.personaLocal).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Editar persona: ',error)
    });
  }

  actualizarLista(): void {
    setTimeout(() => {
      this.loadAboutMe();
    }, 200);
  }
}
