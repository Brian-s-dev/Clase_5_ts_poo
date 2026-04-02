/* class Persona {
    nombre: string;
    edad: number;
    vida: number;
    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.essdad = edad;
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
- fecha (Fecha actual new Date, tipo Date) 
## Tienda
- nombre
- inventario: ItemTienda[] Lista de items interna de la tienda
- lista_ventas: Venta[]
- lista_compras: Compra[]
- dinero
- comprar(id_item, precio_unitario, cantidad, margen_esperado){} 
    Accion de comprar
    La tienda debe evaluar si tiene el dinero para realizar la compra, en caso de no tenerlo decir por consola "Error: Dinero insuficiente"
    Si se cuenta con el dinero, se procedera a dejar registro en lista_compras de la compra y se decrementara el dinero
    Se debera agregar el item al inventario (Si ya existe incrementar el stock). 
    Si se agrega el item al inventario el precio del item sera definido por precio_unitario x margen_esperado.
    En caso de que el item ya existe, se calculara y definira el nuevo precio por precio_unitario x margen_esperado
    Aclaraciones:
    - el id_item se usara para acceder al item mediante lista global de items ItemManager
    - Dejar la parte de registro de compras para el final, centrarse en la logica de inventario
EJEMPLO De funcionamiento: 
Dinero inicial: 7000
tienda_1.comprar(1, 1400, 2, 20) //Agregar al inventario el item con el precio 1680 (20% de margen) y stock de 2. Dinero: 4200
tienda_1.comprar(1, 1500, 2, 20) //Agregar al inventario el item con el precio 1800 (20% de margen) y stock de 4. Dinero: 1200
tienda_1.comprar(1, 1500, 2, 20) //ERROR No tengo sufiente dinero
*/

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

class Transaccion {
    id: number;
    cantidad: number;
    precio_unitario: number;
    fecha: Date;
    id_item: number;

    constructor(id: number, cantidad: number, precio_unitario: number, id_item: number) {
        this.id = id;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;
        this.id_item = id_item;
        this.fecha = new Date();
    }
}

class Venta extends Transaccion {
    id_comprador: number;
    constructor(id: number, cantidad: number, precio_unitario: number, id_item: number, id_comprador: number) {
        super(id, cantidad, precio_unitario, id_item);
        this.id_comprador = id_comprador;
    }
}

class Compra extends Transaccion {
    id_vendedor: number;
    constructor(id: number, cantidad: number, precio_unitario: number, id_item: number, id_vendedor: number) {
        super(id, cantidad, precio_unitario, id_item);
        this.id_vendedor = id_vendedor;
    }
}

class Tienda {
    nombre: string;
    dinero: number;
    inventario: ItemTienda[] = [];
    lista_ventas: Venta[] = [];
    lista_compras: Compra[] = [];
    generador_id_transacciones: number = 1;

    constructor(nombre: string, dinero_inicial: number) {
        this.nombre = nombre;
        this.dinero = dinero_inicial;
    }

    comprar(id_item: number, precio_unitario: number, cantidad: number, margen_esperado: number, managerGlobal: ItemManager): void {
        const costoTotal = precio_unitario * cantidad;

        if (this.dinero < costoTotal) {
            console.log("Error: Dinero insuficiente");
            return;
        }

        this.dinero -= costoTotal;

        const idVendedorFicticio = 1;
        const nuevaCompra = new Compra(this.generador_id_transacciones, cantidad, precio_unitario, id_item, idVendedorFicticio);

        this.lista_compras.push(nuevaCompra);
        this.generador_id_transacciones++;

        const itemEnInventario = this.inventario.find(item => item.id === id_item);
        const nuevoPrecioVenta = precio_unitario * margen_esperado;

        if (itemEnInventario) {
            itemEnInventario.precio = nuevoPrecioVenta;
            itemEnInventario.stock += cantidad;
        } else {
            const itemBase = managerGlobal.obtenerPorId(id_item);
            if (itemBase) {
                const nuevoItemTienda = new ItemTienda(itemBase.id, itemBase.titulo, itemBase.descripcion, nuevoPrecioVenta, cantidad);
                this.inventario.push(nuevoItemTienda);
            }
        }
    }

    vender(id_item: number, cantidad: number, id_comprador: number): void {

        const itemEnInventario = this.inventario.find(item => item.id === id_item);

        if (!itemEnInventario) {
            console.log("Error: El producto no existe en nuestro inventario.");
            return;
        }

        if (itemEnInventario.stock < cantidad) {
            console.log(`Error: Stock insuficiente. Solo quedan ${itemEnInventario.stock} unidades.`);
            return;
        }

        const ingresoTotal = itemEnInventario.precio * cantidad;
        this.dinero += ingresoTotal;
        itemEnInventario.stock -= cantidad;

        const nuevaVenta = new Venta(this.generador_id_transacciones, cantidad, itemEnInventario.precio, id_item, id_comprador);

        this.lista_ventas.push(nuevaVenta);
        this.generador_id_transacciones++;

        console.log(`Venta realizada. Ingreso: $${ingresoTotal}. Stock restante: ${itemEnInventario.stock}`);
    }
}