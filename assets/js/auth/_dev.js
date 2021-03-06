$("#_open_navbar_menu").on('click', function (){
	$(this).attr('hidden','hidden');
	$("#_close_navbar_menu").removeAttr('hidden','hidden');
});
$("#_close_navbar_menu").on('click', function (){
	$(this).attr('hidden','hidden');
	$("#_open_navbar_menu").removeAttr('hidden','hidden');
});

$('#_works_list_pagination').on('click','a',function(e){
    e.preventDefault(); 
    var page_no = $(this).attr('data-ci-pagination-page');
    getWorksList(page_no, nonce);
});
function getWorksList(page_no, nonce) {
	$("#_works_list").html('<img src="'+base_url+'assets/images/loader.gif" style=" display: block;margin-left: auto;margin-right: auto;width: 100px;" class="text-center">');

	$.ajax({
		url: base_url+'api/v1/works/_get',
		type: 'GET',
		dataType: 'JSON',
		data: {page_no:page_no,nonce:nonce}
	})
	.done(function(res) {
		string ='';
		category = '';
		cat_string ='';
		$('#_works_list_pagination').html(res.pagination);
		if (parseInt(res.count) > 0) {

			for(var i in res.result) {
				cat_string = [];
				category = res.result[i].category;
				for(var x in category) {
					cat_string += '<span class="badge bg-dark margin-right-5">'+category[x].category+'</span>' 
				}

				string +='<div class="col-md-3 dev-service-container">'
					+'<div class="margin-bottom-20 margin-top-10  cursor-pointer">  '
	                  +'<div id="featured-style" class="img-overlay img-scale-animate" onclick="">'
	                    +'<div class="text-bg" ></div>'
	                    +'<amp-img layout="responsive"  width="800" height="500" src="'+base_url+''+res.result[i].image+'" alt="'+res.result[i].name+'"></amp-img>'
	                    +'<div class="work-title-div">'
		                    +'<div id="_category_list">'+cat_string+'</div>'
	                    	+'<h3 class="work-title" >'+res.result[i].name+'</h3>'
	                    	+'<span class="small"><a target="_blank" class="c-white" href="http://'+res.result[i].website+'">'+res.result[i].website+'</a></span>'
	                    +'</div>'
	                  +'</div>'
	                +'</div> '
				+'</div>'

				
			}
		}
		else{
			string = '<div class="text-center mt-3 mb-3 c-dev">No Records Found!</div>';
		}
		$("#_works_list").html(string);
	})
	.fail(function() {
		$("#_works_list").html('<div class="text-center mt-3 mb-3 c-dev">No Records Found!</div>');
	})
}
getWorksList(1, nonce)


function _accessPage(link) {
	$("#loader").removeAttr('hidden','hidden');
	window.location.href=link;
	$("#loader").attr('hidden','hidden');

}

$(".body-container .services").scroll(function() {
	console.log('test')
  // $(".mobile-menu .services i").addClass('active')
  // $(".mobile-menu .services .btn-text").addClass('active')
});
$(window).scroll(function() {
   	let serv_hT = $('#services').offset().top,
    	serv_hH = $('#services').outerHeight(),
    	wor_hT = $('#works').offset().top,
    	wor_hH = $('#works').outerHeight(),
       	wH = $(window).height(),
       	wS = $(this).scrollTop();
   if (wS > (serv_hT+serv_hH-wH) && (serv_hT > wS) && (wS+wH > serv_hT+serv_hH)){
    	$(".mobile-nav-btn i").removeClass('active')
    	$(".btn-text").removeClass('active')
    	$(".mobile-menu-services i").addClass('active')
  		$(".mobile-menu-services .btn-text").addClass('active')
   }
   else if (wS > (wor_hT+wor_hH-wH) && (wor_hT > wS) && (wS+wH > wor_hT+wor_hH)){
    	$(".mobile-nav-btn i").removeClass('active')
    	$(".btn-text").removeClass('active')
    	$(".mobile-menu-works i").addClass('active')
  		$(".mobile-menu-works .btn-text").addClass('active')
   }
   else  {
   		$(".mobile-menu-works i").removeClass('active');
  		$(".mobile-menu-works .btn-text").removeClass('active');
   		$(".mobile-menu-services i").removeClass('active');
  		$(".mobile-menu-services .btn-text").removeClass('active');
  		$(".mobile-menu-home i").addClass('active')
    	$(".mobile-menu-home .btn-text").addClass('active')
   }
});
let lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       $("#mobile-view").addClass('show-mmenu')
       $("#mobile-view").removeClass('hide-mmenu')
   } else {
       $("#mobile-view").addClass('hide-mmenu')
       $("#mobile-view").removeClass('show-mmenu')
   }
   lastScrollTop = st;
});
// $(window).scroll(function() {
//    	let hT = $('#works').offset().top,
//     	hH = $('#works').outerHeight(),
//        	wH = $(window).height(),
//        	wS = $(this).scrollTop();
//    if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
//     	$(".mobile-nav-btn i").removeClass('active')
//     	$(".btn-text").removeClass('active')
//     	$(".mobile-menu-works i").addClass('active')
//   		$(".mobile-menu-works .btn-text").addClass('active')
//    }
//    else  {
//    		$(".mobile-menu-works i").removeClass('active');
//   		$(".mobile-menu-works .btn-text").removeClass('active');
//   		$(".mobile-menu-home i").addClass('active')
//     	$(".mobile-menu-home .btn-text").addClass('active')
//    }
// });