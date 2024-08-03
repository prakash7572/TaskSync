var path = `/home/`
function Login() {
    var values = {};
    $.each($('#login_form').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    $.ajax({
        type: "POST",
        url: `${path}login`,
        data: values,
        dataType: "text",
        success: function (resultData) {
            let data = JSON.parse(resultData)
            if (data[0].status == "SUCCESS") {
                alert(data[0].message);
                setTimeout(window.location.href = `${path}dashboard`,50000)
                //window.location.href = `${path}dashboard`;
            } else { 
                alert(data[0].message);
            }
        }
    }); 
    return false;
}
