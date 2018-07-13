

var current = document.getElementById('default');

function highlite(el){
    if (current != "nav-link"){
        current.className = "nav-link";
    }
    el.className = "nav-link highlite";
    current = el;
}


