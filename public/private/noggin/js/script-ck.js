//i shouldve just used jquery to do this. writing this in javascript was more complicated than it needed to be.
//global variables!!
var request, op, keyA = "fa96520990157f8a3077251dabf16267";

$(document).ready(function() {
    function e(e) {
        $.getJSON(e + "?key=" + keyA, function(e) {
            $.each(e, function(e, t) {
                var n = this;
                for (var r = 0; r < n.length; r++) {
                    var i = n[r];
                    $.post("http://recruiting.nogginlabs.com/web-service/api/set_db_value.php", {
                        key: keyA,
                        email: "andrew.luhring@gmail.com",
                        task_id: i.name,
                        value: "complete"
                    });
                    $("#responded h1:nth-of-type(" + (r + 1) + ")").append(i.name);
                    for (var s in i) {
                        var o = i[s];
                        $("#responded p:nth-of-type(" + (r + 1) + ")").append([ s ] + "  :  " + o + "<br />");
                    }
                }
            });
        }, {
            email: "andrew.luhring@gmail.com"
        });
    }
    $("#rainbows").click(function() {
        e("http://recruiting.nogginlabs.com/web-service/api/get_task_list.php");
        $("#responded").hide(2);
        $("#responded").show("slow");
    });
});

var audioTag = document.createElement("audio");

(!audioTag.canPlayType || "no" === audioTag.canPlayType("audio/mpeg") || "" === audioTag.canPlayType("audio/mpeg") || "no" === audioTag.canPlayType("audio/ogg")) && AudioPlayer.embed("audioplayer", {
    soundFile: "audio.mp3"
});