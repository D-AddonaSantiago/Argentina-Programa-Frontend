import { Component, OnInit } from '@angular/core';
import { work_exp } from 'src/app/models/work_exp.model';
import { TokenService } from 'src/app/service/token.service';
import { WorkExpService } from 'src/app/service/work-exp.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {

  workExp: work_exp[] = [];
  isLogged = false;
  editingElem: number | string = -1;
  tempWork: work_exp = {
    id: 0,
    titulo: '',
    descripcion: '',
    img: ''
  }

  constructor(public workExpService: WorkExpService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.loadWorkExp();
    this.isLogged = !!this.tokenService.getToken();
  }

  loadWorkExp(): void {
    this.workExpService.getWorkExp().subscribe({
      next: (data) => this.workExp = data,
      error: (error) => console.error('Error al Cargar la experiencia laboral: ', error)
    });
  }

  editarWork(work: work_exp): void {
    this.workExpService.editWorkExp(work).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Editar la experiencia laboral: ', error)
    });
  }

  agregarWork(): void {
    const nuevoLink: work_exp = {
      titulo: 'Nueva experiencia',
      descripcion: 'Descripción',
      img: 'https://firebasestorage.googleapis.com/v0/b/sdfrontend.appspot.com/o/LogoEmp1.jpg?alt=media&token=c363dd08-a51e-4af5-af0a-274ef45b7268'
    };
    this.workExpService.postWorkExp(nuevoLink).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Agregar la experiencia laboral: ', error)
    });
  }

  eliminarWork(work: work_exp): void {
    const id = work.id;
    this.workExpService.deleteWorkExp(id).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Eliminar la experiencia laboral: ', error)
    });
  }

  actualizarLista(): void {
    setTimeout(() => this.loadWorkExp(), 200);
  }
}
