/* class Persona {
    nombre: string;
    edad: number;
    vida: number;
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.vida = 100;
    }

    presentarse(): void {
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años`);
    }

    saltar(): void {
        console.log(`${this.nombre} esta saltando`);
    }

    decirNumeroFavorito(): number {
        return 1
    }
}
 */
/* 
quiero definir una super persona, una supr persina tiene algo llamado superpoder, el superoder es un string descriptivo del poder. EJ: Telekinesis, volar, etc.
En el resto de cosas, va a ser lo mismo que una persona, solo tiene una caracteristica extra.
*/

/* 
extends es una palabra reservada que se usa para marcar que cierta clase proviene de otra
super es la invocacion de la funsion constructura de la clase que estoy heredando, en este caso Persona
*/
/* 
class SuperPersona extends Persona {
    superpoder: string
    constructor(nombre: string, edad: number, superpoder: string) {
        super(nombre, edad);
        this.superpoder = superpoder;
        this.vida = 200
    }

    decirSuperPoder(): void { //Este metodo solo existe en superpersona
        console.log(`Mi super poder es ${this.superpoder}`);
    }

    //si vas a modificar un metodo existente, tiene que tener los mismos contratos que el metodo original
    saltar(): void {
        console.log(`${this.nombre} esta saltando muy alto`);
    }

    decirNumeroFavorito(): number {
        return 5
    }
}

const juan = new SuperPersona('Juan', 30, 'Telekinesis')
const pepe = new Persona('Pepe', 50)

juan.presentarse()
juan.saltar()
pepe.saltar()

const publico: Persona[] = [juan, pepe]

//Obtener la sumaoria de los numeros favoritos de mi publico
let total = 0
for (let persona of publico) {
    const numero = persona.decirNumeroFavorito()
    total = total + numero
} */

/* ## Manejar el estado de una tienda en memoria con TS y POO
## Item: 
- id
- titulo
- descripcion
- describir(){ } Debera describir el producto por consola
## ItemManager
- global: Item[]
- obtenerPorId(item_id){} retorna el item
- agregar(title, descripcion) Añade el item al sistema
## ItemTienda
Manejar un item dentro de una Tienda
- id
- titulo
- descripcion
- precio
- stock
## Venta
- id
- id_item
- id_comprador (numero para identificar quien compro)
- cantidad
- precio_unitario
- fecha (Fecha actual new Date, tipo Date)
## Compra
- id
- id_vendedor
- cantidad
- precio_unitario
- fecha (Fecha actual new Date, tipo Date) */

class Item {
    id: number;
    titulo: string;
    descripcion: string;
    constructor(id: number, titulo: string, descripcion: string) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
    describir(): void {
        console.log(`[Item #${this.id}] ${this.titulo}: ${this.descripcion}`);
    }
}

class ItemTienda extends Item {
    precio: number;
    stock: number;
    constructor(id: number, titulo: string, descripcion: string, precio: number, stock: number) {
        super(id, titulo, descripcion);
        this.precio = precio;
        this.stock = stock;
    }
    describir(): void {
        console.log(`[Tienda #${this.id}] ${this.titulo} cuesta $${this.precio}. Stock: ${this.stock}`);
    }
}

class ItemManager {
    global: Item[] = [];
    generador_id: number = 1;
    agregar(titulo: string, descripcion: string): void {
        const nuevoItem = new Item(this.generador_id, titulo, descripcion);
        this.global.push(nuevoItem);
        this.generador_id++;
    }
    obtenerPorId(item_id: number): Item | null {
        const itemEncontrado = this.global.find(item => item.id === item_id);
        return itemEncontrado ? itemEncontrado : null;
    }
}

class Transaccion {
    id: number;
    cantidad: number;
    precio_unitario: number;
    fecha: Date;

    constructor(id: number, cantidad: number, precio_unitario: number) {
        this.id = id;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
        this.fecha = new Date();
    }
}


class Venta extends Transaccion {
    id_item: number;
    id_comprador: number;
    constructor(id: number, cantidad: number, precio_unitario: number, id_item: number, id_comprador: number) {
        super(id, cantidad, precio_unitario);
        this.id_item = id_item;
        this.id_comprador = id_comprador;
    }
}

class Compra extends Transaccion {
    id_vendedor: number;
    constructor(id: number, cantidad: number, precio_unitario: number, id_vendedor: number) {
        super(id, cantidad, precio_unitario);
        this.id_vendedor = id_vendedor;
    }
}