document.onreadystatechange = function () {
  let state = document.readyState;
  if (state == "interactive") {
    document.getElementById("contents").style.display = "none";
    // document.getElementById("contents").style.visibility = "hidden";
    document.getElementById("load").style.visibility = "visible";
  } else if (state == "complete") {
    setTimeout(function () {
      document.getElementById("load").style.visibility = "hidden";
      document.getElementById("contents").style.display = "block";
    }, 2000);
  }
};


$(document).ready(function () {
  let puzzlesArr = {};
  $.getJSON("puzzles.json", function (puzzArr) {
    puzzlesArr = puzzArr;
    for (let i = 0; i < puzzArr.length; i++) {
      $("#puzzles-section").append(`
      <div class='col-3 my-3'>
        <div class="card-header card-img" data-id="${i}">
            <img class="col-12" src='${puzzArr[i].img}' alt=''>
        </div>
        <div class="card-body">${puzzArr[i].name}</div>
        <div class="card-footer">${puzzArr[i].price}$</div>
      </div>`);
    }
  });
  function getCartData() {
    return JSON.parse(localStorage.getItem("cart"));
  }
  function setCartData(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }
  $("#open-cart").click(function () {
    openCart();
  });
  $("#clear-cart").click(function () {
    clearCart();
    openCart();
  });
  $(document).on("click", "#add-to-cart", function () {
    addToCart($(this));
    openCart();
  });
  $(document).on("click", "#del-from-cart", function () {
    delFromCart($(this));
    openCart();
  });
  $(document).on("click", ".card-img", function () {
    addToCart($(this));
  });

  function addToCart(addButt) {
    let itemId = addButt.attr('data-id');
    let cartData = getCartData() || {};
    if (cartData.hasOwnProperty(itemId)) {
      cartData[itemId][2] += 1;
    } else {
      cartData[itemId] = [puzzlesArr[itemId].name, puzzlesArr[itemId].price, 1, puzzlesArr[itemId].img];
    }
    setCartData(cartData);
  }

  function delFromCart(delButt) {
    let cartData = getCartData() || {};
    let itemId = delButt.attr('data-id');
    if (cartData.hasOwnProperty(itemId)) {
      if (cartData[itemId][2] - 1 !== 0) {
        cartData[itemId][2] -= 1;
      } else {
        delete cartData[itemId];
      }
    }

    setCartData(cartData);
  }

  function openCart() {
    let cartData = getCartData();
    let totalAmount = 0;
    if (cartData !== null) {
      $("#puzz-list").empty();
      for (const items in cartData) {
        totalAmount += cartData[items][1] * cartData[items][2];
        $("#puzz-list").append(`
        <div class="row d-flex align-items-center">
          <img class="col-sm-2" src="${cartData[items][3]}" width="20%" alt="">
          <span class="col-sm-2" id="name">${cartData[items][0]}</span>
          <span class="col-sm-2" id="price">${(cartData[items][1] * cartData[items][2]).toFixed(2)}$</span>
          <span class="col-sm-2" id="quantity">${cartData[items][2]}</span>
          <div class="col-sm-4" id="del-add">
            <button id="add-to-cart" class="btn btn-success" data-id="${items}">&#43;</button>
            <button id="del-from-cart" class="btn btn-danger" data-id="${items}">&#8722;</button>
           </div>
         </div>
        `);
      }
      $("#total-amount").html(totalAmount.toFixed(2));
    } else {
      $("#puzz-list").append("<p>The cart is empty</p>");
    }
  }

  function clearCart() {
    localStorage.removeItem("cart");
    cartCont.innerHTML = "The cart was emtied";
  }
});
