<?php
//INI
session_start();
mb_language("Japanese");
mb_internal_encoding("UTF-8");
mb_http_output("UTF-8");

//VarSet
$str  = $_POST["download_text"];

//Names
$id5 = md5(session_id().microtime());
$file = "upload/update_". $id5 .".html";

//File
$f = fopen($file, "w");
flock($f, LOCK_EX);
fputs($f, $str); 
flock($f, LOCK_UN);
fclose($f); 
unset($f);

//Header
header("Content-type: text/html");
header("Content-Disposition: attachment; filename=index.html");

//ob_end_flush();
readfile($file);

//SESSION_Init
$_SESSION = array();

//SESSION_Delete
session_destroy();

//File_Delete
unlink($file);

?>
