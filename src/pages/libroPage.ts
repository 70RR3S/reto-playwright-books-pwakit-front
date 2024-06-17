import { Page, Locator  } from '@playwright/test';
import { ILibro } from '../interface/libro';

export class LibroPage implements ILibro {
    readonly page: Page;
    readonly campoBuscar: Locator;
    readonly listalibros: Locator;
    readonly titulo: (texto: string) => Locator;
    readonly tituloDetalle: Locator;

    constructor(page: Page){
        this.page = page;
        this.campoBuscar = page.locator('#input');
        this.listalibros = page.locator('section > ul.books > li');
        this.titulo = (texto: string) => page.getByRole('heading', { name: texto, exact: true});
        this.tituloDetalle = page.locator('h2.title');
    }

    async buscarLibro(libro: string): Promise<void> {
       await this.campoBuscar.fill(libro);
       await this.campoBuscar.press('Enter');
       await this.page.waitForSelector('section > ul.books > li');
    }

    async seleccionarLibroAleatoriamente(tituloLibro: string): Promise<string> {   
        const cantidadLibros = await this.listalibros.count();
        const indiceRandom = Math.floor(Math.random() * cantidadLibros);
        console.log(`Los resultados arrojan ${cantidadLibros} libros y el indice seleccionado es ${indiceRandom}`);        
        const libroRandom = this.listalibros.nth(indiceRandom);
        await libroRandom.scrollIntoViewIfNeeded();
        const tituloSeleccionado = await this.titulo(tituloLibro).first().innerText();
        console.log(`Libro seleccionado de los resultados: ${tituloSeleccionado}`);
        await this.titulo(tituloLibro).first().click();
        return tituloSeleccionado;
    }

    async validarLibroSeleccionado(libroSeleccionado: string): Promise<void> {
        const tituloDetalleLibro = await this.tituloDetalle.first().textContent();
        console.log(`Titulo en el detalle del libro (${tituloDetalleLibro}) = Libro seleccionado (${libroSeleccionado})`);   
        if (tituloDetalleLibro !== libroSeleccionado) {
            throw new Error('El titulo del libro no coincide');
        }
    }
}