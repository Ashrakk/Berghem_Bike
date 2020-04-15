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
            <button type="submit" form="login_form" class = "submit_button">Login</button>
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
            <button type="submit" form="login_form" class = "submit_button">Login</button>
          </footer>
      </div>
    </div>

    <!-- CARICAMENTO -->
    <div class="background fullheight" id ="id-page-loader">
      <img class="loader" src="images/common/loading-1-dark.gif" >
    </div>
    
    <!-- CONTENITORE PRINCIPALE FLEX ROW | | | -->
    <div class="div_row background hidden" id="id-page-container">
      <!-- CONTENITORE MENU INLINE FLEX -->
      <div class="div_navbar" id="id-navbar">
        <img src = "images/common/logo.png" class = "logo" id="id-logo"> 

        <div class="menu_left" id="id-menu-left">
            <a href="index.php"  type="button">Home</a>
            <a href="prices.php"  type="button">Prezzi</a>
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

          <!-- IMMAGINE HOME -->
          <div class="bikelogohomebig"></div> 

          <!-- TITOLO HEADER -->
          <div class="div_internal_row">
            <div class="div_internal_column text_center">
              <h1>
                Stanco di camminare? Inizia a pedalare!
              </h1>
              <h3>
                  Offriamo un servizio di Bike Sharing a basso costo, disponibile 24/7.
              </h3>
              <div class="spacer30"></div>
              <h2>
                Quali sono i vantaggi del Bike Sharing?
              </h2>
            </div>
          </div>
          <div class="spacer30"></div>
          <!-- I VANTAGGI DEL BIKE SHARING 3 COLONNE -->
          <div class="div_internal_row">
            <div class="div_internal_column column_width_1e5">
              <img src = "images/common/health.png" class = "icon">
              <h3 class="text_center">
              Sostenibile e salutare
              </h3>
              <p class="text_left margin0">
              Ridurre la tua impronta sull’ambiente può sembrare insignificante, ma è vitale per un futuro più prospero!
              </p>
            </div>
            <div class="div_internal_column  column_width_1e5">
              <img src = "images/common/bicycle.png" class = "icon">
              <h3 class="text_center">
              Una soluzione efficente
              </h3>
              <p class="text_left margin0">
              Pensato per viaggi di prossimità dove i mezzi pubblici non possono arrivare.
              </p>
            </div>
            <div class="div_internal_column column_width_1e5">
            <img src = "images/common/helmet.svg" class = "icon">
              <h3 class="text_center">
              Meno incidenti
              </h3>
              <p class="text_left margin0">
              La statistica afferma che con un maggiore traffico di biciclette si riduce la probabilità di incidenti!
              </p>
            </div>
          </div>
          <div class="div_internal_row">
            <div class="div_internal_column text_center"> 
              <h2>
                Come funziona?
              </h2>
              <p class="boldtext width50 margin0">
                Semplice, ritira una bici da una nostra stazione <br>
                riconsegnala entro 2 ore in qualsiasi altra stazione.
              </p>
              <div class="padding30">
                <butt id="id-specialbutton" class="specialButton">
                  Registrati ora!
                </butt>       
              </div>
            </div>
          </div>
          <div class="div_internal_row">
            <div class="div_internal_column text_center"> 
              <h2>
                Scopri le nostre stazioni
              </h2>
            </div>
          </div>
      </div>
      <footer class="div_page_footer">
      Site made by Davide Cuni
      </footer>
    </div>

  </body>
</html>
