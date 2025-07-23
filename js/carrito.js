function handleCart() {
  const carritoContainer = document.getElementById('item-products');
  if (!carritoContainer) {
    console.error('No existe el elemento con id="item-products"');
    return;
  }

  const productos = JSON.parse(localStorage.getItem('productos')) || [];

  carritoContainer.innerHTML = '';

  if (productos.length === 0) {
    carritoContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    return;
  }

  let tabla = document.createElement('table');
  tabla.border = '1';

  let encabezado = `
    <thead>
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Precio unitario</th>
        <th>Subtotal</th>
      </tr>
    </thead>
  `;

  let cuerpo = '<tbody>';
  let total = 0;

  productos.forEach(producto => {
    const cantidad = Number(producto.cantidad);
    const precio = Number(producto.price);
    const subtotal = cantidad * precio;
    total += subtotal;

    cuerpo += `
      <tr >
        <td>${producto.title}</td>
        <td>${cantidad}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>$${subtotal.toFixed(2)}</td>
      </tr>
    `;
  });

  cuerpo += `
    <tr>
      <td colspan="3" style="text-align: center; font-weight: bold;">Total a pagar:</td>
      <td>$${total.toFixed(2)}</td>
    </tr>
  `;
  cuerpo += '</tbody>';

  tabla.innerHTML = encabezado + cuerpo;
  carritoContainer.appendChild(tabla);

  const btnFinalizar = document.createElement('button');
  btnFinalizar.innerText = 'Finalizar compra';
  btnFinalizar.onclick = () => {
    alert('¡Gracias por tu compra!');
    limpiarCarrito();
  };
  carritoContainer.appendChild(btnFinalizar);

  const btnLimpiar = document.createElement('button');
  btnLimpiar.innerText = 'Limpiar carrito';
  btnLimpiar.style.marginLeft = '10px';
  btnLimpiar.onclick = limpiarCarrito;
  carritoContainer.appendChild(btnLimpiar);
}

function limpiarCarrito() {
  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    localStorage.removeItem('productos');
    localStorage.removeItem('total');

    const carritoContainer = document.getElementById('item-products');
    if (carritoContainer) {
      carritoContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    }

    const contador = document.querySelector('.contador');
    if (contador) {
      contador.innerText = '0';
    }
  }
}

document.addEventListener('DOMContentLoaded', handleCart);
