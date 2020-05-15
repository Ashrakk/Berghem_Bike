<?php
  mb_internal_encoding('UTF-8');
  mb_http_output('UTF-8');

  spl_autoload_register('autoload');
  
  function autoload($className)
  {
      $path = 'user_management/';
  
      include $path.$className.'.php';
  }

?>