var welcome_text = '<span class="welcome">Hi, welcome to Koder.Me <br>To know more please type "help"<br> </span>';
var prompt = '<p>vinayjain: ~ $ <span id="command" class="command"></span><span id="blink_text" class="blink">&#124;</span></p>';
var commands = '\
<table>\
<tr><td>hostname : </td> <td> Show information about me</td></tr>\
<tr><td>blog : </td> <td> Opens my blog in a new window</td></tr>\
<tr><td>resume : </td> <td> Opens my resume in a new window</td></tr>\
<tr><td>projects : </td> <td> See my open source projects</td></tr>\
<tr><td>instagram : </td> <td> Appreciate my looks</td></tr>\
';
var hostname = '<p>Hi my name is Vinay Jain, I am a Computer Programmer!!\
<br> I work in a startup as an iOS Application Developer in Pune, India. However my hometown is Indore, India\
';
function myKeyPress(e){
	var keynum;
  if(window.event){ // IE
  	keynum = e.keyCode;
  }else
    if(e.which){ // Netscape/Firefox/Opera
    	keynum = e.which;
    }
    var command = document.getElementById("command");
    var data = command.innerHTML;
    if(keynum==8){
    	e.preventDefault();
    	command.innerHTML = data.substring(0, data.length - 1);
    }
    else if(keynum==13){
    	execute(command.innerHTML);
    	return;
    }
    else if((keynum>=65 && keynum<=90) || (keynum>=97 && keynum<=122)){
    	command.innerHTML = (command.innerHTML + String.fromCharCode(keynum)).toLowerCase();
    }
    
}
function execute(code){
	switch(code){
		case "help":
			var command = document.getElementById("command");
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + commands;
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt;
		    var objDiv = document.getElementById("main");
			objDiv.scrollTop = objDiv.scrollHeight;
		    break;
		case "hostname":
			var command = document.getElementById("command");
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + hostname;
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt;
			break;
		case "resume":
			var newTab = window.open("http://careers.stackoverflow.com/vinayjain", '_blank');
  			newTab.focus();
  			var command = document.getElementById("command");
			var commandData = command.outerHTML;
			console.log(commandData);
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt; 
		    break;
		case "instagram":
			var newTab = window.open("http://instagram.com/vinayjn7", '_blank');
  			newTab.focus();
  			var command = document.getElementById("command");
			var commandData = command.outerHTML;
			console.log(commandData);
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt; 
		    break;    
		case "projects":
			var newTab = window.open("http://github.com/vinayjn", '_blank');
  			newTab.focus();
  			var command = document.getElementById("command");
			var commandData = command.outerHTML;
			console.log(commandData);
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt; 
		    break;    
  		case "blog":
			var newTab = window.open("http://blog.koder.me", '_blank');
  			newTab.focus();
  			var command = document.getElementById("command");
			var commandData = command.outerHTML;
			console.log(commandData);
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt;
		    break;
		case "":
			var command = document.getElementById("command");
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt;
			break;     		
		default:
			var command = document.getElementById("command");
		    var blink = document.getElementById("blink_text");
		    command.removeAttribute('id');
		    blink.innerHTML="";
		    blink.removeAttribute('id');
		    var terminal_text = document.getElementById("terminal-text");
		    terminal_text.innerHTML = terminal_text.innerHTML + "<br>-bash: command not found";
		    terminal_text.innerHTML = terminal_text.innerHTML + prompt;
			break;   
	}
}

