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
var G ={
    "ar_x":new Array(),
    "ar_y":new Array(),
    "deduct":1500,
    "effecttime":300,
    "scalesize":10,
    "layoutX":100,
    "divarea":40,
    "str":"",
    "slide_count":0
};
var TempVal ={
    "rot": new Array(),
    "sc": new Array(),
    "dz": new Array(),
    "rx": new Array(),
    "ry": new Array(),
    "bgc": new Array()
};
var i=0;
var ar_rot= new Array();
var ar_sc = new Array();
var ar_dz = new Array();
var ar_rx = new Array();
var ar_ry = new Array();
var ar_bgc = new Array();
//Slide add: Event add
var moves = function (){
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
            //$(this).html("<p>"+this.id+"<br>data-y=" + G.ar_y[i-1] +"<br>data-x="+ G.ar_x[i-1] + "</p>"); //coordinates:TEST
        });
    }
};
//Slide add: Create
var addDiv=function(){
    i++;
    var btn = '<a href="javascript:alerterClose('+i+');">configuration<a>';
    $("#main").append('<div id="sheet'+ i +'" class="ui-widget-content sheet step"><p>'+ i + btn + '</p></div>');
    $("#sheet"+i).css({"position":"absolute","top": (G.divarea)+"px","left":G.divarea+"px","display": "block"});
    moves();    
};
//Demo page: Data set
var comp=function(flg){
    G.str = "";
    for(var x=0;x<i;x++){
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
        "-webkit-transform":"rotate("+$("#rot"+i).val()+"deg) rotateY("+$("#ry"+i).val()+"deg) rotateX("+$("#rx"+i).val()+"deg) rotateZ("+$("#dz"+i).val()+"deg) scale("+scs+")",
        "-webkit-transform-style": "preserve-3d"
    });
    TempVal.rot[i-1] = $("#rot"+i).val()-0;
    TempVal.sc[i-1] = $("#cs"+i).val()-0;
    TempVal.dz[i-1] = $("#dz"+i).val()-0;
    TempVal.rx[i-1] = $("#rx"+i).val()-0;
    TempVal.ry[i-1] = $("#ry"+i).val()-0;
    TempVal.bgc[i-1] = $('#bgc'+i).attr('checked');
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
}
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
    var close    = '<div onclick="alterHide();" class="alt_close">[×] -slide'+i+'- </div>';
    var rot =  '<tr><th>Rotate :</th><td><input id="rot'+i+'" type="range" min="-360" max="360" step="10" onchange="evMain('+i+')" value="'+get_ar_rot+'" /></td></tr>';
    var sc  =  '<tr><th>Scale  :</th><td><input id="sc'+i+'" type="range" min="-6" max="6" step="0.2" value="'+get_ar_sc+'" onchange="evMain('+i+')" /></td></tr>';
    var rx  =  '<tr><th>RotateX:</th><td><input id="rx'+i+'" type="range" min="-360" max="360" step="5" value="'+get_ar_rx+'" onchange="evMain('+i+')" /></td></tr>';
    var ry  =  '<tr><th>RotateY:</th><td><input id="ry'+i+'" type="range" min="-360" max="360" step="5" value="'+get_ar_ry+'" onchange="evMain('+i+')" /></td></tr>';
    var dz   = '<tr><th>RotateZ:</th><td><input id="dz'+i+'" type="range" min="-900" max="900" step="5" value="'+get_ar_rz+'" onchange="evMain('+i+')" /></td></tr>';
    var bgc  = '<tr><th>BackColor:</th><td><input id="bgc'+i+'" type="checkbox" onchange="evMain('+i+')" '+get_ar_bgc+' /></td></tr>';
    var alte = '<tr><th>sentenceEdit:</th><td><button onclick="editBlock('+i+')">文章挿入</button></td></tr>';
    var str =bgc +  sc + rx + ry + dz + rot + alte;
    //View block: View
    $("#getAlterEcho").html( divstart + close + '<div id="alerter" class="alt_back"><table>' + str + '</table></div>' + divend );
    $("#getAlterEcho").fadeIn(G.effecttime);
};
//Alert:Close
var alterHide = function (){
    $("#getAlterEcho").fadeOut(G.effecttime);
};
//Help
var helpAltClose = function(i) {
    //View block: Create
    var divstart = '<div id="help_block">';
    var divend   = '</div>';
    var close    = '<div onclick="helpHide();" class="alt_close">[ × ]</div>';
    var str = "・ 推奨ブラウザ： Ｓａｆａｒｉ、Ｃｈｒｏｍｅ（impress.js layout の推奨です。）<br>";
    str += '・ スライダー値を上げ過ぎると想定外の動作がおこる事があります。<br>';
    str += '・ これから随時更新し、クオリティ向上を目指します。<br>';
    str += '<span>impress.jsは右のリンクよりダウンロードできます</span>→<a href="https://github.com/bartaz/impress.js" target="_blank">［ダウンロード］</a>';
    //View block: View
    $("#getHelpEcho").html( divstart + close + '<div id="alerter" class="alt_back">' + str + '</div>' + divend );
    $("#getHelpEcho").fadeIn(G.effecttime);
    
};
//Help: Hide
var helpHide = function (){
    $("#getHelpEcho").fadeOut(G.effecttime);
};
//Reset Alert Timer
var alttimer = function (str) {
    $("#alttimer").html( str);
    $("#alttimer").fadeIn('fast',function(){
        setTimeout(function() {
            $("#alttimer").fadeOut('10000');
        }, 5000); 
    });
}
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
}
//LocalStrage: All clear
var clearSaveAll = function (){
    localStorage.clear();
    alttimer('<p class="title">Reset [AllData]</p><p class="t1">登録されている”文章”を全て削除しました。</p><p class="t2">スライドは画面リロードで” リセット ”されます。</p>');
};
//LocalStrage: set
var addComm = function(i){
   localStorage.setItem('slidestr'+i, $("#slidestr"+i).val());
   editHide();
};
//LocalStrage: get
var getComm = function(i){
    return localStorage.getItem('slidestr'+i);
};
//Edit block: Create
var editBlock = function(i){
    alterHide();
    var get = getComm(i);
    if(get==undefined || get==null){
        get="";
    }
    var top   = $("#sheet"+i).offset().top;
    var left  = $("#sheet"+i).offset().left+G.layoutX;
    var close = '<div id="editetitle" onclick="editHide();" class="alt_close">[×] -Slide'+i+'- </div>';
    var btn   = '<button onclick="addComm('+i+')">保存</button>';
    var edit  = close+'<p>文章入力(HTMLタグを入力できます。)：<br><textArea id="slidestr'+i+'" cols="40" rows="5" autocomplete="on" list="autohtml">'+get+'</textArea>'+btn+'</p>';
    $("#editblock").css({
       "top":top,"left":left 
    });
     $("#editblock").html(edit).fadeIn(G.effecttime);
     $('#editblock').draggable();
};
//Edit block: Hide
var editHide = function (){
    $("#getAlterEcho").fadeIn(G.effecttime);
    $("#editblock").fadeOut(G.effecttime);
};

