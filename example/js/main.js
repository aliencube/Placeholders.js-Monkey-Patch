(function ($) {
	$(document).ready(function () {
		$("input:text, textarea").each(function () {
			var input = $(this);
			if (!$(input).hasClass("placeholdersjs")) {
				$(input).addClass("placeholdersjs");
			}
		});

		$("#select-box").click(function () {
			var value = $(this).val();
			var cells = $("#table tbody tr[id=\"value-" + value + "\"] td");
			var username = $(cells[1]).text();
			var password = $(cells[2]).text();
			var city = $(cells[3]).text();
			var postcode = $(cells[4]).text();

			$("#patched-username").val(username);
			if (password == undefined || password == "") {
				var fake = $("#fake-password");
				if (fake == undefined || !fake.length) {
					var patchedPassword = $("#patched-password");
					$(patchedPassword).val(password).attr("placeholder", "Password");
					$(patchedPassword).show();
				} else {
					$("#fake-password").show();
					$("#patched-password").attr("type", "password").hide().val("");
				}
			} else {
				$("#fake-password").hide();
				$("#patched-password").attr("type", "password").show().val(password);
			}
			$("#patched-city").val(city);
			$("#patched-postcode").val(postcode);

			$("#unpatched-username").val(username);
			$("#unpatched-password").val(password);
			$("#unpatched-city").val(city);
			$("#unpatched-postcode").val(postcode);

			//  This is only triggered only in IE9 or under,
			//  as the function is only defined in IE9 or under.
			if (typeof (applyPlaceholderAttributes) == typeof (Function)) {
				$.each(Placeholders.For.inputs, function (i, element) {
					$(element).each(function () {
						applyPlaceholderAttributes($(this));
					});
				});
			}
		});

		$("#patched-submit").click(function () {
			$("#patched-form input:text, #patched-form input:password").each(function() {
				var id = $(this).attr("id");
				if (id == "fake-password") {
					return;
				}
				//  This is only triggered only in IE9 or under,
				//  as the function is only defined in IE9 or under.
				if (typeof(removePlaceholderValue) == typeof(Function)) {
					removePlaceholderValue($(this));
				}
				var td = $("#" + id + "-result");
				$(td).text($(this).val());

				//  This is only triggered only in IE9 or under,
				//  as the function is only defined in IE9 or under.
				if (typeof (applyPlaceholderAttributes) == typeof (Function)) {
					$.each(Placeholders.For.inputs, function (i, element) {
						$(element).each(function () {
							applyPlaceholderAttributes($(this));
						});
					});
				}
			});
		});
	});
})(jQuery);