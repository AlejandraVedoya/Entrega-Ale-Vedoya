document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem('productos')) || [];
  let precio = parseFloat(localStorage.getItem('total')) || 0;

  const contador = document.querySelector('.contador');
  if (contador) {
    const totalItems = carrito.reduce((acc, prod) => acc + Number(prod.cantidad), 0);
    contador.innerText = totalItems;
  }

  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    let btnClic = card.querySelector('button');

    const productTitle = card.querySelector('h3').textContent;
    const productPrice = parseFloat(btnClic.dataset.price); 

    btnClic.addEventListener('click', () => {
      const index = carrito.findIndex(p => p.title === productTitle);
      if (index !== -1) {
        carrito[index].cantidad = Number(carrito[index].cantidad) + 1;// ✅ aseguramos tipo numérico
      } else {
        carrito.push({ title: productTitle, price: productPrice, cantidad: 1 });
      }

      precio += productPrice;

      localStorage.setItem('productos', JSON.stringify(carrito));
      localStorage.setItem('total', precio);

      if (contador) {
        const totalItems = carrito.reduce((acc, prod) => acc + Number(prod.cantidad), 0);
        contador.innerText = totalItems;
      }
    });
  });
});
