function socialChat(facebook, button_color) {
  var options = {
    facebook: facebook, // Facebook page ID
    whatsapp: "+51987546499", // WhatsApp number
    call_to_action: "Déjanos un mensaje!", // Call to action
    button_color: button_color, // Color of button
    position: "right", // Position may be 'right' or 'left'
    order: "facebook,whatsapp", // Order of buttons
  };

  var proto = document.location.protocol,
    host = "whatshelp.io",
    url = proto + "//static." + host;
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = url + '/widget-send-button/js/init.js';
  s.onload = function () {
    WhWidgetSendButton.init(host, proto, options);
  };
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
};

export default socialChat