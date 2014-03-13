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
          url: "http://m2s.es/app/api/getmygroups.php?key="+keyuser,
          cache:false,
          dataType: 'jsonp',
          success: function(result) {
             if(result.groups){
             if(result.groups == 'no'){
	            $('#people-bar #list-friends').append("<div class='no-friends'><h4>"+Language.nogroupsjoin+"</h4><p>"+Language.nogroupsjoininfo+"</p></div>"); 
             }
             for(var i = 0; i < result.groups.length; i++){
                 id = result.groups[i].id; 
                 namegroup = result.groups[i].namegroup; 
                 official = result.groups[i].official; 
                 imagepr = result.groups[i].imagepr; 
                 state = result.groups[i].state; 
                 unreadmsm = result.groups[i].unreadmsm; 
                 if(unreadmsm == '0'){
	               unreadmsm = '';  
                 }
                 divs += '<li class="li-chats" id="list-'+id+'" onclick="chat('+id+')">'; 
                 if (imagepr != null){
                   divs += '<img src="'+imagepr+'" class="img"/>'; 
                 }else{
                   var namesplit = namegroup.split(' ');
                   abv1 = namesplit[0].charAt(0);
                   if(namesplit[1]){
	                   abv2 = namesplit[1].charAt(0);
	                   abv = abv1 + abv2;
                   }else{
	                   abv = abv1;
                   }
	               divs += '<div class="img" style="background-color:#777"><p unselectable="on" onselectstart="return false;" onmousedown="return false;">'+abv+'</p></div>';
                 }
                 divs += '<div class="right-info">'; 
                 divs +=unreadmsm; 
                 if(official == 'yes'){
	              divs += '<span class="icon ok"></span>';   
                 }
                 divs +='<span class="icon chevron-right"></span></div><div class="right-p"><div><span class="name">'; 
                 divs +=namegroup; 
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
            url: "http://m2s.es/app/api/chat-gr.php?id="+id+"&key="+keyuser,
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
              admin = data.messages[i].admin;
              fecha = data.messages[i].fecha;
              me = data.messages[i].me;
              stick = data.messages[i].stick;
              tableid = data.messages[i].tableid;
              datosmem = crearmsmd(id,username,iduser,imgr,textmsm,locat,admin,fecha,me,stick,tableid);
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
function crearmsmd(id,username,iduser,imgr,textmsm,locat,admin,fecha,me,stick,tableid){
    if(admin == 'yes'){
      msm = '<div class="sms admin" id="'+id+'">';
      msm+= '<blockquote>';
      if(imgr != 'no'){
	    msm += '<img src="'+imgr+'" width="55px" height="55px" style="float:left;margin-left:-5px;margin-top:3px;border-radius:27px"/><div style="padding-left:60px;margin-top:3px">'
      }
      msm+='<span class="user" style="font-size:16px;">Admin:</span>';
      if(stick == 'yes'){
        msm+= '<div class="'+textmsm+'"></div>';
      }else{
        msm+= '<p>'+linkscom(textmsm)+'</p>';
      }
      msm+='<div class="foot">';
      msm+= fecha+' ';
      if(me == 'yes'){
         msm+= '<a href="javascript:deletemessage('+id+')" class="trash" style="text-decoration:none;color:#777777;">Delete</a>';
      };
      msm+='</div>';
      if(imgr != 'no'){
	    msm += '</div>';
      };
      msm+= '</div></blockquote>';
    }else{
      if(me== 'yes'){
        if(stick == 'yes'){
          msm ='<div id="'+id+'" class="sms stick me">';
        }else{
          msm = '<div class="sms me" id="'+id+'">';
        }
        msm+= '<a href="javascript:deletemessage('+id+')" class="trash" style="text-decoration:none;color:#777777;float:right;display:none;line-height: 50px;width: 50px;font-size:26px;text-align:center"><span class="icon trash"></span></a>';
        msm+= '<img src="'+imgr+'" class="imgp" style="right:0px;"/>';
        if(stick == '1'){
          msm+= '<blockquote style="position:relative;top:-15px">';
        }else{
          msm+= '<blockquote>'
        }
        if(stick == 'yes'){
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
        msm+= fecha+' ';
        msm+='</div></div></blockquote>'
      }else{
        if(stick == 'yes'){
          msm ='<div id="'+id+'" class="sms stick">';
        }else{
          msm = '<div id="'+id+'" class="sms">';
        }
        msm+='<a href="#" onclick="infouser('+iduser+')">';
        msm+= '<img src="'+imgr+'" class="imgp"/></a>';
        if(stick == '1'){
          msm+= '<blockquote style="position:relative;top:-15px">';
        }else{
          msm+= '<blockquote>'
        }
        msm+='<span class="user">'+username+':</span>';
        if(stick == 'yes'){
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
        msm+= fecha;
        msm+='</div></div></blockquote>'
     }
   }
      if(me == 'yes' && admin != 'yes'){
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
	   if($('.input-chat').length){
		   $('.input-chat').remove();
	   }
	   if($(window).width() <= '500'){
	           $('.chat-messages').html('<div class="center"><div id="loading-user"><img src="css/loading.gif" width="25px" height="25px"/> <span>'+Language.loading+'</span></div></div>');
	           $('.chat-messages').css('display','block');
	           $('.nav.navbar-nav li').css('display','none');
	           username = $('.li-chats.active .name').html();
	           $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">'+Language.chatof+' '+username+'</div><span class="icon plus" data-toggle="modal" data-target="#more-share"></span></div>');
	           $('#forw .icon.chevron-left').click(function(){
		          $('.li-chats').removeClass("active");
		          $('.chat-messages').css('display','none');
		          $('.nav.navbar-nav li').css('display','inline-block');
		          $('#forw').remove();
		          $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	           });
       }
	   loadchat(id,'pr');
       $('.'+'chat-messages').append('<div class="input-chat"><textarea class="form-control" rows="2" name="txt"></textarea> <button class="btn btn-info" id="more-chat" data-toggle="modal" data-target="#more-share">+</button> <button class="btn btn-info" id="send-button" onclick="sendmsm('+id+')">'+Language.send+'</button></div>');
       $("textarea[name='txt']").keypress(function(event) {
              if(event.keyCode == 13) {
                if (!event.shiftKey) sendmsm()
              }
       });
       }
   function deletemessage(id){
	   id = id.toString();
	   console.log('Deleting...');
	   $.ajax({
            type: "GET",
            crossDomain: true,
            url: "http://m2s.es/app/api/connect/delete-message-gr.php?id="+id+"&key="+keyuser,
            cache:false,
            dataType: 'jsonp',
            success: function(data) {
               if(data.mensaje == 'ok'){
                  console.log('Message deleted succesfully');
                  $('#'+id).fadeOut(1000, function() {
	               $('#'+id).remove();
	               console.log($('.chat-messages .center .sms').length);
	              if($('.chat-messages .center .sms').length <= 0){
		             $('.'+'chat-messages .center').html('<div class="center-align"><h3><span class="icon comments-alt"></span>'+Language.nomessageschat+'</h3></div>'); 
	              }  
	              });
               }else{
	              console.log(data.mensaje)
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
        url: "http://m2s.es/app/api/connect/chat-gr.php",
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
	    if($('#forw').lenght != '0'){
		    $('.nav.navbar-nav li').css('display','inline-block');
		    $('#forw').remove();
		    $('.chat-messages').removeAttr("style");
	    }
	    if($('#search-group').is(":visible")){
		    if($('#home.active').length){
			    $('#home').removeClass("active");
	            $('#searchgroup').addClass("active");
		    }
	    }
	    if($('#create-group').is(":visible")){
		    if($('#home.active').length){
			    $('#home').removeClass("active");
	            $('#creategroup').addClass("active");
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
		       $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
		       if($('#map-html').lenght != '0'){
		        $('#btn-location').html('Share location');
	            $('#btn-location').removeClass('btn-danger');
                $('#btn-location').addClass('btn-info'); 
                $('#map-html').remove();
               }
               $('#more-share').modal('hide');
	        }
	      if($('#search-group').is(":visible")){
	        if($('#forw').length == '0'){
		       $('.nav.navbar-nav li').css('display','none');
	           $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">'+Language.searchgroup+'</div></div>');
	           $('#forw .icon.chevron-left').click(function(){
	           $('#list-friends').show(); 
	           $('#search-group').hide();
	           $('footer').show();
	           $('#forw').remove();
	           $('.nav.navbar-nav li').show();
	           $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	           $('footer').hide();
	           })
	        }
	      }  
	      if(!$('#search-group').is(":visible")){
	        if(!$('footer').is(":visible")){
	           $('footer').show();
	        } 
	      }
	      if($('#create-group').is(":visible")){
	        if($('#forw').length == '0'){
		       $('.nav.navbar-nav li').css('display','none');
	           $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">'+Language.creategroup+'</div></div>');
	           $('#forw .icon.chevron-left').click(function(){
	           $('#list-friends').show(); 
	           $('#create-group').hide();
	           $('footer').show();
	           $('#forw').remove();
	           $('.nav.navbar-nav li').show();
	           $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	           $('footer').hide();
	           })
	        }
	      }  
	      if(!$('#create-group').is(":visible")){
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
   function searchmount(id,namegroup,official,imagepr,state){
      searchdiv = '';
      searchdiv += '<li class="li-group" onclick="infogroup('+id+')">'; 
      if (imagepr != null){
        searchdiv += '<img src="'+imagepr+'" class="img"/>'; 
      }else{
        var namesplit = namegroup.split(' ');
        abv1 = namesplit[0].charAt(0);
        if(namesplit[1]){
	      abv2 = namesplit[1].charAt(0);
	      abv = abv1 + abv2;
        }else{
	      abv = abv1;
        }
	    searchdiv += '<div class="img" style="background-color:#777"><p unselectable="on" onselectstart="return false;" onmousedown="return false;">'+abv+'</p></div>';
      }
      searchdiv += '<div class="right-info">'; 
      searchdiv +=unreadmsm; 
      if(official == 'yes'){
	    searchdiv += '<span class="icon ok"></span>';   
      }
      searchdiv +='<span class="icon chevron-right"></span></div><div class="right-p"><div><span class="name">'; 
      searchdiv +=namegroup; 
      searchdiv +='</span><span class="state">'; 
      if(state == null){
	    searchdiv += '--';   
      }else{
        searchdiv +=state;
      } 
      searchdiv +='</span></div></div></li>';
      return searchdiv;
   };
   function searchgroupbutton(){
     if($(window).width() > '500'){
      if($('#creategroup.active').length){
        creategroupbutton();
      }
      if($('#home.active').length){
	   $('#list-friends').hide(); 
	   $('#search-group').show(); 
	   $('#home').removeClass("active");
	   $('#searchgroup').addClass("active");
	   $('.li-chats').removeClass("active");
	   $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	   $('#home').click(function(){
		 $('#list-friends').show(); 
	     $('#search-group').hide(); 
	     $('#home').addClass("active");
	     $('#searchgroup').removeClass("active");  
	     $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	   });
	  }else{
	   $('#list-friends').show(); 
	   $('#search-group').hide(); 
	   $('#home').addClass("active");
	   $('#searchgroup').removeClass("active"); 
	   $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	  }
	 }
	 if($(window).width() <= '500'){
	   $('#list-friends').hide(); 
	   $('#search-group').show();
	   $('footer').hide();
	   $('.nav.navbar-nav li').css('display','none');
	   $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">'+Language.searchgroup+'</div></div>');
	   $('#contents').css('padding-bottom','0px');
	   $('#spaces').css('height','20px');
	   $('#forw .icon.chevron-left').click(function(){
	      $('#list-friends').show(); 
	      $('#search-group').hide();
	      $('footer').show();
	      $('#forw').remove();
	      $('.nav.navbar-nav li').show();
	      $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	      $('#contents').css('padding-bottom','50px');
	      $('#spaces').css('height','60px');
	   })
	 }
	 $('.search-group-ul .officials').remove();
	 $('.search-group-ul .news').remove();
	 $('.search-group-ul .intgr').remove();
	 $('#search-items').remove();
	 $('.'+'search-group-ul').append('<div id="loading-user"><img src="css/loading.gif" width="25px" height="25px"/> <span>'+Language.loading+'</span></div>');
	 $.ajax({
          type: "GET",
          jsonpCallback:'jpCallback',
          crossDomain: true,
          url: "http://m2s.es/app/api/searchgroups.php?key="+keyuser,
          cache:false,
          dataType: 'jsonp',
          success: function(result) {
             $('#loading-user').remove();
             $('.search-group-ul').append('<div class="officials"></div>');
             for(var i = 0; i < result.officialgr.length; i++){
                 id = result.officialgr[i].id; 
                 namegroup = result.officialgr[i].namegroup; 
                 official = result.officialgr[i].official; 
                 imagepr = result.officialgr[i].imagepr; 
                 state = result.officialgr[i].state; 
                 grsearchitem = searchmount(id,namegroup,official,imagepr,state);
                 $('.search-group-ul .officials').append(grsearchitem);
             }
             $('.search-group-ul').append('<div class="news"></div>');
             for(var i = 0; i < result.newgr.length; i++){
                 id = result.newgr[i].id; 
                 namegroup = result.newgr[i].namegroup; 
                 official = result.newgr[i].official; 
                 imagepr = result.newgr[i].imagepr; 
                 state = result.newgr[i].state; 
                 grsearchitem = searchmount(id,namegroup,official,imagepr,state);
                 $('.search-group-ul .news').append(grsearchitem);
             }
             $('.search-group-ul').append('<div class="intgr"></div>');
             for(var i = 0; i < result.intgr.length; i++){
                 id = result.intgr[i].id; 
                 namegroup = result.intgr[i].namegroup; 
                 official = result.intgr[i].official; 
                 imagepr = result.intgr[i].imagepr; 
                 state = result.intgr[i].state; 
                 grsearchitem = searchmount(id,namegroup,official,imagepr,state);
                 $('.search-group-ul .intgr').append(grsearchitem);
             }
          }
       });
   }
   function submitsearch(){
	  $('.'+'search-group-ul').append('<div id="loading-user"><img src="css/loading.gif" width="25px" height="25px"/> <span>'+Language.loading+'</span></div>');
	  $('.search-group-ul .officials').hide();
	  $('.search-group-ul .news').hide();
	  $('.search-group-ul .intgr').hide();
	   if(document.getElementById('search-items')){
		   $('#search-items').remove();
	   }
	   $('.search-group-ul').append('<div id="search-items"></div>');
	   var valueinput = $('#search-useradd').val();
	   if (valueinput != '') {
	   $.ajax({
        type: "GET",
        jsonpCallback:'jpCallback',
        crossDomain: true,
        url: "http://m2s.es/app/api/searchgroups.php?s="+valueinput+"&key="+keyuser,
        cache:false,
        dataType: 'jsonp',
        success: function(data) {
          if(data.search.length == 0){
	         $('.search-group-ul #search-items').append('<p class="centeral">'+Language.noresultsearch+'</p>'); 
          }
          for(var i = 0; i < data.search.length; i++){
            id = data.search[i].id; 
            namegroup = data.search[i].namegroup; 
            official = data.search[i].official; 
            imagepr = data.search[i].imagepr; 
            state = data.search[i].state; 
            grsearchitem = searchmount(id,namegroup,official,imagepr,state);
            $('.search-group-ul #search-items').append(grsearchitem);
          }
        },
        complete: function(){
	      if($('#loading-user').length){
	        $('#loading-user').remove()
	      }
        }
            }); 
          }else{
            $('#loading-user').remove();
            $('.search-group-ul .officials').show();
	        $('.search-group-ul .news').show();
	        $('.search-group-ul .intgr').show();
          }; 
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
		    var context = canvas.getContext('2d');
		    context.clearRect(0, 0, canvas.width, canvas.height);
		    canvas.width = this.width;
		    canvas.height = this.height;
            context.drawImage(this, 0, 0, this.width, this.height);
        });
        $('#more-share').modal('hide');
        $('#img-mod').modal('show');
    }
    $('#upload-image').click(function(){
     if($('.li-chats.active').length != '0'){
        $('#upload-image').attr('disabled','disabled');
        var canvas = document.getElementById("canvas");
        var url = canvas.toDataURL();
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
   function creategroupbutton(){
     if($(window).width() > '500'){
      if($('#searchgroup.active').length){
        searchgroupbutton();
      }
      if($('#home.active').length){
	   $('#list-friends').hide(); 
	   $('#create-group').show(); 
	   $('#home').removeClass("active");
	   $('#creategroup').addClass("active");
	   $('.li-chats').removeClass("active");
	   $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	   $('#home').click(function(){
		 $('#list-friends').show(); 
	     $('#create-group').hide(); 
	     $('#home').addClass("active");
	     $('#creategroup').removeClass("active");  
	     $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	   });
	  }else{
	   $('#list-friends').show(); 
	   $('#create-group').hide(); 
	   $('#home').addClass("active");
	   $('#creategroup').removeClass("active"); 
	   $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	  }
	 }
	 if($(window).width() <= '500'){
	   $('#list-friends').hide(); 
	   $('#create-group').show();
	   $('footer').hide();
	   $('.nav.navbar-nav li').css('display','none');
	   $('#menu.nav.navbar-nav').append('<div id="forw"><span class="icon chevron-left"></span><div class="center">'+Language.creategroup+'</div></div>');
	   $('#contents').css('padding-bottom','0px');
	   $('#spaces').css('height','20px');
	   $('#forw .icon.chevron-left').click(function(){
	      $('#list-friends').show(); 
	      $('#create-group').hide();
	      $('footer').show();
	      $('#forw').remove();
	      $('.nav.navbar-nav li').show();
	      $('.chat-messages').html('<div class="foot-space"><div class="center"><div class="center-align"><h3>'+Language.nogroupselect+'</h3><p>'+Language.nogroupselectinfo+'</p></div></div></div>');
	      $('#contents').css('padding-bottom','50px');
	      $('#spaces').css('height','60px');
	   })
	 }
  }
  $('#sharelocat-cr').click(function(){
    if($('#sharelocat-cr').hasClass("btn-default")){
      if(navigator.geolocation){
        $('#sharelocat-cr').attr('disabled','disabled');
        $('#sharelocat-cr').html(Language.locationloading);
        navigator.geolocation.getCurrentPosition(function(pods){
	      var latitud = pods.coords.latitude;
          var longitud = pods.coords.longitude;
          $('#location-cr').val(latitud+' '+longitud);
          $('#sharelocat-cr').removeAttr('disabled');
          $('#sharelocat-cr').addClass('btn-danger');
          $('#sharelocat-cr').removeClass('btn-default');
          $('#sharelocat-cr').html(Language.removelocation);
        });
      }else{
        alert("Your browser doesn't the location API");  
      }
    }else{
      $('#sharelocat-cr').html(Language.sharelocation);
	  $('#sharelocat-cr').removeClass('btn-danger');
      $('#sharelocat-cr').addClass('btn-default'); 
      $('#location-cr').val('');
    }
  })
  $('#creategroup-cr').click(function(){
     namegr = $('#namegroup-cr').val();
     if($('#namegroup-cr').val()){
       descgr = $('#descriptiongroup-cr').val();
       locgr = $('#location-cr').val();
       if($('#privategroup-cr').is(':checked')){
         privategr = 'yes';
       }else{
	     privategr = 'no';
       }
       if($('#showcreator-cr').is(':checked')){
         showcreatr = 'yes';
       }else{
	     showcreatr = 'no';
       }
       $.ajax({
        type: "GET",
        jsonpCallback:'jpCallback',
        crossDomain: true,
        url: "http://m2s.es/app/api/connect/creategroup.php",
        data: {
            name: namegr,
            description: descgr,
            location: locgr,
            private: privategr,
            showcreator: showcreatr
        },
        cache:false,
        dataType: 'jsonp',
        success: function(data) {
          if(data.mensaje = 'ok'){
	          document.location.href='groups.html';
          }
        }
      })
     }else{
	     errormod(Language.erroremptygroup);
     }
  })