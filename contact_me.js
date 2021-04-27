$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert swiss-alert-success'>");
                    $('#success > .swiss-alert-success').html("<button type='button' class='close bg-transparent' data-dismiss='alert' aria-hidden='true'>X")
                        .append("</button>");
                    $('#success > .swiss-alert-success')
                        .append("<strong>Your message has been sent to <img src='assets/img/favicon.png' alt='favicon' width='20px' class'img-fluid' /> .</strong>");
                    $('#success > .swiss-alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert swiss-alert-danger'>");
                    $('#success > .swiss-alert-danger').html("<button type='button' class='close bg-transparent' data-dismiss='alert' aria-hidden='true'>X")
                        .append("</button>");
                    $('#success > .swiss-alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!  ");
                    $('#success > .swiss-alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});