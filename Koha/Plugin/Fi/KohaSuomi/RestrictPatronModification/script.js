
/// ALKU ///
// Virkailijatunnusten muokkausten esto
$(document).ready(function() {
    if (window.location.pathname.includes('/cgi-bin/koha/members/memberentry.pl') || window.location.pathname.includes('/cgi-bin/koha/members/members-home.pl')){
        var superlib = $('span#logged-in-info-full').children().hasClass('is_superlibrarian');
        var categories = "REPLACE_BY_CONFIG_PARAM_A";
        categories = categories.trim();
        categories = categories.split(',');
        if (window.location.pathname.includes('/cgi-bin/koha/members/memberentry.pl')){
            var e = document.getElementById("categorycode_entry");
            var value = e.value;
            if (!superlib && categories.includes(value)){
                e.disabled = true;
                $('input#cardnumber').prop("readonly", true);
                $('input#surname').prop("readonly", true);
                $('input#firstname').prop("readonly", true);
                //$('input#cardnumber').css('pointer-events','none').attr('tabindex','-1');
            }
            if (!superlib){
                categories.forEach(piilotus);
                function piilotus(item) {
                    $('select#categorycode_entry option[value="'+ item +'"]').parent().hide();
                }
            }
        }
        if (window.location.pathname.includes('/cgi-bin/koha/members/members-home.pl')){
            if (!superlib){
                categories.forEach(piilotus);
                function piilotus(item) {
                    $('div#new-patron-button ul li a[href*="categorycode=' + item + '"]').parent().hide();
                }
            }
        }
    }
});
/// LOPPU ///