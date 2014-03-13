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
              if(type == 'key'){
	             keyuser = result.key;
                 keyuser = keyuser.replace('==','');
                 localStorage.setItem("keyuser", keyuser); 
                 var href = $(location).attr('href'); 
 	             window.location.href = href;
              }
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
               if(type == 'session'){
	             $.ajax({
                   type: "GET",
                   crossDomain: true,
                   url: 'http://m2s.es/app/api/notifications.php',
                   cache:false,
                   dataType: 'jsonp',
                   success: function(data) {
                     if(data.nosession == '1'){
                       login(user,passmd5,'key');
                     }else{
	                   var href = $(location).attr('href'); 
 	                   window.location.href = href;  
                     }
                   }
                 })
               }
              }
              console.log('Completed session');
              };
            if(result.mensaje == 'e2'){
              var Android;
              if(Android===undefined){
               errormod(Language.datanotenter);
              }else{
              Android.showDialog(Language.datanotenter);
              }
              if(type == 'login'){
              $('#formsd').css('display','block');
              $('#sending-load').remove();
              }
              console.log(Language.datanotenter);
            }
            if(result.mensaje == 'e3'){
             if(type == 'login'){
             var Android;
              if(Android===undefined){
	            errormod(Language.userpassincorrect);
              }else{
              Android.showDialog(Language.userpassincorrect);
              }
              $('#formsd').css('display','block');
              $('#sending-load').remove();
              $('input[name="user"]').val('');
              $('input[name="pass"]').val('');
              }else{
	              localStorage.removeItem('user');
	              localStorage.removeItem('passwd');
	              window.location.href="login.html"
              }
              console.log(Language.userpassincorrect);
            }
          }   
     })
	}