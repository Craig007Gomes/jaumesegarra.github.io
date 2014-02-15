function login(usern,pass,type){
	  $.ajax({
          type: "GET",
          crossDomain: true,
          url: "http://m2s.es/app/api/connect/login.php",
          data: "user="+usern+"&passmd5="+pass,
          cache:false,
          dataType: 'jsonp',
          beforeSend: function() {
          console.log('Connecting...');
          if(type == 'login'){
           $('#formsd').css('display','none');
           var sending = '<div id="sending-load"><img src="css/load-login.gif"></div>';
           $('.form').append(sending);
          }
          },
          success: function(result) {
            if(result.mensaje == 'OK'){
             if(type == 'login'){
             if (localStorage) {
              localStorage.setItem("user", usern);  
              localStorage.setItem("passwd", pass); 
              setInterval(function(){
              window.location.href="index.html";
              },4000);
             }else{
	           alert('This app needs localstorage!')
             };
             }else{
	           var href = $(location).attr('href'); 
	           window.location.href = href; 
             }
             console.log('Completed');
             };
            if(result.mensaje == 'e1'){
              console.log('Open session previously');
              if(type == 'login'){
               if (localStorage) {
                localStorage.setItem("user", usern);  
                localStorage.setItem("passwd", pass); 
                setInterval(function(){
                 window.location.href="index.html";
                },4000);
               }else{
	            alert('This app needs localstorage!')
               };
              }
            }
            if(result.mensaje == 'e2'){
              var Android;
              if(Android===undefined){
	           new Messi('Data not entered', {title: 'Error', titleClass: 'anim error', buttons: [{id: 0, label: 'Close', val: 'X'}]});
              }else{
              Android.showDialog('Data not entered');
              }
              if(type == 'login'){
              $('#formsd').css('display','block');
              $('#sending-load').remove();
              }
              console.log('Data not entered');
            }
            if(result.mensaje == 'e3'){
             if(type == 'login'){
             var Android;
              if(Android===undefined){
	            new Messi('Data not corrected', {title: 'Error', titleClass: 'anim error', buttons: [{id: 0, label: 'Close', val: 'X'}]});
              }else{
              Android.showDialog('Data not corrected');
              }
              $('#formsd').css('display','block');
              $('#sending-load').remove();
              }else{
	              localStorage.removeItem('user');
	              localStorage.removeItem('passwd');
	              window.location.href="login.html"
              }
              console.log('Data not corrected');
            }
          }   
     })
	}
if(document.getElementById('loginmod')){
	console.log('You are in the login page!');
	if(localStorage.getItem('user')){
	  window.location.href="index.html"
    };
    function logininputs() {
		var userinput = document.getElementsByName('user')[0].value;
		var passinput = document.getElementsByName('pass')[0].value;
		var passinput = md5(passinput);
		login(userinput,passinput,'login');
	}
}else{
   if(!localStorage.getItem('user')){
	  window.location.href="login.html"
   }
   var user = localStorage.getItem('user');
   var passmd5 = localStorage.getItem('passwd');
   if(document.getElementById('search-input')){
   var input = document.getElementById('search-input');
    input.onkeyup = function () {
    var filter = input.value.toUpperCase();
    var lis = document.getElementsByClassName('li-chats');
    for (var i = 0; i < lis.length; i++) {
        var name = lis[i].getElementsByClassName('name')[0].innerHTML;
        if (name.toUpperCase().indexOf(filter) == 0) 
            lis[i].style.display = 'block';
        else
            lis[i].style.display = 'none';
    }
   }
   }
    if(document.getElementById('people-bar')){
    var divs = '';
	   $.ajax({
          type: "GET",
          jsonpCallback:'jpCallback',
          crossDomain: true,
          url: "http://m2s.es/app/api/getfriends.php",
          cache:false,
          dataType: 'jsonp',
          success: function(result) {
             if(result.friends){
             for(var i = 0; i < result.friends.length; i++){
                 id = result.friends[i].id; 
                 username = result.friends[i].username; 
                 imagepr = result.friends[i].imagepr; 
                 state = result.friends[i].state; 
                 unreadmsm = result.friends[i].unreadmsm; 
                 if(unreadmsm == '0'){
	               unreadmsm = '';  
                 }
                 divs += '<li class="li-chats" id="list-'+id+'" onclick="chat('+id+')"><img src="'; 
                 divs +=imagepr; 
                 divs +='"/><div class="right-info">'; 
                 divs +=unreadmsm; 
                 divs +='<span class="icon chevron-right"></span></div><div class="right-p"><div><span class="name">'; 
                 divs +=username; 
                 divs +='</span><span class="state">'; 
                 divs +=state; 
                 divs +='</span></div></div></li>';
             };
             $('#people-bar').append(divs);
          }
          }
       });
    }
   function linkscom(textdf){
            var str = textdf;
            var exp = /((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?=([^"']*["'][^"']*["'])*[^"']*$)/ig;
            var exp2 = /((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+\.(?:jpe?g|gif|png))(?=([^"']*["'][^"']*["'])*[^"']*$)/ig;
            var exp3 = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/ig;
            var images = str.replace(exp2, "<img src='$1' alt='$1' class='image-chat'/>");
            var youtube = images.replace(exp3,"<div id='maxwidthyo'><div class='videoWrapper'><iframe frameborder='0' allowfullscreen src='http://www.youtube.com/embed/$1'/></div></div>");
            var links = youtube.replace(exp,"<a href='$1' target='_blank'>$1</a>");
            return links
    }
   function chat(id){
       id = id.toString();
       $('.li-chats').removeClass("active");
	   $('#list-'+id).addClass("active");

		   $.ajax({
            type: "GET",
            crossDomain: true,
            url: "http://m2s.es/app/api/chat.php?id="+id,
            cache:false,
            dataType: 'jsonp',
            success: function(data) {
            if(data.messages.length == 0){
             $('.'+'chat-messages .center').html('<div class="empty" id="nodata"><span class="icon comments-alt"></span><strong>You have not said anything yet</strong></div>');
            }else{
             $('.'+'chat-messages .center').html('');
            }
            for(var i = 0; i < data.messages.length; i++){
              id = data.messages[i].id; 
              username = data.messages[i].username;
              iduser = data.messages[i].iduser;
              imgr = data.messages[i].imgr;
              textmsm = data.messages[i].textmsm;
              locat = data.messages[i].locat;
              leido = data.messages[i].leido;
              fecha = data.messages[i].fecha;
              me = data.messages[i].me;
              stick = data.messages[i].stick;
              tableid = data.messages[i].tableid;
              datosmem = crearmsmd(id,username,iduser,imgr,textmsm,locat,leido,fecha,me,stick,tableid);
              $('.'+'chat-messages .center').prepend(datosmem);
            } 
           }
         });
      function crearmsmd(id,username,iduser,imgr,textmsm,locat,leido,fecha,me,stick,tableid){
        if(me == '1'){
           if(stick == '1'){
             msm ='<div id="'+id+'" class="sms stick me">';
           }else{
             msm = '<div class="sms me" id="'+id+'">';
           }
         msm+= '<img src="'+imgr+'" class="imgp" style="right:0px;"/>';
         if(stick == '1'){
             msm+= '<blockquote style="position:relative;top:-15px">';
         }else{
             msm+= '<blockquote>'
         }
         if(stick == '1'){
            msm+= '<div class="'+textmsm+'"></div>';  
         }else{
            msm+= '<p>'+linkscom(textmsm)+'</p>';
         }
         if(locat.latitude != null){
           longitud = locat.longitud;
           longitud = longitud.substring(0, longitud.length-2);
           msm+= '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+locat.latitude+','+longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;margin-left: -20px;max-height: 200px;max-width: 700px;width: 100%;"></iframe>';     
         }
         msm+='<div class="foot">';
         if(leido != 'NO'){
           msm+='<span class="tick">✓</span>';
         }
         msm+= fecha+' ';
         msm+= '<a href="deletec.php?id='+id+'&chati='+tableid+'" style="text-decoration:none;color:#777777;">Delete</div>';
         msm+='</div></div></blockquote>'
      }else{
        if(stick == '1'){
         msm ='<div id="'+id+'" class="sms stick">';
        }else{
         msm = '<div id="'+id+'" class="sms">';
        }
        msm+='<a href="#" onclick="usermod('+iduser+')">';
        msm+= '<img src="'+imgr+'" class="imgp"/></a>';
        if(stick == '1'){
         msm+= '<blockquote style="position:relative;top:-15px">';
        }else{
         msm+= '<blockquote>'
        }
        msm+='<span class="user">'+username+':</span>';
        if(stick == '1'){
         msm+= '<div class="'+textmsm+'"></div>';  
        }else{
         msm+= '<p>'+linkscom(textmsm)+'</p>';
        }
        if(locat.latitude != null){
         longitud = locat.longitud;
         longitud = longitud.substring(0, longitud.length-2);
         msm+= '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+locat.latitude+','+longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;margin-left: -20px;max-height: 200px;max-width: 700px;width: 100%;"></iframe>';   
        }
        msm+='<div class="foot">';
        if(leido== 'NO'){
          msm+='<audio autoplay="" preload="auto" autobuffer><source src="new.ogg" /></audio>';
        }
        msm+= fecha;
        msm+='</div></div></blockquote>'
      }
     if($('#'+id).length){}else{
       return msm;
     }
	   }
   }
   function aceptfriend(id){
	   <!--Coming/-->
   }
   function blockpeo(id){
	  <!--Coming/-->
   }
   function acceptgrj(idgroup,id){
	   <!--Coming/-->
   }
   function blockgrj(idgroup,id){
	   <!--Coming/-->
   }
   function notifications(){
	   $.ajax({
          type: "GET",
          crossDomain: true,
          url: "http://m2s.es/app/api/notifications.php",
          cache:false,
          dataType: 'jsonp',
          success: function(result) {
             if(result.listnotify != null){
              function litsnotify(){
               var divno = document.createElement('div');
               divno.innerHTML='<div id="list-notifications"></div>';
               divno.className='background-dark';
               var modsv = document.getElementById('modsv');
               modsv.appendChild(divno);
               for(var i = 0; i < result.listnotify.length; i++){
                 id = result.listnotify[i].id; 
                 username = result.listnotify[i].username;
                 imgp = result.listnotify[i].imgp;
                 type = result.listnotify[i].type;
                 itemlist = '<div class="item">';
                 itemlist += '<img src="'+imgp+'"/>';
                 itemlist += '<div class="right-img">';
                 itemlist += '<span>'+username+'</span>';
                 if(type == 'friend-request'){
	               itemlist += 'wants your friend';
	               itemlist += '<button onclick="aceptfriend('+id+')" class="btn btn-lg btn-info">Accept friend</button>';
	               itemlist += '<button onclick="blockpeo('+id+')" class="btn btn-lg btn-danger">Block</button>';
                 };
                 if(type == 'message'){
                   msm = result.listnotify[i].msm;
	               itemlist += 'said you: '+msm;
	               itemlist += '<a href="javascript:chat.html?id='+id+'"><button class="btn btn-lg btn-info">Read</button></a>';
                 };
                 if(type == 'message-group'){
                   msm = result.listnotify[i].msm;
                   namegroup = result.listnotify[i].namegroup;
	               itemlist += 'said in the group'+namegroup+': '+msm;
	               itemlist += '<a href="javascript:chatgr.html?id='+id+'"><button class="btn btn-lg btn-info">Read</button></a>';
                 }
                 if(type == 'addgroup-request'){
                   idgroup = result.listnotify[i].idgroup;
                   namegroup = result.listnotify[i].namegroup;
	               itemlist += 'wants join to your group '+namegroup;  
	               itemlist += '<button onclick="acceptgrj('+idgroup+','+id+')" class="btn btn-lg btn-info">Accept</button>';
	               itemlist += '<button onclick="blockgrj('+idgroup+','+id+')" class="btn btn-lg btn-danger">Block</button>';
                 }
                 itemlist += '</div></div>';
                 $('#list-notifications').append(itemlistm);
               }
               $('.background-dark').click(function(){
	               $('.background-dark').remove();
               })
              }
             }
             if(result.nosession == '1'){
	            login(user,passmd5,'session');
	            console.log('No session')
             }else{
             if(result.newnotication != '0'){
                if (Notification) {
                  var title = "You have new notifications!"
                  var extra = {
                    icon: "css/icon.png",
                    body: "Looks like you are popular in M2S!"
                  }
                  var noti = new Notification( title, extra)
                  noti.onclick = function(){litsnotify();}
                  noti.onclose = {
                  }
                  setTimeout( function() { noti.close() }, 10000)
                }
	            var notification = navigator.mozNotification;
                var n = notification.createNotification("You have new notifications!", "Looks like you are popular in M2S!","http://m2s.es/app/img/icon-114.png");
                n.onclick = function() {
	             litsnotify();
                }
                n.show(); 
            }
            if(result.notification != '0'){
		        $('.navbar-fixed-top').css('height','70px');
		        var notifyb = '<div id="notify-mobile">You have notifications!</div>';
		        $('.navbar-fixed-top').prepend(notifyb);
		        $('#contents').css('padding-top','20px');
		        $('#notify-mobile').click(function(){
			       litsnotify();
		        })
            }else{
	           if($('#notify-mobile').length != '0'){
		         $('.navbar-fixed-top').css('height','auto');  
		         $('#notify-mobile').remove();
		         $('#contents').css('padding-top','0px');
	           }  
            }
            };
          }
      })
   }
   notifications();
   $(document).ready(function() {
     var notificationsrefresh = setInterval(function() {
	    notifications();
     }, 14000000);
   });
}