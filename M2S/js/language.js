   require.config({
     waitSeconds : 2,
     paths : {
       text : 'js/lib/text',
       json : 'js/lib/json'
     }
   });
   var langdefault = navigator.language.slice(0,2);
   if(langdefault != 'es' && langdefault != 'en'){
	 langdefault = 'en';
   }
   var Language = require(['json!lang/'+langdefault+'.json'], function(foo){
     Language = foo;
     translatedivs();
   });
    
   function translatedivs(){     
     $('[data-translate]').each(function(){
	   var $el = $(this);
	   var key = $el.data('translate');
      
	   if($el.is('input') || $el.is('textarea')){
	     $el.attr('placeholder', Language[key]);
	   }else{
	  	 $el.text(Language[key]);
	   }
     });
   }
