 /**
 * impress.js
 *
 * impress.js Layout converter.
 *
 * MIT Licensed.
 *
 * Copyright 2012 Yamazaki Daisuke (@_AIR_NOTE)
 *
 * ------------------------------------------------
 *  author:  yamazaki daisuke
 *  version: 0.1
 */

//
CKEDITOR.config.toolbar = [
    ['-','Templates','-'],
['Format','Font','FontSize', 'TextColor'],
//['PasteText','PasteFromWord'],
//['NumberedList','BulletedList'],
//'Outdent','Indent','Blockquote',
['Undo','Redo'],['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
//['SelectAll','RemoveFormat','Link','Unlink',
//,['Form','Checkbox','Radio','TextField','Textarea','Select','Button','ImageButton','HiddenField','-','Find','Replace']
//['Table'],
['Image','Source'],['-','Templates','-']
];
CKEDITOR.config.resize_enabled = false; 

var G ={
    "i":0,
    "ar_x":new Array(),
    "ar_y":new Array(),
    "deduct":1500,
    "effecttime":300,
    "scalesize":10,
    "layoutX":100,
    "divarea":40,
    "str":"",
    "slide_count":0,
    "select": "",
    "img_count":0,
    "drag_text":'<div class="closex" onclick="editImgHide()">[x]</div>drop Image'
};
var EditStr = new Array(
    '<div id="start" style="font-size:44px;"><q>Wait…impress.js</q><p>Key[Right][→]で操作</p></div>',
    '<div id="ing" style="font-size:44px;"><p><b class="positioning">山崎 大助（GENOVA）</b>デジタルハリウッド講師<b class="rotating">”@it、SoftwareDesign、日経ソフトウエア、ITPro、WebCreators</b><b class="scaling">等のWeb業界誌での執筆</b>主にクリエイトする仕事が本業（アプリとか）</p></div>',
    '<q style="font-size:44px;">” HTML5アプリ作ろうぜ！” <br>　連載がスタートします！！</q><p>最近流行りの 「 HTML5 ・ Jsライブラリ ・ CSS3 ・  API 」の紹介、またそれらを組み合わせた「 sampleアプリケーションの紹介と解説 」を厳選し執筆していきます！!</p>',
    '<div style="font-size:44px;"><q>本編： impress.js とは？</q><p>CSS3を活用したオープンソース（ライセンスMIT）のプレゼンテーションJavaScriptライブラリです。</p></div></p></div>',
    '<div id="title" style="font-size:44px;"><h1>* 特徴 *</h1><q>ド派手なスライド動作</q><q>ド派手なスライド動作</q><q>ド派手なスライド動作</q></div>',
    '<div id="big" style="font-size:44px;"><p>visualize your <b>big</b> <span class="thoughts">thoughts</span></p><p>あなたのの大きな考えと・・・</p></div>',
    '<div id="tiny"><p style="font-size:40px;margin-top: 20px;">and <b>tiny</b> ideas</p> <p>小さな <b>アイデア</b> を視覚化します</p></div>',
    '<div id="its" style="font-size:42px;"><q>対象ブラウザ： Safari(Chrome) </q><p>power of CSS3 transforms and transitions in modern browsers.</p></div>',
    '<div id="bored" style="font-size:42px;"><div class="time"></div><q>Timer操作方法</q><p>Timer起動は[Space]キー</p><p>Timer停止は[Space]キー</p><p>Timer初期化[0]キー</p></div>',
    '<div id="imagination" style="font-size:42px;"><p>スライドのコツ <b>overview</b> <br> <b class="imagination">全体像を見る</b></p></div>',
    '<div id="one-more-thing" style="font-size:42px;"><p>Enjoy yourself.</p></div>',
    '<div id="its-in-3d" style="font-size:42px;"><p><span class="one">自分</span> <span class="two">の</span> <span class="three">信念</span> <span class="four">を</span> <span class="five">つらぬき</span> ！</p><span class="six">前進すること。</span></div>'
);
var TempVal ={
    "rot": new Array(),
    "sc": new Array(),
    "dz": new Array(),
    "rx": new Array(),
    "ry": new Array(),
    "bgc": new Array()
};
var editor = '';
var html = '';
var ar_rot= new Array();
var ar_sc = new Array();
var ar_dz = new Array();
var ar_rx = new Array();
var ar_ry = new Array();
var ar_bgc = new Array();
//
var init = function(){
   G.i = parseInt( localStorage.getItem('slide_count') );
   if(isNaN(G.i)){
       G.i=0;
   }else{
        for(var i=1; i<=G.i; i++){
            addDivSub(i);
            moves(i);
            G.ar_y[i-1] = parseInt(localStorage.getItem('slide_Y'+i));
            G.ar_x[i-1] = parseInt(localStorage.getItem('slide_X'+i));
            $("#sheet"+i).css({"position":"absolute","top": (G.ar_y[i-1])+"px","left":(G.ar_x[i-1])+"px","display": "block"});
            var data = localStorage.getItem('slid_prop'+i);
            var sd = data.split(',');
            ar_rot[i-1] = TempVal.rot[i-1] = sd[0];
            ar_sc[i-1]  = TempVal.sc[i-1] = sd[1];
            ar_dz[i-1]  = TempVal.dz[i-1] = sd[2];
            ar_rx[i-1]  = TempVal.rx[i-1] = sd[3];
            ar_ry[i-1]  = TempVal.ry[i-1] = sd[4];
            ar_bgc[i-1] = TempVal.bgc[i-1]= sd[5];
            $("#rot"+i).val(TempVal.rot[i-1]);
            $("#sc"+i).val(TempVal.sc[i-1]);
            $("#dz"+i).val(TempVal.dz[i-1]);
            $("#rx"+i).val(TempVal.rx[i-1]);
            $("#ry"+i).val(TempVal.ry[i-1]);
            //CheckBox
            if(TempVal.bgc[i-1]=='checked'){
                $('#bgc'+i).attr('checked','checked');
                $("#sheet"+i).css("background-color","#ffffff");
            }else{
                $("#sheet"+i).css("background-color",""); 
            }
            //CSS3
            $("#sheet"+i).css({
                "-webkit-transform-style": "preserve-3d",
                "-webkit-transform":"rotate("+TempVal.rot[i-1]+"deg) rotateY("+TempVal.ry[i-1]+"deg) rotateX("+TempVal.rx[i-1]+"deg) perspective("+TempVal.dz[i-1]+") scale("+TempVal.sc[i-1]+")"
            });
        }
   }
};
var createEditor = function(i){
    editor = null;
	var config = {};
	editor = CKEDITOR.appendTo( 'editor'+i, config, html );
};
var removeEditor = function(i){
	if ( !editor )
		return;
	document.getElementById( 'editorcontents'+i ).innerHTML = html = editor.getData();
	document.getElementById( 'contents'+i ).style.display = '';
    addComm(i);
	editor.destroy();
	editor = null;
    editImgHide();
};
//Slide add: Event add
var moves = function (i){
    //var i=G.i;
    for(var x=i;x<=(i+1);x++){
        G.ar_y[i-1]=(parseInt($("#sheet"+i).offset().top)*G.scalesize)-G.deduct;
        G.ar_x[i-1]=(parseInt($("#sheet"+i).offset().left)*G.scalesize)-G.deduct;
        $('#sheet'+i).draggable();
        $('#sheet'+i).click(function () {
            var id = this.id.split('sheet');
            alerterClose(id[1]);
        });
         $("#sheet"+i).mouseup(function(){
            G.ar_y[i-1] = (parseInt($(this).offset().top)*G.scalesize)-G.deduct;
            G.ar_x[i-1] = (parseInt($(this).offset().left)*G.scalesize)-G.deduct;
            SlideSetXY(i);
            //$(this).html("<p>"+this.id+"<br>data-y=" + G.ar_y[i-1] +"<br>data-x="+ G.ar_x[i-1] + "</p>"); //coordinates:TEST
        });
    }
};
//Slide add: Create
var addDiv=function(){
    var i = parseInt(G.i);
    i++;
    G.i = i;
    addDivSub(i);
    moves(i);
    SlideCount();
    localStorage.setItem('slid_prop'+i, '0,1.0,0,0,0,');
};
var addDivSub=function(i){
    var btn = '<a href="javascript:alerterClose('+i+');">'+i+' Config<a>';
    $("#main").append('<div id="sheet'+ i +'" class="ui-widget-content sheet step"><p>' + btn + '</p></div>');
    $("#sheet"+i).css({"position":"absolute","top": (G.divarea)+"px","left":G.divarea+"px","display": "block"});
};
//Demo page: Data set
var comp=function(flg){
    G.str = "";
    for(var x=0;x<G.i;x++){
        if(G.ar_x[x]==undefined){G.ar_x[x]="0";}else{G.ar_x[x]=(parseInt($('#sheet'+(x+1)).offset().left)*G.scalesize)-G.deduct;}
        if(G.ar_y[x]==undefined){G.ar_y[x]="0";}else{G.ar_y[x]=(parseInt($('#sheet'+(x+1)).offset().top)*G.scalesize)-G.deduct;}
        if(ar_rot[x]==undefined){ar_rot[x]="0";}
        if(ar_sc[x]==undefined){ar_sc[x]="1.0";}
        if(ar_dz[x]==undefined){ar_dz[x]="0";}
        if(ar_rx[x]==undefined){ar_rx[x]="0";}
        if(ar_ry[x]==undefined){ar_ry[x]="0";}
        if(TempVal.bgc[x]=="checked"){ar_bgc[x]="slide";}else{ar_bgc[x]="";}
        var get = getComm(x+1); //LocalStrageからデータを取得（文章）
        if(get==undefined || get==""){
            get = '<p> Please change this. '+(x+1)+'</p><p> Please change this. '+(x+1)+'</p>';
        }
        G.str += '\n<div id="slide'+x+'" data-x="' + (G.ar_x[x]) + '" data-y="' + (G.ar_y[x]) + '" data-rotate="' + ar_rot[x] + '" data-scale="' + ar_sc[x] +'" data-Z="' + ar_dz[x] +'" data-rotate-x="' + ar_rx[x] +'" data-rotate-y="' + ar_ry[x] +'" class="step '+ar_bgc[x]+'"><div>'+get+'</div></div>\n';
    }
    //LocalStrage: Insert&Update
    localStorage.setItem("codeinput",G.str);
    //Demo View: FLG=1
    if(flg==1){
        window.open("demo.html", 'view');
    }
};
//Event 
var evMain = function(i){
    var scs = $("#sc"+i).val();
    $("#sheet"+i).css({
        "-webkit-transform-style": "preserve-3d",
        "-webkit-transform":"rotate("+$("#rot"+i).val()+"deg) rotateY("+$("#ry"+i).val()+"deg) rotateX("+$("#rx"+i).val()+"deg) perspective("+$("#dz"+i).val()+") scale("+scs+")"
    });
    TempVal.rot[i-1] = $("#rot"+i).val()-0;
    TempVal.sc[i-1] = $("#sc"+i).val()-0;
    TempVal.dz[i-1] = $("#dz"+i).val()-0;
    TempVal.rx[i-1] = $("#rx"+i).val()-0;
    TempVal.ry[i-1] = $("#ry"+i).val()-0;
    TempVal.bgc[i-1] = $('#bgc'+i).attr('checked');
    if(isNaN(TempVal.sc[i-1])) TempVal.sc[i-1]=1.0;
    //LocalData保存
    localStorage.setItem('slid_prop'+i, TempVal.rot[i-1]+','+TempVal.sc[i-1]+','+TempVal.dz[i-1]+','+TempVal.rx[i-1]+','+TempVal.ry[i-1]+','+TempVal.bgc[i-1]);
    if($('#bgc'+i).attr('checked')=='checked'){
        $("#sheet"+i).css("background-color","#ffffff");
    }else{
        $("#sheet"+i).css("background-color",""); 
    }
    ar_rot[i-1]=$("#rot"+i).val()-0;
    ar_sc[i-1]=$("#sc"+i).val()-0;
    ar_dz[i-1]=$("#dz"+i).val()-0;
    ar_rx[i-1]=$("#rx"+i).val()-0;
    ar_ry[i-1]=$("#ry"+i).val()-0;
    ar_bgc[i-1]=$('#bgc'+i).attr('checked');
};
//Slide-property: 
var _arrayValChek = function(val){
    if(val>0){
        return val;
    }
    return 0;
};
//Slide-property: scale(1.0)...scale(5.0)
var _arrayValChekDbl = function(val){
    if(val>1.0){
        return val;
    }
    return "1.0";
};
//Slide-property: BackgroundColor[On,Off]
var _arrayValChekBox = function(val){
    if(val=="checked"){
        return val;
    }
    return "";
};
//Alert:Open
var alerterClose = function(i) {
    //View block: Initializ
    $("#getAlterEcho").html('');
    //Value set: Get
    var get_ar_rot = _arrayValChek(TempVal.rot[i-1]);
    var get_ar_sc  = _arrayValChekDbl(TempVal.sc[i-1]);
    var get_ar_rz  = _arrayValChek(TempVal.dz[i-1]);
    var get_ar_rx  = _arrayValChek(TempVal.rx[i-1]);
    var get_ar_ry  = _arrayValChek(TempVal.ry[i-1]);
    var get_ar_bgc = _arrayValChekBox(TempVal.bgc[i-1]);
    //X,Y position: Set
    var top = $("#sheet"+i).offset().top;
    var left= $("#sheet"+i).offset().left+G.layoutX;
    //View block: Create
    var divstart = '<div id="alter_block" style="top:'+ top +'px;left:'+ left +'px">';
    var divend   = '</div>';
    var close    = '<div id="altblockclose" onclick="alterHide();" class="alt_close">[×] -slide'+i+'- </div>';
    var rot =  '<tr><th>Rotate :</th><td><input id="rot'+i+'" type="range" min="-360" max="360" step="10" onchange="evMain('+i+')" value="'+get_ar_rot+'" /></td></tr>';
    var sc  =  '<tr><th>Scale  :</th><td><input id="sc'+i+'" type="range" min="0.1" max="6" step="0.1" value="'+get_ar_sc+'" onchange="evMain('+i+')" /></td></tr>';
    var rx  =  '<tr><th>RotateX:</th><td><input id="rx'+i+'" type="range" min="-360" max="360" step="5" value="'+get_ar_rx+'" onchange="evMain('+i+')" /></td></tr>';
    var ry  =  '<tr><th>RotateY:</th><td><input id="ry'+i+'" type="range" min="-360" max="360" step="5" value="'+get_ar_ry+'" onchange="evMain('+i+')" /></td></tr>';
    var dz   = '<tr><th>Perspective:</th><td><input id="dz'+i+'" type="range" min="0" max="3000" step="5" value="'+get_ar_rz+'" onchange="evMain('+i+')" /></td></tr>';
    var bgc  = '<tr><th>BackColor:</th><td><input id="bgc'+i+'" type="checkbox" onchange="evMain('+i+')" '+get_ar_bgc+' /></td></tr>';
    var alte = '<tr><th>TextEdit:</th><td><button onclick="editBlock('+i+')">TextEdit</button></td></tr>';
    var str =bgc +  ry + rx + rot + dz + sc + alte;
    //View block: View
    $("#getAlterEcho").html( divstart + close + '<div id="alerter" class="alt_back"><table>' + str + '</table></div>' + divend );
    $("#getAlterEcho").fadeIn(G.effecttime);
    $('#alter_block').draggable();
};
//Alert:Close
var alterHide = function (){
    $("#getAlterEcho").fadeOut(G.effecttime);
};
//Help
var helpAltClose = function(i) {
    window.open("impressjs_design.pdf", 'help');
    return ;
};

//Help: Hide
var helpHide = function (){
    $("#getHelpEcho").fadeOut(G.effecttime);
};
//Reset Alert Timer
var alttimer = function (str) {
    alterHide();
    $("#alttimer").html( str);
    $("#alttimer").fadeIn('fast',function(){
        setTimeout(function() {
            location.href='index.html';
        }, 4000); 
    });
};
//Soucecode-top: Create
var souceViewTop = function() {
    var s = '<!doctype html>\n';
        s += '<html lang="ja">\n';
        s += '<head>\n';
        s += '<meta charset="utf-8" />\n';
        s += '<meta name="viewport" content="width=1024" />\n';
        s += '<meta name="apple-mobile-web-app-capable" content="yes" />\n';
        s += '<title>DEMO: impress.js</title>\n';
        s += '<meta name="description" content="impress.js is a presentation tool based on the power of CSS3 transforms and transitions in modern browsers and inspired by the idea behind prezi.com." />\n';
        s += '<meta name="author" content="Bartek Szopka" />\n';
        s += '<link href="http://fonts.googleapis.com/css?family=Open+Sans:regular,semibold,italic,italicsemibold|PT+Sans:400,700,400italic,700italic|PT+Serif:400,700,400italic,700italic" rel="stylesheet" />\n';
        s += '<link href="css/impress-demo.css" rel="stylesheet" />\n';
        s += '<link rel="apple-touch-icon" href="apple-touch-icon.png" />\n';
        s += '</head>\n';
        s += '<body>\n';
        s += '<div id="impress" class="impress-not-supported">\n';
        s += '<div class="time"></div>\n';
        s += '<div id="overview" class="step" data-x="3000" data-y="1500" data-scale="10"><q>［全体像］</q></div>\n';
        s += '\n\n\n\n<!-- *** 以下スライドページ：文章の修正は下記ブロックを変更してください。 *** -->\n';
        return s;
};
//Soucecode-bottom: Create
var souceViewBottom = function() {
        var s = '\n<!-- *** 以下スライドページ：文章の修正は下記ブロックを変更してください。 *** -->\n\n\n\n'; 
        s += '</div>\n'; 
        s += '<div class="hint"><p>Use a spacebar or arrow keys to navigate</p></div>\n';
        s += '<div id="timerblock"><span id="tflg_view"></span> <span id="timer_view"></span></div>\n';
        s += '<script>\n';
        s += 'var val = localStorage.getItem(\'codeinput\');\n';
        s += 'document.getElementById(\'codeinput\').innerHTML=val;\n';
        s += '</script>\n';
        s += '<script>\n';
        s += 'if ("ontouchstart" in document.documentElement) {\n';
        s += '    document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>";\n';
        s += '}\n';
        s += '</script>\n';
        s += '<script src="js/impress.js"></script>\n';
        s += '<script>impress();</script>\n';
        s += '</body>\n';
        s += '</html>\n';
        return s;
};
//souceView-*: Main   
var souceViewMain = function(){
    comp(0); //Do not show the demo page
    $("#main").fadeOut(G.effecttime);
    $("#hedder").fadeOut(G.effecttime);
    $("#codeviewblock").fadeIn(G.effecttime);
    var sh = souceViewTop();
    var sb = souceViewBottom();
    $("#localData").val(sh + G.str + sb);
};
//SouceView: Code select
var selectCode = function(){
    $("#localData").focus().select();
};
//SouceView: backpage
var backpage = function (){
    $("#main").fadeIn(G.effecttime);
    $("#hedder").fadeIn(G.effecttime);
    $("#codeviewblock").fadeOut(G.effecttime);
};
//LocalStrage: All clear
var clearSaveAll = function (){
    if(confirm('保存データを全て削除します。本当に削除しますか？')){
        localStorage.clear();
        alttimer('<p class="title">Reset [AllData]</p><p class="t1">保存されている スライドの位置・属性・文章 全て削除しました。</p>');
    }
};
//LocalStrage: set
var addComm = function(i){
   localStorage.setItem('slidestr'+i, $("#editorcontents"+i).html());
   editHide();
   return;
};
var SlideSetXY = function(i){
   localStorage.setItem('slide_Y'+i,$("#sheet"+i).offset().top);
   localStorage.setItem('slide_X'+i,$("#sheet"+i).offset().left);
};
var SlideCount = function(){
    localStorage.setItem('slide_count',G.i);
};
//LocalStrage: get
var getComm = function(i){
    return localStorage.getItem('slidestr'+i);
};

//Edit block: Create
var selectPage = function(ob,i){
     var get;
    html = get = EditStr[$(ob).val()];
    var btn   = '<button class="removeEditor" onclick="removeEditor('+i+');">保存</button>';
    var close = '<div id="editetitle" class="alt_close"><div class="editclose" onclick="editHide();">[×] -Slide'+i+'</div>- '+G.select+btn+'</div>';
    var edit = close;
    edit += '<div id="editor'+i+'"></div>';
    edit += '<div id="contents'+i+'" style="display: none"><div id="editorcontents'+i+'">' + get + '</div></div>';
     $("#editblock").html(edit).fadeIn(G.effecttime);
     $('#editblock').draggable();
     createEditor(i);
};
/*
//
var selectCreates=function(i){
    var select = '<select class="removeEditor" onchange="selectPage(this,'+i+');"><option value="">テンプレート</option>';
    for(var x=0;x<EditStr.length; x++){
        select += '<option value="'+x+'">['+x+']</option>';
    }
    select += '</select>';
    return select;
};
*/
//
var editBlock = function(i){
    //G.select = selectCreates(i);
    alterHide();
    var get = getComm(i);
    if(get==undefined || get==null){
        html = get=EditStr[0];
    }else{
        html = get;
    }
    var btn="";
    if(chromeChk()==1){
        btn   = '<button class="removeEditor" onclick="removeEditor('+i+');">保存</button><button onclick="editImgShow()" class="removeEditor">画像</button>';
    }else{
        btn   = '<button class="removeEditor" onclick="removeEditor('+i+');">保存</button>';
    }
    var close = '<div id="editetitle" class="alt_close"><div class="editclose" onclick="editHide();">[×] -Slide'+i+'</div>- '+btn+ " "+G.select+'</div>';
    var edit = close;
    edit += '<div id="editor'+i+'"></div>';
    edit += '<div id="contents'+i+'" style="display: none"><div id="editorcontents'+i+'">'+get+'</div></div>';
    $("#editblock").html(edit).fadeIn(G.effecttime);
    $('#editblock').draggable();
    createEditor(i);
};
var chromeChk = function(){
    if ((navigator.userAgent.indexOf("Mac",0)!=-1) && (navigator.userAgent.indexOf("Chrome") != -1)){
        //version="mac_other";
        //alert("Mac Chrome");
        return 1;
    }else if((navigator.userAgent.indexOf("Win",0)!=-1) && (navigator.userAgent.indexOf("Chrome") != -1)){
        //version="win_other";
        //alert("Win Chrome");
        return 1;
    }
    return 0;
};
//Edit block: Hide
var editHide = function (){
    $("#getAlterEcho").fadeIn(G.effecttime);
    $("#editblock").fadeOut(G.effecttime);
};


//DragArea:Event
var editImgShow = function(){
   $("#dragarea").fadeIn(G.effecttime); 
};
var editImgHide = function(){
   $("#dragarea").fadeOut(G.effecttime);
   $("#field").html(G.drag_text);
};
// 範囲内
var onDragOver = function (e) {
  e.preventDefault();
  $("#field").css("border","10px solid #CCC");
}
// 範囲外
var onDragLeave = function(e) {
  e.preventDefault();
  $("#field").css("border","10px solid #160ACA");
  $("#field").html(G.drag_text);
}
// ドロップ
var onDrop = function(e) {
  e.preventDefault();
  $("#field").html("");
  var reader, element;
  for(var i = 0; i < e.dataTransfer.files.length; i++) {
    if(e.dataTransfer.files[i].type.match(/image/)) {
      reader = new FileReader();
      reader.onload = function(event) {
        element = document.createElement("a");
        element.setAttribute("href", "javascript: void(0);");
        element.innerHTML = '<div class="edrop"><div class="closex" onclick="editImgHide()">[x]</div>Editへドロップ</div><img src="' + event.target.result + '" class="image" id="image' + G.img_count + '" />';
        $("#field").append(element);
        G.img_count++;
      };
      reader.readAsDataURL(e.dataTransfer.files[i]);
    }
  }
}

var download = function(){
    var sh = souceViewTop();
    var sb = souceViewBottom();
    document.forms["html_text"].download_text.value = (sh + G.str + sb);
    document.forms["html_text"].method = "post";
    document.forms["html_text"].action="http://php5.xoop.jp/impress/download.php";
    document.forms["html_text"].submit();
    return false;
};

//*************************
init();
//*************************


