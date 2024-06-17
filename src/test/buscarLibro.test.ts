import { page } from '../hooks/hooks';
import { LibroPage } from '../pages/libroPage';
import { libros } from '../data/libros';
import { obtenerElementoAleatorio } from '../utils/randomUtils';

describe('Buscar libro', () => {
  let libroPage: LibroPage;

  beforeAll(() => {
    libroPage = new LibroPage(page);
  });

  it('Buscar un libro aleatoriamente y validar el resultado', async () => {
    const libro = obtenerElementoAleatorio(libros)
  
    await libroPage.buscarLibro(libro);
    const libroSeleccionado = await libroPage.seleccionarLibroAleatoriamente(libro);
    await libroPage.validarLibroSeleccionado(libroSeleccionado);
  }, 8000);
});
