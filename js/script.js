/*

Note for reviewer:

I am hoping to receive an "Exceeds Expectations" grade, and will accept a "Meets" with notes on what components prevented
the former to be met.

Thanks so much for your time and consideration!


*/

const registrantName = document.getElementById('name');
const eMail = document.getElementById('email');
const otherJob = document.getElementById('other-job-role');
const jobTitle = document.getElementById('title');
const shirtStyle = document.getElementById('design');
const colorSection = document.getElementById('color');
const shirtColors = colorSection.children;
const activitiesSection = document.getElementById('activities');
const totalDisplay = document.getElementById('activities-cost');
const checkBoxes = document.querySelectorAll('#activities input');
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
    for (let i = 0; i < checkBoxes.length; i++)
        if (
            e.target.getAttribute('data-day-and-time') ===
                checkBoxes[i].getAttribute('data-day-and-time') &&
            e.target !== checkBoxes[i]
        ) {
            if (e.target.checked) {
                checkBoxes[i].disabled = true;
                checkBoxes[i].parentElement.className = 'disabled';
            } else {
                checkBoxes[i].disabled = false;
                checkBoxes[i].parentElement.className = '';
            }
        }
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
        return false;
    } else {
        return true;
    }
};

const activitiesValid = () => {
    if (!totalCost > 0) {
        return false;
    } else {
        return true;
    }
};

const ccNumValidation = () => {
    if (!/^(\d{13,16})$/.test(creditCardNum.value)) {
        return false;
    } else {
        return true;
    }
};

const zipCodeValidation = () => {
    if (!/^(\d{5})$/.test(zipCode.value)) {
        return false;
    } else {
        return true;
    }
};

const cvvValidation = () => {
    if (!/^(\d{3})$/.test(cvvCode.value)) {
        return false;
    } else {
        return true;
    }
};

// Real-time error message to assist entering accurate cc number
creditCardNum.addEventListener('keyup', (e) => {
    validityIndicators(ccNumValidation(), e, creditCardNum, 'cc-hint');
});

// Listens for form submit and prevents if functions don't return true
formElement.addEventListener('submit', (e) => {
    // if (!allValidations()) {
    //     e.preventDefault();
    validityIndicators(nameValidation(), e, registrantName, 'name-hint');
    validityIndicators(eMailValidation(), e, eMail, 'email-hint');
    validityIndicators(
        activitiesValid(),
        e,
        activitiesSection,
        'activities-hint'
    );

    if (paymentSelect.value === 'credit-card') {
        validityIndicators(ccNumValidation(), e, creditCardNum, 'cc-hint');
        validityIndicators(zipCodeValidation(), e, zipCode, 'zip-hint');
        validityIndicators(cvvValidation(), e, cvvCode, 'cvv-hint');
    }
    if (creditCardNum.value === '') {
        creditCardNum.parentElement.className = 'not-valid';
        creditCardNum.parentElement.lastElementChild.className = 'cc-hint';
        creditCardNum.parentElement.lastElementChild.innerHTML = `Credit card number field cannot be blank`;
    } else {
        creditCardNum.parentElement.className = 'not-valid';
        creditCardNum.parentElement.lastElementChild.className = 'cc-hint';
        creditCardNum.parentElement.lastElementChild.innerHTML = `Credit card number must be between 13 - 16 digits`;
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

// Adds valid/not-valid classes and displays in appropriate corresponding fields when input requirements met or not.
function validityIndicators(functionName, e, requiredField, classAssignment) {
    if (!functionName) {
        e.preventDefault();
        requiredField.parentElement.className = 'not-valid';
        requiredField.parentElement.lastElementChild.className =
            classAssignment;
    } else {
        requiredField.parentElement.className = 'valid';
        requiredField.parentElement.lastElementChild.className = `${classAssignment} hint`;
    }
}
