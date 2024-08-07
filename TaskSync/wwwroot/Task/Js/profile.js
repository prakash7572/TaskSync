var url = `/home/`
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
            let data = JSON.parse(resultData)
            if (data.Status == "SUCCESS") {
                alert(data.Message);
                setTimeout(window.location.href = `${url}dashboard`,50000)
            } else { 
                alert(data.Message);
            }
        }
    }); 
    return false;
}
