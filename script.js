let selectedDessertPrice;
let dessertAmount;
let totalPrice;
let currentValue;

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
    let amount = parseInt($(this).siblings(".cart-number").find(".price").text());

    selectedDessertPrice = parseFloat(price.replace("$", ""));

    TotalAmount(1);
    PricePerDessert();
    addToCart(title, selectedDessertPrice,amount);

    $(".close").click(function () {
      $(".list").hide();
    });
  });

  function TotalAmount(amount) {
    dessertAmount = parseInt(amount);
    console.log(dessertAmount);
    $("#amount").text(amount + "x");
  }

  function updateTotalPrice(price) {
    $("#total-order-price").text("$" + price);
  }

  function PricePerDessert() {
    let Price = dessertAmount * selectedDessertPrice;
    $("#total-price").text(Price.toFixed(2));
    totalPrice = Price.toFixed(2);
    updateTotalPrice(totalPrice);
  }

  $(".decrement").click(function () {
    currentValue = parseInt($(this).next("p").text());

    if (currentValue > 1) {
      $(this)
        .next(".cart-number")
        .text(currentValue - 1);
      currentValue = currentValue - 1;
    }
    TotalAmount(currentValue);
    PricePerDessert();
  });
  $(".increment").click(function () {
    let currentValue = parseInt($(this).prev("p").text());
    $(this)
      .prev(".cart-number")
      .text(currentValue + 1);
    currentValue = currentValue + 1;

    TotalAmount(currentValue);
    PricePerDessert();
  });

  $("#order-button").click(function () {
    $(".modal")[0].show();
  });

  $("#close-modal").click(function () {
    $(".modal")[0].close();
  });

  let cart = [];

  function addToCart(title, price) {
    cart.push({ title: title, price: price });
    renderCart();
  }

  function renderCart() {
    let cartItems = $(".list");
    cartItems.empty();

    cart.forEach(function (item) {
      cartItems.append(`<p id="title-list">${item.title}</p>
            <div class="order-price">
              <p id = "amount">${item.amount}x</p>
              <p id = "pricePerDessert">@${item.price}</p>
              <p id = "total-price">$${item.totalPrice}</p>
            <div class="close"><img src="assets/images/icon-remove-item.svg" alt="remove-item"></div>
              <hr>`);
    });
  }
});
