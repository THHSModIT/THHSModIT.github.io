  function notundef(a){
    if(a != "" && a != " " && a != "undefined" && a != undefined){
      return true;
    }
    else{
      return false;
    }
  }
  function getElem(id){
    return document.getElementById(id);
  }
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  
  //Cookie handling
    function createCookie(name,value) {
      var date = new Date ();
      date.setYear (date.getYear() + 100);
      date = date.toGMTString();
      
      var expires = "; expires="+date;
      document.cookie = name+"="+value+expires+"; path=/";
    }
    function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
    function eraseCookie(name) {
      createCookie(name,"",-1);
    }
  //End Cookie handling
  
  //Get parameter from the address bar, passed from another page or directly added
  function GetURLParameter(sParam)
  {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) 
      {
        return sParameterName[1];
      }
    }
  }
  //Get a json file's contents
  function getjson(func, url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArg = JSON.parse(xmlhttp.responseText);
            func(myArg);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  function getHeight(obj){
	if(obj.offsetHeight) {
		return obj.offsetHeight;
	} else if(obj.style.pixelHeight) {
		return obj.style.pixelHeight;
	}
  }
  function shortenMenu(){
	var elem = getElem('menulinks');
	var h = getHeight(elem)-3;
	if(h<=0){
		elem.style.display="none";	
		elem.style.height="0";
		shortening = false;
		clearInterval(menuTime);
	}
	else{
		elem.style.height =  String(h)+"px";
	}
  }
  var shortening = false;
  var menuTime;
  headertext = "<header><h1 class='label'><a href='/'>ModIT</a></h1><div id='bar'><aside class='site-description'>Modern Innovative Technology</aside><div id='searchdiv'><input type='search' id='searchbar' onkeydown='searchenter(event)'/><span id='search-button' onclick='search(\"searchbar\");'><i class='icon-search'></i></span></div></div><div class='nav'><a id='navopen'>Menu</a><ul id='menulinks'><li><a href='/'>Home</a></li><li><a href='/companies'>Companies</a></li><li><a href='/doc'>Documentation</a></li><li><a href='/about'>About</a></li><li id='msearch'><div id='msearchdiv'><input type='search' id='msearchbar' onkeydown='searchenter(event)'/><span id='msearch-button' onclick='search(\"searchbar\");'><i class='icon-search'></i></span></div></li></ul></div></header>";
  getElem('header').innerHTML += headertext;
  menubutton = getElem("navopen");
  menubutton.onclick = function(){
	if(shortening){
		shortening = false;
		clearInterval(menuTime);
	}
	var ml = getElem('menulinks');
	if(ml.style.display=="block"){	
		shortening = true;
		menuTime = setInterval(shortenMenu, 1);
	}
	else{
		ml.style.display="block";
		ml.style.height="auto";
	}
  }
