jQuery(function($) {
    window.myappUtils = {

        toJson: function(arrays) {
                    var json = {};

                    $.each(arrays, function() {
                        json[this.name] = this.value;
                    });

                    return json;
                }

    }
});
