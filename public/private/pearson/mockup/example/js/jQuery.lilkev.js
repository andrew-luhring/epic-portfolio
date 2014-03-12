//////////////////////////////////////////////////////////////
///// End PluginDetect and begin BrowserDetect ///////////////
//////////////////////////////////////////////////////////////
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            } else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        }, {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        }, {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        }, {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        }, {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        }, { // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Internet Explorer",
            versionSearch: "MSIE"
        }, {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        }, { // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "PC"
        }, {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        }, {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        }, {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPad"
        }, {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};

BrowserDetect.init();

OS = BrowserDetect.OS;
browserName = BrowserDetect.browser;
browserVersion = parseInt(BrowserDetect.version);

var userbrowser = browserName + ' ' + browserVersion + ' for ' + OS
//var userbrowser = navigator.userAgent
//var userversion = navigator.appVersion

var errorlist = {}
var errorcount = 1;

var url = window.location.href;


window.onerror = function (message, url, linenumber) {
    if ($('body').is('.development')) {
        return;
    }

    //$.post('js/errorLog.php', checkErrorList, "json");
    var scripturl = url.replace('https://lmscontent.embanet.com/Multimedia/', '')
    var err = {
        'error': message + ' (' + scripturl + ', line ' + linenumber + ')',
        'browser': userbrowser
    }

    sendErrors(err)

}
var lastError = 1
var errorCount = 1
var currentList = {}


    function sendErrors(err) {
        return;
        //if( lkOptions.development == true ){ return; }
        var currentdate = new Date();
        var datetime = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " (" + currentdate.getHours() + ":" + (currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()) + ":" + (currentdate.getSeconds() < 10 ? "0" + currentdate.getSeconds() : currentdate.getSeconds()) + ")"
        err['broken'] = 'broken';
        err['lastseen'] = datetime;
        currentList['Error' + errorCount] = err;
        errorCount++
        var url = window.location.href;
        var sschool = lkOptions.school + '-' + lkOptions.module
        sschool = sschool.replace(/-/g, '_')
        //console.log(sschool)
        var sendData = {
            'doWhat': 'getErrors',
            'school': sschool
        }
        //$.post('js/errorLog.php', sendData, getErrors, "json");


        var sendErrors = {
            doWhat: 'sendErrors',
            school: sschool,
            error: err.error,
            developer: lkOptions.developer,
            url: url,
            timeseen: datetime
        }
        $.ajax({
            type: "POST",
            url: "https://lmscontent.embanet.com/Multimedia/kevin/lilKev-FIXING/js/errorLog.php",
            dataType: "text",
            cache: false,
            data: sendErrors,
            success: reportBack,
            error: function (request, type, errorThrown) {
                //alert('it failed ' + type)
                //alert('it failed ' + errorThrown)
                //alert(request.status)
                //alert(request.statusText)	
            },
            complete: function () {
                //alert('its done posting stuff')	
            }
        });
        return;
        $.ajax({
            type: "POST",
            url: "https://lmscontent.embanet.com/Multimedia/kevin/lilKev-FIXING/js/errorLog.php",
            dataType: "text",
            cache: false,
            data: sendData,
            success: getErrors,
            error: function (request, type, errorThrown) {
                //console.log('it failed ' + type)
                //console.log('it failed ' + errorThrown)
                //console.log(request.status)
                //console.log(request.statusText)	
            }
        });
        newList = {}

        function getErrors(data) {
            //console.log(data)

            return;
            var newec = 1
            if (data) {
                var oldList = JSON.parse(data[0]['errorList'])

                $.each(currentList, function (newi, newval) {

                    $.each(oldList, function (oldi, oldval) {

                        if (newval['error'] == oldval['error']) {

                            var oldbrowser = oldval['browser']
                            var newbrowser = newval['browser']
                            //console.log(oldval['browser'])
                            //console.log(oldbrowser)
                            //return;
                            if (oldbrowser.indexOf(newbrowser) == -1) {
                                oldval['browser'] = oldbrowser + ', ' + newbrowser
                            }
                            oldList[oldi]['lastseen'] = newval['lastseen']
                            oldList[oldi]['broken'] = 'broken'
                            //console.log(oldList[oldi]['broken'])
                            //console.log(err['error'])
                            //console.log(oldval['error'])
                            //console.log('its a match!' + err['error'] +' = '+ oldval['error'])
                            //delete currentList[newi]
                            //return;
                        }
                    })
                })

                var errorNumber = (Object.size(oldList)) + 1;

                if (Object.size(currentList) >= 1) {
                    //newList['2error'+newec] = err
                    //newec++
                    //oldList['Error'+errorNumber] = err
                    $.each(currentList, function (i, val) {
                        oldList['Error' + errorNumber] = val
                    })
                }
                newList = oldList
            } else {
                newList = currentList
            }
            var checkList = []
            $.each(newList, function (i, val) {
                var checkme = val['error'] + val['broken'] + val['lastseen']
                if (checkList.indexOf(checkme) >= 0) {
                    delete newList[i]
                } else {
                    checkList.push(checkme)
                }

            })
            //console.log(newList)
            brokencount = 0
            $.each(newList, function (i, val) {
                var broken = val['broken']
                //console.log(broken + ' -- '+ val['error'])
                if (broken == 'broken') {
                    brokencount++
                }
            })
            //console.log(newList)	
            var sendErrors = {
                doWhat: 'sendErrors',
                school: lkOptions.school + '-' + lkOptions.module,
                errorList: newList,
                brokenCount: brokencount,
                developer: lkOptions.developer,
                url: url
            }
            //console.log(sendErrors.errorList)
            //$.post('js/errorLog.php', sendErrors, reportBack, "json");	

            $.ajax({
                type: "POST",
                url: "https://lmscontent.embanet.com/Multimedia/kevin/lilKev-FIXING/js/errorLog.php",
                dataType: "json",
                cache: false,
                data: sendErrors,
                success: reportBack,
                error: function (request, type, errorThrown) {
                    //alert('it failed ' + type)
                    //alert('it failed ' + errorThrown)
                    //alert(request.status)
                    //alert(request.statusText)	
                },
                complete: function () {
                    //alert('its done posting stuff')	
                }
            });

        }
    }

    function checkDate_Time(time) {
        return (time < 10) ? ("0" + time) : time;
    }

    function reportBack(data) {
        //console.log(data);								
    }
var dbDriven = false;

function mmLog() {
    return;
    var module = lkOptions.module.split('-')
    module = module[1] + '-' + module[2];
    var hub = $('.hub').length
    var audio = $('.audio').length
    var presentation = $('.presentation').length
    var video = $('.videoSlide').length
    var drag = $('.ui-draggable').length
    var slidecount = $('.slide').length
    var textentry = $('textarea').length + $('input[type= "text"]').length
    var d = new Date();
    var date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var url = window.location.href;
    var featuresList = {
        'title': lkOptions.title,
        'school': lkOptions.school,
        'course': lkOptions.course,
        'module': module,
        'developer': lkOptions.developer,
        'slidecount': slidecount,
        'hub': hub,
        'database': dbDriven,
        'audio': audio,
        'presentation': presentation,
        'video': video,
        'drag': drag,
        'textentry': textentry,
        'url': url,
        'date': date
    }


	$.ajax({
					type: "POST",
					url: "https://lmscontent.embanet.com/Multimedia/kevin/lilKev-FIXING/js/mmLog.php",
					data: featuresList,
					dataType: "json",
					error: function(request, type, errorThrown){
						var err = request.status +' '+ request.statusText +' '+ errorThrown
						//console.log(err)
					}
				});

}

/*$.ajaxSetup({
	complete: function(request, status){
		dbDriven = true
		mmlog()
	},
	error: function(request, type, errorThrown){
		var err = request.status +' '+ request.statusText +' '+ errorThrown
		sendErrors(err)
	}
});*/
/*-------------------------------------------------
					lilKev
 --------------------------------------------------*/
$(function(){
	$('body').lilkev(lkOptions);	
});

(function ($) {
    $.fn.lilkev = function (options) {

        var iPad = navigator.userAgent.match(/iPad/i) != null;
        var android = navigator.userAgent.match(/android/i) != null;
        url = $(document).attr('href');

        var settings = {
            'development': false,
            'height': '480',
            'title': 'TITLE',
            'course': 'COURSE',
            'module': 'MODULE',
            'fadeSlides': false,
            'school': 'hk',
            'slideNumbers': true,
            'developer': '',
            'showSlide': 'drop',
            'hideSlide': '',
            'hubChart': true,
            'currentPosition': 1

        };

        var options = $.extend(settings, options);

        return this.each(function () {

            var lilkev = $(this);
            introTitle = $('#lk-intro .redBar');
            var intro = $('#lk-intro');
            footer = $('#lk-footer');
            header = $('#lk-header');
            slide = $('.slide')
            slideLength = slide.length;
            audioSlide = $('.audioSlide')
            audioSlideLength = audioSlide.length;
            currentPosition = settings.currentPosition;
            theTitle = settings.title;
            school = settings.school.toLowerCase();
            course = settings.course;
            module = settings.module;
            developer = settings.developer;
            slidesContainer = $('.slidesContainer');
            actHeight = settings.height;
            skinFolder = 'https://lmscontent.embanet.com/Multimedia/LK_Assets/skin/';
            prev = '<div class="control prevSlide" id="lk-btn-prev"><div class="lk-control-container lk-ac gradient"><img src="skin/prev.png"  /></div></div>'
            next = '<div class="control nextSlide" id="lk-btn-next"><div class="lk-control-container lk-ac gradient"><img src="skin/next.png"  /></div></div>'
            hubReturn = '<div class="control returnBtn" id="lk-btn-return"><div class="lk-control-container lk-ac gradient"><img src="skin/return.png"  /></div></div>'
            hubNext = '<div class="control nextSlide" id="lk-btn-hub-next"></div>'
            caption = '<div id="lk-btn-caption" class="button lk-ac gradient" ><img src="skin/caption.png"  /></div><div id="lk-caption-box"></div>';
            audioControls = '<div class="jp-type-single">\
								<div class="jp-gui jp-interface">\
									<ul class="jp-controls">\
										<li> <a href="javascript:;" class="jp-play unselectable gradient lk-ac" tabindex="1"> <img src="skin/play.png" /> </a>	</li>\
										<li> <a href="javascript:;" class="jp-pause unselectable gradient lk-ac" tabindex="1"> <img src="skin/pause.png" /> </a> </li>\
										<li> <a href="javascript:;" class="jp-mute lk-ac" tabindex="1" title="mute"> </a> </li>\
										<li> <a href="javascript:;" class="jp-unmute lk-ac" tabindex="1" title="unmute"> </a> </li>\
									</ul>\
									<div class="jp-progress">\
										<div class="jp-seek-bar">\
											<div class="jp-play-bar">\
												<div class="gradient lk-ac"></div>\
											</div>\
										</div>\
									</div>\
									<div class="lk-volume-container volume-container">\
										<div class="lk-volume jp-mute gradient lk-ac">\
											<img src="skin/volume.png" />\
										</div>\
										<div class="jp-unmute gradient lk-ac">\
											<img src="skin/volume-muted.png" />\
										</div>\
										<div class="lk-volume-slider-container volume-slider-container">\
											<div class="jp-volume-bar">\
												<div class="jp-volume-bar-value gradient lk-ac"><!--<img src="skin/volume-slider.png" />--></div>\
											</div>\
										</div>\
									</div>\
									<div class="jp-time-holder">\
										<div class="jp-current-time"></div>\
										<div class="jp-duration"></div>\
									</div>\
								</div>\
								<div class="jp-no-solution"> <span>Update Required</span> To play the media you will need to either update your browser to a recent version or update your <a href="https://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a> </div>\
							</div>';
            videoControlsContainer = '<div class="lk-video-controls-container">\
										<div class="gradient lk-ac video-control video-play"> <img src="skin/play.png" /> </div>\
										<div class="gradient lk-ac video-control video-pause"> <img src="skin/pause.png" /> </div>\
										<div class="video-progress">\
											<div class="video-play-bar">\
												<div class="gradient lk-ac"></div>\
											</div>\
										</div>\
										<div class="video-volume-container volume-container">\
											<div class="gradient lk-ac video-control video-volume-mute"> <img src="skin/volume.png" /> </div>\
											<div class="gradient lk-ac video-control video-volume-unmute"> <img src="skin/volume-muted.png" /> </div>\
											<div class="video-volume-slider-container volume-slider-container">\
												<div class="video-volume-bar">\
													<div class="video-volume-bar-value gradient lk-ac"></div>\
												</div>\
											</div>\
										</div>\
										<div class="video-time-holder">\
											<div class="video-current-time"></div>\
											<div class="video-duration"></div>\
										</div>\
									</div>';
            replayScreen = '<div id="lk-replay-box">If you would like to go through this activity again, simply click the Replay button, and you will be returned to the beginning.</div><div id="lk-replay-icon" class="button"><img src="skin/btn-replay-front.png" id="lk-replay-spin" alt="replay" height="91px" width="91px" /></div>';

            if (developer != '') {
                var stylecss = $('#styleCSS')
                //stylecss.remove();
                $('#skinCSS').after("<link rel='stylesheet' href='" + skinFolder + developer + ".css' type='text/css'>");
				/*$.ajax({
					url: skinFolder + developer + '.js',
					dataType: "script"
				});*/
               setTimeout(setCenterFunctions, 1000)
            } else {
                setCenterFunctions()
            }
			
			
			
            $(document).attr({
                'title': settings.title
            });
            //if(settings.development == true){ $('#lk-intro').hide(); }
            if (settings.development == false) {
                lilkev.prepend('<div id="lk-intro"><div class="redBar"><span>' + settings.title + '</span></div><img src="' + skinFolder + 'begin_btn.jpg" class="begin button" /></div>');

                $('#lk-intro .redBar').css({
                    'background': 'url(' + skinFolder + 'intro_title_' + school + '.png) no-repeat'
                });

                var introBG = $('#lk-intro').css('background-image');
                if (introBG == 'none') {
                    var introBGimage = new Image();
                    introBGimage.onload = function () {
                        $('#lk-intro').css({
                            'background': 'url(' + skinFolder + 'intro_bg_' + school + '_' + course + '.jpg) no-repeat center center'
                        });
                    };
                    introBGimage.onerror = function () {
                        $('#lk-intro').css({
                            'background': 'url(' + skinFolder + 'intro_bg_' + school + '.jpg) no-repeat center center'
                        });
                    };
                    introBGimage.src = '' + skinFolder + 'intro_bg_' + school + '_' + course + '.jpg'
                }
            } else { /* lilkev.addClass('development'); */ }

            header.html(settings.title);
            header.css({
                'background': 'url(' + skinFolder + 'header_' + school + '.png) no-repeat'
            });
            footer.append(caption).append(next).append(prev).append(hubReturn).append(hubNext).append(videoControlsContainer).append('<div id="lk-hub-chart" ></div>');
            if (settings.slideNumbers == true) {
                footer.append('<div id="slideNumbers"></div>');
            }

            var sBG = slidesContainer.css('background-image');
            //console.log(sBG)
            if (sBG == 'none' || sBG == 'none ') {
                var image = new Image();
                image.onload = function () {
                    slidesContainer.css({
                        'background': 'url(' + skinFolder + 'bg_' + school + '_' + course + '.jpg) no-repeat center center'
                    });
                }
                image.onerror = function () {
                    slidesContainer.css({
                        'background': 'url(' + skinFolder + 'bg_' + school + '.jpg) no-repeat center center'
                    });
                }
                image.src = '' + skinFolder + 'bg_' + school + '_' + course + '.jpg';
            }
            slidesContainer.append('<div class="slide replaySlide" id="slide' + (slideLength + 1) + '">' + replayScreen + '</div>');

            $('.presentation').each(function () {
                $(this).addClass('audio')
            });

            $('.audio').each(function () {
                var i;
                if ($(this).hasClass('slide')) {
                    i = $(this).attr('id').substr(5, 2);
                } else {
                    i = $(this).attr('id');
                }
                footer.append('<div id="jp_container_' + i + '" class="jp-audio"></div>').append('<div id="jquery_jplayer_' + i + '" class="jp-jplayer fresh"></div>');
            });

            $('.hubContainer').each(function () {
                $(this).children('.slide:first').addClass('hub');

                $('.hub .button').each(function () {
                    var i = parseInt($(this).attr('id').slice(-2).replace(/[a-zA-Z]+/g, ''));
                    $('#slide' + i).addClass('hubStart');
                });

                $('.slide').each(function () {
                    var id = getID($(this));
                    if ($(this).is('.hubStart')) {
                        var nextid = $(this).nextAll('.hubStart').filter(':first');
                        if (nextid.length != 0) {
                            nextid = getID(nextid);
                            if (nextid - id == 1) {
                                $(this).removeClass('hubStart').addClass('hubSingle');
                            } else {
                                $('#slide' + (nextid - 1)).addClass('hubReturn');
                            }
                        } else {
                            var nextid = $(this).nextAll('.slide').filter(':last');
                            if (nextid.length != 0) {
                                nextid.addClass('hubReturn')
                            } else {
                                $(this).removeClass('hubStart').addClass('hubSingle');
                            }
                        }
                    }
                });
            });

            function getID(id) {
                var id = parseInt(id.attr('id').slice(-2).replace(/[a-zA-Z]+/g, ''));
                return id;
            }


            $('#lk-preloader').css({
                'height': actHeight + 'px'
            });
            $('#lk-intro').css({
                'height': actHeight + 'px'
            });
            $('.slidesContainer').css({
                'height': (actHeight - 60) + 'px'
            });
            $('.slide').css({
                'height': (actHeight - 60) + 'px'
            });
            $('#lk-footer').css({
                'top': (actHeight - 30) + 'px'
            });

            //$('body').append('<div class="lkAlert modal"></div><div class="lkAlert message"></div>');
            $('body').append('<div id="lk-balloon" class="gradient"></div>');
            $('.jp-audio').append(audioControls);
            $('#slide' + currentPosition).addClass('currentSlide');
            //$('.center').addClass('hCenter').addClass('vCenter');
			
			
			
			
            lkInit(options)

            return options;
        });
    }
})(jQuery);


function lkInit(options) {

    slide = $('.slide');
    numberOfSlides = slide.length;
    settings = options;
    currentPosition = settings.currentPosition;
    currentSlide = $('#slide' + currentPosition);
    showSlide = settings.showSlide;
    hideSlide = settings.hideSlide;
    nextBtn = $('#lk-btn-next');
    prevBtn = $('#lk-btn-prev');
    returnBtn = $('#lk-btn-return');
    captionBtn = $('#lk-btn-caption');
    captionBox = $('#lk-caption-box');
    lkhubchart = $('#lk-hub-chart')
    theVideoControls = $('.lk-video-controls-container');
    resetBtn = $('.resetSlide');


    $('.jp-jplayer').each(function () {
        var audioID = $(this).attr('id').substr(15);
        $("#jquery_jplayer_" + audioID).jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: "audio/" + module + "-audio" + audioID + ".mp3",
                    oga: "audio/" + module + "-audio" + audioID + ".ogg"
                });
            },
            cssSelectorAncestor: "#jp_container_" + audioID + "",
            verticalVolume: true
        });
    });

    /*if( $('.center').length > 0 ){ centerMe($('.center')) }
	if( $('.vCenter').length > 0  ){ vCenter($('.vCenter')) }
	if( $('.hCenter').length > 0  ){ hCenter($('.hCenter')) }
	$('.hCenter').each(hCenter)
	$('.vCenter').each(vCenter)
	$('.gradient').each(lkGradient)
	if( $('.gradient').length > 0  ){ lkGradient($('.gradient')) }*/
    if (Modernizr.touch) {
        sweetCaroline()
    }

    $('#slideNumbers').html('Slide: ' + currentPosition + '/' + numberOfSlides);

    $('#lk-intro .begin').click(function () {
        $(this).animate({
            'right': '-175'
        });
        $('#lk-intro .redBar').animate({
            'left': '-600'
        }, hideIntro);
    });

    $('#lk-replay-icon').click(function () {
        location.reload();
    });

    $('.slide').hide();
    //console.log(currentPosition)
    if (lkOptions.development == true) {
        $('#slide' + currentPosition).show();
    }
    $('#lk-btn-prev').hide();
    $('#lk-btn-return').hide();
    $('.lkAlert').hide();
    $('#lk-btn-hub-next').hide();
    $('.jp-audio').hide();
    if ($('#slide' + currentPosition).hasClass('audio')) {
        $('#jp_container_' + currentPosition).show();
    }

    currentPosition >= 2 ? prevBtn.show() : prevBtn.hide();

    $('.volume-slider-container').hide();
    $('.lk-video-controls-container').hide();
    $('#lk-caption-box').hide();
	$('#lk-btn-caption').hide();
    $('#lk-balloon').hide();
    $('#lk-hub-chart').hide();

    $('.jp-jplayer').bind($.jPlayer.event.volumechange, volumeControl);
    $('.jp-jplayer').bind($.jPlayer.event.error, audioError);
    $('.volume-container').mouseenter(showVolumeSlider).mouseleave(hideVolumeSlider);

    //$('.lk-volume-slider-container').mouseenter(showVolumeSlider).mouseleave(hideVolumeSlider);	

    $('.control').live('click', slideNavigation);
    $('.nextSlide').live('click', slideNavigation);
    $('.prevSlide').live('click', slideNavigation);
    $('.returnBtn').click(slideNavigation);
    $('.hub .button').click(hubNavigation);
    $('.lkAlert').click(closelkAlert);
    $('#lk-btn-caption').click(showCaptions);
    $('#lk-balloon').click(hideThis)

    $('.video-pause').hide();
    $('.video-volume-unmute').hide();
    $('.video-control').click(videoControls);
    $('.video-volume-bar').click(videoVolume);
    $('.video-progress').click(videoSeek);

    resetBtn.live('click', resetSlide);
	
	if (lkOptions.development == true) {
		slideNavigation(currentPosition);
	}
	
	$('.presentation').each(lkAnimate);
	
    init()
};

var mouseStatus = 'up';
var firstDigit = 0;
var secondDigit = 0;
var slide = $('.slide');
var beforeSlide;
schoolColors = {
    usc: '990000',
    mvu: 'AD0202',
    hu: '000066',
    usf: '006633',
    cc: '005693',
    cwru: '0a304e',
    gw: '002147',
    nu: 'CC0001',
    neu: 'CC0001',
    ou: '00694E',
    pep: '024E8A',
    ua: 'CC0033',
    uf: '0021A5',
    vu: '997F3D',
    wfu: '987E39',
    wne: '0048AB',
    wsu: '981F32'
};

function setCenterFunctions() {
    $('.slide').show()
    $('.center').addClass('hCenter vCenter')
    $('.hCenter').each(hCenter)
    $('.vCenter').each(vCenter)
    //$('.gradient').each(lkGradient)
    if ($('.gradient').length > 0) {
        lkGradient($('.gradient'))
    }
    $('.slide').hide()
    if (lkOptions.development == true) {
        $('#slide' + currentPosition).show();
    }

}

function hideIntro() {
    $('#lk-intro').delay(250).fadeOut(400, changeSlide);
    currentSlide.delay(200).fadeIn();
}

function slideNavigation(toSlide) {
    if ($('.slide').is(':animated')) {
        return;
    }
    $('.jp-jplayer').jPlayer("pause");
	
	beforeSlide = true;
/* Trigger */
    currentSlide.trigger('beforeSlideNavigation', $(this));	
	
	if( beforeSlide == false ){ return; }
	
    var oldPosition = currentPosition;
    /* -----------------  Determine the new slide  ---------------------- */
    if ($.isNumeric(toSlide)) {
        currentPosition = toSlide;
    }
    if ($(this).is('.nextSlide')) {
        if (currentSlide.is('.hubComplete')) {
            var i = currentSlide.parent('.hubContainer').next();

            if (i.is('.hubContainer')) {
                i = i.children('.hub')
            }
            currentPosition = getID(i);
        } else {
            currentPosition++
        }
    } else if ($(this).is('.prevSlide')) {
        if (currentSlide.is('.hubSingle, .hubStart')) {
            var id = currentSlide.siblings('.hub')
            currentPosition = getID(id);
        } else if (currentSlide.prev().is('.hubContainer')) {
            var id = currentSlide.prev('.hubContainer').children('.hub')
            currentPosition = getID(id);

        } else if (currentSlide.parent('.hubContainer').prev().is('.hubContainer')) {
            var id = currentSlide.parent('.hubContainer').prev('.hubContainer').children('.hub')
            currentPosition = getID(id);
        } else {
            currentPosition--
        }

    } else if ($(this).is('.returnBtn')) {
        var id = currentSlide.siblings('.hub')
        currentPosition = getID(id);
    }

    var newSlide = $('#slide' + currentPosition);
    /* -----------------  Slide animation effects  ---------------------- */
    if (showSlide == 'bounce') {
        if (hideSlide == '') {
            hideSlide = 'fade'
        }
        var option2 = {
            direction: 'left',
            times: 3,
            distance: 10
        };
        var option1 = {
            direction: 'right',
            times: 3,
            distance: 10
        };
    }
    if (showSlide == 'clip') {
        if (hideSlide == '') {
            hideSlide = 'fade'
        }
        var option2 = {
            direction: 'horizontal'
        };
        var option1 = {
            direction: 'horizontal'
        };
    }
    if (showSlide == 'fade') {
        if (hideSlide == '') {
            hideSlide = 'fade'
        }
        var option2 = {};
        var option1 = {};
    }
    if (showSlide == 'slide' || showSlide == 'drop') {
        if (hideSlide == '') {
            hideSlide = showSlide
        }
        var option2 = {
            direction: 'left'
        };
        var option1 = {
            direction: 'right'
        };
    }
    /* -----------------  Slide change  ---------------------- */
    if (oldPosition < currentPosition) {
        var newSlideEffect = option1;
        var oldSlideEffect = option2;
    } else {
        var newSlideEffect = option2;
        var oldSlideEffect = option1;
    }
    if (newSlide.is('.fadeSlide')) {
        currentSlide.fadeOut().removeClass('currentSlide').addClass('unFresh');
        newSlide.fadeIn(400, changeSlide);
    } else {
        currentSlide.hide(hideSlide, oldSlideEffect, 400).removeClass('currentSlide').addClass('unFresh');
        newSlide.show(showSlide, newSlideEffect, 450, changeSlide);
    }

    $('#lk-balloon').hide();
}

function hubNavigation() {
    var id = getID($(this))
    $(this).addClass('unFresh');
    slideNavigation(id);
}

function changeSlide() {

    currentSlide = $('#slide' + currentPosition);
    currentSlide.addClass('currentSlide');
    $('.slide').not('.currentSlide').hide()

    var slideTitle = currentSlide.attr('title') != null ? ' - ' + currentSlide.attr('title') : '';

    $('#lk-header').html(lkOptions.title + slideTitle);

/* Trigger */
    currentSlide.trigger('showSlide');
    showAudio(currentPosition);

    if (currentPosition == 1) {
        prevBtn.hide();
    } else {
        prevBtn.show();
    }
    if (currentPosition == slide.length + 1 || currentSlide.is('.hideNext, .hub, .hubSingle, .hubReturn')) {
        nextBtn.hide();
    } else {
        nextBtn.show();
    }
    if (currentSlide.is('.hubSingle, .hubReturn') && !currentSlide.is('.hideNext')) {
        returnBtn.show();
    } else {
        returnBtn.hide();
    }

    //if( currentSlide.is('.hub') && $('.hub .button:visible').length == $('.hub .button.unFresh:visible').length ) {
    if (currentSlide.is('.hub') && $('.currentSlide.hub .button').length == $('.currentSlide.hub .button.unFresh').length) {
        if (currentSlide.is('.hubComplete')) {
            nextBtn.show();
        } else {
            nextBtn.show('pulsate', {
                times: 3
            });
            lkBalloon($('#lk-btn-next img'), 'Click the next<br> arrow to continue')
        }
        currentSlide.addClass('hubComplete');
    }

    if ( settings.hubChart != false /* && lkOptions.development == false*/ ) {
        $('.lk-hub-chart').hide();
        //var lkhubchart = currentSlide.nextAll('.lk-hub-chart').filter(':first')

        var hubSlides = $('.hubContainer').children('.slide').length

        lkhubchart.html('');

        if (currentSlide.is('.hubSingle')) {

            lkhubchart.append('<div class="lkhc active"></div>').show();

        } else if (currentSlide.is('.hubStart')) {

            lkhubchart.append('<div class="lkhc active"></div>');
            currentSlide.nextUntil('.hubReturn').each(function () {
                lkhubchart.append('<div class="lkhc"></div>');
            })
            lkhubchart.append('<div class="lkhc"></div>').show();

        } else if (currentSlide.is('.hubReturn')) {

            lkhubchart.append('<div class="lkhc active"></div>');
            currentSlide.prevUntil('.hubStart').each(function () {
                lkhubchart.prepend('<div class="lkhc"></div>');
            })
            lkhubchart.prepend('<div class="lkhc"></div>').show();

        } else if (currentSlide.parent().is('.hubContainer') && currentSlide.is(':not(.hub)')) {

            currentSlide.prevUntil('.hubStart').each(function () {
                lkhubchart.append('<div class="lkhc"></div>');
            })
            lkhubchart.append('<div class="lkhc"></div>').append('<div class="lkhc active"></div>')
            currentSlide.nextUntil('.hubReturn').each(function () {
                lkhubchart.append('<div class="lkhc"></div>');
            })
            lkhubchart.append('<div class="lkhc"></div>').show();
        }
		
		var lkhcCount = $('.lkhc').length
		if( lkhcCount >= 8 ){
			var lkhcMargin = 1 //( 100/lkhcCount ) * .2
			var lkhcWidth = Math.round(( 100/lkhcCount ) * .6)
			var lkhcMarginTop = ( 10 - lkhcWidth ) / 2
			$('.lkhc').not('.active').css({ width: lkhcWidth, height: lkhcWidth, marginLeft: lkhcMargin, marginRight: lkhcMargin, marginTop: lkhcMarginTop });
			
		}
		
		

        if (currentSlide.parent().is('.hubContainer') && currentSlide.is(':not(.hub)')) {

            $('#slideNumbers').hide()

        } else {
            $('#slideNumbers').html('Slide: ' + currentPosition + '/' + numberOfSlides).show()
        }
    } else {
        $('#slideNumbers').html('Slide: ' + currentPosition + '/' + numberOfSlides);
    }

    $('.videoSlide').html('');

    if (currentSlide.is('.videoSlide')) {
        //theVideoControls.show()			
        if (Modernizr.touch) {
            currentSlide.html('<iframe frameborder="0" width="800" height="420" name="inlineframe" scrolling="no" src="http://link.delvenetworks.com/media/?mediaId=' + $('#slide' + currentPosition).data('media') + '&width=800&height=420&playerForm=298cb0709e6e4c928e3c465240f88fef" ></iframe>');
        } else {
            currentSlide.html('<object width="800" height="420" id="limelight_player_919144o" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="https://assets.delvenetworks.com/player/loader.swf"/><param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashvars" value="playerForm=298cb0709e6e4c928e3c465240f88fef&amp;mediaId=' + $('#slide' + currentPosition).data('media') + '"/><embed src="https://assets.delvenetworks.com/player/loader.swf" name="limelight_player_919144e" wmode="opaque" width="800" height="420" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" flashvars="playerForm=298cb0709e6e4c928e3c465240f88fef&amp;mediaId=' + $('#slide' + currentPosition).data('media') + '"></embed></object>');
        }
    } else {
        theVideoControls.hide()
    }
    delvePlayerCallback()
}

function showAudio(id) {
    $('.jp-jplayer').jPlayer("pause");
    $('.jp-audio').hide();
    $('#jp_container_' + id).show();

    if ($('#jquery_jplayer_' + id).hasClass('fresh')) {
        $('#jquery_jplayer_' + id).jPlayer('play').removeClass('fresh');
    }

    if ($('#jp_container_' + id).data('caption') != undefined) {
        captionBtn.show();
        captionBox.html($('#jp_container_' + id).data('caption'))
    } else if ($('#slide' + id).data('caption') != undefined) {
        captionBtn.show();
        captionBox.html($('#slide' + id).data('caption'))
    } else {
        captionBtn.hide();
        captionBox.filter(':visible').hide('slide', {
            direction: 'down'
        }, 500);
    }
    $('.lk-volume-slider-container').hide();
}

function showCaptions() {
    if ($('.jp-audio:visible').length >= 1) {
        var id = $('.jp-audio:visible').attr('id').slice(13);
        captionBox.html($('#jp_container_' + id).data('caption')).toggle('slide', {
            direction: 'down'
        }, 500);
    } else {
        var id = currentSlide.attr('id');
        captionBox.html($('#' + id).data('caption')).toggle('slide', {
            direction: 'down'
        }, 500);
    }
}
$('#lk-header').mousedown(function () {
    mouseStatus = 'down';
}).mouseup(function () {
    mouseStatus = 'up';
    if (secondDigit == 0 && firstDigit == 0) {
        return false;
    }
    var id = parseInt(secondDigit + '' + firstDigit);
    if (secondDigit == 0) {
        id = parseInt(firstDigit);
    }
    slideNavigation(id);
    //jumparoo(secondDigit, firstDigit);
    firstDigit = 0;
    secondDigit = 0;
}).mouseleave(function () {
    mouseStatus = 'up';
    firstDigit = 0;
    secondDigit = 0;
});

$(document).keydown(function (e) {
    if (mouseStatus == 'down') {
        secondDigit = firstDigit
        firstDigit = e.keyCode - 48;
    }
});

function showVolumeSlider() {
    $(this).children('.volume-slider-container').stop(true, false).delay(100).fadeIn(100);
}

function hideVolumeSlider() {
    $(this).children('.volume-slider-container').stop(true, false).fadeOut(200);
}

function volumeControl() {
    var id = $(this).attr('id').slice(15);
    if ($('#jp_container_' + id).is(':hidden')) {
        return;
    }

    var volume = $('#jp_container_' + id + ' .jp-volume-bar-value').height();
    volume = volume / 100;

    if (volume == 0) {
        $('.jp-jplayer').jPlayer('mute');
    }
    if (volume == 1) {
        $('.jp-jplayer').jPlayer('unmute');
    }
    if (volume != 0 && volume != 1) {
        $('.jp-jplayer').jPlayer('volume', volume);
    }
}

function audioError(event) {
    var id = $(this).attr('id').slice(15);
    if (userbrowser.indexOf('Firefox') >= 0) {
        var ext = '.ogg'
    } else {
        var ext = '.mp3'
    }
    if (event.jPlayer.error.type == 'e_url') {
        //alert("Error Event: audio" +  id + ext + " is not found. ");
        var err = {
            'error': 'audio' + id + ext + ' is not found.',
            'browser': userbrowser
        }
    } else {
        var err = {
            'error': 'audio' + id + ' ' + event.jPlayer.error.type,
            'browser': userbrowser
        }
    }
    //var err = { 'error':'Error Event: audio"' +  id + ext + '" is not found.', 'browser': userbrowser + ' ' + userversion}
    sendErrors(err)
}

function resetSlide(event) {
    event.preventDefault()
    var url = window.location.href + '?ID=' + Math.random();
    setTimeout(function () {
        currentSlide.load(url + ' #slide' + currentPosition + '>*', '', function () {
            /* Trigger */
            currentSlide.trigger('resetSlide');
            currentSlide.children('.hCenter').each(hCenter);
            currentSlide.children('.vCenter').each(vCenter);
            centerMe(currentSlide.children('.center'))
        });
    }, 100);
}



function centerMe(me) {
    var me = $(this)
    hCenter($(this))
    vCenter($(this))
}

function hCenter(me) {
    if (jQuery.type(me) == 'number') {
        me = $(this)
    } else if (jQuery.type(me) != 'object') {
        return;
    }
    var myWidth = me.width();
    var myPadding = (parseInt(me.css('padding-left').slice(0, -2))) + (parseInt(me.css('padding-right').slice(0, -2)));
    var parentWidth = me.parent().width();
    var myPos = ((parentWidth - (myWidth + myPadding)) / 2) + 'px';
    me.css({
        'left': myPos
    });
}

function vCenter(me) {
    if (jQuery.type(me) == 'number') {
        me = $(this)
    } else if (jQuery.type(me) != 'object') {
        return;
    }
    var myHeight = me.height();
    var myPadding = (parseInt(me.css('padding-top').slice(0, -2))) + (parseInt(me.css('padding-bottom').slice(0, -2)));
    var parentHeight = me.parent().height();
    var myPos = ((parentHeight - (myHeight + myPadding)) / 2) + 'px';
    me.css({
        'top': myPos
    });
}

function hideThis() {
    $(this).fadeOut();
}

function lkBalloon(where, what) {
    var me = $('#lk-balloon')
    var lkBalloonArrow = {}
    var wherewidth = where.width()
    var whereheight = where.height()
    var wherepos = where.offset()
    var wheretop = wherepos.top
    var whereleft = wherepos.left
    if (wherewidth > 200) {
        whereleft = whereleft + (wherewidth / 2)
    }

    me.fadeIn().removeClass().addClass('gradient').html('').html(what)

    var mywidth = me.outerWidth(true)
    var myheight = me.outerHeight(true)

    if (whereleft > 600) {
        var myleft = (whereleft - mywidth) - 20
        lkBalloonArrow.hor = 'right'
    } else if (whereleft > 200) {
        //var myleft = ( ( whereleft + ( wherewidth / 2 )) - ( mywidth / 2 ) )
        var myleft = whereleft - (mywidth / 2)
        lkBalloonArrow.hor = 'mid'
    } else {
        var myleft = whereleft + wherewidth + 24
        lkBalloonArrow.hor = 'left'
    }

    if (wheretop > 210) {
        var mytop = wheretop - myheight
        lkBalloonArrow.vert = 'bot'
    } else {
        var mytop = wheretop + whereheight
        lkBalloonArrow.vert = 'top'
    }

    me.append('<img src="skin/balloon-' + lkBalloonArrow.vert + '-' + lkBalloonArrow.hor + '.png" id="lk-balloon-arrow" class="' + lkBalloonArrow.vert + '-' + lkBalloonArrow.hor + '" />')

    if (lkBalloonArrow.hor == 'mid') {
        $('#lk-balloon-arrow').css({
            left: (mywidth / 2) - 9
        });
    }
    me.css({
        left: myleft,
        top: mytop
    });

}

function lkAlert(message) {
    $('.lkAlert.message').html(message);
    $('.lkAlert.modal').css({
        'opacity': '.5'
    });
    $('.lkAlert').show();
};

function closelkAlert() {
    $('.lkAlert').fadeOut(400);
};

function centerText() {
    var x = '#' + $(this).attr('id');
    $('.slide').show();
    var txt = $(x).html();
    txt = '<div class="ctxt">' + txt + '</div>';
    $(x).html(txt);
    var th = $(x + ' .ctxt').height();
    var h = $(x).height();
    var p = (h - th) / 2 + 'px';
    var newh = h - (p.slice(0, -2)) + 'px';
    $(x).css({
        'padding-top': p,
        'height': newh
    });
    txt = $(x + ' .ctxt').html();
    $(x).html(txt);
    $('.slide').not('.currentSlide').hide();
}

function lkAnimate() {
    var settings = {
        'timing': {},
        'hideEm': false,
        'animation': 'fade',
        'showOptions': {},
        'hideOptions': {},
        'duration': 600,
        'startHidden': true, /* used for a custom event to keep objects visible in beginning */
        'setReturn': false, /* used for a custom event to prevent stand lkanimate animations from occuring */
        'fixMultiples': false /* used for a custom event to trigger an object multiple times */
    };
    var options = $(this).data();
    if (options.timing == null) {
        return;
    }

    var options = $.extend(settings, options);
    var stage = $(this).attr('id');
    var timing = settings.timing;
    var duration = settings.duration;
    var animation = settings.animation;
    var showOptions = settings.showOptions;
    var hideOptions = settings.hideOptions;
    var hideEm = settings.hideEm;
    var startHidden = settings.startHidden;
    var numOfFrames = Object.size(timing);
    var ended = settings.onEnded;
    var replay = settings.onReplay;
    //console.log( Object.size(timing) )

    if ($(this).hasClass('slide')) {
        i = stage.slice(-2).replace(/[a-zA-Z]+/g, '');
    } else {
        i = stage;
    }

    var ids = [];
    var times = [];
	
    $.each(timing, function (key, value) {
        ids.push(key);
        times.push(value);
        if (startHidden == true) {
            $('#' + key).hide()
        }

        if ( $('#' + key).length == 0 ) {
            var realId = key.slice(0, -2);
            var classList = document.getElementById(realId).className

            $('#' + stage).append('<div id="' + key + '" class="' + classList + '" style=" display: none; "></div>');

        }

    });

   
       $('#jquery_jplayer_' + i).bind($.jPlayer.event.ended, function (event){
			$('#' + stage).trigger('audioComplete');	
		})
    


    $('#jquery_jplayer_' + i).bind($.jPlayer.event.timeupdate, function (event) {
		
		if ( event.jPlayer.status.currentTime >= 0 && event.jPlayer.status.currentTime <= times[0] ) {			
			 $('#' + stage).trigger('audioTriggerBefore', [ids])
		}
		
        $.each(ids, function (key, value) {
            var me = $('#' + value)
            var myTime = times[key]
            var next = ids[key + 1]
            var nextTime = times[key + 1]
            var rightBeforeMe = ids[key - 1]
            var beforeMe = []
            var afterMe = []

            $.each(ids, function (k, v) {
                if (k < key && k != key - 1) {
                    beforeMe.push(v)
                } else if (k > key) {
                    afterMe.push(v)
                }
            })
            var customIds = {
                me: me,
                beforeMe: beforeMe,
                afterMe: afterMe
            }
			
            //console.log(event.jPlayer.status.currentTime)
            if (replay && event.jPlayer.status.currentTime == 0) {
                replay();
            } else if ($.type(next) == 'undefined') {
                var conditions = event.jPlayer.status.currentTime >= myTime				
            }else if ($.type(next) != 'undefined') {
                var conditions = event.jPlayer.status.currentTime >= myTime && event.jPlayer.status.currentTime <= nextTime
            }

            if (conditions) {
                //me.trigger('audioTrigger', [ids])
                me.trigger('audioTrigger', [customIds])

                if (settings.setReturn == true) {
                    return;
                }

                hideMe(afterMe)
                me.parents().show()

                if (hideEm != true) {
                    showMe(beforeMe)
                    $('#' + rightBeforeMe).show()
                    if (!$('#jquery_jplayer_' + i).is('unFresh')) {
                        //hideMe(afterMe)	
                    }
                } else {}

                if (animation == 'fade') {
                    if (hideEm == true) {
                        hideMe(beforeMe)
                        $('#' + rightBeforeMe + ':visible').fadeOut(duration)
                    }
                    if (!me.is(':animated') && !me.is(':visible')) {
                        me.fadeIn(duration);
                    }
                } else {
                    if (hideEm == true) {
                        hideMe(beforeMe)
                        $('#' + rightBeforeMe + ':visible').hide(animation, hideOptions, duration);
                    }
                    if (!me.is(':animated') && !me.is(':visible')) {
                        $(me).show(animation, showOptions, duration);
                    }
                }
            }

            function hideMe(array) {
                $.each(array, function (i, val) {
                    $('#' + val).hide()
                })
            }

            function showMe(array) {
                $.each(array, function (i, val) {
                    $('#' + val).show()
                })
            }
        });
    });
};

function lkGradient(e, color, startDegree, endDegree) {
    var color = schoolColors[lkOptions.school.toLowerCase()] || true;
    var startDegree = 1 || true;
    var endDegree = .5 || true;

    parseInt(color, 16)
    color.toString(16)

    if (e.is('.lk-ac')) {
        startDegree = 1
        endDegree = .75
    }
    var color1 = rgbit(color, startDegree);
    var color2 = rgbit(color, endDegree);
    var hex2 = rgbToHex(color2.slice(4, -1));

    e.css({
        'background': color1
    });
    e.css({
        'background': '-moz-linear-gradient(top,' + color1 + ' 0%,' + color2 + ' 100%)'
    });
    e.css({
        'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%, ' + color1 + '), color-stop(100%, ' + color2 + '))'
    });
    e.css({
        'background': '-webkit-linear-gradient(top, ' + color1 + ' 0%, ' + color2 + ' 100%)'
    });
    e.css({
        'background': '-ms-linear-gradient(top, ' + color1 + ' 0%, ' + color2 + ' 100%)'
    });
    e.css({
        'background': 'linear-gradient(to bottom, ' + color1 + ' 0%, ' + color2 + ' 100%)'
    });
    e.css({
        'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr= #' + color + ', endColorstr=' + hex2 + ', GradientType=0 )'
    });

    //console.log(e)
    /*$('#skinCSS').after('<style>\
		e.css({ 'background': color1 });\
		e.css({ 'background': '-moz-linear-gradient(top,'+ color1 +' 0%,'+ color2 +' 100%)' });\
		e.css({ 'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%, '+ color1 +'), color-stop(100%, '+ color2 +'))' });\
		e.css({ 'background': '-webkit-linear-gradient(top, '+ color1 +' 0%, '+ color2 +' 100%)' });\
		e.css({ 'background': '-ms-linear-gradient(top, '+ color1 +' 0%, '+ color2 +' 100%)' });\
		e.css({ 'background': 'linear-gradient(to bottom, '+ color1 +' 0%, '+ color2 +' 100%)' });\
		e.css({ 'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr= #'+color+', endColorstr='+hex2+', GradientType=0 )' });\
	');*/


}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    rgb = rgb.split(', ');
    var r = rgb[0]
    var g = rgb[1]
    var b = rgb[2]
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbit(color, which) {
    var redHex = color.substring(0, 2);
    var greenHex = color.substring(2, 4);
    var blueHex = color.substring(4, 6);

    var redDec = Math.round(parseInt(redHex, 16) * which);
    var greenDec = Math.round(parseInt(greenHex, 16) * which);
    var blueDec = Math.round(parseInt(blueHex, 16) * which);

    var colorRgb = 'rgb(' + redDec + ', ' + greenDec + ', ' + blueDec + ')';

    return colorRgb;
}

videoStop = {};
vidVol = 1;

function videoSeek(e) {
    var tot = $(this).width();
    var mypos = $(this).offset()
    var myleft = mypos.left;
    var clickpos = e.pageX;
    var seekwidth = (clickpos - myleft);
    var seek = seekwidth / tot;

    DelvePlayer.doSeekToRatio(seek)

    $('.video-play-bar').width(seekwidth);
}

function videoVolume(e) {
    var tot = $(this).height();
    var mypos = $(this).offset()
    var mytop = mypos.top;
    var clickpos = e.pageY;
    var volheight = tot - (clickpos - mytop);
    var vol = volheight / tot;

    $('.video-volume-bar-value').height(volheight);

    DelvePlayer.doSetVolume(vol)

    vidVol = vol
}

function videoControls() {
    if ($(this).is('.video-play')) {
        DelvePlayer.doPlay()
    }
    if ($(this).is('.video-pause')) {
        DelvePlayer.doPause()
    }
    if ($(this).is('.video-volume-mute')) {
        $(this).hide();
        $('.video-volume-unmute').show();
        DelvePlayer.doSetVolume(0)
        $('.video-volume-bar-value').height(0);
    }
    if ($(this).is('.video-volume-unmute')) {
        $(this).hide();
        $('.video-volume-mute').show();
        DelvePlayer.doSetVolume(vidVol)
        $('.video-volume-bar-value').height(vidVol * 100);
    }
}

function delvePlayerCallback(playerId, eventName, data) {
    var id = "limelight_player_919144o";

    if (eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0)) {
        DelvePlayer.registerPlayer(id);
    }
    switch (eventName) {
    case 'onPlayheadUpdate':
        var cur = Math.round(data.positionInMilliseconds / 1000)
        var tot = Math.round(data.durationInMilliseconds / 1000)
        var seekwidth = (data.positionInMilliseconds / data.durationInMilliseconds) * 100

        $('.video-current-time').html(convertTime(cur))
        $('.video-duration').html(convertTime(tot))
        $('.video-play-bar').css({
            width: seekwidth + '%'
        })

        videoStop[currentPosition] = seekwidth;
        break;
    case 'onPlayStateChanged':

        if (data.isPlaying == true) {
            $('.video-play').hide()
            $('.video-pause').show()
        } else {
            $('.video-play').show()
            $('.video-pause').hide()
        }
        break;
    case 'onError':
        if ($('body').is('.development')) {
            return;
        }

        var err = {
            'error': 'Video' + currentPosition + ': ' + data.message,
            'browser': userbrowser
        }
        sendErrors(err)

        break;
    case 'onMediaLoad':

        $('.video-play').show()
        $('.video-pause').hide()

        theVideoControls.show()

        var seekwidth = videoStop[currentPosition]
        var seek = seekwidth * .01

        DelvePlayer.doSeekToRatio(seek)
        DelvePlayer.doPause()
        $('.video-play-bar').css({
            width: seekwidth + '%'
        })

        var initialVolume = DelvePlayer.doGetVolume();
        $('.video-volume-bar-value').height(initialVolume * 100);

        break;
    case 'onMediaComplete':

        /* Trigger */
        currentSlide.trigger('videoComplete');

        break;
    }
}

function convertTime(totalSec) {
    minutes = parseInt(totalSec / 60) % 60;
    seconds = totalSec % 60;
    result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
}



Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch (event.type) {
    case "touchstart":
        type = "mousedown";
        break;
    case "touchmove":
        type = "mousemove";
        break;
    case "touchend":
        type = "mouseup";
        break;
    default:
        return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0 /*left*/ , null);

    first.target.dispatchEvent(simulatedEvent);
    var $target = $(event.target);
    if ($target.hasClass('ui-draggable')) {
        event.preventDefault();
    }
}

function sweetCaroline() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

function hide_preloader() {
    $('#lk-preloader').delay(1000).fadeOut();
}

function getID(id) {
    var id = parseInt(id.attr('id').slice(-2).replace(/[a-zA-Z-]/g, ''));
    return id;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-mq-cssclasses-teststyles-prefixes-load
 */
 
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(m.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return t("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var C in n)w(n,C)&&(s=C.toLowerCase(),e[s]=n[C](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.mq=u,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};// JavaScript Document