function errormod(text){
  if($('.fade').length != '0'){
	$('.fade').modal('hide'); 
	$('.fade').remove();
  }
  $(document.body).append('<div class="modal fade error" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">'+Language.error+'</h4></div><div class="modal-body"></div></div></div></div>');
  $('.fade.error .modal-body').html(text);
  $('.fade.error').modal('show');
  $('.fade.error').on('hidden.bs.modal', function (e) {
    $('.fade.error').remove();
  });
}

function infomod(text){
  if($('.fade').length != '0'){
	$('.fade').modal('hide'); 
	$('.fade').remove();
  }
  $(document.body).append('<div class="modal fade info" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">'+Language.info+'</h4></div><div class="modal-body"></div></div></div></div>');
  $('.fade.info .modal-body').html(text);
  $('.fade.info').modal('show');
  $('.fade.info').on('hidden.bs.modal', function (e) {
    $('.fade.info').remove();
  });
}

function suremod(text,idbutton){
  if($('.fade').length != '0'){
	$('.fade').modal('hide'); 
	$('.fade').remove();
  }
  $(document.body).append('<div class="modal fade suremod" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">'+Language.surequestion+'</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">'+Language.cancel+'</button><button type="button" id="'+idbutton+'" class="btn btn-primary">'+Language.yes+'</button></div></div></div></div>');
  $('.fade.suremod .modal-body').html(text);
  $('.fade.suremod').modal('show');	
  $('.fade.suremod').on('hidden.bs.modal', function (e) {
    $('.fade.suremod').remove();
  });
}

function usermod(text){
	$(document.body).append('<div class="modal fade user-info in" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3 class="modal-title">'+Language.infoprofile+'</h3></div><div class="modal-body"></div></div></div></div>');
	$('.fade.user-info .modal-body').html(text);
    $('.fade.user-info').modal('show');
    $('.fade.user-info').on('hidden.bs.modal', function (e) {
      $('.fade.user-info').remove();
    });
}

function imagemod(image){
    if($('.fade').length != '0'){
	  $('.fade').modal('hide'); 
	  $('.fade').remove();
    }
	$(document.body).append('<div class="modal fade image" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><img src="'+image+'"/></div></div></div></div>');
    $('.fade.image').modal('show');
    $('.fade.image').on('hidden.bs.modal', function (e) {
      $('.fade.image').remove();
    });
}