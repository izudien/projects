// get data from localstroge or data empty.use empty array
let basket = JSON.parse(localStorage.getItem("data")) || [];

const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");

const calcItems = () => {
  const cartAmount = document.getElementById("cardAmount");
  cartAmount.innerHTML = basket
    .map((x) => x.item)
    .reduce((total, num) => total + num, 0);
};

calcItems();

const generateCardItem = () => {
  // item has basket
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        const { id, item } = x;
        const searchItems = shopItemsData.find((sid) => sid.id === id) || [];
        const { img, name, price } = searchItems;
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt=""/>
            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${name}</p>
                        <p class="cart-item-price">$ ${price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>
                <div class="buttons">
                    <i onclick="deleteQuantity(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="addQuantity(${id})" class="bi bi-plus-lg"></i>
                </div>
                <h3>$ ${item * price}</h3>
            </div>
      </div>`;
      })
      .join(""));
  } else {
    // no item basket
    shoppingCart.innerText = ``;
    label.innerHTML = `
    <h2>Cart is empty</h2>
    <a href="index.html">
        <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCardItem();

const addQuantity = (id) => {
  // get id
  const selectedId = id;
  // check id in basket
  const searchId = basket.find((sId) => sId.id === selectedId.id);
  // if item not exist,add to basket else item exist,just update quantity item
  if (searchId === undefined) {
    basket.push({
      id: selectedId.id,
      item: 1,
    });
  } else {
    searchId.item += 1;
  }

  generateCardItem();
  updateQuantity(selectedId.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

const deleteQuantity = (id) => {
  const selectedId = id;
  const searchId = basket.find((sId) => sId.id === selectedId.id);
  // check basket item
  if (searchId === undefined) return;
  else if (searchId.item === 0) return;
  else {
    searchId.item -= 1;
  }
  updateQuantity(selectedId.id);
  // only filter to  get for item not 0
  basket = basket.filter((x) => x.item !== 0);
  generateCardItem();
  localStorage.setItem("data", JSON.stringify(basket));
};

const updateQuantity = (id) => {
  const searchId = basket.find((sid) => sid.id === id);
  document.getElementById(id).innerHTML = searchId.item;
  calcItems();
  totalAmount();
};

const removeItem = (id) => {
  const selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  //    basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCardItem();
  totalAmount();
  calcItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

const totalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((items) => {
        const { item, id } = items;
        // check id in basket
        const searchId = shopItemsData.find((sId) => sId.id === id) || [];
        return item * searchId.price;
      })
      .reduce((total, num) => total + num, 0);
    label.innerHTML = `
    <h2>Total Bill = $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

totalAmount();

const clearCart = () => {
  basket = [];
  generateCardItem();
  calcItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
