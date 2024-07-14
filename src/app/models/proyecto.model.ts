export class proyecto {
  id?: number;
  titulo: string;
  descripcion: string;
  img: string;
  img2: string;
  img3: string;

  constructor(titulo: string, descripcion: string, img: string, img2: string, img3:string) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this. img = img;
    this.img2 = img2;
    this.img3 = img3;
  }
}
