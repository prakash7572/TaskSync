var url = `/home/`, flag = true;

// Function to start and manage the countdown
function startTimer() {
    let timeLeft = 5;
    $('#timer').text(`After ${timeLeft} seconds, your form will be automatically submitted.`);
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        $('#timer').text(timeLeft > 0 ? `After ${timeLeft} seconds, your form will be automatically submitted.` : "Time's up!");
        if (timeLeft <= 0) clearInterval(timer);
        if (timeLeft == 0) Registration();
    }, 1000);
}
// Function to end and manage the countdown

$(function () {
    $(".fkit_dropdown_activate").on("click", function () {
        $(".login-container").toggle();
    });
    $('input[name="Password"],[data-timer]').hide();
    $('#login_password').show();
    $("[data-registration='true']").on("click", function () {
        let randPwd = CreatePassword(8);
        $('input[name="Password"],[data-timer]').val(randPwd).show();
        $("[data-registration='true']").text("Change Passwrod");
        flag && startTimer(); 
        flag = false;
    });
});

function Registration() {

    if (validateForm('registration_form')) {
        let values = { Email: $("input[name='Email']").val(), Password: $("input[name='Password']").val() }
        $.ajax({
            type: "POST",
            url: `${url}registration`,
            data: values,
            dataType: "text",
            success: function (resultData) {
                Response(resultData);
            }
        });
    }

    return false;
}
function Login() {
    if (validateForm('login_form')) {
        var values = {};
        $.each($('#login_form').serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });
        values.RememberMe = $("#remember_me").is(":checked");
        $.ajax({
            type: "POST",
            url: `${url}login`,
            data: values,
            dataType: "text",
            success: function (resultData) {
                Response(resultData);
            }
        });
    }
    return false;
}
