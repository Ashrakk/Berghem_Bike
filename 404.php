<?php
  include 'common.php';
?>
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bike Sharing</title>

    <meta name="viewport"
      content="
          initial-scale = 1.0,
          minimum-scale = 0.75,
          maximum-scale = 10.0">

    <link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
  
    <link rel="stylesheet" type="text/css" href="./css/leaflet.css">
    <link rel="stylesheet" type="text/css" href="./css/style.css">

    <script src = "./ts/build/src/app.min.js" type="module"></script>  
    <script src = "./ts/build/src/uimanager.js" type="module"></script> 
    <script src = "./ts/build/src/modal.js" type="module"></script> 
    <!--
    -->
    <script>
      var uimanager;
    </script>

    <script type="module">
      // IMPORTO LE CLASSI NECESSARIE
      import { MapsManager } from './ts/build/src/app.min.js';
      import { UIManager } from './ts/build/src/uimanager.js';
      import { Modal } from './ts/build/src/modal.js';

      initialize();

      function initialize()
      {
        let modal_login         = new Modal('modal_container_login', 'id-butt-login');
        let modal_register      = new Modal('modal_container_register', 'id-butt-register');
        let buttLogin   = document.getElementById('butt_submit_login');
        let buttReg     = document.getElementById('butt_submit_reg');
        let buttLogout  = document.getElementById('butt_submit_logout');

        uimanager = new UIManager(modal_login, modal_register);

        buttLogin.addEventListener('click', () => {
          uimanager.submit_login();
        });

        buttReg.addEventListener('click', () => {
          uimanager.submit_reg();
        });

        buttLogout.addEventListener('click', () => {
          uimanager.submit_logout();
        });
      }
    </script>

  </head>
  <body>
    <!-- MODALE LOGIN, NASCOSTO DEFAULT -->
    <div class="modal_overlay hidden" id="modal_container_login">
      <div class="modal_content">
        <header class="modal_container">
          <span class="modal_button_close">×</span>
          <h2>Accedi</h2>
        </header>
          <form class= "form_style" action="./user_management/action.php" method="post" id="login_form">
            <div>
              Nome utente / Email
            </div>
            <input type="text" name="emailusername">
            <div>
              Password
            </div>
            <input type="password" name="password">
            <div class="modal_message"></div>
          </form>
          <footer class="modal_container">
            <button type="submit" id="butt_submit_login" class="form_style_submit">Login</button>
          </footer>
      </div>
    </div>

    <!-- MODALE REGISTER, NASCOSTO DEFAULT -->
    <div class="modal_overlay hidden" id="modal_container_register">
      <div class="modal_content">
        <header class="modal_container">
          <span class="modal_button_close">×</span>
          <h2>Nuovo Account</h2>
        </header>
          <form class= "form_style" action="./user_management/action.php" method="POST" id="reg_form">
            <div>
              Nome utente
            </div>
            <input type="text" name="username">
            <div>
              Email
            </div>
            <input type="email" name="email">
            <div>
              Data di nascita
            </div>
            <input type="date" name="birthdate"
              min="1920-01-01" max="2020-01-01">
            <div>
              Password
            </div>
            <input type="password" name="password">
            <div>
              Conferma password
            </div>
            <input type="password" name="passwordConfirm">
            <div class="modal_message"></div>
          </form>
          <footer class="modal_container">
            <button type="submit" id="butt_submit_reg" class="form_style_submit">Invia</button>
          </footer>
      </div>
    </div>

    <!-- CARICAMENTO -->
    <div class="background fullheight" id ="id-page-loader">
      <img class="loader" src="images/common/load1.gif" >
    </div>
    
    <!-- CONTENITORE PRINCIPALE FLEX ROW | | | -->
    <div class="div_row background hidden" id="id-page-container">
      <!-- CONTENITORE MENU INLINE FLEX -->
      <div class="div_navbar" id="id-navbar">
        <img src = "images/common/logo.png" class = "logo" id="id-logo"> 

        <div class="menu_left" id="id-menu-left">
            <a href="index.php"  type="button">Home</a>
            <a href="contact.php"  type="button">Contatti</a>
        </div>

        <div class="menu_right" id='id-menu-right-default'>
          <butt id='id-butt-login'>Accedi</butt>
          <butt id='id-butt-register'>Registrati</butt>
        </div>

        <div class="menu_right hidden" id='id-menu-right-logged'>
          <a href="dashboard.php"  type="button">Dashboard</a>
          <a href="account.php"  type="button">Account</a>
          <a id="butt_submit_logout" type="button">Logout</a>
        </div>

        <div class="menu_right hidden" id='id-menu-right-dropdown-container'>
          <img id="id-menu-right-dropdown" class="" src = "images/common/dropdown-menu-icon-16.png">
        </div>
      </div>

      <!--CONTENITORE CENTRALE FLEX COLUMN -->
      <div id="id-main-content-container" class="div_center">
        <div class="div_internal_row">
          <div class="div_internal_column text_center">
            <div class="spacer30"></div>
            <h1 >Error 404</h1>
            <div class="spacer30"></div>
            <h2>Page not found!</h2>
            <div class="spacer30"></div>
          </div>
        </div>
      </div>
      <footer class="div_page_footer">
      Site made by Davide Cuni
      </footer>
    </div>
  </body>
</html>