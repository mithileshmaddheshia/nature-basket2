let cart = document.getElementById("cart");
let cartIcon = document.getElementById("carticon");
let cross = document.getElementById("cross");
let ItemContainer = document.getElementById("itemContainer");
let cartContainer = document.getElementById("cartParent");
let cartItems = [];



cartIcon.addEventListener("click", function () {
    cart.style.display = "block";
})

cross.addEventListener("click", function () {
    cart.style.display = "none";
})



// fetch data

async function fetchdata() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log(data);


    data.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('haven-main-container')
        div.innerHTML = `
            <div class="haven-img">
                    <img class='pimg' src=${item.image}>
                </div>

                <p class='ptitle'>${item.title}</p>
                <div class="price-container">
                    <p class='pprice'>$${item.price}</p>
                    <button class="add-cart-btn">
                        <p>+</p>
                        <p>ADD</p>
                    </button>
                </div>
        `
        ItemContainer.appendChild(div);

    })
}

fetchdata();

function setupAddToCart() {
    ItemContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-cart-btn");
        if (!btn) return;

        let container = btn.closest('.haven-main-container');
        let title = container.querySelector('.ptitle').textContent;
        let price = container.querySelector('.pprice').textContent;
        let image = container.querySelector('.pimg').src;

        let product = { title: title, price: price, image: image }

        addtocart(product)
    });
}

setupAddToCart();

function addtocart(product) {
    cartItems.push(product);
    console.log(cartItems);
    alert("item added")
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart()
}


function renderCart() {
    let cartdata = JSON.parse(localStorage.getItem('cart'));
    if(!cartdata) return;

    cartContainer.innerHTML = "";

    cartdata.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('cart-container');
        div.innerHTML = `
        <div class="cart-main-img">
            <div class="cart-img">
                <img class="cartImg" src=${item.image}>
            </div>
            <div class="details">
                <p class="cartTitle">${item.title}</p>
                <p class="cartPrice">${item.price}</p>
            </div>
        </div>

        <div class="plus-sub-main">
            <div class="plus-sub">
                <div class="sub">
                    <p>-</p>
                </div>
                <div class="one-two">
                    <p>1</p>
                </div>
                <div class="plus">
                    <p>+</p>
                </div>
            </div>

            <div class="remove-btn">
                <p>Remove</p>
            </div>
        </div>
    `
        cartContainer.appendChild(div)
    })
}

renderCart()