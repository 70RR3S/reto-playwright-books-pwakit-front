export interface ILibro {
    buscarLibro(libro: string): Promise<void>;
    seleccionarLibroAleatoriamente(libro: string): Promise<any>;
    validarLibroSeleccionado(libroSeleccionado: string): Promise<void>;
}