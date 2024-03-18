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
  }).done(function () {
    $(".card-img").click(function () {
      let itemId = $(this).attr('data-id');
      // console.log($(this).attr('data-id'));
      let cartData = getCartData() || {};
      if (cartData.hasOwnProperty(itemId)) {
        cartData[itemId][2] += 1;
      } else {
        cartData[itemId] = [puzzlesArr[itemId].name, puzzlesArr[itemId].price, 1, puzzlesArr[itemId].img];
      }
      setCartData(cartData);
    });
  });
  function getCartData() {
    return JSON.parse(localStorage.getItem("cart"));
  }
  function setCartData(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }
  $("#open-cart").click(function () {
    let cartData = getCartData();
    if (cartData !== null) {
      for (const items in cartData) {
        $("#puzz-list").append(`
        <div class="row d-flex align-items-center">
          <img class="col-sm-2" src="${cartData[items][3]}" width="20%" alt="">
          <span class="col-sm-2" id="name">${cartData[items][0]}</span>
          <span class="col-sm-2" id="price">${cartData[items][1] * cartData[items][2]}$</span>
          <span class="col-sm-2" id="quantity">${cartData[items][2]}</span>
          <div class="col-sm-4" id="del-add">
            <button class="btn btn-success">&#43;</button>
            <button class="btn btn-danger">&#8722;</button>
           </div>
         </div>
        `);
      }
      // for (let i = 0; i < cartData.length; i++) {
      //   $("#puzz-list").append(`
      //   <div class="d-flex align-items-center gap-5">
      //     <img src="./images/puzzles/alpen.jpg" width="20%" alt="">
      //     <span id="name">${cartData[i].name}</span>
      //     <span id="price">${cartData[i].price}</span>
      //     <div id="del-add">
      //       <button class="btn btn-success">&#43;</button>
      //       <button class="btn btn-danger">&#8722;</button>
      //      </div>
      //    </div>
      //   `);
      // }
    } else {
      $("#puzz-list").append("<p>The cart is empty</p>");
    }
  });
});

// let cardList = "";
// cardList =
//   '<table class="shopping_list"><tr><th>Name</th><th>Price</th><th>Quantity</th></tr>';
// let totalCost = 0;
// for (let items in cartData) {
//   cardTable += "<tr>";
//   for (let i = 0; i < cartData[items].length; i++) {
//     if (i === 1) {
//       cardTable += "<td>" + Number(cartData[items][i]) * cartData[items][2] + "</td>";
//       totalCost += Number(cartData[items][i]) * cartData[items][2];
//     } else {
//       cardTable += "<td>" + cartData[items][i] + "</td>";
//     }
//   }
//   cardTable += "</tr>";
// }
// cardTable += "<table>";
// cartCont.innerHTML = cardTable;
// cartCont.innerHTML += `Total cost: ${totalCost}$`;
