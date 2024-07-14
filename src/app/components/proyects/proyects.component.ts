import { Component, OnInit } from '@angular/core';
import { proyecto } from 'src/app/models/proyecto.model';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {

  proyList: proyecto[] = [];
  isLogged = false;
  editingElem: number = -1;
  tempProy: proyecto = new proyecto("", "", "", "", "");

  constructor(private proyectoService: ProyectoService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loadProyectos();
    this.isLogged = !!this.tokenService.getToken();
  }

  loadProyectos(): void {
    this.proyectoService.getProyecto().subscribe({
      next: (data) => this.proyList = data,
      error: (error) => console.error('Error al Cargar los proyectos', error)
    });
  }

  editProject(proyecto: proyecto): void {
    this.proyectoService.editProyecto(proyecto).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Editar el proyecto', error)
    });
  }

  agregarProyecto(): void {
    const nuevoProy: proyecto = {
      titulo: 'Nuevo proyecto',
      descripcion: "Descripcion",
      img: "https://firebasestorage.googleapis.com/v0/b/sdfrontend.appspot.com/o/ProyectStandard.png?alt=media&token=55c41267-bfab-434c-8570-dac5906307bf",
      img2: "",
      img3: ""
    };
    this.proyectoService.postProyecto(nuevoProy).subscribe(
      () => this.actualizarLista(),
      error => console.error('Error al Agregar el proyecto', error)
    );
  }

  eliminarProyecto(proy: proyecto): void {
    const id = proy.id;
    if (id != null) {
      this.proyectoService.deleteProyecto(id).subscribe({
        next: () => this.actualizarLista(),
        error: (error) => console.error('Error al Eliminar el proyecto', error)
      });
    } else {
      console.error('ID del proyecto no puede ser nulo');
    }
  }

  deleteImage(proy: proyecto): void {
    proy.img = '';
  }

  deleteImage2(proy: proyecto): void {
    proy.img2 = '';
  }

  deleteImage3(proy: proyecto): void {
    proy.img3 = '';
  }

  addImage1(proy: proyecto): void {
    proy.img = "https://firebasestorage.googleapis.com/v0/b/sdfrontend.appspot.com/o/ProyectStandard.png?alt=media&token=55c41267-bfab-434c-8570-dac5906307bf";
  }

  addImage2(proy: proyecto): void {
    proy.img2 = "https://firebasestorage.googleapis.com/v0/b/sdfrontend.appspot.com/o/ProyectStandard.png?alt=media&token=55c41267-bfab-434c-8570-dac5906307bf";
  }

  addImage3(proy: proyecto): void {
    proy.img3 = "https://firebasestorage.googleapis.com/v0/b/sdfrontend.appspot.com/o/ProyectStandard.png?alt=media&token=55c41267-bfab-434c-8570-dac5906307bf";
  }

  actualizarLista():void {
    setTimeout(() => this.loadProyectos(),200);
  }
}
