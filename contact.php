<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Marco Lazzarini</title>

    <link rel="stylesheet" type="text/css" href="style.css">

  </head>
  <body>
    <div class="tape_div">

      <div class="animated_tape_up"></div>

      <div class="center_div">
        <div class="topmenu_div">
          <img src="images/common/logo.png" id="logo_img">
          <div class="navbar">
              <a href="index.php"  type="button">Home</a>
              <a href="gallery.php"  type="button">Gallery</a>
              <a href="about.php"  type="button">About</a>
              <a href="contact.php"  type="button">Contact</a>
              <a href="coming_soon.php" type="button">Blog</a>
          </div>
        </div>

        <div class="content_div">
          <div class="contactf_container">
            <form action="send_email.php">
              <div class="contactf_label">
                First Name
              </div>
              <input type="text" id="name" placeholder="Your name..">

              <div class="contactf_label">
                Email
              </div>
              <input type="text" id="email" placeholder="Your email..">

              <div class="contactf_label">
                Subject
              </div>
              <input type="text" id="subject" placeholder="Subject..">

              <div class="contactf_label">
                Message
              </div>
              <textarea id="msg" placeholder="Write your message here.." style="height:150px"></textarea>

              <input type="submit" value="Submit">
            </form>
          </div>
        </div>
      </div>

      <div class="animated_tape_down"></div>

    </div>

    <footer>
      Site made by Davide Cuni
    </footer>

  </body>
</html>

<?php

  //SLIDESHOW



?>
