export class persona {
  id?: number;
  nombre: string;
  apellido: string;
  about_me: string;
  img: string;

  constructor(nombre: string, apellido: string, about_me: string, img: string){
    this.nombre = nombre;
    this.apellido = apellido;
    this.about_me = about_me;
    this.img = img;
  }
}
