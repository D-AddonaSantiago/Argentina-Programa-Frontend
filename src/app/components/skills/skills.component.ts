import { Component } from '@angular/core';
import { skill } from 'src/app/models/skill.model';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';

interface Skill {
  name: string;
  level: number;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  skills: skill[] = [];
  editingSkill: any = -1;
  tempSkill: skill = new skill("",0);
  isLogged = false;

  constructor(public skillService: SkillService, private tokenService: TokenService){}

  ngOnInit(): void {
    this.skillService.getSkill().subscribe(data => this.skills = data);
    this.isLogged = !!this.tokenService.getToken();
  }

  loadSkills(): void {
    this.skillService.getSkill().subscribe({
      next: (data) => this.skills = data,
      error: (error) => console.error('Error al Cargar Skills: ',error)
    });
  }


  agregarSkill(): void {
    const nuevaSkill: skill = {
      nombre: 'Nueva Skill',
      valor: 0
    };
    this.skillService.postSkill(nuevaSkill).subscribe({
      next: () => this.actuaizarLista(),
      error: (error) => console.error('Error al Agregar Skill: ',error)
    });
  }

  guardarSkill(x: skill) {
    const skill = x;
    this.skillService.editSkill(skill).subscribe({
      next: () => this.actuaizarLista(),
      error: (error) => console.error('Error al Guardar Skill: ',error)
    });
  }

  eliminarSkill(skill: skill): void {
    const id= skill.id;
    this.skillService.deleteSkill(id).subscribe({
      next: () => this.actuaizarLista(),
      error: (error) => console.error('Error al Eliminar Skill: ',error)
    });
  }

  actuaizarLista():void{
    setTimeout(() => this.loadSkills(), 200);
  }
}
