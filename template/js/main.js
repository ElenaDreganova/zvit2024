if (!("ontouchstart" in document.documentElement)) {
document.documentElement.className += " noTouch";
} else {document.documentElement.className += " touch";}

function insertCSS(sname){
    if (document.createStyleSheet){
        document.createStyleSheet(sname);
    } else {
        $("head").append($('<link rel="stylesheet" href="'+sname+'" type="text/css" media="screen">'));
    }
}

function initMap() {
    var mapContent=false;
    if($('#map .content').length>0){
        mapContent = $('#map .content').html();
    }
	mapinitialize($('#map').data('lat'),$('#map').data('lng'),mapContent);	
}

function insertScript(sname, path){
	path = path || false;
	var d = document,
		w = window,
		n = d.getElementsByTagName("script")[0],
		s = d.createElement("script"),
		f = function () { n.parentNode.insertBefore(s, n); };
	s.type = "text/javascript";
	s.async = true;
	if(path){s.src = (d.location.protocol == "https:" ? "https:" : "http:") + sname;}
	else {s.src=sname;}
	if (w.opera == "[object Opera]") {
    d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
}

function insertMetrika(id){
	insertScript("//mc.yandex.ru/metrika/watch.js",true); 
    var w=window,
        c= "yandex_metrika_callbacks";
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter = new Ya.Metrika({
                id:id,
                webvisor:true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
            });
        } catch(e) { }
    });	
}

function work(){
	if ($("#exist").is(":checked")) {
		$("#cost").html("Введите цену вещи в gp: <input id='gpcost' type='text'>");
		} else {
			$.ajax({
                    type: "POST",
                    url: $('#calc').attr('action'),
                    data: "ctype=2",
                    success: function(html){
                        $("#cost").html(html);
                    }
                });}
	}
	
function typesel(){
		var tv = $("#ttype").val();
		$("#base_type").empty();
		$("#workdiv").show();
		if (tv===0) { $("#workdiv").hide()}
			else { $.ajax({
					type: "POST",
                    url: $('#calc').attr('action'),
                    data: "ctype=1&stype="+$("#ttype").val(),
                    success: function(html){
                        $("#base_type").html(html);
                    }
                });
             return false;
            }
        }
        


$(document).ready(function(){

$('html').removeClass('noJS');
$('a[rel~="external"]').attr('target','_blank');

$('#calc').on('submit',function(){
    var obj = $(this);
	$.ajax({
		type: "POST",
		url: obj.attr('action'),
		data: "ctype=0&system="+$('#system').val()+"&stype="+$("#ttype").val()+
			"&work="+($("#exist").is(":checked"))+"&base_type="+$("#btype").val()+"&cost="+$('#gpcost').val()+
			"&effects="+$('#effects').val()+","+$('#add_ef').val(),
		success: function(html){ $("#result").html(html); }
			});
        return false;
	});


if($('#map').length>0){
	insertScript('template/js/map.js');
	insertScript('//maps.googleapis.com/maps/api/js?sensor=false&callback=initMap',true);
}

$(document).on('click','a',function(e){
    var hash = $(this).attr('href').split("#")[1];
    console.log(hash);
    if(typeof(hash) !== 'undefined' && hash!==''){
        e.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#"+hash).offset().top-64
        }, 500);
    }
});

$(document).on('click','.lists .prev.active',function(e){
    let obj = $(this).closest('.pages');
    let i = parseInt(obj.find('div.active').data('page'));
    i--;
    obj.find('div[data-page="'+i+'"]').addClass('active').siblings().removeClass('active');
    $(this).siblings().addClass('active');
    $(obj.data('list')+' .cur').html(i+1);
    if(i==0){
        $(this).removeClass('active');
    }
});

$(document).on('click','.lists .next.active',function(e){
    let obj = $(this).closest('.pages');
    let i = parseInt(obj.find('div.active').data('page'));
    i++;
    obj.find('div[data-page="'+i+'"]').addClass('active').siblings().removeClass('active');
    $(this).siblings().addClass('active');
    $(obj.data('list')).find('.cur').html(i+1);
    if((i+1)==parseInt($(obj.data('list')).find('.all').html())){
        $(this).removeClass('active');
    }
});

$(document).on('click','.menuopen',()=>{$('#mainMenu').addClass('active')});
$(document).on('click','.menuclose',()=>{$('#mainMenu').removeClass('active')});

});

