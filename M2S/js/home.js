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
function loadchat(id){
	   $.ajax({
            type: "GET",
            crossDomain: true,
            url: "http://m2s.es/app/api/chat.php?id="+id,
            cache:false,
            dataType: 'jsonp',
            success: function(data) {
            if(data.messages.length == 0){
             $('.'+'chat-messages .center').html('<div class="center-align"><h3><span class="icon comments-alt"></span>You have not said anything yet</h3></div>');
            }else{
             $('.'+'chat-messages .center').html('');
            }
            if($(window).width() <= '500'){
	           $('.chat-messages').css('display','block');
	           $('.nav.navbar-nav li').css('display','none');
	           username = $('.li-chats.active .name').html();
	           $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">Chat with '+username+'</div></div>');
	           $('#forw .icon.chevron-left').click(function(){
		          $('.li-chats').removeClass("active");
		          $('.chat-messages').css('display','none');
		          $('.nav.navbar-nav li').css('display','inline-block');
		          $('#forw').remove();
		          $('.chat-messages').html('<div class="center"><div class="center-align"><h3>No friend select</h3><p>Select one of your friends for chatting width his</p></div></div>');
	           });
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
   function chat(id){
       id = id.toString();
       $('.li-chats').removeClass("active");
	   $('#list-'+id).addClass("active");
	   if($('.input-chat').length){
		   $('.input-chat').remove();
	   }
	   loadchat(id);
       $('.'+'chat-messages').append('<div class="input-chat"><textarea class="form-control" rows="2" name="txt"></textarea> <button class="btn btn-info" onclick="sendmsm('+id+')">Send</button></div>');
       }
   function sendmsm(id){
       var txtvalue = document.getElementsByName('txt')[0].value;
       var mapv = '';
	   $.ajax({
        type: "GET",
        crossDomain: true,
        url: "http://m2s.es/app/api/connect/chat.php",
        data: "txt="+txtvalue+"&map="+mapv+"&id="+id,
        cache:false,
        dataType: 'jsonp',
        beforeSend: function() {
          console.log('Connecting...');
          var sending = '<div id="sending-mod"><span>Sending...</span></div>';
          $('.input-chat').append(sending);
          $('.input-chat button').attr("disabled","disabled");
        },
        complete: function() {
         console.log('Completed');
         $('#sending-mod').remove();
         $('.input-chat button').removeAttr("disabled");
         document.getElementsByName('txt')[0].value = '';
         id = $('.li-chats.active').attr("id").split('-');
         id = id[1];
	     loadchat(id); 
       },
       success: function(result) {
         console.log(result.mensaje);
       }  
     })
   };
$(document).ready(function() {
      if($('.li-chats .active').length != '0'){
       var chatrefresh = setInterval(function() {
        id = $('.li-chats.active').attr("id").split('-');
        id = id[1];
	    loadchat(id);
      }, 14000);
      }
   });
   $(window).resize(function() {
	  if($(window).width() > '500'){
	    if($('#forw').lenght != '0'){
		    $('.nav.navbar-nav li').css('display','inline-block');
		    $('#forw').remove();
		    $('.chat-messages').removeAttr("style");
	    }
	  } 
	  if($(window).width() <= '500'){
	        if(!$('.chat-messages').attr('style')){
		       $('.li-chats').removeClass("active");
		       $('.chat-messages').html('<div class="center"><div class="center-align"><h3>No friend select</h3><p>Select one of your friends for chatting width his</p></div></div>');
	        }
	  }
   })
   function urlchange(){
   var urlas = urlast();
   if(urlas != undefined){
	  var chatu = urlas.split('-')[1];  
	  if(chatu==undefined){
          console.log(undefined);
       }else{
          chat(chatu);
       }
   }
   }
   urlchange();
   $(window).on('hashchange', function(e){
     urlchange()
   });