export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
  { 
productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
quantity: 2,
deliveryOptionId:'1'
},
{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
quantity: 1,
deliveryOptionId:'2'
}
];
}

export function addToCart(productId){
    let matchItem;
  
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchItem=cartItem;
      }
    })
  
  if(matchItem){
    matchItem.quantity++;
  }
  else{
          cart.push({
          productId,
          quantity:1,
          deliveryOptionId: '1'
          })
  }
  console.log(cart);
saveToStorage();
  }

 export function removeFromCart(productId){
   let newCart=[];

  cart.forEach((cartItem)=>{
if(cartItem.productId!==productId){
  newCart.push(cartItem);
}
  });
  cart=newCart;
  console.log(cart);
saveToStorage();
   }
   
export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
