// Function to generate a password with mixed characters
function CreatePassword(length) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%&';
    const allCharacters = uppercase + lowercase + numbers + symbols;
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }
    return password;
}
// Function to generate a random number only
function RandomNumber(length) {
    const numbers = '0123456789';
    let number = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        number += numbers[randomIndex];
    }
    return number;
}
//  Function to validate a field based on its data-validation attribute
function validateInput($input) {
    const validationType = $input.data('validation'); // Get the validation type.
    const value = $input.val(); // Get the input value.
    let isValid = true; // Default validity status.

    // Check validation type and set 'isValid' based on the input value.
    switch (validationType) {
        case "text":
            isValid = /^[A-Za-z]+$/.test(value); // Only letters.
            break;
        case "email":
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Basic email format.
            break;
        case "number":
            isValid = !isNaN(value) && !!value; // Must be a number and not empty.
            break;
        case "text&number":
            isValid = !!value && isNaN(value); // Must not be a number.
            break;
        case "option":
            isValid = value !== "0"; // Ensure a valid option is selected (not the default "Select").
            break;
        case "password":
            // Password must be at least 8 characters long (adjust as needed).
            isValid = value.length >= 8;
            break;
    }

    $input.toggleClass('input-error', !isValid); // Toggle error class based on validity.
    return isValid;
}

function validateForm(from) {
    let isValid = true; // Default validity status.
    // Validate each input field with a data-validation attribute wih form.
    $(`#${from} [data-validation]`).each(function () {
        if (!validateInput($(this))) {
            isValid = false; // Update status if any field is invalid.
        }
    });
    return isValid;
}
// Attach validation functions to 'blur' and 'input' events for real-time validation.
$('[data-validation]').on('blur input', function () {
    validateInput($(this));
});
// End Function to validate a field based on its data-validation attribute



//For user account
function Response(resultData) {
    let data = JSON.parse(resultData)
    if (data.Status == "SUCCESS") {
        alert(data.Message);
        setTimeout(window.location.href = `/home/dashboard`, 50000)
        //location.reload();
    } else {
        alert(data.Message);
        location.reload();
    }
}

