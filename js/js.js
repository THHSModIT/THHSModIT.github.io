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
  
  headertext = "";
  //getElem('header').innerHTML += headertext;
  menubutton = getElem("navopen");
  menubutton.onclick = function(){
	var ml = getElem('menulinks');
	if(ml.className == "navopen"){	
		ml.className = "navclosed";
	}
	else{
		ml.className = "navopen";
	}
  }
		//Copypasta from stackoverflow
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;

	var path = window.location.href.replace(/^.*\/\/[^\/]+/, '');
  window.onload=function(){
		
		if(path != "/"){
			getElem("topbar").className = 'topbaractive tbb';
		}
		else if(getScrollXY()[1] > 0){
			getElem("topbar").className = 'topbaractive';
		}
	var links = document.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++){
		if(links[i].href.replace(/^.*\/\/[^\/]+/, '').substring(0,2)=="/#"){
			links[i].onclick = function(e){
				sender = e.srcElement || e.target;
				str = sender.value.replace(/^.*\/\/[^\/]+/, '');
				elem = document.getElementById(str.substring(2,str.length));
				if(isFirefox){
					scrollTo(document.documentElement, elem.offsetTop, 400);
				}
				else{
					scrollTo(document.body, elem.offsetTop-80,400);
				}
			}
			links[i].value = links[i].href;
			links[i].removeAttribute("href");
		}
	}
	window.onscroll = function(){
		
		if(path != "/"){
			getElem("topbar").className = 'topbaractive tbb';
		}
		else if(getScrollXY()[1] > 0){
			getElem("topbar").className = 'topbaractive';
		}
		else{
			getElem("topbar").className = '';
		}
	};
  };


	function scrollTo(element, to, duration) {
		var start = element.scrollTop,
			change = to - start,
			increment = 1;
		var animateScroll = function(elapsedTime) {        
			elapsedTime += increment;
			var position = easeInOut(elapsedTime, start, change, duration);                        
			element.scrollTop = position; 
			if (elapsedTime < duration) {
				setTimeout(function() {
					animateScroll(elapsedTime);
				}, increment);
			}
		};
		animateScroll(0);
	}
	function easeInOut(currentTime, start, change, duration) {
		currentTime *= 2 / duration;
		if (currentTime < 1) {
			return change / 2 * currentTime * currentTime + start;
		}
		currentTime -= 1;
		return start-change / 2 * (currentTime * (currentTime - 2) - 1);
	}

	function getScrollXY() {
	  var scrOfX = 0, scrOfY = 0;
	  if( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	  }
	  return [ scrOfX, scrOfY ];
	}
	