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
    var keyuser = localStorage.getItem('keyuser');
    var divs = '';
	   $.ajax({
          type: "GET",
          jsonpCallback:'jpCallback',
          crossDomain: true,
          url: "http://m2s.es/app/api/getfriends.php?key="+keyuser,
          cache:false,
          dataType: 'jsonp',
          success: function(result) {
             if(result.friends){
             if(result.friends.length == '0'){
	            $('#people-bar #list-friends').append("<div class='no-friends'><h4>"+Language.nofriends+"</h4><p>"+Language.nofriendsinfo+"</p></div>"); 
             }
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
                 divs +='" class="img"/><div class="right-info">'; 
                 divs +=unreadmsm; 
                 divs +='<span class="icon chevron-right"></span></div><div class="right-p"><div><span class="name">'; 
                 divs +=username; 
                 divs +='</span><span class="state">'; 
                 if(state == null){
	                divs += '--';   
                 }else{
                    divs +=state;
                 } 
                 divs +='</span></div></div></li>';
             };
             $('#people-bar #list-friends').append(divs);
             urlchange();
          }
          }
       });
function loadchat(id, type){
	   $.ajax({
            type: "GET",
            crossDomain: true,
            url: "http://m2s.es/app/api/chat.php?id="+id+"&key="+keyuser,
            cache:false,
            dataType: 'jsonp',
            success: function(data) {
            if(data.messages.length == 0){
             $('.'+'chat-messages .center').html('<div class="center-align"><h3><span class="icon comments-alt"></span>'+Language.nomessageschat+'</h3></div>');
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
              $('.'+'chat-messages .center').append(datosmem);
            }
            if(type == 'pr' || type == 'prs'){
	          var d = $('.'+'chat-messages .center');
	          d.scrollTop(d.prop("scrollHeight"));
            }
            $('.imagechat').click(function(){
             var urlimg = $(this).attr('alt');
             imagemod(urlimg);
            })
           }
         });
function crearmsmd(id,username,iduser,imgr,textmsm,locat,leido,fecha,me,stick,tableid){
        if(me == '1'){
           if(stick == '1'){
             msm ='<div id="'+id+'" class="sms stick me">';
           }else{
             msm = '<div class="sms me" id="'+id+'">';
           }
         msm+= '<a href="javascript:deletemessage('+id+')" class="trash" style="text-decoration:none;color:#777777;float:right;display:none;line-height: 50px;width: 50px;font-size:26px;text-align:center"><span class="icon trash"></span></a>';
         msm+= '<img src="'+imgr+'" class="imgp" style="right:0px;"/>';
         if(stick == '1'){
             msm+= '<blockquote style="position:relative;top:-15px;margin-bottom: -7px;">';
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
           msm+= '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+locat.latitude+','+longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;max-height: 200px;max-width: 700px;width: 100%;"></iframe>';     
         }
         msm+='<div class="foot">';
         if(leido != 'NO'){
           msm+='<span class="tick">✓</span>';
         }
         msm+= fecha+' ';
         msm+='</div></div></blockquote>'
      }else{
        if(stick == '1'){
         msm ='<div id="'+id+'" class="sms stick">';
        }else{
         msm = '<div id="'+id+'" class="sms">';
        }
        msm+='<a href="#" onclick="infouser('+iduser+')">';
        msm+= '<img src="'+imgr+'" class="imgp"/></a>';
        if(stick == '1'){
         msm+= '<blockquote style="position:relative;top:-15px;margin-bottom: -7px;">';
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
         msm+= '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+locat.latitude+','+longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;max-height: 200px;max-width: 700px;width: 100%;"></iframe>';   
        }
        msm+='<div class="foot">';
        if(leido== 'NO'){
          msm+='<audio autoplay="" preload="auto" autobuffer><source src="new.ogg" /></audio>';
        }
        msm+= fecha;
        msm+='</div></div></blockquote>'
      }
      if(me == '1'){
	     $$('#'+id).swipeLeft(function() {
           $('#'+id+' .trash').css('display','block');
           if(stick == '1'){
	         $('#'+id+' blockquote').css('left','-245px');
           }else{
             $('#'+id+' blockquote').css('margin-right','140px'); 
           }
           $('#'+id+' img').css('position','relative'); 
           $('#'+id+' img').css('right','20px'); 
           console.log('swipe!');
         });
         $$('#'+id).swipeRight(function() {
           $('#'+id+' .trash').css('display','none');  
           if(stick == '1'){
	         $('#'+id+' blockquote').css('left','-180px');  
           }else{
             $('#'+id+' blockquote').removeAttr('style'); 
           }
           $('#'+id+' img').removeAttr('style'); 
         });
       }
     if($('#'+id).length){}else{
       return msm;
       var d = $('.'+'chat-messages .center');
	   d.scrollTop(d.prop("scrollHeight"));
     }
	   }
   }
   function chat(id){
       id = id.toString();
       $('.li-chats').removeClass("active");
	   $('#list-'+id).addClass("active");
	   if($(window).width() <= '500'){
	          $('.chat-messages').html('<div class="center"><div id="loading-user"><img src="css/loading.gif" width="25px" height="25px"/> <span>'+Language.loading+'</span></div></div>');
	           $('.chat-messages').css('display','block');
	           $('.nav.navbar-nav li').css('display','none');
	           username = $('.li-chats.active .name').html();
	           $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">'+Language.chatwith+' '+username+'</div><span class="icon plus" data-toggle="modal" data-target="#more-share"></span></div>');
	           $('#forw .icon.chevron-left').click(function(){
		          $('.li-chats').removeClass("active");
		          $('.chat-messages').css('display','none');
		          $('.nav.navbar-nav li').css('display','inline-block');
		          $('#forw').remove();
		          $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nofriendselect+'</h3><p>'+Language.nofriendselectinfo+'</p></div></div></div>');
	           });
       }
	   if($('.input-chat').length){
		   $('.input-chat').remove();
	   }	   
       $('.'+'chat-messages').append('<div class="input-chat"><textarea class="form-control" rows="2" name="txt"></textarea> <button class="btn btn-info" id="more-chat" data-toggle="modal" data-target="#more-share">+</button> <button class="btn btn-info" id="send-button" onclick="sendmsm('+id+')">'+Language.send+'</button></div>');
       $("textarea[name='txt']").keypress(function(event) {
              if(event.keyCode == 13) {
                if (!event.shiftKey) sendmsm()
              }
       });
       loadchat(id,'pr');
       }
   function deletemessage(id){
	   id = id.toString();
	   $.ajax({
            type: "GET",
            crossDomain: true,
            url: "http://m2s.es/app/api/connect/delete-message.php?id="+id+"&key="+keyuser,
            cache:false,
            dataType: 'jsonp',
            success: function(data) {
               if(data.mensaje == 'ok'){
                  console.log('Message deleted succesfully');
                  $('#'+id).fadeOut(1000, function() {
	               $('#'+id).remove();  
	              })
               }
            }
      });
   }
   function poststick(text){
       $('#more-share').modal('hide');
	   sendchat(text,'');
   }
   function sendmsm(){
	   var txtvalue = document.getElementsByName('txt')[0].value;
	   if(document.getElementsByName('map')[0]){
	     var mapv = document.getElementsByName('map')[0].value;
       }else{
	     var mapv = "";
       }
	   sendchat(txtvalue,mapv);
   }
   function sendchat(text,map){
       if($('.li-chats.active').length != '0'){
       id = $('.li-chats.active').attr("id").split('-');
       id = id[1];
	   $.ajax({
        type: "GET",
        crossDomain: true,
        url: "http://m2s.es/app/api/connect/chat.php",
        data: "txt="+text+"&map="+map+"&id="+id+"&key="+keyuser,
        cache:false,
        dataType: 'jsonp',
        beforeSend: function() {
          console.log('Connecting...');
          $('.input-chat #send-button').attr("disabled","disabled");
        },
        complete: function() {
         console.log('Completed');
         $('.input-chat #send-button').removeAttr("disabled");
         document.getElementsByName('txt')[0].value = '';
	     loadchat(id,'prs'); 
       },
       success: function(result) {
         console.log(result.mensaje);
       }  
     })
     }
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
	    if($('#forw').length != '0'){
		    $('.nav.navbar-nav li').css('display','inline-block');
		    $('#forw').remove();
		    $('.chat-messages').removeAttr("style");
	    }
	    if($('#add-people').is(":visible")){
		    if($('#home.active').length){
			    $('#home').removeClass("active");
	            $('#speop').addClass("active");
		    }
	    }
	    if($('footer').is(":visible")){
	        $('footer').hide();
	    } 
	    if($('#spaces').length != '0'){
		    $('#spaces').remove();
	    }
	    if($('.foot-space').length == '0'){
	         var messageschatdd = $('.chat-messages').html();
	         $('.chat-messages').html('<div class="foot-space">'+messageschatdd+'</div>');
	         var d = $('.'+'chat-messages .center');
	         d.scrollTop(d.prop("scrollHeight"));
	    } 
	  } 
	  if($(window).width() <= '500'){
	        var spaces = "<div id='spaces' style='height:60px;width:100%'></div>";
	        if($('#spaces').length == '0'){
	           $('#people-bar').append(spaces);
	        }
	        if(!$('.chat-messages').attr('style')){
		       $('.li-chats').removeClass("active");
		       $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nofriendselect+'</h3><p>'+Language.nofriendselectinfo+'</p></div></div></div>');
		       if($('#map-html').lenght != '0'){
		        $('#btn-location').html('Share location');
	            $('#btn-location').removeClass('btn-danger');
                $('#btn-location').addClass('btn-info'); 
                $('#map-html').remove();
               }
               $('#more-share').modal('hide');
	        }
	      if(!$('#add-people').is(":visible")){
	        if(!$('footer').is(":visible")){
	           $('footer').show();
	        } 
	      }
	      var d = $('.'+'chat-messages .center');
          d.scrollTop(d.prop("scrollHeight"));
	  }
   });
   if($(window).width() <= '500'){
	    var spaces = "<div id='spaces' style='height:60px;width:100%'></div>";
	    $('#people-bar').append(spaces);
   }
   function urlchange(){
   var urlas = urlast();
   if(urlas != undefined){
	  var chatu = urlas.split('-')[1];  
	  if(chatu==undefined){
          console.log(undefined);
       }else{
          chat(chatu);
          if($('#list-friends').is(":visible")){
	         $('#list-friends').show(); 
          }
       }
   }
   }
   $(window).on('hashchange', function(e){
     urlchange()
   });
   function speop(){
     if($(window).width() > '500'){
      if($('#home.active').length){
	   $('#list-friends').hide(); 
	   $('#add-people').show(); 
	   $('#home').removeClass("active");
	   $('#speop').addClass("active");
	   $('.li-chats').removeClass("active");
	   $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nofriendselect+'</h3><p>'+Language.nofriendselectinfo+'</p></div></div></div>');
	   $('#home').click(function(){
		 $('#list-friends').show(); 
	     $('#add-people').hide(); 
	     $('#home').addClass("active");
	     $('#speop').removeClass("active");  
	   });
	  }else{
	   $('#list-friends').show(); 
	   $('#add-people').hide(); 
	   $('#home').addClass("active");
	   $('#speop').removeClass("active"); 
	  }
	 }
	 if($(window).width() <= '500'){
	   $('#list-friends').hide(); 
	   $('#add-people').show();
	   $('footer').hide();
	   $('#spaces').css('height','20px');
	   $('.nav.navbar-nav li').css('display','none');
	   $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">'+Language.addfriends+'</div></div>');
	   $('#forw .icon.chevron-left').click(function(){
	      $('#list-friends').show(); 
	      $('#add-people').hide();
	      $('footer').show();
	      $('#forw').remove();
	      $('.nav.navbar-nav li').show();
	      $('#spaces').css('height','60px');
	   })
	 }
   }
   function submitadd(){
	  $('.'+'people').html('<div id="loading-user"><img src="css/loading.gif" width="25px" height="25px"/> <span>'+Language.loading+'</span></div>');
	   if(document.getElementById('person')){
		   $('#person').remove();
	   }
	   var valueinput = $('#search-useradd').val();
	   if ($('#search-useradd').val().length != 0) {
	   $.ajax({
        type: "GET",
        jsonpCallback:'jpCallback',
        crossDomain: true,
        url: "http://m2s.es/app/api/profileinfo.php?username="+valueinput+"&key="+keyuser,
        cache:false,
        dataType: 'jsonp',
        success: function(data) {
        username = data.username;
        image = data.imagein;
        id = data.id;
        state = data.state;
        datos = crearNoticiaHtml(username,image,id,state);
        $('.'+'people').append(datos);
        },
        complete: function(){
	      if($('#loading-user').length){
	        $('#loading-user').css('display','none');
	      }
        }
            }); 
          }; 
        function crearNoticiaHtml(username,image,id,state){
            if(state == '1'){
             noticiaHTML = '<div id="person">';
             noticiaHTML += '<img src="'+ image + '"/>';
             noticiaHTML += '<p>'+ username +'</p>';
             noticiaHTML += '<a href="javascript:addpeople('+ id +')"><button  class="btn btn-primary" id="addfriendb">'+Language.sendrequestfriend+'</button></a></div>';
             }
             if(state == '2'){
             var searchinput = document.getElementById('search-useradd');
             var valueinput = searchinput.value; 
             noticiaHTML = '<div id="person">' + valueinput + ' '+Language.alreadyfriend+'</div>';
             }
             if(state == '3'){
             noticiaHTML = '<div id="person">'+Language.usernotexist+'</div>';
             }
             if(state == '4'){
             noticiaHTML = '<div id="person">'+Language.addyourself+'</div>';
             }
          return noticiaHTML;
            }
	       } 
    function addpeople(id){
         $.ajax({
          type: "GET",
          crossDomain: true,
          url: "http://m2s.es/app/api/connect/addfriend.php",
          data: "id="+id+"&key="+keyuser,
          cache:false,
          dataType: 'jsonp',
          beforeSend: function() {
          console.log('Connecting...');
          $('#addfriendb').attr("href", "#");
          $('#addfriendb').html(Language.loading)
          },
          success: function(result) {
            if(result.mensaje == 'ok'){
              $('#addfriendb').html(Language.petitionfriendsend)
            }else{
	          $('#addfriendb').html('Error'); 
	          setInterval(function(){
		        $('#addfriendb').html(Language.sendrequestfriend);   
		        $('#addfriendb').attr("href", "javascript:addpeople("+id+")");
	          },5000);
            }
          }   
     })  
   }
   $('#file-input').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;
        
        if (!file.type.match(imageType))
            return;
        
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
        
     });
    function fileOnload(e) {
        var $img = $('<img>', { src: e.target.result });
        var canvas = $('#canvas')[0];
        $('#file-input').val('');
        $img.load(function() {
		    canvas.width = this.width;
            canvas.height = this.height;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(this, 0, 0, this.width, this.height);
        });
        $('#more-share').modal('hide');
        $('#img-mod').modal('show');
    }
    
    $('#upload-image').click(function(){
     if($('.li-chats.active').length != '0'){
        $('#upload-image').attr('disabled','disabled');
        var canvas = document.getElementById("canvas");
        var url = canvas.toDataURL("image/png", 1.0);
        url = url.replace('data:image/png;base64,', '');
        console.log(url);
        $.ajax({
          url: 'https://api.imgur.com/3/image',
          method: 'POST',
          headers: {
            Authorization: 'Client-ID def4c03828b22c2',
            Accept: 'application/json'
          },
          data: {
            image: url,
            type: 'base64'
          },
          success: function(result) {
          var link = result.data.link;
          sendchat(link,'');
          $('#upload-image').removeAttr("disabled");
          $('#img-mod').modal('hide');
          }
        });
        }
    });
    function mostrar_mapa(position) {
       if($('.input-chat').length != '0'){
           var latitud = position.coords.latitude;
           var longitud = position.coords.longitude;
           var latlong = latitud+' '+longitud;
           $('.input-chat').append(
           $(document.createElement("input")).attr("value", latlong).attr('name','map').attr('type','hidden').attr('class','map')
           );
           var mapht = '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+latitud+','+longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;margin-top: 10px;max-height: 200px;max-width: 700px;width: 100%;" id="map-html"></iframe>';
           $('#location').append(mapht);
           $('#btn-location').removeAttr("disabled");
           $('#btn-location').html(Language.removelocation);
           $('#btn-location').removeClass('btn-info');
           $('#btn-location').addClass('btn-danger');
        }
         }
    $('#btn-location').click(function(){
       if($('.input-chat').length != '0'){
       if($('#btn-location.btn-info').length != '0'){
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(mostrar_mapa);
         }else{
            alert("Your browser doesn't the location API");  
         }
         $('#btn-location').attr('disabled','disabled');
         $('#btn-location').html(Language.locationloading);
        }else{
	     $('#btn-location').html(Language.sharelocation);
	     $('#btn-location').removeClass('btn-danger');
         $('#btn-location').addClass('btn-info'); 
         $('#map-html').remove();
         $('input.map').remove();
        }
        }
        });
   