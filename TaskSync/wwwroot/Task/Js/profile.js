var url = `/home/`, flag = true;
// Function to start and manage the countdown
function startTimer() {
    let timeLeft = 10;
    $('#timer').text(`After ${timeLeft} seconds, your form will be automatically submitted.`);
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        $('#timer').text(timeLeft > 0 ? `After ${timeLeft} seconds, your form will be automatically submitted.` : "Time's up!");
        if (timeLeft <= 0) clearInterval(timer);
        if (timeLeft == 0) Registration();
    }, 1000);
}

$(function () {
    $('input[name="Password"],[data-timer]').hide();
    $("[data-registration='true']").on("click", function () {
        let randPwd = CreatePassword(8);
        $('input[name="Password"],[data-timer]').val(randPwd).show();
        $("[data-registration='true']").text("Change Passwrod");
        flag && startTimer(); 
        flag = false;
    });
});

function Registration() {
    let values = { Email: $("input[name='Email']").val(), Password: $("input[name='Password']").val()}
    $.ajax({
        type: "POST",
        url: `${url}registration`,
        data: values,
        dataType: "text",
        success: function (resultData) {
            Response(resultData);
        }
    });
    return false;
}
function Login() {
    var values = {};
    $.each($('#login_form').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    $.ajax({
        type: "POST",
        url: `${url}login`,
        data: values,
        dataType: "text",
        success: function (resultData) {
            Response(resultData);
        }
    });
    return false;
}
