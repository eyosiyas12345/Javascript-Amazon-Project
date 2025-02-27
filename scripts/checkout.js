import {cart,removeFromCart} from '../data/cart.js'
import {products} from '../data/products.js';
import {currencyFormat} from './utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
 
const today = dayjs();
const deliveryDate=today.add(2,'days');
console.log(deliveryDate);

let cartElementsHTML='';

function renderCart(){
   cartElementsHTML='';

cart.forEach((cartItem)=>{
  const productId= cartItem.productId;

    let matchingItem;
  
    products.forEach((product)=>{
if(product.id===productId){
  matchingItem=product;}
});

  cartElementsHTML+=`
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}" >

    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${matchingItem.image}>

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-price">
          $${currencyFormat(matchingItem.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link data-product-id="${matchingItem.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
  );

  document.querySelector('.js-order-summary').innerHTML=cartElementsHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        removeFromCart(productId);
        renderCart();
        displayCartItemsQuantity();
  });
  });
  }
renderCart();
displayCartItemsQuantity();

export function displayCartItemsQuantity(){
  let total=0;
cart.forEach((product)=>{
  total+=product.quantity
})
total > 1 ? document.querySelector('.js-cart-items-quantity').innerHTML=total + " items": document.querySelector('.js-cart-items-quantity').innerHTML=total + " item";
return total;
}


document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{link.addEventListener('click',()=>{
  //generate input html element 
  const productId= link.dataset.productId;
  console.log(productId);
});
});