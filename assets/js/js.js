// Users Lists //
if (!sessionStorage.getItem("users")) {
  const users = [
    {
      email: "default@gmail.com",
      password: "12345",

    },
  ];
  sessionStorage.setItem("users", JSON.stringify(users));
}
const users = JSON.parse(sessionStorage.getItem("users"));
//
//
//
//
//
// Cart Items //
if (!sessionStorage.getItem("cartItems")) {
  const cartItems = [];
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}
const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
//
//
//
//
//
// Cart Item Totals //
if (!sessionStorage.getItem("cartItemsTotal")) {
  const cartItemsTotal = [];
  sessionStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));
}
const cartItemsTotal = JSON.parse(sessionStorage.getItem("cartItemsTotal"));
//
//
//
//
//
// Log In Function //
function login() {
  const email = document.getElementById("logInEmail").value;
  const password = document.getElementById("logInPassword").value;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    alert("Login Successful!");

  }
  else {
    alert("Invalid username or password.");
  }
}
//
//
//
//
//
// Register Function //
function register() {
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  const existingEmail = users.find((user) => user.email === email);

  if (existingEmail) {
    alert("Email already registered! Try loggin in.");
  }
  if (!existingEmail) {
    const newUser = {
      email: email,
      password: password,
    };

    users.push(newUser);
    sessionStorage.setItem("users", JSON.stringify(users));

    alert("Account successfully Register!");
    windows.href.location = "Login.html";
  }
}
//
//
//
//
//
// Add to Cart Function //
function addCartItems(item) {
  cartItems.push(item);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("Item Added to the Cart!");
}
function addCartItemsTotal(price) {
  cartItemsTotal.push(price);
  sessionStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));
}
function generateCartItems(cartItems) {
  let addedItemIndex = 0;
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const { name, image, price } = item;

    const cartItemRow = document.createElement("tr");
    cartItemRow.classList.add("cart-row");

    cartItemRow.innerHTML = `
        <td>
            <a href="#" onclick="deleteCartItems(${addedItemIndex}); deleteCartItemsPrice(${addedItemIndex});">
                <i class="far fa-times-circle"></i>
            </a>
        </td>
        <td>
            <img src=${image} alt=""/ >
        </td>
        <td>${name}</td>
        <td class="cart-price">$ ${price}</td>
        <td>
            <input type="number" value="1" class="cart-quantity-input" min="1"/>
        </td>
        <td class="cart-item-subtotal">$ ${price}</td>
      `;

    cartItemsContainer.appendChild(cartItemRow);
    addedItemIndex++;
  });
}
function sumCartItemsprice(cartItemsTotal) {
  const cartTotal = document.getElementById("totalPrice");
  const cartSubTotal = document.getElementById("subTotalPrice");

  const sum = cartItemsTotal.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  cartTotal.innerHTML = `$${sum.toFixed(2)}`;
  cartSubTotal.innerHTML = `$${sum.toFixed(2)}`;
}
function deleteCartItems(index) {
  cartItems.splice(index, 1);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  generateCartItems(cartItems);
}
function deleteCartItemsPrice(index) {
  cartItemsTotal.splice(index, 1);
  sessionStorage.setItem("cartItemsTotal", JSON.stringify(cartItemsTotal));
  sumCartItemsprice(cartItemsTotal);
}
