//  Adds placeholder class, value and supplementary attribute to the input element.
var addPlaceholderAttributes = function (input, value) {
	if (!$(input).hasClass("placeholdersjs")) {
		$(input).addClass("placeholdersjs");
	}
	var attr = $(input).attr("data-placeholder-active");
	if (attr == undefined || attr == "") {
		$(input).attr("data-placeholder-active", "true");
	}
	$(input).val(value);
};

//  Removes placeholder class, and supplementary attribute from the input element.
var removePlaceholderAttributes = function (input) {
	if ($(input).hasClass("placeholdersjs")) {
		$(input).removeClass("placeholdersjs");
	}
	var attr = $(input).attr("data-placeholder-active");
	if (attr != undefined) {
		$(input).removeAttr("data-placeholder-active");
	}
};

//  Applies placeholder class and value.
var applyPlaceholderAttributes = function (input) {
	var placeholderValue = $(input).attr("data-placeholder-value");
	var val = $(input).val();

	if (val == undefined || val == "" || val == placeholderValue) {
		//  Adds placeholder class, value and supplementary attribute,
		//  if the current input field is empty
		//  or current input field has the same value as the supplementary value.
		addPlaceholderAttributes(input, placeholderValue);
	} else {
		//  Removes placeholder class and supplementary attribute,
		//  if the current input field is not empty.
		removePlaceholderAttributes(input);
	}
};

//  Removes placeholder value from the input element.
var removePlaceholderValue = function (input) {
	var placeholderValue = $(input).attr("data-placeholder-value");
	var val = $(input).val();

	//  Removes the value from the input element,
	//  if it is empty or the same as the supplementary value.
	if (val == undefined || val == "" || val == placeholderValue) {
		$(input).val("");
	}
};

$(document).ready(function () {
	//  Initialises the Placeholders.For JSON object.
	//  If the Placeholders.For object is undefined, it will be initialised with
	//  all text input elements and textarea elements, and all forms.
	if (Placeholders.For == undefined) {
		Placeholders.For = { "inputs": ["input:text", "textarea"], "forms": ["form"] };
	}
	if (Placeholders.For.inputs == undefined || Placeholders.For.inputs.length == 0) {
		Placeholders.For.inputs = ["input:text", "textarea"];
	}
	if (Placeholders.For.forms == undefined || Placeholders.For.forms.length == 0) {
		Placeholders.For.forms = ["form"];
	}

	$.each(Placeholders.For.inputs, function (i, input) {
		//  Removes placeholder class and value, when any input element is focused.
		$(input).focus(function () {
			removePlaceholderValue($(this));
			removePlaceholderAttributes($(this));
		});

		//  Adds placeholder class and value, when any input element loses its focus.
		$(input).blur(function () {
			var placeholderValue = $(this).attr("data-placeholder-value");
			var val = $(this).val();

			if (val == undefined || val == "" || val == placeholderValue) {
				//  Adds placeholder class, value and supplementary attribute,
				//  if the current input element is empty
				//  or current input element has the same value as the supplementary value.
				addPlaceholderAttributes($(this), placeholderValue);
			} else {
				//  Removes placeholder class and supplementary attribute,
				//  if the current input element is not empty.
				removePlaceholderAttributes($(this));
			}
		});
	});

	$.each(Placeholders.For.forms, function (i, form) {
		//  Removes the placeholder value from input elements,
		//  to avoid saving the value unexpectedly.
		$(form).submit(function () {
			$.each(Placeholders.For.inputs, function (j, input) {
				removePlaceholderValue(input);
			});
		});
	});
});
