export class skill {
  id?: number;
  nombre: string;
  valor: number;

  constructor(nombre:string, valor: number) {
    this.nombre = nombre;
    this.valor = valor;
  }
}
