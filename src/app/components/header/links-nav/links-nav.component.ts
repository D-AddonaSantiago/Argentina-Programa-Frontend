import { Component, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { linksNav } from 'src/app/models/linksNav.model';
import { LinksNavService } from 'src/app/service/links-nav.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-links-nav',
  templateUrl: './links-nav.component.html',
  styleUrls: ['./links-nav.component.css']
})
export class LinksNavComponent {

  linksNav: linksNav[] = [];
  isLogged = false;
  linkEditado = {title: '', url: ''};
  childModal: any;

  constructor(public linksNavService: LinksNavService, private tokenService: TokenService){}

  ngOnInit(): void {
    this.linksNavService.getLinksNav().subscribe(data => this.linksNav = data);
    this.isLogged = !!this.tokenService.getToken();
  }

  @ViewChild(NgbPopover)
  set modal(directive: NgbPopover) {
    this.childModal = directive;
  };

  loadLinks(): void {
    this.linksNavService.getLinksNav().subscribe({
      next: (data) => this.linksNav = data,
      error: (error) => console.error('Error al Cargar los Links: ',error)
    });
  }

  agregarLink(): void {
    const nuevoLink: linksNav = {
      title: 'Nuevo Link',
      url: 'link'
    };
    this.linksNavService.postLinksNav(nuevoLink).subscribe({
      next: () => this.actuaizarLista(),
      error: (error) => console.error('Error al Agregar Links: ',error)
    });
    ;
  }

  editarLink(link: linksNav) {
    this.linkEditado= link;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.linksNav, event.previousIndex, event.currentIndex);
  }

  guardarLink() {
    const link = this.linkEditado;
    this.linksNavService.editLinksNav(link).subscribe({
      next: () => this.actuaizarLista(),
      error: (error) => console.error('Error al Guardar Links: ',error)
    });
  }

  eliminarLink(link: linksNav): void {
    const id = link.id;
    this.linksNavService.deleteLinksNav(id).subscribe({
      next: () => this.actuaizarLista(),
      error: (error) => console.error('Error al Eliminar Links: ',error)
    });
  }

  openPopover(){
    this.childModal.open();
  }

  cerrarPopover() {
    this.childModal.close();
  }

  actuaizarLista():void{
    setTimeout(() => this.loadLinks(), 200);
  }
}
