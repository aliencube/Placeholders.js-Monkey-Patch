//  Adds placeholder class, value and supplementary attribute to the input element.
var addPlaceholderAttributes = function (element, value) {
	if (!$(element).hasClass("placeholdersjs")) {
		$(element).addClass("placeholdersjs");
	}
	var attr = $(element).attr("data-placeholder-active");
	if (attr == undefined || attr == "") {
		$(element).attr("data-placeholder-active", "true");
	}
	$(element).val(value);
};

//  Removes placeholder class, and supplementary attribute from the input element.
var removePlaceholderAttributes = function (element) {
	if ($(element).hasClass("placeholdersjs")) {
		$(element).removeClass("placeholdersjs");
	}
	var attr = $(element).attr("data-placeholder-active");
	if (attr != undefined) {
		$(element).removeAttr("data-placeholder-active");
	}
};

//  Applies placeholder class and value, when the select box changes its focus.
var applyPlaceholderAttributes = function (element) {
	var placeholderValue = $(element).attr("data-placeholder-value");
	var val = $(element).val();

	if (val == undefined || val == "" || val == placeholderValue) {
		//  Adds placeholder class, value and supplementary attribute,
		//  if the current input field is empty
		//  or current input field has the same value as the supplementary value.
		addPlaceholderAttributes(element, placeholderValue);
	} else {
		//  Removes placeholder class and supplementary attribute,
		//  if the current input field is not empty.
		removePlaceholderAttributes(element);
	}
};

//  Removes placeholder value from the input element.
var removePlaceholderValue = function (element) {
	var placeholderValue = $(element).attr("data-placeholder-value");
	var val = $(element).val();

	//  Removes the value from the input,
	//  if it is empty or the same as the supplementary value.
	if (val == undefined || val == "" || val == placeholderValue) {
		$(element).val("");
	}
};

$(document).ready(function () {
	//  Removes placeholder class and value, when any element is focused.
	$("input:text, textarea").focus(function () {
		removePlaceholderValue($(this));
		removePlaceholderAttributes($(this));
	});

	//  Adds placeholder class and value, when any element loses its focus.
	$("input:text, textarea").blur(function () {
		var placeholderValue = $(this).attr("data-placeholder-value");
		var val = $(this).val();

		if (val == undefined || val == "" || val == placeholderValue) {
			//  Adds placeholder class, value and supplementary attribute,
			//  if the current input field is empty
			//  or current input field has the same value as the supplementary value.
			addPlaceholderAttributes($(this), placeholderValue);
		} else {
			//  Removes placeholder class and supplementary attribute,
			//  if the current input field is not empty.
			removePlaceholderAttributes($(this));
		}
	});

	//  Removes the placeholder value from inputs, if necessary.
	$("form").submit(function () {
		$("input:text, textarea").each(function () {
			removePlaceholderValue($(this));
		});
	});
});
