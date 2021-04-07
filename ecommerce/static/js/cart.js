const updateBtns = document.getElementsByClassName('update-cart')
let cartTotal = document.querySelector('.cartTotal')
let cartTotalNumber = parseInt(cartTotal.textContent)


for (let i = 0; i < updateBtns.length; i++) {
  updateBtns[i].addEventListener('click', function () {
    const productId = this.dataset.product
    const action = this.dataset.action
    if (user == 'AnonymousUser') {
      addCookieItem(productId, action)
      addTotalToItem('incdec')
      addGlobal()
    } else {
      updateUserOrder(productId, action)
      addTotalToItem('incdec')
      addGlobal()
    }
  })

}

function addCookieItem(productId, action) {
  console.log('Not logged in...');

  if (action == 'add') {
    if (cart[productId] == undefined) {
      cart[productId] = { 'quantity': 1 }
      cartTotalNumber += 1
      cartTotal.innerHTML = cartTotalNumber
    } else {
      cart[productId]['quantity'] += 1
      cartTotalNumber = cartTotalNumber + 1
      cartTotal.innerHTML = cartTotalNumber
    }

  }

  if (action == 'remove') {
    cart[productId]['quantity'] -= 1
    cartTotalNumber = cartTotalNumber - 1
    cartTotal.innerHTML = cartTotalNumber
    if (cart[productId]['quantity'] <= 0) {
      console.log('Remove Item');
      delete cart[productId]
    }
  }
  console.log('Cart: ', cart);
  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
  //location.reload()

}

function updateUserOrder(productId, action) {
  console.log('User is logged in sending data...');

  const url = '/update_item/'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({ 'productId': productId, 'action': action })
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log('data: ', data);
      //location.reload()
    })
}