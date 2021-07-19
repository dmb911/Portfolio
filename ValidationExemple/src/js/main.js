jQuery(function () {
    initFormValidation(), burger(), showBtn()
});

function initFormValidation() {

    let isValid = false;

    const formData = {
        payment: '',
        delivery: '',
        city: '',
        street: '',
        numberHouse: '',
        comment: ''
    }

    const form = document.querySelector('#orderForm');
    const selectPayment = form.querySelector('#select-payment');
    const selectDelivery = form.querySelector('#select-delivery');
    const cityInput = form.querySelector('#city');
    const streetInput = form.querySelector('#street');
    const numberHouseInput = form.querySelector('#numberHouse');
    const textareaInput = form.querySelector('#textarea');
    const sendBtn = form.querySelector('#send');
    checkValidation();

    cityInput.addEventListener('input', (e) => {
        checkInputsError(e.target.value, cityInput);
        formData.city = e.target.value;
        checkValidation();
    });

    streetInput.addEventListener('input', (e) => {
        checkInputsError(e.target.value, streetInput);
        formData.street = e.target.value;
        checkValidation();
    });

    numberHouseInput.addEventListener('input', (e) => {
        checkInputsError(e.target.value, numberHouseInput);
        formData.numberHouse = e.target.value;
        checkValidation();
    });

    textareaInput.addEventListener('input', (e) => {
        formData.comment = e.target.value;
        checkValidation();
    });

    selectPayment.addEventListener('click', (e) => {
        if (e.target.closest('.select-option')) {
            e.preventDefault();
            deleteActiveFromBtn(selectPayment);
            e.target.classList.add('active');
            formData.payment = e.target.dataset.payment;
        }
        checkValidation();
    });

    selectDelivery.addEventListener('click', (e) => {
        if (e.target.closest('.select-option')) {
            e.preventDefault();
            deleteActiveFromBtn(selectDelivery);
            e.target.classList.add('active');
            formData.delivery = e.target.dataset.delivery;
        }
        checkValidation();
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isValid) {
            let successBlock = document.querySelector('.success');
            successBlock.style.display = 'block';
            form.style.display = 'none';
            return;
        }
    });

    function deleteActiveFromBtn(parent) {
        let btns = parent.querySelectorAll('.select-option');
        btns.forEach((el) => {
            el.classList.remove('active');
        })
    }

    function checkInputsError(value, input) {
        let errorEl = input.parentElement.querySelector('.error');
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

        let { payment, delivery, city, street, numberHouse } = formData;

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
    $('.menu-btn').on('click', () => {
        $('.menu-btn').toggleClass('active');
        $('.mobile-nav').toggleClass('open');
        $('.mobile-nav ul').toggleClass('show');
    });
    for (let a = 1; a <= $(".mobile-nav ul li").length; a++) {
        $(".mobile-nav ul li:nth-child(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
    }
}

function showBtn() {
    $('.btn-icon-wrap').on('click', () => {
        $('.btn-icon-wrap').toggleClass('active');
        $('.btn-show').toggleClass('open');
        $('.btn-show-body').toggleClass('show');
    });
    for (let a = 1; a <= $(".orderSum").length; a++) {
        $(".orderSum(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
    }
    for (let a = 1; a <= $(".deliverySum").length; a++) {
        $(".deliverySum(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
    }
    for (let a = 1; a <= $("#send").length; a++) {
        $("#send(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
    }
    for (let a = 1; a <= $(".error-btn").length; a++) {
        $(".error-btn(" + a + ")").css("animation-delay", "." + (a + 1) + "s");
    }
}
