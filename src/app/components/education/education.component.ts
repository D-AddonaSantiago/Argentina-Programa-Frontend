import { Component, OnInit } from '@angular/core';
import { educacion } from 'src/app/models/educacion.model';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{

  eduList: educacion [] = [];
  editingElem:any = -1;
  tempEdu: educacion = new educacion("","","");
  isLogged = false;

  constructor(public educacionService: EducacionService, private tokenService: TokenService){}

  ngOnInit(): void {
    this.educacionService.getEducacion().subscribe(data => this.eduList = data);

    this.loadEducacion();
    this.isLogged = !!this.tokenService.getToken();
  }

  loadEducacion(): void {
    this.educacionService.getEducacion().subscribe({
      next: (data) => this.eduList = data,
      error: (error) => console.error('Error al Cargar Educacion: ',error)
    });
  }

  editarEduMe() {
    this.educacionService.editEducacion(this.tempEdu).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Editar Educacion: ',error)
    });
  }

  agregarEducacion() {
    const nuevoEdu: educacion = {
      titulo: "Nueva educacion",
      descripcion: "Descripcion",
      img: "https://firebasestorage.googleapis.com/v0/b/sdfrontend.appspot.com/o/educationStandard.jpg?alt=media&token=44baecfc-acc8-45d4-a2b4-7163256a756c"
    }
    this.educacionService.postEducacion(nuevoEdu).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Agregar Educacion: ',error)
    });
  }

  eliminarEduMe(edu: educacion) {
    const id = edu.id;
    this.educacionService.deleteEducacion(id).subscribe({
      next: () => this.actualizarLista(),
      error: (error) => console.error('Error al Eliminar Educacion: ',error)
    });

  }

  actualizarLista(): void {
    setTimeout(() => this.loadEducacion(), 200);
  }
}
