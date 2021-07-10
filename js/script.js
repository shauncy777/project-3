const registrantName = document.getElementById('name');
const eMail = document.getElementById('email');
const otherJob = document.getElementById('other-job-role');
const jobTitle = document.getElementById('title');
const shirtStyle = document.getElementById('design');
const colorSection = document.getElementById('color');
const shirtColors = colorSection.children;
const activitiesSection = document.getElementById('activities');
const totalDisplay = document.getElementById('activities-cost');
let totalCost = 0;
const paymentSelect = document.getElementById('payment');
const paymentMethod = paymentSelect.children;
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
const creditCardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvCode = document.getElementById('cvv');
const formElement = document.querySelector('form');
const checkBoxes = document.querySelectorAll('#activities input');

console.log(checkBoxes);

// Prompts user to fill out name on page load
registrantName.focus();

// Disallows user to select colors until theme has been chosen
colorSection.disabled = true;
payPal.hidden = true;
bitCoin.hidden = true;
paymentMethod[1].setAttribute('selected', true);

// Function that displays "Other Jobs" textfield when "other" option is selected from the drop down menu
function showOtherJob() {
    otherJob.style.display = 'none';
    jobTitle.addEventListener('change', (e) => {
        if (e.target.value == 'other') {
            otherJob.style.display = 'block';
        } else {
            otherJob.style.display = 'none';
        }
    });
}
showOtherJob();

// Listens for user's choice and displays available color options accordingly
shirtStyle.addEventListener('change', (e) => {
    colorSection.disabled = false;
    for (let i = 0; i < shirtColors.length; i++) {
        const themeChoice = e.target.value;
        const dataTheme = shirtColors[i].getAttribute('data-theme');
        if (themeChoice === dataTheme) {
            shirtColors[i].hidden = false;
        } else {
            shirtColors[i].hidden = true;
            shirtColors[i].removeAttribute = ('selected', false);
        }
    }
    // Ensures that top color of 3 available options populates in select box upon choosing theme
    if (shirtStyle.value == 'js puns') {
        shirtColors[1].selected = true;
    } else if (shirtStyle.value == 'heart js') {
        shirtColors[4].selected = true;
    }
});

// Listens for user's selections for activity selections
activitiesSection.addEventListener('change', (e) => {
    let selectedActivityCost = e.target.getAttribute('data-cost');
    selectedActivityCost = +selectedActivityCost;
    if (e.target.checked) {
        totalCost = totalCost + selectedActivityCost;
    } else {
        totalCost = totalCost - selectedActivityCost;
    }
    totalDisplay.innerHTML = `$${totalCost}`;
});

// Listens for user's selection for payment method and displays appropriate fields
paymentSelect.addEventListener('change', () => {
    if (paymentSelect.value === 'paypal') {
        payPal.hidden = false;
        creditCard.hidden = true;
        bitCoin.hidden = true;
    } else if (paymentSelect.value === 'credit-card') {
        creditCard.hidden = false;
        bitCoin.hidden = true;
        payPal.hidden = true;
    } else if (paymentSelect.value === 'bitcoin') {
        bitCoin.hidden = false;
        creditCard.hidden = true;
        payPal.hidden = true;
    }
});

// Function helpers for form validation to valid event listener form submission
const nameValidation = () => {
    if (
        !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gm.test(
            registrantName.value
        )
    ) {
        alert('Please enter a valid first and last name');
        return false;
    } else {
        return true;
    }
};

const eMailValidation = () => {
    if (
        // From emailregex.com
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            eMail.value
        )
    ) {
        alert('Please enter a valid email address');
        return false;
    } else {
        return true;
    }
};

const ccNumValidation = () => {
    if (!/^(\d{13,16})$/.test(creditCardNum.value)) {
        alert('Please enter a valid credit card number');
        return false;
    } else {
        return true;
    }
};

const zipCodeValidation = () => {
    if (!/^(\d{5})$/.test(zipCode.value)) {
        alert('Please enter valid zipcode');
        return false;
    } else {
        return true;
    }
};

const cvvValidation = () => {
    if (!/^(\d{3})$/.test(cvvCode.value)) {
        alert('Please enter a valid cvv code');
        return false;
    } else {
        return true;
    }
};

// Function that evaluates all required form inputs
const allValidations = () => {
    if (
        nameValidation() &&
        eMailValidation() &&
        totalCost > 0 &&
        ccNumValidation() &&
        zipCodeValidation() &&
        cvvValidation()
    ) {
        return true;
    } else if (
        (nameValidation() &&
            eMailValidation() &&
            totalCost > 0 &&
            paymentSelect.value === 'paypal') ||
        paymentSelect.value === 'bitcoin'
    ) {
        return true;
    } else {
        return false;
    }
};

// Listens for form submit and prevents if functions don't return true
formElement.addEventListener('submit', (e) => {
    if (!allValidations()) {
        e.preventDefault();
    }
});

// Enhanced accessibility features
for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('focus', (e) => {
        checkBoxes[i].parentElement.classList.add('focus');
    });
    checkBoxes[i].addEventListener('blur', (e) => {
        checkBoxes[i].parentElement.classList.remove('focus');
    });
}
