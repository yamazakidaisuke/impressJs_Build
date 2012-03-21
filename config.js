/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	config.language = 'en';
	// config.uiColor = '#AADC6E';
    CKEDITOR.config.font_names='Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif';
	CKEDITOR.config.enterMode = CKEDITOR.ENTER_BR;
    CKEDITOR.config.fontSize_sizes = '14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;38/38px;40/40px;42/42px;44/44px;46/46px;47/47px;48/48px;49/49px;50/50px;52/52px;54/54px;56/56px;58/58px;60/60px;62/62px;64/64px;68/68px;78/78px;88/88px;98/98px;108/108px;';
    //CKEDITOR.config.fontSize　= '40px';
    //<style>body {font-size:270%;}</style>
};
//CSS
CKEDITOR.config.contentsCss = [
    'css/impress-edit.css'
];
