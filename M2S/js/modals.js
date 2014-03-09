function errormod(text){
  $(document.body).append('<div class="modal fade error" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Error</h4></div><div class="modal-body"></div></div></div></div>');
  $('.fade.error .modal-body').html(text);
  $('.fade.error').modal('show');
  $('.fade.error').on('hidden.bs.modal', function (e) {
    $('.fade.error').remove();
  });
}

function infomod(text){
  $(document.body).append('<div class="modal fade info" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Info</h4></div><div class="modal-body"></div></div></div></div>');
  $('.fade.info .modal-body').html(text);
  $('.fade.info').modal('show');
  $('.fade.info').on('hidden.bs.modal', function (e) {
    $('.fade.info').remove();
  });
}

function suremod(text,idbutton){
  $(document.body).append('<div class="modal fade suremod" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Are you sure?</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" id="'+idbutton+'" class="btn btn-primary">Yes</button></div></div></div></div>');
  $('.fade.suremod .modal-body').html(text);
  $('.fade.suremod').modal('show');	
  $('.fade.suremod').on('hidden.bs.modal', function (e) {
    $('.fade.suremod').remove();
  });
}

function usermod(text){
	$(document.body).append('<div class="modal fade user-info" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3 class="modal-title">Profile info</h3></div><div class="modal-body"></div></div></div></div>');
	$('.fade.user-info .modal-body').html(text);
    $('.fade.user-info').modal('show');
    $('.fade.user-info').on('hidden.bs.modal', function (e) {
      $('.fade.user-info').remove();
    });
}

function imagemod(image){
	$(document.body).append('<div class="modal fade image" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><img src="'+image+'"/></div></div></div></div>');
    $('.fade.image').modal('show');
    $('.fade.image').on('hidden.bs.modal', function (e) {
      $('.fade.image').remove();
    });
}