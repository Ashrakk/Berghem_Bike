<?php
  include_once 'common.php';
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
  
    <link rel="stylesheet" type="text/css" href="./css/leaflet.css">
    <link rel="stylesheet" type="text/css" href="./css/style.css">

    <script src = "./ts/build/src/app.min.js" type="module"></script>  
    <!--
    <script src = "./ts/build/src/uimanager.js" type="module"></script> 
    <script src = "./ts/build/src/modal.js" type="module"></script> 
    -->
    <script>
      var uimanager;
    </script>

    <script type="module">
      // IMPORTO LE CLASSI NECESSARIE
      import { MapsManager, UIManager, Modal } from './ts/build/src/app.min.js';
      //import { UIManager } from './ts/build/src/uimanager.js';
      //import { Modal } from './ts/build/src/modal.js';

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
          <a href="user_managment/user/dashboard.php"  type="button">Dashboard</a>
          <a href="user_managment/account.php"  type="button">Account</a>
          <a id="butt_submit_logout" type="button">Logout</a>
        </div>

        <div class="menu_right hidden" id='id-menu-right-dropdown-container'>
          <img id="id-menu-right-dropdown" class="" src = "images/common/dropdown-menu-icon-16.png">
        </div>
      </div>

      <div id="messageBox" class="hidden"></div>

      <!--CONTENITORE CENTRALE FLEX COLUMN -->
      <div id="id-main-content-container" class="div_center">

          <!-- IMMAGINE HOME -->
          <div class="bikelogohomebig"></div> 

          <!-- TITOLO HEADER -->
          <div class="div_internal_row">
            <div class="div_internal_column text_center">
              <h1>
                STANCO DI CAMMINARE? INIZIA A PEDALARE!
              </h1>
              <h3>
                  Offriamo un servizio di Bike Sharing a basso costo disponibile 24/7.
              </h3>
              <div class="spacer4em"></div>
              <h2>
                I VANTAGGI DEL BIKE SHARING
              </h2>
            </div>
          </div>
          <!-- I VANTAGGI DEL BIKE SHARING 3 COLONNE -->
          <div class="div_internal_row">
            <div class="div_internal_column column_width_1e4">
              <img src = "images/common/health.png" class = "icon">
              <h3 class="text_center">
              SOSTENIBILE E SALUTARE
              </h3>
              <p class="margin0">
              Ridurre la tua impronta sull’ambiente può sembrare insignificante, ma è vitale per un futuro più prospero!
              </p>
            </div>
            <div class="div_internal_column  column_width_1e4">
              <img src = "images/common/bicycle.png" class = "icon">
              <h3 class="text_center">
              UNA SOLUZIONE EFFICENTE
              </h3>
              <p class="margin0">
              Pensato per viaggi di prossimità dove i mezzi pubblici non possono arrivare.
              </p>
            </div>
            <div class="div_internal_column column_width_1e4">
            <img src = "images/common/helmet.svg" class = "icon">
              <h3 class="text_center">
              MENO INCIDENTI
              </h3>
              <p class="margin0">
              La statistica afferma che con un maggiore traffico di biciclette si riduce la probabilità di incidenti!
              </p>
            </div>
          </div>
          <!-- COME FUNZIONA -->
          <div class="spacer4em"></div>
          <div class="div_internal_row">
            <div class="div_internal_column flexColumn text_center"> 
              <h2>
                COME FUNZIONA?
              </h2>
              <ul class="text_left textbig_1 margin0">
                <li>
                  Registrati sul sito
                </li>
                <li>
                  Aggiungi un metodo di pagamento
                </li>
                <li>
                  Scegli un abbonamento 
                </li>
              </ul>

            </div>
          </div>
          <div class="spacer4em"></div>
          <div class="div_internal_row">
            <div class="div_internal_column flexColumn text_center"> 
              <h2>
                TARIFFE E ABBONAMENTI
              </h2>
            </div>
          </div>
          <!-- TARIFFE 3 COLUMNS -->
          <div class="div_internal_row">
            <div class="div_internal_column column_width_1e4">
              <div class="tariffa">
                <h3 class="heading">
                ORARIA
                </h3>
                <p class="price textbold margin0">
                  €0.25/ora
                </p>
                <p class="comment">
                  Per ore extra giornaliere o non abbonati
                </p>
              </div>
            </div>
            <div class="div_internal_column  column_width_1e4">
             <div class="tariffa">
                <h3 class="heading">
                MENSILE
                </h3>
                <p class="price textbold margin0">
                  €4.99/mese
                </p>
                <p class="comment">
                  90 minuti di utilizzo al giorno
                </p>
              </div>
            </div>
            <div class="div_internal_column column_width_1e4">
              <div class="tariffa">
                <h3 class="heading">
                ANNUALE
                </h3>
                <p class="price textbold margin0">
                  €24.99/anno
                </p>
                <p class="comment">
                  120 minuti di utilizzo al giorno
                </p>
              </div>
            </div>
          </div>
          <!-- LE NOSTRE STAZIONI -->
          <div class="spacer4em"></div>
          <div class="div_internal_row">
            <div class="div_internal_column text_center"> 
              <h2>
                LE NOSTRE STAZIONI
              </h2>
            </div>
          </div>
          <div class="spacer1em"></div>
          <!-- MAPPA -->
          <div class="div_internal_row">
            <div id="map"></div>
          </div>
      </div>
      <footer class="div_page_footer">
      Site made by Davide Cuni
      </footer>
    </div>

  </body>
</html>
