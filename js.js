var cookie = getCookie("enable");
var all = document.getElementById("all");
var blocked = document.getElementById("blocked");
var title = document.getElementsByClassName("title");

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function check_all(is_checked) {
    all.checked = is_checked;
    title[0].style = "color:#ccc";
    title[1].style = "color:#ccc";
    if (is_checked) {
        document.getElementById("title-all").style.color = "#2196F3";
        blocked.checked = false;
        setCookie("enable", "all", 1000);
    } else {
        document.getElementById("title-all").style.color = "#ccc";
        setCookie("enable", "none", 1000);
    }

}
function check_blocked(is_checked) {
    blocked.checked = is_checked;
    title[0].style = "color:#ccc";
    title[1].style = "color:#ccc";
    if (is_checked) {
        document.getElementById("title-blocked").style.color = "#2196F3";
        all.checked = false;
        setCookie("enable", "blocked", 1000);
    } else {
        document.getElementById("title-blocked").style.color = "#ccc";
        setCookie("enable", "none", 1000);
    }

}

if (cookie == 'all') {
    check_all(true);
} else if (cookie == 'blocked') {
    check_blocked(true);
} else if (cookie == 'none') {
    check_blocked(false);
    check_all(false);
}

all.addEventListener('click', function (view) {
    check_all(all.checked);
});
blocked.addEventListener('click', function () {
    check_blocked(blocked.checked);
});