// Function to generate a random password with mixed characters
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
//Email validation 
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Function to validate a field based on its data-validation attribute
function validateField($field) {
    var validation = $field.data('validation');
    var value = $field.val();
    var errorField = $('#' + $field.attr('id') + 'Error');
    var isValid = true;
    var errors = [];

    // Remove the 'invalid' class if present
    $field.removeClass('invalid');

    // Split the validation rules
    if (validation) {
        var rules = validation.split(',');
        rules.forEach(function (rule) {
            var parts = rule.split(':');
            var type = parts[0];
            var param = parts[1];

            switch (type) {
                case 'required':
                    if (!value) {
                        errors.push('This field is required.');
                        isValid = false;
                    }
                    break;
                case 'minlength':
                    if (value.length < parseInt(param)) {
                        errors.push('Must be at least ' + param + ' characters long.');
                        isValid = false;
                    }
                    break;
                case 'min':
                    if (parseInt(value) < parseInt(param)) {
                        errors.push('Must be at least ' + param + '.');
                        isValid = false;
                    }
                    break;
                case 'email':
                    var emailRegex = /\S+@\S+\.\S+/;
                    if (!emailRegex.test(value)) {
                        errors.push('Please enter a valid email address.');
                        isValid = false;
                    }
                    break;
            }
        });
    }

    // Show errors or clear error message
    if (isValid) {
        errorField.text('');
    } else {
        errorField.text(errors.join(' '));
        // Add the 'invalid' class to the field
        $field.addClass('invalid');
    }
    return isValid;
}

// Function to validate the entire form
function validateForm() {
    var isValid = true;

    // Validate each field
    $('#dynamicForm').find('[data-validation]').each(function () {
        if (!validateField($(this))) {
            isValid = false;
        }
    });

    return isValid;
}
//For user account
function Response(resultData) {
    let data = JSON.parse(resultData)
    if (data.Status == "SUCCESS") {
        alert(data.Message);
        setTimeout(window.location.href = `${url}dashboard`, 50000)
        location.reload();
    } else {
        alert(data.Message);
        location.reload();
    }
}

