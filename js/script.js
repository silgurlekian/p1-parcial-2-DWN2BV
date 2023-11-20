document.addEventListener('DOMContentLoaded', function () {
  let listaProductos = document.getElementById('listaProductos');
  let contenidoCarrito = document.getElementById('contenidoCarrito');
  let modalDetalleProductoContent = document.getElementById('modalDetalleProductoContent');
  let detalleCantidad = document.getElementById('detalleCantidad');
  let detalleMontoTotal = document.getElementById('detalleMontoTotal');

  class Carrito {
    constructor() {
      this.productos = [];
    }

    agregarProducto(id, nombre, precio) {
      let productoEnCarrito = this.productos.find(item => item.id === id);

      if (productoEnCarrito) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoEnCarrito.cantidad++;
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        this.productos.push({ id, nombre, precio, cantidad: 1 });
      }
    }

    vaciarCarrito() {
      this.productos = [];
    }

    eliminarProducto(id) {
      this.productos = this.productos.filter(item => item.id !== id);
    }

    obtenerMontoTotal() {
      return this.productos.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }
  }

  // Instancia de la clase Carrito
  let carrito = new Carrito();

  let productos = [
    {
      id: 1,
      nombre: 'Vivo o Muerto El Límite Las Pareditas',
      descripcion: 'Buscado...Vivo o Muerto, representan las variedades que mas les gustan de cada lugar. Son vinos de corte que tienen al Malbec como componente central (entre el 80 y el 85% del blend) y que suman distintas cepas en cada etiqueta.',
      precio: 17.466,
      imagen: 'imagenes/vivo.jpg',
      categoria: 'Tinto'
    },
    {
      id: 2,
      nombre: 'Diamandes de Uco Viognier',
      descripcion: 'DiamAndes de Uco Viognier es un Varietal 100% Viognier. Este cepaje magnífico, que produce excelentes vinos en la región francesa de Condrieu, desarrolla en Bodega DiamAndes un carácter muy aromático a la vez que complejo.',
      precio: 10.925,
      imagen: 'imagenes/diamandes.jpg',
      categoria: 'Blanco'
    },
    {
      id: 3,
      nombre: 'Familia Durigutti Blend',
      descripcion: 'Un vino rico, con notas de higos, cacao, café, ciruelas y arcilla unidas para darle un intenso final.',
      precio: 17.683,
      imagen: 'imagenes/durigutti.jpg',
      categoria: 'Tinto'
    },
    {
      id: 4,
      nombre: 'Gran Lurton Rosé',
      descripcion: 'Un vino que se destaca por su frescura y elegancia.',
      precio: 17.325,
      imagen: 'imagenes/gran-lurton.jpg',
      categoria: 'Rosado'
    },
    {
      id: 5,
      nombre: 'Gran Sombrero Cabernet Franc',
      descripcion: 'De color rojo rubí intenso, con ribetes oscuros y profundos.',
      precio: 5.325,
      imagen: 'imagenes/huentala.jpg',
      categoria: 'Blanco'
    },
    {
      id: 6,
      nombre: 'Luigi Bosca Malbec',
      descripcion: 'Color rojo rubí intenso. Presenta aromas de frutos rojos maduros, especias y pimienta negra.',
      precio: 6.059,
      imagen: 'imagenes/lui.jpg',
      categoria: 'Tinto'
    }
  ];

  // lista de productos en el catálogo
  function mostrarListaProductos(productosMostrar) {
    listaProductos.innerHTML = '';

    productosMostrar.forEach(producto => {
      let elementoProducto = document.createElement('div');

      elementoProducto.appendChild(crearElemento('h3', producto.nombre));

      let imagenProducto = document.createElement('img');
      imagenProducto.src = producto.imagen;
      imagenProducto.alt = producto.nombre;
      elementoProducto.appendChild(imagenProducto);

      elementoProducto.appendChild(crearElemento('p', producto.descripcion)).className = 'descripcion';
      elementoProducto.appendChild(crearElemento('p', `Precio: $${producto.precio}`)).className = 'precio';
      elementoProducto.appendChild(crearElemento('p', `Categoría: ${producto.categoria}`));

      let verDetalleButton = crearElemento('button', 'Ver Detalle');
      verDetalleButton.onclick = function () {
        mostrarDetalleProducto(producto.id);
      };

      let agregarAlCarritoButton = crearElemento('button', 'Agregar al Carrito');
      agregarAlCarritoButton.onclick = function () {
        carrito.agregarProducto(producto.id, producto.nombre, producto.precio);
        mostrarCarrito();
      };

      elementoProducto.appendChild(verDetalleButton);
      elementoProducto.appendChild(agregarAlCarritoButton);

      listaProductos.appendChild(elementoProducto);
    });
  }

  // filtrar productos por categoría
  window.filtrarPorCategoria = function (categoria) {
    if (categoria === 'Todos') {
      mostrarListaProductos(productos);
    } else {
      // Filtrar productos por categoría
      let productosFiltrados = productos.filter(producto => producto.categoria === categoria);
      // Mostrar la lista de productos filtrados
      mostrarListaProductos(productosFiltrados);
    }
  };

  // Función para agregar un producto al carrito
  window.agregarAlCarrito = function (id, nombre, precio) {
    let productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      productoEnCarrito.cantidad++;
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    mostrarCarrito();
  };

  // Función para mostrar el detalle del producto en un modal
  function mostrarDetalleProducto(idProducto) {
    let producto = productos.find(p => p.id === idProducto);

    // Limpiar contenido previo del modal
    while (modalDetalleProductoContent.firstChild) {
      modalDetalleProductoContent.removeChild(modalDetalleProductoContent.firstChild);
    }

    // Crear elementos dinámicamente para mostrar en el modal
    let detalleNombre = crearElemento('h2', producto.nombre);

    let detalleImagen = document.createElement('img');
    detalleImagen.src = producto.imagen;
    detalleImagen.alt = producto.nombre;

    let detalleDescripcion = crearElemento('p', producto.descripcion);
    let detallePrecio = crearElemento('p', `Precio: $${producto.precio}`);
    let detalleCategoria = crearElemento('p', `Categoría: ${producto.categoria}`);

    // Crear botón para agregar al carrito desde el modal
    let agregarAlCarritoButton = crearElemento('button', 'Agregar al Carrito');
    agregarAlCarritoButton.onclick = function () {
      carrito.agregarProducto(producto.id, producto.nombre, producto.precio);
      mostrarCarrito();
    };

    // Agregar botón de cierre ("X") al modal
    let cerrarDetalleProductoButton = document.createElement('span');
    cerrarDetalleProductoButton.classList.add('close');
    cerrarDetalleProductoButton.innerHTML = '&times;';
    cerrarDetalleProductoButton.onclick = function () {
      cerrarModal('modalDetalleProducto');
    };

    // Añadir elementos al contenido del modal
    modalDetalleProductoContent.appendChild(cerrarDetalleProductoButton);
    modalDetalleProductoContent.appendChild(detalleImagen);
    modalDetalleProductoContent.appendChild(detalleNombre);
    modalDetalleProductoContent.appendChild(detalleCategoria);
    modalDetalleProductoContent.appendChild(detalleDescripcion).className = 'descripcion';
    modalDetalleProductoContent.appendChild(detallePrecio).className = 'precio';
    modalDetalleProductoContent.appendChild(agregarAlCarritoButton);

    abrirModal('modalDetalleProducto');
  }

  // Función para mostrar el contenido del carrito en el modal
  function mostrarCarrito() {
    contenidoCarrito.innerHTML = '';
    let montoTotal = 0;

    carrito.productos.forEach(item => {
      let elementoItem = document.createElement('div');
      montoTotal += item.precio * item.cantidad;
      elementoItem.appendChild(
        crearElemento('p', `${item.nombre} - $${item.precio} x ${item.cantidad}`)
      );

      let eliminarButton = crearElemento('button', 'Eliminar');
      eliminarButton.onclick = function () {
        carrito.eliminarProducto(item.id);
        mostrarCarrito();
      };

      elementoItem.appendChild(eliminarButton);
      contenidoCarrito.appendChild(elementoItem);
    });

    detalleCantidad.textContent = `Cantidad: ${carrito.productos.reduce((total, item) => total + item.cantidad, 0)}`;
    detalleMontoTotal.textContent = `Monto Total: $${montoTotal}`;
    abrirModal('modalCarrito');
  }

  window.vaciarCarrito = function () {
    carrito.vaciarCarrito();
    mostrarCarrito();
  };

  window.eliminarProducto = function (idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    mostrarCarrito();
  };

  function abrirModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = 'block';
  }

  window.cerrarModal = function (modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = 'none';
  };

  function crearElemento(tag, contenido, atributos = {}) {
    const elemento = document.createElement(tag);
    elemento.textContent = contenido;
    for (const atributo in atributos) {
      elemento.setAttribute(atributo, atributos[atributo]);
    }
    return elemento;
  }

  mostrarListaProductos(productos);
});