var staticContent =
    [{ direction: 'Left', action: 'Home', class: 'btn', text: '<i class="fa fa-magic"></i>&nbsp;Customize' },
    { direction: 'Left', action: 'Home', class: 'btn btn-primary', text: '<i class="fa fa-gear"></i>&nbsp;Manage System' },
    { direction: 'Left', action: 'Home', class: 'btn btn-success', text: '<i class="fa fa-plus"></i>&nbsp; Add Project' },
    { direction: 'Left', action: 'Projects', class: 'btn', text: '<i class="fa fa-magic"></i>&nbsp;Customize' },
    { direction: 'Left', action: 'Projects', class: 'btn btn-success', text: '<i class="fa fa-plus"></i>&nbsp; Add Project' },
    { direction: 'Left', action: 'Tasks Board', class: 'btn btn-success', text: '<i class="fa fa-th-list"></i>&nbsp; Add Task' },
    { direction: 'Left', action: 'Tasks Board', class: 'btn', text: '<i class="fa fa-arrows"></i>' },
    { direction: 'Left', action: 'Tasks Board', class: 'btn', text: '<i class="fa fa-gear"></i>' },
    { direction: 'Rigth', action: 'Tasks Board', class: 'btn', text: '<i class="fas fa-edit"></i>&nbsp;Bulk edit' },
    { direction: 'Rigth', action: 'Tasks Board', class: 'btn', text: '<i class="fas fa-layer-group"></i>&nbsp;Group by' },
    { direction: 'Rigth', action: 'Tasks Board', class: 'btn', text: '<i class="fa fa-search"></i>&nbsp;Searches' },
    { direction: 'Rigth', action: 'Tasks Board', class: 'btn', text: '<i class="fa fa-filter"></i>&nbsp;Filter' },
    { direction: 'Rigth', action: 'Calendar Board', class: 'btn', text: '<i class="fas fa-edit"></i>&nbsp;Bulk edit' },
    { direction: 'Rigth', action: 'Calendar Board', class: 'btn', text: '<i class="fa fa-search"></i>&nbsp;Searches' },
    { direction: 'Rigth', action: 'Calendar Board', class: 'btn', text: '<i class="fa fa-filter"></i>&nbsp;Filter' },
    { direction: 'Left', action: 'Calendar Board', class: 'btn btn-success', text: '<i class="fa fa-plus"></i>&nbsp;Add Item' },
    { direction: 'Left', action: 'Calendar Board', class: 'btn', text: '<i class="fa fa-gear"></i>' },
    { direction: 'Left', action: 'Widgets Board', class: 'btn', text: '<i class="fa fa-gear"></i>' }];


$("[data-action]").on("click", function () {
    let data = staticContent.filter(x => x.action == $(this).attr("title"));
    let html = ``;
    $.each(data, (i, o) => {
        if (o.direction == "Left")
            html += `<button class="${o.class}">${o.text}</button>`;
    });
    $(".header-actions").empty().append(html);
});
//For user account
function Response(resultData) {
    let data = JSON.parse(resultData)
    if (data.Status == "SUCCESS") {
        alert(data.Message);
        setTimeout(window.location.href = `/home/dashboard`, 50000)
    } else {
        alert(data.Message);
        location.reload();
    }
}

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
    let isValid = true;
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





