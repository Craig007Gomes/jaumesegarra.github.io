   if(!localStorage.getItem('user')){
	  window.location.href="login.html"
   }
   var user = localStorage.getItem('user');
   var passmd5 = localStorage.getItem('passwd');
   var keyuser = localStorage.getItem('keyuser');
   
   function linkscom(textdf){
            var str = textdf;
            var exp = /((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?=([^"']*["'][^"']*["'])*[^"']*$)/ig;
            var exp2 = /((https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+\.(?:jpe?g|gif|png))(?=([^"']*["'][^"']*["'])*[^"']*$)/ig;
            var exp3 = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/ig;
            var images = str.replace(exp2, "<div class='imagechat' style='background-image:url($1)' alt='$1'></div>");
            var youtube = images.replace(exp3,"<div id='maxwidthyo'><div class='videoWrapper'><iframe frameborder='0' allowfullscreen src='http://www.youtube.com/embed/$1'/></div></div>");
            var links = youtube.replace(exp,"<a href='$1' target='_blank'>$1</a>");
            return links
    }
   function acceptgrj(idgroup,id){
     $.ajax({
       type: "GET",
       crossDomain: true,
       url: "http://m2s.es/app/api/connect/acceptpjg.php?id="+idgroup+"&iduser="+id+'&key='+keyuser,
       cache:false,
       dataType: 'jsonp',
       beforeSend: function() {
         console.log('Connecting...');
         $('#acceptpeogroup-'+id).attr('disabled', true);
         $('#acceptpeogroup-'+id).html(Language.loading)
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
       url: "http://m2s.es/app/api/connect/blockpjg.php?id="+idgroup+"&iduser="+id+'&key='+keyuser,
       cache:false,
       dataType: 'jsonp',
       beforeSend: function() {
         console.log('Connecting...');
         $('#blockpeogroup-'+id).attr('disabled', true);
         $('#blockpeogroup-'+id).html(Language.loading)
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
                         url: "http://m2s.es/app/api/connect/acceptfriend.php?id="+id+'&key='+keyuser,
                         cache:false,
                         dataType: 'jsonp',
                         beforeSend: function() {
                             console.log('Connecting...');
                             $('#acceptfriend-'+id).attr('disabled', true);
                             $('#acceptfriend-'+id).html(Language.loading)
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
	                            if (document.location.pathname.indexOf("index.html") != 0){
		                            document.location.href='index.html';
	                            }
	                         },3000);
                            }
                         }
                       })
   };
   function blockuser(id) {
                       $.ajax({
                         type: "GET",
                         crossDomain: true,
                         url: "http://m2s.es/app/api/connect/blockuser.php?id="+id+'&key='+keyuser,
                         cache:false,
                         dataType: 'jsonp',
                         beforeSend: function() {
                             console.log('Connecting...');
                             $('#blockuser-'+id).attr('disabled', true);
                             $('#blockuser-'+id).html(Language.loading)
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
          url: 'http://m2s.es/app/api/notifications.php'+'?key='+keyuser,
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
	               itemlist += ' '+Language.wantsyourfriends;
	               itemlist += '<button id="acceptfriend-'+id+'" class="btn btn-lg btn-info" onclick="acceptfriend('+id+')">'+Language.accept+'</button>';
	               itemlist += '<button id="blockuser-'+id+'"  class="btn btn-lg btn-danger" onclick="blockuser('+id+')">'+Language.block+'</button>';
                 };
                 if(type == 'message'){
                   msm = result.listnotify[i].msm;
	               itemlist += ' '+Language.saidyou+': '+msm;
                   var url = 'index.html#chat-'+id;
	               itemlist += '<a href="'+url+'" id="close-click"><button class="btn btn-lg btn-info">'+Language.read+'</button></a>';
                 };
                 if(type == 'message-group'){
                   msm = result.listnotify[i].msm;
                   namegroup = result.listnotify[i].namegroup;
	               itemlist += ' '+Language.saidingroup+' '+namegroup+': '+msm;
	               itemlist += '<a href="groups.html#chat-'+id+'"><button class="btn btn-lg btn-info">'+Language.read+'</button></a>';
                 }
                 if(type == 'addgroup-request'){
                   idgroup = result.listnotify[i].idgroup;
                   namegroup = result.listnotify[i].namegroup;
	               itemlist += ' '+Language.joinyourgroup+' '+namegroup;  
	               itemlist += '<button onclick="acceptgrj('+idgroup+','+id+')" id="acceptpeogroup-'+id+'" class="btn btn-lg btn-info">'+Language.accept+'</button>';
	               itemlist += '<button onclick="blockgrj('+idgroup+','+id+')" id="blockpeogroup-'+id+'" class="btn btn-lg btn-danger">'+Language.block+'</button>';
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
             if(result.nosession != null){
                console.log('No session');
 	            login(user,passmd5,'session');
             }else{
             if(result.newnotication != '0'){
                if (Notification) {
                  var title = Language.havenewnotifications;
                  var extra = {
                    icon: "css/icon.png",
                    body: Language.havenewnotificationsinfo
                  }
                  var noti = new Notification( title, extra)
                  noti.onclick = function(){litsnotify();}
                  noti.onclose = {
                  }
                  setTimeout( function() { noti.close() }, 10000)
                }else{
                 if(navigator.mozNotification){
	               var notification = navigator.mozNotification;
                   var n = notification.createNotification(Language.havenewnotifications, Language.havenewnotificationsinfo,"http://m2s.es/app/img/icon-114.png");
                   n.onclick = function() {
	                 litsnotify();
                   }
                   n.show(); 
                 }
                }
            }
            if(result.notification != '0'){
              if($('#notify-mobile').length == '0'){
		        $('.navbar-fixed-top').css('height','70px');
		        var notifyb = '<div id="notify-mobile">'+Language.havenotifications+'</div>';
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
		        }
            }else{
	           if($('#notify-mobile').length != '0'){
		         $('.navbar-fixed-top').css('height','auto');  
		         $('#notify-mobile').remove();
		         $('#contents').css('padding-top','0px');
	           }  
            }
           }
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
   suremod(Language.suresignout,'signoutbutton');
   $('#signoutbutton').click(function(){
	   localStorage.removeItem('user');
	   localStorage.removeItem('passwd');
	   if(keyuser){
	     localStorage.removeItem('keyuser');
	     window.location.href="login.html"
	   }
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
   });
   }
   function infogroup(id){
         usermod('');
         $.ajax({
          type: "GET",
          crossDomain: true,
          url: "http://m2s.es/app/api/groupinfo.php",
          data: 'id='+id+'&key='+keyuser,
          cache:false,
          dataType: 'jsonp',
          beforeSend: function() {
          console.log('Connecting...');
          $('.fade.user-info .modal-body').html('<div id="loading-user"><img src="css/loading.gif" width="25px" height="25px"/> <span>'+Language.loading+'</span></div>');
          },
          success: function(result) {
            id = result.id;
            name = result.groupname;
            image = result.imagein;
            private = result.private;
            admininfo = result.admininfo;
            official = result.official;
            local = result.local;
            decription = result.description;
            peoplejoin = result.peoplejoined;
              $('.fade.user-info .modal-body').html('');
              var modaluser = '';
              modaluser += '<div class="head">';
              if(image != null){
	            modaluser += '<img src="'+image+'"/><div class="info-profile" style="padding-left:80px">';   
              }else{
                var namesplit = name.split(' ');
                abv1 = namesplit[0].charAt(0);
                if(namesplit[1]){
	               abv2 = namesplit[1].charAt(0);
	               abv = abv1 + abv2;
                }else{
	               abv = abv1;
                }
	            modaluser += '<div class="img" style="background-color:#777"><p unselectable="on" onselectstart="return false;" onmousedown="return false;">'+abv+'</p></div>';
	            modaluser += '<div class="info-profile" style="padding-left:80px">';   
              }
              modaluser += '<h3>'+name;
              if(official == 'yes'){
	            modaluser += '<span class="icon ok"></span>'   
              }
              modaluser += '</h3>';
              modaluser += '<a href="#" id="read_more"><p>'+decription+'</p></a>';
              modaluser += '</div>';
              if(local.longitud){
	            modaluser += '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+local.latitude+','+local.longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;max-height: 200px;max-width: 700px;width: 100%;"></iframe>';  
              }        
              if(result.yourstate == '1'){
	            modaluser += '<a id="chatbutton" class="btn btn-default">'+Language.chat+'</a>';  
	            if(admininfo != 'me'){
		          modaluser += '<a id="leavegroupbutton" class="btn btn-danger">'+Language.leavegroup+'</a>';   
	            }
	            if(result.states != ''){
		           modaluser += '<div class="states"><h5>'+Language.states+'</h5>'; 
		           for(var i = 0; i < result.states.length; i++){ 
		             idt = result.states[i].id;
		             text = result.states[i].text;
		             date = result.states[i].date;
		             locationgg = result.states[i].location;
		             if(admininfo != 'me'){
		               mens = '';
		             }else{
			           mens = 'me';
		             }
		             if(image != null){
		               imaged = '<img src="'+image+'" class="img"/>';
		             }else{
			           imaged = '<div class="img" style="background-color:#777"><p unselectable="on" onselectstart="return false;" onmousedown="return false;">'+abv+'</p></div>'; 
		             }
		             if(locationgg.latitude != ''){
                       longitud = locationgg.longitud;
                       locatisn = '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+locationgg.latitude+','+longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;max-height: 200px;max-width: 700px;width: 100%;"></iframe>';   
                     }else{
	                   locatisn = ''; 
                     }
		             modaluser +='<div class="sms '+mens+'" id="'+idt+'"><blockquote>'+imaged+'<p>'+text+'</p>'+locatisn+'<div class="foot">'+date+'</div></blockquote></div>';
		           }
		           modaluser += '</div>';
	            }
              }
              if(result.yourstate == null || result.yourstate == '0'){
                if(!result.yourstate){
	              modaluser += '<a id="joingroupbutton" class="btn btn-default">'+Language.jointhisgroup+'</a>';
	            }else{
		          modaluser += '<a class="btn btn-default" disabled>'+Language.waitaccept+'</a>';  
	            }
	            if(admininfo != null || peoplejoin != '0'){
	            modaluser += '<div class="footbutton">';
	            if(admininfo != null){
		          modaluser += '<div class="leftb">';
		          modaluser += '<img src="'+admininfo.imagein+'"/>';
		          modaluser += '<i>'+Language.createdby+'</i>';
		          modaluser += '<b>'+admininfo.username+'</b></div>';
	            }
	            if(peoplejoin != '0'){
	              if(admininfo == null){
		            modaluser += '<div class="centerb">';
		          }else{
			        modaluser += '<div class="rightb">';  
		          }
		          modaluser += '<i>'+Language.peoplejoined+'</i> <b>'+peoplejoin+'</b></div>';
	            }
	            }
              }
              modaluser += '</div>';
              $('.fade.user-info .modal-body').append(modaluser);
              $('#read_more').click(function(){
                $('.info-profile p').toggleClass('ellipsis');
              });
              $('#chatbutton').click(function(){
                 if (document.location.pathname.indexOf("groups.html") != 0){
                   $('.fade').modal('hide');
                   $('.fade').on('hidden.bs.modal', function (e) {
	                 $('.fade').remove();
	               })
                   if($('#search-group').is(":visible")){	             
                   $('#search-group').hide();
                   $('#list-friends').show();
                   $('#home').addClass('active');
                   $('#searchgroup').removeAttr('class');
                   $('footer').show();
                   $('.modal-backdrop.fade.in').remove();
                   $('#forw').remove();
                   }
                 }
                 document.location.href = 'groups.html#chat-'+id;
              })
              if(!result.yourstate){
              $('#joingroupbutton').click(function(){
                 $.ajax({
                   type: "GET",
                   crossDomain: true,
                   url: 'http://m2s.es/app/api/connect/joingroup.php?id='+id+'&key='+keyuser,
                   cache:false,
                   dataType: 'jsonp',
                   beforeSend: function() {
                     console.log('Connecting...');
                     $('#joingroupbutton').attr('disabled','disabled');
                     $('#joingroupbutton').html(Language.loading);
                   },
                   success: function(data) {
                     if(data.mensaje == 'ok'){
                       if(private == 'no'){
                         $('.fade.user-info').modal('hide');
                         infomod(Language.congjoingroup); 
                       }else{
	                     $('.fade.user-info').modal('hide');
	                     infomod(Language.waitadminacceptyou);  
                       }
                     }else{
	                   console.error('Error to join a group: '+ data.mensaje);
                     }
                   }
                 })
              });
              }
              $('#leavegroupbutton').click(function(){
              suremod(Language.sureleavegroup,'leaveconfirm');
              $('#leaveconfirm').click(function(){
                 $.ajax({
                   type: "GET",
                   crossDomain: true,
                   url: 'http://m2s.es/app/api/connect/leavegroup.php?id='+id+'&key='+keyuser,
                   cache:false,
                   dataType: 'jsonp',
                   beforeSend: function() {
                     console.log('Connecting...');
                     $('#leavegroupbutton').attr('disabled','disabled');
                     $('#leavegroupbutton').html(Language.loading);
                   },
                   success: function(data) {
                     if(data.mensaje == 'ok'){
                         $('.fade.user-info').modal('hide');
                         infomod(Language.leftgroup); 
                     }
                   }
                 })
              })
             })
          }   
     })  
   }
   function infouser(id){
	  usermod('<div id="loading-user"><img src="css/loading.gif" width="25px" height="25px"/> <span>'+Language.loading+'</span></div>');
	  $.ajax({
        type: "GET",
        crossDomain: true,
        url: "http://m2s.es/app/api/profileinfo.php?id="+id+"&key="+keyuser,
        cache:false,
        dataType: 'jsonp',
        success: function(data) {
          username = data.username;
          imagein = data.imagein;
          id = data.id;
          state = data.state;
          timeago = data.timeago;
          genre = data.genre;
          telf = data.telf;
          birth = data.birt;
          email = data.email;
          $('.fade.user-info .modal-body').html('');
          var modaluser = '';
          modaluser += '<div class="head"><img src="'+imagein+'"/><div class="info-profile" style="padding-left:80px">';
          modaluser += '<h3>'+username+'</h3><p id="read_more">'+timeago+'</p></div>';
          if(state == '1'){
              modaluser += '<a id="chatbutton" class="btn btn-default">'+Language.chat+'</a>';
              modaluser += '<a id="deletefriendbutton" class="btn btn-danger">'+Language.deletefriend+'</a>';
          }else{
            if(state == '23'){
              modaluser += '<a class="btn btn-default" disabled>'+Language.waitaccept+'</a>';
            }
            if(state == '5'){
              modaluser += '<a id="addfriendbutton" class="btn btn-default">'+Language.addfriend+'</a>';
            }
            if(state == '4'){
              modaluser += '<a id="settingsbutton" class="btn btn-default">'+Language.edityourprofile+'</a>';
            }
          }
          if(state == '1' || state == '4'){
	          if(data.states != ''){
		           modaluser += '<div class="states"><h5>'+Language.states+'</h5>'; 
		           for(var i = 0; i < data.states.length; i++){ 
		             idt = data.states[i].id;
		             text = data.states[i].text;
		             date = data.states[i].date;
		             locationgg = data.states[i].location;
		             if(state != '4'){
		               mens = '';
		             }else{
			           mens = 'me';
		             }
		             imaged = '<img src="'+imagein+'" class="img"/>';
		             if(locationgg.latitude != ''){
                       longitud = locationgg.longitud;
                       locatisn = '<iframe marginheight="0" marginwidth="0" src="http://maps.google.com/maps?client=safari&ll='+locationgg.latitude+','+longitud+'&z=14&output=embed" frameborder="0" scrolling="no" style="height: 24%;max-height: 200px;max-width: 700px;width: 100%;"></iframe>';   
                     }else{
	                   locatisn = ''; 
                     }
		             modaluser +='<div class="sms '+mens+'" id="'+idt+'"><blockquote>'+imaged+'<p>'+text+'</p>'+locatisn+'<div class="foot">'+date+'</div></blockquote></div>';
		           }
		           modaluser += '</div>';
	            }
          }
          $('.fade.user-info .modal-body').append(modaluser);
          $('#chatbutton').click(function(){
              if (document.location.pathname.indexOf("index.html") != 0){
                 $('.fade.user-info').modal('hide');
                 $('.fade').on('hidden.bs.modal', function (e) {
	                 $('.fade').remove();
	             })
                 if($('#add-people').is(":visible")){	             
                   $('#add-people').hide();
                   $('#list-friends').show();
                   $('#home').addClass('active');
                   $('#speop').removeAttr('class');
                   $('footer').show();
                   $('.modal-backdrop.fade.in').remove();
                   $('#forw').remove();
                 }
              }
              document.location.href = 'index.html#chat-'+id;
          });
          $('#deletefriendbutton').click(function(){
             suremod(Language.removefriend,'deletefriendaccept');
             $('#deletefriendaccept').click(function(){
               console.log('Deleting friend...');
               $('.fade.suremod').modal('hide');
               $('.fade.suremod').on('hidden.bs.modal', function (e) {
	             $('.fade.suremod').remove();
	           });
	           $.ajax({
                 type: "GET",
                 crossDomain: true,
                 url: "http://m2s.es/app/api/connect/deletefriend.php",
                 data: "id="+id+"&key="+keyuser,
                 cache:false,
                 dataType: 'jsonp',
                 beforeSend: function() {
                   console.log('Connecting to delete friend...');
                 },
                 success: function(result) {
                   if(result.mensaje == 'ok'){
                     infomod(Language.succesdeletefriend);
                   }
                 }
               })
            })
          })
          $('#addfriendbutton').click(function(){
            $.ajax({
              type: "GET",
              crossDomain: true,
              url: "http://m2s.es/app/api/connect/addfriend.php",
              data: "id="+id+"&key="+keyuser,
              cache:false,
              dataType: 'jsonp',
              beforeSend: function() {
                console.log('Connecting to send petition of friend...');
                $('#addfriendbutton').attr('disabled','disabled');
                $('#addfriendbutton').html(Language.sending);
              },
              success: function(result) {
                if(result.mensaje == 'ok'){
                  $('#addfriendbutton').html(Language.waitaccept);
                }else{
	               errormod(Language.errorsendfriendp);
                }
              }   
           })
         })
        }
     }); 
   }