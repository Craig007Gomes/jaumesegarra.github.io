   if(!localStorage.getItem('user')){
	  window.location.href="login.html"
   }
   var user = localStorage.getItem('user');
   var passmd5 = localStorage.getItem('passwd');

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
   function acceptgrj(idgroup,id){
     $.ajax({
       type: "GET",
       crossDomain: true,
       url: "http://m2s.es/app/api/connect/acceptpjg.php?id="+idgroup+"&iduser="+id,
       cache:false,
       dataType: 'jsonp',
       beforeSend: function() {
         console.log('Connecting...');
         $('#acceptpeogroup-'+id).attr('disabled', true);
         $('#acceptpeogroup-'+id).html('Loading...')
       },
       success: function(result) {
         if(result.mensaje == 'ok'){
           setInterval(function(){
	         $('#fgr-'+id).fadeOut(500, function() {
	           $('#fgr-'+id).remove();
	         })
	         if($('#list-notifications .item').length == '0'){
		       $('.background-dark').remove();
	         }
	       },3000);
         }
       }
     })
   }
   function blockgrj(idgroup,id){
     $.ajax({
       type: "GET",
       crossDomain: true,
       url: "http://m2s.es/app/api/connect/blockpjg.php?id="+idgroup+"&iduser="+id,
       cache:false,
       dataType: 'jsonp',
       beforeSend: function() {
         console.log('Connecting...');
         $('#blockpeogroup-'+id).attr('disabled', true);
         $('#blockpeogroup-'+id).html('Loading...')
       },
       success: function(result) {
         if(result.mensaje == 'ok'){
           setInterval(function(){
	         $('#fgr-'+id).fadeOut(500, function() {
	           $('#fgr-'+id).remove();
	         })
	         if($('#list-notifications .item').length == '0'){
		       $('.background-dark').remove();
	         }
	       },3000);
         }
       }
     }) 
   }
   function acceptfriend(id) {
                       $.ajax({
                         type: "GET",
                         crossDomain: true,
                         url: "http://m2s.es/app/api/connect/acceptfriend.php?id="+id,
                         cache:false,
                         dataType: 'jsonp',
                         beforeSend: function() {
                             console.log('Connecting...');
                             $('#acceptfriend-'+id).attr('disabled', true);
                             $('#acceptfriend-'+id).html('Loading...')
                         },
                         success: function(result) {
                            if(result.mensaje == 'ok'){
                             setInterval(function(){
	                            $('#fr-'+id).fadeOut(500, function() {
	                               $('#fr-'+id).remove();
	                            })
	                            if($('#list-notifications .item').length == '0'){
		                            $('.background-dark').remove();
	                            }
	                            if (document.location.pathname.indexOf("index.html") == 0){
		                            document.location.href='index.html';
	                            }
	                         },3000);
                            }
                         }
                       })
   };
   function blockfriend(id) {
                       $.ajax({
                         type: "GET",
                         crossDomain: true,
                         url: "http://m2s.es/app/api/connect/blockfriend.php?id="+id,
                         cache:false,
                         dataType: 'jsonp',
                         beforeSend: function() {
                             console.log('Connecting...');
                             $('#blockfriend-'+id).attr('disabled', true);
                             $('#blockfriend-'+id).html('Loading...')
                         },
                         success: function(result) {
                            if(result.mensaje == 'ok'){
                             setInterval(function(){
	                            $('#fr-'+id).fadeOut(500, function() {
	                               $('#fr-'+id).remove();
	                            })
	                            if($('#list-notifications .item').length == '0'){
		                            $('.background-dark').remove();
	                            }
	                         },3000);
                            }
                         }
                       })
   };
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
               divno.innerHTML='<span class="icon remove" id="closenotifications"></span><div id="list-notifications"></div>';
               divno.className='background-dark';
               var modsv = document.getElementById('modsv');
               modsv.appendChild(divno);
               for(var i = 0; i < result.listnotify.length; i++){
                 id = result.listnotify[i].id; 
                 username = result.listnotify[i].username;
                 imgp = result.listnotify[i].imgp;
                 type = result.listnotify[i].type;
                 if(type == 'friend-request'){
                   itemlist = '<div class="item" id="fr-'+id+'">';
                 }else{
                   if(type == 'addgroup-request'){
                     itemlist = '<div class="item" id="fgr-'+id+'">';
                   }else{
	                 itemlist = '<div class="item">';    
	               }
                 }
                 itemlist += '<img src="'+imgp+'"/>';
                 itemlist += '<div class="right-img">';
                 itemlist += '<span>'+username+'</span>';
                 if(type == 'friend-request'){
	               itemlist += ' wants your friend';
	               itemlist += '<button id="acceptfriend-'+id+'" class="btn btn-lg btn-info" onclick="acceptfriend('+id+')">Accept friend</button>';
	               itemlist += '<button id="blockfriend-'+id+'"  class="btn btn-lg btn-danger" onclick="blockfriend('+id+')">Block</button>';
                 };
                 if(type == 'message'){
                   msm = result.listnotify[i].msm;
	               itemlist += ' said you: '+msm;
                   var url = 'index.html#chat-'+id;
	               itemlist += '<a href="'+url+'" id="close-click"><button class="btn btn-lg btn-info">Read</button></a>';
                 };
                 if(type == 'message-group'){
                   msm = result.listnotify[i].msm;
                   namegroup = result.listnotify[i].namegroup;
	               itemlist += ' said in the group '+namegroup+': '+msm;
	               itemlist += '<a href="groups.html#chat-'+id+'"><button class="btn btn-lg btn-info">Read</button></a>';
                 }
                 if(type == 'addgroup-request'){
                   idgroup = result.listnotify[i].idgroup;
                   namegroup = result.listnotify[i].namegroup;
	               itemlist += ' wants join to your group '+namegroup;  
	               itemlist += '<button onclick="acceptgrj('+idgroup+','+id+')" id="acceptpeogroup-'+id+'" class="btn btn-lg btn-info">Accept</button>';
	               itemlist += '<button onclick="blockgrj('+idgroup+','+id+')" id="blockpeogroup-'+id+'" class="btn btn-lg btn-danger">Block</button>';
                 }
                 itemlist += '</div></div>';
                 $('#list-notifications').append(itemlist);
               }
               $('#closenotifications').click(function(){
	               $('.background-dark').remove();
               })
               $('#close-click').click(function(){
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
                }else{
                 if(navigator.mozNotification){
	               var notification = navigator.mozNotification;
                   var n = notification.createNotification("You have new notifications!", "Looks like you are popular in M2S!","http://m2s.es/app/img/icon-114.png");
                   n.onclick = function() {
	                 litsnotify();
                   }
                   n.show(); 
                 }
                }
            }
            if(result.notification != '0'){
		        $('.navbar-fixed-top').css('height','70px');
		        var notifyb = '<div id="notify-mobile">You have notifications!</div>';
		        $('.navbar-fixed-top').prepend(notifyb);
		        if($(window).width() <= '500'){
		          $('#contents').css('padding-top','35px');
		          $('#contents .chat-messages').css('padding-bottom', '135px');
		        }else{ 
		          $('#contents').css('padding-top','20px');
		        }
		        $(window).resize(function() {
	              if($(window).width() > '500'){
	                if($('#contents').css('padding-top') == '35px'){
		               $('#contents').css('padding-top','20px'); 
		               $('#contents .chat-messages').css("padding-bottom", "");
	                }
	              }
	            })
		        $('#contents').css('height','100%');
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
     }, 14000);
   });
   function signout(){
	   $.ajax({
          type: "GET",
          crossDomain: true,
          url: "http://m2s.es/app/api/connect/signout.php",
          cache:false,
          dataType: 'jsonp',
          success: function(result) {
             if(result.mensaje == 'ok'){
	              localStorage.removeItem('user');
	              localStorage.removeItem('passwd');
	              window.location.href="login.html"
             }else{
	             console.log('Error to sign out')
             }
          }
       })
   }