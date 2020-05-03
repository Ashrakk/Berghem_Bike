<?php
  include 'common.php';
  $logged = false;
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bike Sharing</title>

    <meta name="viewport"
      content="
          initial-scale = 1.0,
          minimum-scale = 0.75,
          maximum-scale = 10.0">

    <script src="./ts/build/src/uimanager.js" type="module"></script>
    <script src="./ts/build/src/modal.js" type="module"></script>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script type="module">

      // IMPORTO LE CLASSI NECESSARIE
      import { UIManager } from './ts/build/src/uimanager.js';
      import { Modal } from './ts/build/src/modal.js';

      initialize();

      function initialize()
      {
        let modal_login = new Modal('modal_container_login', 'id-butt-login');
        let modal_register = new Modal('modal_container_register', 'id-butt-register');
        let modal_register_now = new Modal('modal_container_register', 'id-specialbutton');

        let uimanager = new UIManager(modal_login, modal_register, modal_register_now);
      }

    </script>

  </head>
  <body>
    <!-- MODALE LOGIN, NASCOSTO DEFAULT -->
    <div class="modal_overlay hidden" id="modal_container_login">
      <div class="modal_content">
        <header class="modal_container">
          <span onclick=""
           class="modal_button_close">×</span>
          <h2>Accedi</h2>
        </header>
          <form class= "form_style" action="user_managment/login.php" method="POST" id="login_form">
            <div>
              Username
            </div>
            <input type="text" name="username">
            <div>
              Password
            </div>
            <input type="password" name="password">
          </form>
          <footer class="modal_container">
            <button type="submit" form="login_form" class = "form_style_submit">Login</button>
          </footer>
      </div>
    </div>

    <!-- MODALE REGISTER, NASCOSTO DEFAULT -->
    <div class="modal_overlay hidden" id="modal_container_register">
      <div class="modal_content">
        <header class="modal_container">
          <span onclick=""
           class="modal_button_close">×</span>
          <h2>Nuovo Account</h2>
        </header>
          <form class= "form_style" action="user_managment/login.php" method="POST" id="login_form">
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
            <input type="password" name="password">
          </form>
          <footer class="modal_container">
            <button type="submit" form="login_form" class = "form_style_submit">Login</button>
          </footer>
      </div>
    </div>

    <!-- CARICAMENTO -->
    <div class="background fullheight" id ="id-page-loader">
      <img class="loader" src="images/common/loading-1-dark.gif" >
    </div>
    
    <!-- CONTENITORE PRINCIPALE FLEX ROW | | | -->
    <div class="div_row background hidden fullheight" id="id-page-container">
      <!-- CONTENITORE MENU INLINE FLEX -->
      <div class="div_navbar" id="id-navbar">
        <img src = "images/common/logo.png" class = "logo" id="id-logo"> 

        <div class="menu_left" id="id-menu-left">
            <a href="index.php"  type="button">Home</a>
            <a href="contact.php"  type="button">Contatti</a>
        </div>

        <div class="menu_right" id='id-menu-right-1'>
          <butt id='id-butt-login'>Accedi</butt>
          <butt id='id-butt-register'>Registrati</butt>
        </div>

        <div class="menu_right hidden" id='id-menu-right-2'>
          <a href="user_managment/user/dashboard.php"  type="button">Dashboard</a>
          <a href="user_managment/account.php"  type="button">Account</a>
          <a href="user_managment/logout.php"  type="button">Logout</a>
        </div>

        <div class="menu_right hidden" id='id-menu-right-dropdown-container'>
          <img id="id-menu-right-dropdown" src = "images/common/dropdown-menu-icon-16.png">
        </div>
      </div>

      <!--CONTENITORE CENTRALE FLEX COLUMN -->
      <div id="id-main-content-container" class="div_center">
        <div class="div_internal_row">
          <div class="div_internal_column text_center">
            <div class="spacer30"></div>
            <h1 >Contatti</h1>
            <div class="spacer30"></div>

            <form class="contactf_container marginauto" action="send_email.php" method="POST">
              <div class="contactf_label">
                Nome e cognome
              </div>
              <input type="text" id="name" placeholder="Campo richiesto">

              <div class="contactf_label">
                Email
              </div>
              <input type="text" id="email" placeholder="Campo richiesto">

              <div class="contactf_label">
                Oggetto
              </div>
              <input type="text" id="subject" placeholder="Campo richiesto">

              <div class="contactf_label">
                Messaggio
              </div>
              <textarea id="msg" placeholder="Scrivi qui il tuo messaggio.." style="height:150px"></textarea>

              <input type="submit" value="Submit">
            </form>
          </div>
        </div>
      </div>
      <footer class="div_page_footer">
      Site made by Davide Cuni
      </footer>
    </div>
  </body>
</html>



 