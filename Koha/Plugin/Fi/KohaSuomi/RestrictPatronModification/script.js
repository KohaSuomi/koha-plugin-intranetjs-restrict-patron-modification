
/// ALKU ///
// Virkailijatunnusten muokkausten esto
$(document).ready(function () {
    if (window.location.pathname.includes('/cgi-bin/koha/members/memberentry.pl') || window.location.pathname.includes('/cgi-bin/koha/members/members-home.pl') || (window.location.href.indexOf('/cgi-bin/koha/members/member.pl?quicksearch=1')) > -1 ) {

        var superlib = $('span#logged-in-info-full').children().hasClass('is_superlibrarian');
        var categories = "REPLACE_BY_CONFIG_PARAM_A";
        categories = categories.trim();
        categories = categories.split(',');
        if (window.location.pathname.includes('/cgi-bin/koha/members/memberentry.pl')) {
            var e = document.getElementById("categorycode_entry");
            var value = e.value;
            if (!superlib && categories.includes(value)) {
                e.disabled = true;
                $('input#cardnumber').prop("readonly", true);
                $('input#surname').prop("readonly", true);
                $('input#firstname').prop("readonly", true);
                //$('input#cardnumber').css('pointer-events','none').attr('tabindex','-1');
            }
            if (!superlib) {
                var preselectedValue = e.value; // Store the preselected value
                var preselectedValueText = $("#categorycode_entry option:selected").text();
                console.log(preselectedValueText); // Store the preselected value
                categories.forEach(piilotus);
                function piilotus(item) {

                    if (item !== preselectedValue) { // Skip removal of preselected value
                        $('select#categorycode_entry option[value="' + item + '"]').remove();
                    }

                    var selectelement = document.getElementById("categorycode_entry");
                    for (var i = 0; i < selectelement.length; i++) {
                        var optgroup = selectelement.children[i];

                        if (optgroup && optgroup.children.length === 0) {
                            optgroup.remove();
                        }

                    }
                }
            }
        }
        if (window.location.pathname.includes('/cgi-bin/koha/members/members-home.pl')) {
            if (!superlib) {
                categories.forEach(piilotus);
                function piilotus(item) {
                    $('div#new-patron-button ul li a[href*="categorycode=' + item + '"]').parent().hide();
                }
            }
        }
    }
});

/// LOPPU ///