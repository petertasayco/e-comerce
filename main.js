import { dataDB } from "./js/data.js";

const elements = document.querySelector(".elements");
const contentCartBody = document.querySelector(".content_cart-body");

elements.addEventListener("click", (e) => {
    let clothe = e.target.parentElement.id;
    if (e.target.classList.contains("btn__add")) {
        clothe = +e.target.parentElement.id;

        const findItem = dataDB.find((a) => a.id === clothe);
        
        if (cart[clothe]) {
            cart[clothe].amount++;
        } else {
            cart[clothe] = findItem;
            cart[clothe].amount = 1;
        }

        mostrarCart(contentCartBody);
    }
});

contentCartBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("bx-minus")) {
        const clothe = +e.target.parentElement.id;
        cart[clothe].amount--;
        if (cart[clothe].amount < 1) {
            delete cart[clothe];
        }
    }

    if (e.target.classList.contains("bx-plus-medical")) {
        const clothe = +e.target.parentElement.id;
        cart[clothe].amount++;
        if (cart[clothe].amount > cart[clothe].stock) {
            alert("stock maximo alcanzado");
            cart[clothe].amount--;
        }
    }

    if (e.target.classList.contains("bx-trash")) {
        const clothe = +e.target.parentElement.id;
        
    }

    mostrarCart(contentCartBody);
});

shot_clothe(elements, dataDB);
let cart = {};

function mostrarCart(elementHTML) {
    let html = "";

    const arrayCart = Object.values(cart);

    arrayCart.forEach(({ id, name, urlImages, amount, price}) => {
        html += `
            <div class="item_cart">
                <div class="item_cart-img">
                    <img src="${urlImages}" alt="">
                </div>
                <div class="item-bot">
                <h4 class="item_cart-title">${name}</h4>
                <div class="item_cart-options" id="${id}">
                    <i class='bx bx-minus'></i>
                    <span id="amount">${amount}</span>
                    <i class='bx bx-plus-medical'></i>
                    <i class='bx bx-trash'></i>
                </div>
                <div class="precio"> <p> $${price} </p> </div>
                </div>
                
            </div>
        `;
    });

    elementHTML.innerHTML = html;
    
    const total = document.querySelector(".content_cart-total");
        let text = "";
        let number = 0;
        arrayCart.forEach(({ price, amount}) => { 
        let subtotalnumber = price*amount;
        number += subtotalnumber;
        })
        text += `<h2>Total: $<span id="total">${number}</span></h2>`;
        total.innerHTML= text;
}
function shot_clothe(elementHTML, data) {
    let html = "";

    data.forEach(({ id, name, price, stock, urlImages }) => {
        html += `
        
        <div class="ropa">
        <h2 class="ropa__body-title">${name}</h2>
            <div class="ropa__img">
                <img src="${urlImages}" alt="${name}">
            </div>
            <div class="ropa__body" id="${id}">
                <div class="ropa-center">
                <p>precio: $${price}</p>
                <p>stock: ${stock}</p>
                </div>
                <button class="btn btn__add">Add</button>
            </div>
        </div>
    `;
    });

    elementHTML.innerHTML = html;
}
const iconCart = document.querySelector("#icon_cart");
const contentCart = document.querySelector("#contentCart");

iconCart.addEventListener("click", () => {
    contentCart.classList.toggle("content_cart-show");
});

const luna = document.querySelector("#luna");
const luna_show = document.querySelector("#navbar_luna");
const main_show = document.querySelector(".main_show")
luna.addEventListener("click", ()=> {
    luna_show.classList.toggle("navbar_luna");
    main_show.classList.toggle("main")
})

const num = document.querySelector("#total");
const item_cart = document.querySelector(".item_cart");


