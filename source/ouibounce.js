function ouiBounce(el, config) {
  var config      = config || {},
      aggressive  = config.aggressive || false,
      sensitivity = setDefault(config.sensitivity, 20),
      timer       = setDefault(config.timer, 1000),
      callback    = config.callback || function() {},
      _html       = document.getElementsByTagName('html')[0];
  
  function setDefault(_property, _default) {
    return typeof _property === 'undefined' ? _default : _property;
  }

  setTimeout(attachOuiBounce, timer);
  function attachOuiBounce() {
    _html.addEventListener('mouseout', handleMouseout);
  }

  function handleMouseout(e) {
    if (e.clientY > sensitivity || (checkCookieValue('viewedOuibounceModal', 'true') && !aggressive)) return;
    fire();
    callback();
  }

  function checkCookieValue(cookieName, value) {
    // cookies are separated by '; '
    var cookies = document.cookie.split('; ').reduce(function(prev, curr) {
      // split by '=' to get key, value pairs
      var el = curr.split('=');

      // add the cookie to fn object
      prev[el[0]] = el[1];

      return prev;
    }, {});

    return cookies[cookieName] === value;
  }

  function fire() {
    el.style.display = 'block';
    disable();
  }

  function disable() {
    //set cookie expiration time
    var date = new Date(); 
    var indays = 1; //set days
		date.setTime(date.getTime()+(indays*24*60*60*1000));
		var expires = "; expires="+date.toGMTString()+"; path=/";
    document.cookie = 'viewedOuibounceModal=true'+expires;
    _html.removeEventListener('mouseout', handleMouseout);
  }

  return {
    fire: fire,
    disable: disable
  };
}
