let selectedDessertPrice;
let dessertAmount;
let totalPrice;


$(document).ready(function () {
  $(".d-cart").click(function () {
    $(".list").show();
    $(".d-cart2").hide();
    $(".d-cart").show();
    $("#order-total").show();
    $("#order-button").show();
    $(".dessert-grid").css("border", "");

    $(this).hide();
    $(this).next(".d-cart2").css("display", "flex");
    $(this)
      .parent(".grid")
      .find(".dessert-grid")
      .css("border", "3px solid red");

    $("#sidebar-img").hide();
    $("#sidebar-text").hide();
    $(".order-price").show().css("display", "flex");

    let title = $(this).siblings(".title-desserts").find(".title").text();
    let price = $(this).siblings(".title-desserts").find(".price").text();
    let amount = parseInt($(this).parent().find(".cart-number").text());
    selectedDessertPrice = parseFloat(price.replace("$", ""));

    addToCart(title, selectedDessertPrice,amount);

    $(".close").click(function () {
      $(".list").hide();
    });
  });


//   Decrement counter -------------------------------------------------------------------

  $(".decrement").click(function () {
    let amount = parseInt($(this).next("p").text());

    if (amount > 1) {
      $(this)
        .next(".cart-number")
        .text(amount - 1);
      amount--;
      updateCartAmount($(this).closest('.grid').find('.title-desserts .title').text(), amount);
    }
  });

//   Increment counter --------------------------------------------------------------------

  $(".increment").click(function () {
    let amount = parseInt($(this).prev("p").text());
    $(this)
      .prev(".cart-number")
      .text(amount + 1);
    amount++;
    updateCartAmount($(this).closest('.grid').find('.title-desserts .title').text(), amount);

  });

//   Modal --------------------------------------------------------------------------------

  $("#order-button").click(function () {
    $(".modal")[0].show();
  });

  $("#close-modal").click(function () {
    $(".modal")[0].close();
  });

//   Add to Cart --------------------------------------------------------------------------

  let cart = [];

  function addToCart(title, price, amount) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.amount += amount;
    } else {
        cart.push({ title, price, amount });
    }
    updateTotalPrice();
    renderCart();
  }

  function updateCartAmount(title, amount) {
    const item = cart.find(item => item.title === title);
    if (item) {
        item.amount = amount;
        updateTotalPrice();
        renderCart();
    }
}

function updateTotalPrice() {
    total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);
    $('#total-order-price').text(`$${total.toFixed(2)}`);
    $('.sidebar h3').text(`Your cart (${cart.length})`);
}

  function renderCart() {
    let cartItems = $(".list");
    cartItems.empty();

    cart.forEach(function (item) {
        const itemTotalPrice = (item.price * item.amount).toFixed(2);
      cartItems.append(`
            <p class="title-list">${item.title}</p>
            <div class="order-price">
              <p class="amount">${item.amount}x</p>
              <p class="pricePerDessert">@${item.price.toFixed(2)}</p>
              <p class="total-price-per-dessert">$${itemTotalPrice}</p>
            </div>
            <div class="close"><img src="assets/images/icon-remove-item.svg" alt="remove-item"></div>
            <hr>
          `);
    });

    $('.close').click(function() {
        const title = $(this).closest('.order-price').prev('.title-list').text();
        cart = cart.filter(item => item.title !== title);
        updateTotalPrice();
        renderCart();
    });
  }


});
