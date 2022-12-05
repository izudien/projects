// Display item from data

const shop = document.getElementById("shop");
// get data from localstroge or data empty.use empty array
let basket = JSON.parse(localStorage.getItem("data")) || [];

const displayItem = () => {
  // display data
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
      // if id exist in localstorage,just set item number to quantity,
      // not exist return empty array
      let search = basket.find((x) => x.id === id) || [];
      return `<div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price} </h2>
            <div class="buttons">
              <i onclick="deleteQuantity(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="addQuantity(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};
displayItem();

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
  localStorage.setItem("data", JSON.stringify(basket));
};

const updateQuantity = (id) => {
  const searchId = basket.find((sid) => sid.id === id);
  document.getElementById(id).innerHTML = searchId.item;
  calcItems();
};

const calcItems = () => {
  const cartAmount = document.getElementById("cardAmount");
  cartAmount.innerHTML = basket
    .map((x) => x.item)
    .reduce((total, num) => total + num, 0);
};

calcItems();
