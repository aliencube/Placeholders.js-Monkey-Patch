(function ($) {
    $(document).ready(function () {
        $("#select-box").click(function () {
            var value = $(this).val();
            var cells = $("#table tbody tr[id=\"value-" + value + "\"] td");
            var username = $(cells[1]).text();
            var password = $(cells[2]).text();
            var city = $(cells[3]).text();
            var postcode = $(cells[4]).text();

            $("#patched-username").val(username);
            $("#patched-password").val(password);
            $("#patched-city").val(city);
            $("#patched-postcode").val(postcode);

            $("#unpatched-username").val(username);
            $("#unpatched-password").val(password);
            $("#unpatched-city").val(city);
            $("#unpatched-postcode").val(postcode);
        });
    });
})(jQuery);