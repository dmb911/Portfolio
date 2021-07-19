"use strict";

jQuery(function () {
  initFormValidation(), burger(), showBtn();
});

function initFormValidation() {
  var isValid = false;
  var formData = {
    payment: '',
    delivery: '',
    city: '',
    street: '',
    numberHouse: '',
    comment: ''
  };
  var form = document.querySelector('#orderForm');
  var selectPayment = form.querySelector('#select-payment');
  var selectDelivery = form.querySelector('#select-delivery');
  var cityInput = form.querySelector('#city');
  var streetInput = form.querySelector('#street');
  var numberHouseInput = form.querySelector('#numberHouse');
  var textareaInput = form.querySelector('#textarea');
  var sendBtn = form.querySelector('#send');
  checkValidation();
  cityInput.addEventListener('input', function (e) {
    checkInputsError(e.target.value, cityInput);
    formData.city = e.target.value;
    checkValidation();
  });
  streetInput.addEventListener('input', function (e) {
    checkInputsError(e.target.value, streetInput);
    formData.street = e.target.value;
    checkValidation();
  });
  numberHouseInput.addEventListener('input', function (e) {
    checkInputsError(e.target.value, numberHouseInput);
    formData.numberHouse = e.target.value;
    checkValidation();
  });
  textareaInput.addEventListener('input', function (e) {
    formData.comment = e.target.value;
    checkValidation();
  });
  selectPayment.addEventListener('click', function (e) {
    if (e.target.closest('.select-option')) {
      e.preventDefault();
      deleteActiveFromBtn(selectPayment);
      e.target.classList.add('active');
      formData.payment = e.target.dataset.payment;
    }

    checkValidation();
  });
  selectDelivery.addEventListener('click', function (e) {
    if (e.target.closest('.select-option')) {
      e.preventDefault();
      deleteActiveFromBtn(selectDelivery);
      e.target.classList.add('active');
      formData.delivery = e.target.dataset.delivery;
    }

    checkValidation();
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValid) {
      var successBlock = document.querySelector('.success');
      successBlock.style.display = 'block';
      form.style.display = 'none';
      return;
    }
  });

  function deleteActiveFromBtn(parent) {
    var btns = parent.querySelectorAll('.select-option');
    btns.forEach(function (el) {
      el.classList.remove('active');
    });
  }

  function checkInputsError(value, input) {
    var errorEl = input.parentElement.querySelector('.error');

    if (value.length === 0) {
      errorEl.style.display = 'block';
      errorEl.textContent = 'Заполните форму';
      input.classList.add('error-input');
    } else {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
      input.classList.remove('error-input');
    }
  }

  function checkValidation() {
    var payment = formData.payment,
        delivery = formData.delivery,
        city = formData.city,
        street = formData.street,
        numberHouse = formData.numberHouse;

    if (!payment || !delivery || !city || !street || !numberHouse) {
      sendBtn.setAttribute('disabled', '');
      isValid = false;
    } else {
      sendBtn.removeAttribute('disabled');
      isValid = true;
    }
  }
}

function burger() {
  $('.menu-btn').on('click', function () {
    $('.menu-btn').toggleClass('active');
    $('.mobile-nav').toggleClass('open');
    $('.mobile-nav ul').toggleClass('show');
  });

  for (var a = 1; a <= $(".mobile-nav ul li").length; a++) {
    $(".mobile-nav ul li:nth-child(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
  }
}

function showBtn() {
  $('.btn-icon-wrap').on('click', function () {
    $('.btn-icon-wrap').toggleClass('active');
    $('.btn-show').toggleClass('open');
    $('.btn-show-body').toggleClass('show');
  });

  for (var a = 1; a <= $(".orderSum").length; a++) {
    $(".orderSum(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
  }

  for (var _a = 1; _a <= $(".deliverySum").length; _a++) {
    $(".deliverySum(" + _a + ")").css("animation-delay", "." + (_a + 1) + "s");
  }

  for (var _a2 = 1; _a2 <= $("#send").length; _a2++) {
    $("#send(" + _a2 + ")").css("animation-delay", "." + (_a2 + 1) + "s");
  }

  for (var _a3 = 1; _a3 <= $(".error-btn").length; _a3++) {
    $(".error-btn(" + _a3 + ")").css("animation-delay", "." + (_a3 + 1) + "s");
  }
}
//# sourceMappingURL=main.js.map
