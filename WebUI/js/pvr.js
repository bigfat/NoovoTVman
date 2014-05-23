//全局
var headerHeight          = 0;
var recordFileEditStatus  = false;
var pvrFileEditStatus  = false;
var pvrScheduleObj        = new Array();
var pvrScheduleArray      = new Array();
var channelList           = 0;
var currentTime			  = 0;
var utcdiff				  = 0;
var offset				  = 0;
var confirmLabel		  = "";
var cancelLabel			  = "";
var nowRecordId			  = -1;
/*魏雯涛：对应前台html的变化修改此字符串*/
var recordFileItem        = '<li class="recFilesListli"> \
                    <a href="#" class="recordFileItem" data-transition="slide" data-path="hellow.ts">\
                        <div class="ui-body ui-body-a ui-corner-all ui-shadow" style="padding:8px 8px;" >  \
                            <span style="font-size:17px;"><i><b id="channelName_recFile">CH: Fox News</b></i></span><br />     \
                            <div class="recFileItemInfoDiv"> \
                                <ul>\
                                    <li><span style="font-size:16px;" id="programme_recFile">England vs. France</span></li> \
                                    <li><span id="recTime_recFile">2014.7.5, 18:00 ~ 20:00</span></li>  \
                                    <li><span id="fileInfo_recFile">3rd Game of Group A</span></li> \
                                </ul>   \
                            </div> \
                        </div>  \
                    </a>\
                    <div class="pvrItemMaskDiv">    \
                        <div class="pvrItemCheckBox">\
                        <a href="#" class="checkButton">\
	                        <div class="checkImgDiv">\
	                        	<img src="./img/icon-check.png" data-isCheck="false"/>\
	                        </div>\
                        </a>\
                        </div>\
                    </div>   \
                </li>'
/*var recordFileItem        = '<li data-icon="false">                                                                        \
                    <a href="#" class="recordFileItem" data-transition="slide" data-path="hellow.ts">                      \
                        <div class="ui-body ui-body-a ui-corner-all" style="padding:8px 8px;" data-role="button" >         \
                            <span style="font-size:17px;"><i><b id="channelName_recFile">CH: Fox News</b></i></span><br /> \
                            <div class="recFileItemInfoDiv">                                                               \
                                <ul>                                                                                       \
                                    <li><span style="font-size:16px;" id="programme_recFile">England vs. France</span></li>\
                                    <li><span id="recTime_recFile">2014.7.5, 18:00 ~ 20:00</span></li>                     \
                                    <li><span id="fileInfo_recFile">3rd Game of Group A</span></li>                        \
                                </ul>                                                                                      \
                            </div>                                                                                         \
                        </div>                                                                                             \
                    </a>                                                                                                   \
                    <div class="pvrItemMaskDiv">                                                                           \
                        <div class="pvrItemCheckBox">                                                                      \
                        <a href="#" class="checkButton">                                                                   \
                            <div class="checkImgDiv">                                                                      \
                                <img src="./img/icon-check.png" data-isCheck="false"/>                                     \
                            </div>                                                                                         \
                        </a>                                                                                               \
                        </div>                                                                                             \
                    </div>                                                                                                 \
                </li>'*/
/*魏雯涛：对应前台html的变化修改此字符串*/
var pvrScheduleItem ='<li class="pvrScheduleListli" style="height:8em;"> \
                    <a id="recordEditItemPage" class="pvrScheduleItem" href="#recordItemPage" data-transition="slide">           \
                        <div class="ui-body ui-body-a ui-corner-all ui-shadow" style="padding:8px 8px;height:6em;" data-role="button" >\
                            <span style="font-size:17px;font-style:italic;" id="channelName_pvrShedule"><b>CH: Fox News</b></span><br />\
                            <div class="pvrItemContent">\
                            	<div class="pvrItemImgDiv"><img src="./img/a_cherie25.png"/></div>\
								<div class="pvrItemRecDiv"></div>\
                                <div class="pvrItemInfoDiv"> \
                                    <ul>\
                                        <li style="height:36px;overflow:hidden;"><span style="font-size:16px;line-height:18px;" id="programme_pvrShedule">England vs. FranceEngland</span></li>\
                                        <li style="margin-top:0.5em;"><span id="startTime_pvrShedule" style="font-size:14px;line-height:16px;">2014.7.5, 18:00</span>~<span id="endTime_pvrShedule" style="font-size:14px;line-height:16px;">2014.7.5, 20:00</span></li>\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>\
                    </a>\
                    <div class="pvrItemMaskDiv">    \
                        <div class="pvrItemCheckBox">\
                        <a href="#" class="checkButton">\
                            <div class="checkImgDiv">\
                                <img src="./img/icon-check.png" data-isCheck="false"/>\
                            </div>\
                        </a>\
                        </div>\
                    </div>\
                </li>'
var pvrScheduleItemBtn = '<li class="pvrScheduleListli" style="height:8em;"> \
                    <a id="recordAddItemPage" href="#recordItemPage" data-transition="slide" style="background-color:transparent; border-width:0px;" data-icon="plus" class="pvrScheduleItem">         \
                        <div class="ui-body ui-body-a ui-corner-all ui-shadow" style="padding:8px 8px;height:6em;">\
                            <div style="position:absolute;bottom:0px;font-size:12px;"><span style="color:gray;">New PVR Schedule</span></div>\
                            <div style="margin-top:-1em;width:28px; height:28px;position:absolute; top: 50%; left: 50%; margin-left: -1em; text-align:center; border-radius:5px;"><span style="font-size:3em; line-height:0.7em; color:#999999;">+</span></div>\
                        </div>\
                    </a>\
                    <div class="pvrItemMaskDiv"><div>\
                </li>'
/*var pvrScheduleItem = '<li data-icon="false">                                                                              \
                    <a href="#recordItemPage" data-transition="slide" data-PVRIndex="">                                    \
                        <div class="ui-body ui-body-a ui-corner-all" style="padding:8px 8px;" data-role="button" >         \
                        <span style="font-size:17px;" id="channelName_pvrShedule"><i><b>CH: Fox News</b></i></span><br />  \
                            <div class="pvrItemContent">                                                                   \
                                <div class="pvrItemInfoDiv"><ul>                                                           \
                                    <li><span style="font-size:16px;" id="programme_pvrShedule">England</span></li>        \
                                    <li><span id="startTime_pvrShedule">2014.7.5, 18:00 ~ 20:00</span></li>                \
                                    <li><span id="endTime_pvrShedule">3rd Game of Group A</span></li></ul>                 \
                                </div>                                                                                     \
                                <div class="pvrItemImgDiv"><img src="./img/a_cherie25.png"/></div>                         \
                            </div>                                                                                         \
                        </div>                                                                                             \
                    </a>                                                                                                   \
                    <div class="pvrItemMaskDiv">                                                                           \
                        <div class="pvrItemCheckBox">                                                                      \
                        <a href="#" class="checkButton">                                                                   \
                            <div class="checkImgDiv">                                                                      \
                                <img src="./img/icon-check.png" data-isCheck="false"/>                                     \
                            </div>                                                                                         \
                        </a>                                                                                               \
                        </div>                                                                                             \
                    </div>                                                                                                 \
                </li>'*/


var browser = {
    versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                 trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
};


/*=======================================Init function============================================*/ 
function init() {
    window.location = "native://PVRInit";
}


/*=======================================public slot============================================*/
function onDataWithJSON(data,key) { 
    var temp;
    if(browser.versions.android) {
        temp = eval( "(" + data + ")" );
    } else {
        temp = data;
    }
    if(key == "PVRInit"){
		$.mobile.changePage("#pvrPage",  { transition: "none"});
        var recordFilesArray = temp.PVR;
        var recordFilesLabel = temp.PVRLabel;
            pvrScheduleArray = temp.PVRSchedule;
        var pvrScheduleLabel = temp.PVRScheduleLabel;
            channelList      = temp.ChannelList;
			confirmLabel	 = temp.ConfirmLabel;
			cancelLabel		 = temp.CancelLabel;
			//计算当前时间
		
		var	now				 = new Date().getTime();
		var nowoffset = new Date().getTimezoneOffset();
		nowoffset = nowoffset * 60 * 1000;
			if(typeof(temp.CurrentTime.UTCDiff) != "undefined" && typeof(temp.CurrentTime.Offset) != "undefined"){
				currentTime = new Date(parseInt(now)+parseInt(nowoffset)+parseInt(temp.CurrentTime.UTCDiff)+parseInt(temp.CurrentTime.Offset));
				utcdiff	= parseInt(temp.CurrentTime.UTCDiff);
				offset = parseInt(temp.CurrentTime.Offset);
			}
        $("#pvrScheduleLabel_PVR").text(pvrScheduleLabel);
        $("#recordFilesLabel_RecordFile").text(recordFilesLabel);
		
        initPVRShedule(pvrScheduleArray);
		nowRecordId=temp.RecordingItemId;
		findNowRecord(nowRecordId);
        initRecordFiles(recordFilesArray);
        initChannelList(channelList);
		
    } else if(key == "UpdateRemoteFileList") {
        var recordFilesArray = temp.PVR;
        initRecordFiles(recordFilesArray);
    } else if(key == "UpdateRecItemList"){
		$.mobile.changePage("#pvrPage",  { transition: "none"});
		pvrScheduleArray = temp.PVRSchedule;
		initPVRShedule(pvrScheduleArray);
		findNowRecord(nowRecordId);
	} else if(key == "UpdateTime"){
		var	now = new Date().getTime();
		var nowoffset = new Date().getTimezoneOffset();
		nowoffset = nowoffset * 60 * 1000;
		if(typeof(temp.CurrentTime.UTCDiff) != "undefined" && typeof(temp.CurrentTime.Offset) != "undefined"){
			currentTime = new Date(parseInt(now)+parseInt(nowoffset)+parseInt(temp.CurrentTime.UTCDiff)+parseInt(temp.CurrentTime.Offset));
			utcdiff	= parseInt(temp.CurrentTime.UTCDiff);
			offset = parseInt(temp.CurrentTime.Offset);
		}
	} else if(key == "RecordStartNotification"){
		nowRecordId=temp;
		findNowRecord(nowRecordId);
	} else if(key == "RecordFinishNotification"){
		nowRecordId = -1;
		pvrScheduleArray = temp.PVRSchedule;
		initPVRShedule(pvrScheduleArray);
	}
	resizepvrScheduleList();
	resizeRecordFileList();
}


/*=======================================public signal============================================*/
function playFile(filePath) {
    window.location = "native://PlayFile?" + filePath;
}

function deleteFile(filesArray) {
    window.location = "native://DeleteFile?" + filesArray;
}

function modifyRecItem(jsonstr) {
    window.location = "native://ModifyRecItem?" + jsonstr;
}

function addRecItem(jsonarraystr) {
    window.location = "native://AddRecItem?" + jsonarraystr;
}

function deletePvr(recordIdArray){
	//$.mobile.loading("show",{text:recordIdArray,textVisible:true,textonly:true,html:recordIdArray});
	window.location = "native://DeleteRecItem?" + recordIdArray;	
}

/*=======================================Init function============================================*/
function initRecordFiles(data) {
	
    var recFilesList = $("#recFilesList");
    recFilesList.children().remove();
    recFilesList.empty();
    $.each(data, function(index,value) {
        var filePath    = value.FilePath;
        var channelName = value.ChannelName;
        var displayName = value.DisplayName;
        var fileInfo    = value.FileInfo;
        var recordDate  = value.RecordDate;
        var recItem     = $(recordFileItem);
        recItem.children("a").attr("data-path", filePath);
        recItem.find("#channelName_recFile").text(channelName).attr("id", "channelName" + index + "_recFile");
        recItem.find("#programme_recFile").html(displayName == "" ? "&nbsp" : displayName).attr("id", "programme" + index + "_recFile");
        recItem.find("#recTime_recFile").text(recordDate).attr("id", "recTime" + index + "_recFile");
        recItem.find("#fileInfo_recFile").text(fileInfo).attr("id", "fileInfo" + index + "_recFile");

        recFilesList.append(recItem);
    });
	resizepvrScheduleList();
	resizeRecordFileList();
    //recFilesList.listview('refresh');
}

function initPVRShedule(data) {
    var pvrScheduleList = $("#pvrScheduleList");
    pvrScheduleList.children().remove();
    pvrScheduleList.empty();
	pvrScheduleObj = new Array();
    $.each(data, function(index,value) {
        var channelName    = value.ChannelName;
        var displayName    = value.DisplayName;
        var startTime      = new Date(value.StartYear + "-" + value.StartMonth + "-" + value.StartDay + " " + value.StartHour + ":" + value.StartMinute + ":0").format("yyyy-MM-dd hh:mm");
        var endTime        = new Date(value.EndYear + "-" + value.EndMonth + "-" + value.EndDay + " " + value.EndHour + ":" + value.EndMinute + ":0").format("hh:mm");
		var endTimeFull        = new Date(value.EndYear + "-" + value.EndMonth + "-" + value.EndDay + " " + value.EndHour + ":" + value.EndMinute + ":0").format("yyyy-MM-dd hh:mm");
        var startTimeLabel = startTime.toLocaleString();
        var endTimeLabel   = endTime.toLocaleString();
        var sheduleItem    = $(pvrScheduleItem);
		var recordItemId   = value.RecordItemId;
		
        sheduleItem.children("a").attr("data-PVRIndex", index);
		sheduleItem.children("a").attr("data-recordId", recordItemId);
		sheduleItem.find(".pvrItemRecDiv").attr("data-recordId",recordItemId);
        sheduleItem.find("#channelName_pvrShedule").text("CH:"+channelName).attr("id", "channelName" + index + "_pvrShedule");
        sheduleItem.find("#programme_pvrShedule").html(displayName == "" ? "&nbsp" : displayName).attr("id", "programme" + index + "_pvrShedule");
        sheduleItem.find("#startTime_pvrShedule").text(startTime).attr("id", "startTime" + index + "_pvrShedule");
        sheduleItem.find("#endTime_pvrShedule").text(endTime).attr("id", "endTime" + index + "_pvrShedule");

        pvrScheduleObj[index] = value;
        pvrScheduleObj[index].startTime = startTime;
        pvrScheduleObj[index].endTime   = endTimeFull;

        pvrScheduleList.append(sheduleItem);
    });
	pvrScheduleList.append(pvrScheduleItemBtn);
	resizepvrScheduleList();
	resizeRecordFileList();
    //pvrScheduleList.listview('refresh');
}

function initChannelList(data) {
    var channelList = $("#channelList");
    channelList.children().remove();
    channelList.empty();
    $("#applyButton").text(confirmLabel);//提交按钮国际化语言
	$("#cancelButton").text(cancelLabel);//提交按钮国际化语言
    $.each(data, function(index, value){
        channelList.append('<li data-icon="false" class="channelItem" data-index="'+index+'" value="' + value.ChannelName + '">' + value.ChannelName + '</li>');
    });

    channelList.listview('refresh');
}

/*=======================================private function============================================*/
function loadPVR(url) {
    // $.get("https://s3-eu-west-1.amazonaws.com/tvman/PVR+Schedule/1398311131021",function(data,status){
    //     alert("Data: " + data + "\nStatus: " + status);
    // });

// $.ajax({ url: "http://cdn.iknow.bdimg.com/static/common/lib/mod_4a8b07f.js", context: document.body, success: function(){
//         alert("sefsef"); 
//       }});

// $.ajax({
//     type: "GET",
//     cache: false,
//     url: 'http://cdn.iknow.bdimg.com/static/common/lib/mod_4a8b07f.js',
//     dataType: "text",
//     error: function(xhr, settings, exception){
//         alert('The update server could not be contacted.');
//     },
//     success: function(xml){
//         alert(xml);    
//         }
//     });
}

/*=======================================JQuery Binding============================================*/
 $(document).ready(function () {

    $("#delButton_PVR").click(function() {
		var pvrScheduleListdiv = $("#pvrScheduleList li>div")
		if(pvrScheduleListdiv.length>0){
			if (pvrFileEditStatus == false) {
				pvrFileEditStatus = true;
				pvrScheduleListdiv.fadeIn(200);
	
			} else {
				pvrFileEditStatus = false;
				pvrScheduleListdiv.fadeOut(200);
	
				pvrScheduleListdiv = pvrScheduleListdiv.find("img[data-isCheck=true]");
				var tempArray = new Array();
				$.each(pvrScheduleListdiv,function(index,temp){
					tempArray.push($(temp).parents("li").children("a").attr("data-recordId"));
				});
				deletePvr(tempArray);
			}
		}
    });

    $("#delButton_Record").click(function() {
        var recordFileItemList = $("#recFilesList li>div");

        if (recordFileEditStatus == false) {
            recordFileEditStatus = true;
            recordFileItemList.fadeIn(200);

        } else {
            recordFileEditStatus = false;
            recordFileItemList.fadeOut(200);

            recordFileItemList = recordFileItemList.find("img[data-isCheck=true]");
            var tempArray = new Array();
            $.each(recordFileItemList,function(index,temp){
                tempArray.push($(temp).parents("li").children("a").attr("data-path"));
            });
            deleteFile(tempArray);
        }
    }); 

    $("#pvrPage").on("swiperight",function(){
        $.mobile.changePage("#twitterPage",  { transition: "slide", reverse:true});
    });
    $("#pvrPage").on("swipeleft",function(){
        $.mobile.changePage("#recFilesPage",  { transition: "slide" });
		resizepvrScheduleList();
		resizeRecordFileList();
    });
    $("#twitterPage").on("swipeleft",function(){
        $.mobile.changePage("#pvrPage",  { transition: "slide"});
		resizepvrScheduleList();
		resizeRecordFileList();
    });
    $("#recFilesPage").on("swiperight",function(){
        $.mobile.changePage("#pvrPage",  { transition: "slide", reverse:true});
		resizepvrScheduleList();
		resizeRecordFileList();
    });


    //初始化日期控件
    var formTime = {
        preset: 'datetime', //日期
        theme: 'android-ics', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'Scroller', //日期选择模式
        dateFormat: 'yy-mm-dd', // 日期格式
        dateOrder: 'yymmdd', //面板中日期排列格式
        startYear:2010,
        endYear:2050,
        animate:"slideup",
		timeFormat: 'HH:ii',
		showOnFocus: false//解决页面切换回来后会弹出时间选择
    };

    var toTime = {
        preset: 'datetime', //日期
        theme: 'android-ics', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'Scroller', //日期选择模式
        dateFormat: 'yy-mm-dd', // 日期格式
        dateOrder: 'yymmdd', //面板中日期排列格式
        startYear:2010,
        endYear:2050,
        animate:"slideup",
		timeFormat: 'HH:ii',
		showOnFocus: false//解决页面切换回来后会弹出时间选择
    };
    $("#formTimeSelect").textinput();
	$("#toTimeSelect").textinput();
    $("#formTimeSelect").mobiscroll(formTime);
    $("#toTimeSelect").mobiscroll(toTime);
});

$(function() {
    headerHeight = $("#pvrHeader").height();

    $("body").on("click", ".channelItem", function() {
        var channelName = $(this).text();

        var preCheck = $("#channelList").find("[data-icon=check]");
        preCheck.attr("data-icon", "false");
        preCheck.removeClass("ui-btn-icon-right ui-icon-check");

        $(this).attr("data-icon", "check");
        $(this).addClass("ui-btn-icon-right ui-icon-check");
		$("#channelName_recItemEdit").attr("data-index",$(this).attr("data-index"));
        $("#channelName_recItemEdit").text(channelName);
		/*$.mobile.changePage(
			'#recordItemPage',{
			transition : 'slide',
			reverse : true,
			changeHash : true	
			}
		);*/
		$('#ChannelListback').click();
    });

    $("body").on("click", ".recordFileItem", function() {
        playFile($(this).attr("data-path"));
    });

    $("body").on("click", "#recordEditItemPage", function() {
		$("#formTimeSelect").css({"background-color":"transparent","color":"#333"});
		$("#toTimeSelect").css({"background-color":"transparent","color":"#333"});
        var pvrScheduleItemObj = pvrScheduleObj[$(this).attr("data-PVRIndex")];
		 $("#recItemIndex").val($(this).attr("data-PVRIndex"));
		 $("#channelName_recItemEdit").attr("data-index","-1");
		 $("#channelName_recItemEdit").text(pvrScheduleItemObj.ChannelName);
		 $("#channelName_recItemEdit").attr("href","#");
         $("#displayName_recItemEdit").val(pvrScheduleItemObj.DisplayName);
         $("#formTimeSelect").val(pvrScheduleItemObj.startTime);
         $("#toTimeSelect").val(pvrScheduleItemObj.endTime);
		 var pvrItemRecDiv=$(this).find(".pvrItemRecDiv");
		if(pvrItemRecDiv.attr("data-recordId")==nowRecordId){
			$("#formTimeSelect").textinput("disable");
		}else{
			$("#formTimeSelect").textinput("enable");
		}
    });
	
	$("body").on("click", "#recordAddItemPage", function() {
		$("#formTimeSelect").css({"background-color":"transparent","color":"#333"});
		$("#toTimeSelect").css({"background-color":"transparent","color":"#333"});
		 $("#recItemIndex").val('-1');
		 $("#channelName_recItemEdit").attr("data-index","0");
		 $("#channelName_recItemEdit").text(channelList[0].ChannelName);
		 $("#channelName_recItemEdit").attr("href","#channelListPage");
         $("#displayName_recItemEdit").val("");
		 
		 var starttime = new Date().getTime();
		 var nowoffset = new Date().getTimezoneOffset();
		 nowoffset = nowoffset * 60 * 1000;
		 starttime = starttime+nowoffset+utcdiff+offset;
		 var endtime = starttime+3600000;
		 starttime = new Date(starttime).format("yyyy-MM-dd hh:mm");
		 endtime = new Date(endtime).format("yyyy-MM-dd hh:mm");
         $("#formTimeSelect").val(starttime);
         $("#toTimeSelect").val(endtime);
		 $("#formTimeSelect").textinput("enable");
    });
	
    $("body").on("click", ".checkButton", function() {
        var imgCheck = $(this).find("img");
        imgCheck.toggle();
        if(imgCheck.css("display") == "none") {
            imgCheck.attr("data-isCheck", "false");
        } else {
            imgCheck.attr("data-isCheck", "true");
        }

    });


    function checkIframe() {
    var iframe = $("iframe");

    if(iframe.length <= 0) {
        setTimeout("checkIframe()", 500);
        return;
    }

    if(iframe.width() <= "1") {
        setTimeout("checkIframe()", 500);
        return;
    }
    
    iframe.contents().find("body").css("margin", "0px 0px");
    iframe.contents().find("body").css("padding", "0px 0px");
    iframe.contents().find("#twitter-widget-0").css("marginBottom", "0px");
    var tempHeight = $(window).height() - headerHeight - 10;
    iframe.height(tempHeight);

    iframe.contents().find(".e-entry-content a").click(function() {
        //alert($(this).attr("title"));
        loadPVR($(this).attr("title"));
        return false;
    });
}
});

/*魏雯涛增加部分*/
$(function(){
	
	/*录制时间冲突判断*/
	/*$("#displayName_recItemEdit").focus(function(){
		$("#displayName_recItemEdit").css("background-color","#ddd");
	});*/
	$("#formTimeSelect").click(function(){
		$("#formTimeSelect").css({"background-color":"transparent","color":"#333"});
		$("#toTimeSelect").css({"background-color":"transparent","color":"#333"});
	});
	$("#toTimeSelect").click(function(){
		$("#formTimeSelect").css({"background-color":"transparent","color":"#333"});
		$("#toTimeSelect").css({"background-color":"transparent","color":"#333"});
	});
	$("#toTimeSelect").change(function(){
		if($("#toTimeSelect").val()!=""&&$("#formTimeSelect").val()!=""){
			var starttime=new Date($("#formTimeSelect").val());
			var endtime=new Date($("#toTimeSelect").val());
			if(endtime<=currentTime){
				$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				return;
			}
			if(starttime>=endtime){
				$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				return;
			}
			if(iftimeconflict(starttime,endtime,$("#recItemIndex").val())){
				$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				return;
			}
			$("#formTimeSelect").css({"background-color":"transparent","color":"#333"});
			$("#toTimeSelect").css({"background-color":"transparent","color":"#333"});
		}
	});
	$("#formTimeSelect").change(function(){
		if($("#toTimeSelect").val()!=""&&$("#formTimeSelect").val()!=""){
			var starttime=new Date($("#formTimeSelect").val());
			var endtime=new Date($("#toTimeSelect").val());
			if(endtime<=currentTime){
				$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				return;
			}
			if(starttime>=endtime){
				$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				return;
			}
			if(iftimeconflict(starttime,endtime,$("#recItemIndex").val())){
				$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
				return;
			}
			$("#formTimeSelect").css({"background-color":"transparent","color":"#333"});
			$("#toTimeSelect").css({"background-color":"transparent","color":"#333"});
		}
	});
	$("#applyButton").click(function(){
		
		if(currentTime==0){
			return;
		}
		if($("#channelName_recItemEdit").text()==""||$("#channelName_recItemEdit").text()=="　"){
			return;
		}
		/*if($("#displayName_recItemEdit").val()==""){
			$("#displayName_recItemEdit").css({"background-color":"#ff6464","color":"#fff"});
			return;
		}*/
		if($("#formTimeSelect").val()==""){
			$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			return;
		}
		if($("#toTimeSelect").val()==""){
			$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			return;
		}
		var starttime=new Date($("#formTimeSelect").val());
		var endtime=new Date($("#toTimeSelect").val());
		if(endtime<=currentTime){
			$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			return;
		}
		if(starttime>=endtime){
			$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			return;
		}
		if(iftimeconflict(starttime,endtime,$("#recItemIndex").val())){
			$("#formTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			$("#toTimeSelect").css({"background-color":"#ff6464","color":"#fff"});
			/*$('#recordItemPopup h1').text("提示：");
			$('#recordItemPopup p').text("预约时间输入错误，或者预约时间有冲突!");
			$('#recordItemPopup').popup( "open", {transition:"pop"} );*/
			return;
		}
		var json = [];		
		json.StartYear=starttime.getFullYear();
		json.StartMonth=starttime.getMonth()+1;
		json.StartDay=starttime.getDate();
		json.StartHour=starttime.getHours();
		json.StartMinute=starttime.getMinutes();
		json.StartSecond=starttime.getSeconds();
		json.EndYear=endtime.getFullYear();
		json.EndMonth=endtime.getMonth()+1;
		json.EndDay=endtime.getDate();
		json.EndHour=endtime.getHours();
		json.EndMinute=endtime.getMinutes();
		json.EndSecond=endtime.getSeconds();
		
		json.EventId=0;
		var now=new Date().getTime();
		json.RecordItemId=parseInt((parseInt(now)+parseInt(utcdiff))/1000);
		
		if($("#channelName_recItemEdit").attr("data-index")!="-1"){
			var channel=channelList[parseInt($("#channelName_recItemEdit").attr("data-index"))];
			json.ChannelName=channel.ChannelName;
			json.ProgId=channel.ServiceId;
			json.Bandwidth=channel.Bandwidth;
			json.NetworkId=channel.NetworkId;
			json.TsId=channel.TsId;
			json.PidArray=channel.PidArray;
			json.Frequency=channel.Frequency;
			json.Version=4;
		}
		if($("#recItemIndex").val()!="-1"){
			var pvrScheduleItemObj = pvrScheduleObj[$("#recItemIndex").val()];
			json.RecordItemId=pvrScheduleItemObj.RecordItemId;
			json.ChannelName=pvrScheduleItemObj.ChannelName;
			json.EventId=pvrScheduleItemObj.EventId;
			json.ProgId=pvrScheduleItemObj.ProgId;
			json.Bandwidth=pvrScheduleItemObj.Bandwidth;
			json.NetworkId=pvrScheduleItemObj.NetworkId;
			json.TsId=pvrScheduleItemObj.TsId;
			json.PidArray=pvrScheduleItemObj.PidArray;
			json.Frequency=pvrScheduleItemObj.Frequency;
			json.Version=pvrScheduleItemObj.Version;
		}
		var jsonstr={StartDay:json.StartDay,
					EndMonth:json.EndMonth,
					StartMonth:json.StartMonth,
					EventId:json.EventId,
					ChannelName:json.ChannelName,
					DisplayName:$("#displayName_recItemEdit").val(),
					RecordItemId:json.RecordItemId,
					EndMinute:json.EndMinute,
					StartHour:json.StartHour,
					ProgId:json.ProgId,
					Bandwidth:json.Bandwidth,
					EndSecond:json.EndSecond,
					EndHour:json.EndHour,
					StartYear:json.StartYear,
					NetworkId:json.NetworkId,
					TsId:json.TsId,
					StartMinute:json.StartMinute,
					EndDay:json.EndDay,
					StartSecond:json.StartSecond,
					PidArray:json.PidArray,
					EndYear:json.EndYear,
					Frequency:json.Frequency,
					Version:json.Version};
		if($("#recItemIndex").val()!="-1"){
			modifyRecItem(JSON.stringify(jsonstr));
		}else{
			var jsonstrarray=[];
			jsonstrarray.push(jsonstr);
			addRecItem(JSON.stringify(jsonstrarray));
		}
	});

	//判断与其他节目的时间冲突
	var iftimeconflict=function(starttime,endtime,recItemIndex){
		data=pvrScheduleObj
		flag=0;
		$.each(data, function(index,value) {
			if(index!=recItemIndex){
				localstarttime=new Date(value.startTime);
				localendtime=new Date(value.endTime);
				if(starttime>=localstarttime&&starttime<=localendtime){
					flag=1;
					return;
				}
				if(endtime>=localstarttime&&endtime<=localendtime){
					flag=1;
					return;
				}
				if(localstarttime>=starttime&&localstarttime<=endtime){
					flag=1;
					return;
				}
				if(localendtime>=starttime&&localendtime<=endtime){
					flag=1;
					return;
				}
			}
		});
		if(flag==1){
			return true;
		}
		return false;
	}
});
/*列表自适应*/
var divwidth=272;
$(function(){
	if($('.recFilesListli').length > 0){
		divwidth=$('.recFilesListli').width();
	}else if($('.pvrScheduleListli').length > 0){
		divwidth=$('.pvrScheduleListli').width();
	}
});
var resizeRecordFileList=function(){
	if($('.recFilesListli').length > 0){
		var windowwidth=$("#recFilesList").width();
		//var marginleft=$('.recFilesListli').css("margin-left").substring(0,$('.recFilesListli').css("margin-left").indexOf('px'));
		var marginleft=0;
		//var marginright=$('.recFilesListli').css("margin-right").substring(0,$('.recFilesListli').css("margin-right").indexOf('px'));
		var marginright=0;
		var divallwidth=parseInt(divwidth)+parseInt(marginleft)+parseInt(marginright);
		var multiple=parseInt(windowwidth/divallwidth);
		var needwidth=parseInt(windowwidth/multiple)-parseInt(marginleft)-parseInt(marginright);
		$('.recFilesListli').width(needwidth);
	}
}
var resizepvrScheduleList=function(){
	if($('.pvrScheduleListli').length > 0){	
		var windowwidth=$('#pvrScheduleList').width();
		//var marginleft=$('.pvrScheduleListli').css("margin-left").substring(0,$('.recFilesListli').css("margin-left").indexOf('px'));
		var marginleft=0;
		//var marginright=$('.pvrScheduleListli').css("margin-right").substring(0,$('.recFilesListli').css("margin-right").indexOf('px'));
		var marginright=0;
		var divallwidth=parseInt(divwidth)+parseInt(marginleft)+parseInt(marginright);
		var multiple=parseInt(windowwidth/divallwidth);
		var needwidth=parseInt(windowwidth/multiple)-parseInt(marginleft)-parseInt(marginright);
		$('.pvrScheduleListli').width(needwidth);
	}
}
$(window).resize(function(){
	resizepvrScheduleList();
	resizeRecordFileList();
});
/** 
 * 时间对象的格式化; 
 */  
Date.prototype.format = function(format) {  
	/* 
	 * eg:format="yyyy-MM-dd hh:mm:ss"; 
	 */  
	var o = {  
		"M+" : this.getMonth() + 1, // month  
		"d+" : this.getDate(), // day  
		"h+" : this.getHours(), // hour  
		"m+" : this.getMinutes(), // minute  
		"s+" : this.getSeconds(), // second  
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter  
		"S" : this.getMilliseconds()  
		// millisecond  
	}  
  
	if (/(y+)/.test(format)) {  
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
						- RegExp.$1.length));  
	}  
  
	for (var k in o) {  
		if (new RegExp("(" + k + ")").test(format)) {  
			format = format.replace(RegExp.$1, RegExp.$1.length == 1  
							? o[k]  
							: ("00" + o[k]).substr(("" + o[k]).length));  
		}  
	}  
	return format;  
}  
/*查找当前录制的节目*/
function findNowRecord(nowRecordId){
	if(nowRecordId!=-1){
		var pvrItemRecDivs=$(".pvrItemRecDiv");
		$.each(pvrItemRecDivs, function(index,element) {
			pvrItemRecDiv=$(element);
			if(pvrItemRecDiv.attr("data-recordId")==nowRecordId){
				
				pvrItemRecDiv.addClass('pvrItemRecNow');
			}
		});
	}
}
/*魏雯涛修改部分--over*/

