//Клик вне области
$(document).on("click touchstart", function (e) {
  if (!$(e.target).is(".select *")) {
    $(".select").removeClass("active");
  }
});

//UP
$(window).scroll(function () {
  var w = $(window).width();
  if ($(window).scrollTop() > 50) {
    $("#up").fadeIn(300);
  } else {
    $("#up").fadeOut(300);
  }
});
$("#up").click(function (event) {
  $("body,html").animate({ scrollTop: 0 }, 300);
});

$(".goto").click(function () {
  var el = $(this).attr("href").replace("#", "");
  var offset = 0;
  $("body,html").animate(
    { scrollTop: $("." + el).offset().top + offset },
    500,
    function () {}
  );

  if ($(".header-menu").hasClass("active")) {
    $(".header-menu,.header-menu__icon").removeClass("active");
    $("body").removeClass("lock");
  }
  return false;
});

function ibg() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css(
        "background-image",
        'url("' + $(this).find("img").attr("src") + '")'
      );
    }
  });
}
ibg();

if ($(".gallery").length > 0) {
  baguetteBox.run(".gallery", {
    // Custom options
  });
}

// baguetteBox  ===============================
window.addEventListener("load", function () {
  baguetteBox.run(".gallery");
});
//=============================================

// Parallax =======================================
$(window).resize(function (event) {
  intro();
});
function intro() {
  var h = $(window).outerHeight();
  $(".intro").css("min-height", h);
}
intro();

$(window).scroll(function (event) {
  var prlx = 0 - $(this).scrollTop() / 3;

  $(".intro__bg").css("transform", "translate3d(0," + prlx + "px,0)");
});
//=============================================

//VALIDATE FORMS
$("form button[type=submit]").click(function () {
  var er = 0;
  var form = $(this).parents("form");
  var ms = form.data("ms");
  $.each(form.find(".req"), function (index, val) {
    er += formValidate($(this));
  });
  if (er == 0) {
    removeFormError(form);
    /*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

    //ОПТРАВКА ФОРМЫ
    /*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/

    if (ms != null && ms != "") {
      showMessageByClass(ms);
      return false;
    }
  } else {
    return false;
  }
});

function formValidate(input) {
  var er = 0;
  var form = input.parents("form");
  if (input.attr("name") == "email" || input.hasClass("email")) {
    if (input.val() != input.attr("data-value")) {
      var em = input.val().replace(" ", "");
      input.val(em);
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val()) ||
      input.val() == input.attr("data-value")
    ) {
      er++;
      addError(input);
    } else {
      removeError(input);
    }
  } else {
    if (input.val() == "" || input.val() == input.attr("data-value")) {
      er++;
      addError(input);
    } else {
      removeError(input);
    }
  }
  if (input.attr("type") == "checkbox") {
    if (input.prop("checked") == true) {
      input.removeClass("err").parent().removeClass("err");
    } else {
      er++;
      input.addClass("err").parent().addClass("err");
    }
  }
  if (input.hasClass("name")) {
    if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
      er++;
      addError(input);
    }
  }
  if (input.hasClass("pass-2")) {
    if (form.find(".pass-1").val() != form.find(".pass-2").val()) {
      addError(input);
    } else {
      removeError(input);
    }
  }
  return er;
}
