function compteur(t) {
  var elemCompteur = document.getElementById("compteur");
  elemCompteur.innerHTML = t;
  tNew = t - 1;
  if (tNew >= 0) setTimeout("compteur(" + tNew + ")", 1000);
  else action();
}

var alert_title = "You have lost!";
var alert_Button_Text = "Try again if you want to live...";

if (document.getElementById) {
  window.alert = function(txt) {
    createCustomAlert(txt);
  };
}

function createCustomAlert(txt) {
  d = document;

  if (d.getElementById("modalContainer")) return;

  mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
  mObj.style.height = d.documentElement.scrollHeight + "px";

  alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";
  if (d.all && !window.opera)
    alertObj.style.top = document.documentElement.scrollTop + "px";
  alertObj.style.left =
    (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
  alertObj.style.visiblity = "visible";

  h1 = alertObj.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(alert_title));

  msg = alertObj.appendChild(d.createElement("p"));
  msg.innerHTML = txt;

  btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(alert_Button_Text));
  btn.href = "#";
  btn.focus();
  btn.onclick = function() {
    document.location.reload();
    return false;
  };

  alertObj.style.display = "block";
}

function removeCustomAlert() {
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("modalContainer"));
}

function action() {
  alert();
}

function gradient(id, level) {
  var box = document.getElementById(id);
  var boox = document.getElementById(id);
  var booox = document.getElementById(id);
  var boooox = document.getElementById(id);
  var booooox = document.getElementById(id);
  box.style.opacity = level;
  box.style.MozOpacity = level;
  box.style.KhtmlOpacity = level;
  box.style.filter = "alpha(opacity=" + level * 100 + ")";
  box.style.display = "block";
  return;
}

function fadein(id) {
  var level = 0;
  while (level <= 1) {
    setTimeout("gradient('" + id + "'," + level + ")", level * 1000 + 10);
    level += 0.01;
  }
}

function showMysteryPicture(box) {
  fadein(box);
}

function showMysteryPicture(boox) {
  fadein(boox);
}

function showMysteryPicture(booox) {
  fadein(booox);
}

function showMysteryPicture(boooox) {
  fadein(boooox);
}

function showMysteryPicture(booooox) {
  fadein(booooox);
}

function Redirect() {
  window.location = "/game/room2.html";
}












