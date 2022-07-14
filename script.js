const c = (el) => document.querySelector(el);
const cartItems = c('.cart__items');
const subTotal = c('.total-price');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const totalSum = () => {
  const cart = document.querySelectorAll('.cart__item');
  const split = [...cart].map((item) => item.innerText).map((item) => {
    const arr = item.split(' | ');
    const price = arr[2].replace(/PRICE: \$(?=\d+)/g, '');
    return parseFloat(price);
  });
  const total = split.reduce((acc, cur) => acc + cur, 0);
  return Math.round(total * 100) / 100;
};

const totalPrice = () => {
  subTotal.innerText = `$${totalSum()}`;
};

const cartItemClickListener = (event) => {
  event.target.remove('li');
  saveCartItems('cartItems', JSON.stringify(cartItems.innerHTML));
  totalPrice();
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getItem = async (item) => {
  const data = await fetchItem(item);
  const dataTwo = createCartItemElement({
    sku: data.id,
    name: data.title,
    salePrice: data.price,
  });
  cartItems.appendChild(dataTwo);
  saveCartItems('cartItems', JSON.stringify(cartItems.innerHTML));
  totalPrice();
};

const cartStorage = () => {
  const storagedCart = getSavedCartItems('cartItems');
  cartItems.innerHTML = JSON.parse(storagedCart);
};

const eventListener = (e) => {
  const item = e.target.parentNode;
  const id = item.firstChild.innerText;
  getItem(id);
};

const selectedEvent = () => {
  const items = document.querySelectorAll('.cart__items');
  items.forEach((item) => item
    .addEventListener('click', cartItemClickListener));
};

const appendItems = async () => {
  const { results } = await fetchProducts('computador');
  const items = c('.items');
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const allProducts = createProductItemElement({ sku, name, image });
    items.appendChild(allProducts);
  });
};

window.onload = async () => {
  await appendItems();
  document.querySelectorAll('.item__add')
    .forEach((item) => item.addEventListener('click', eventListener));
  cartStorage();
  selectedEvent();
  totalPrice();
};
