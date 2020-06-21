<?php 
if(isset($_POST['dashboard']))
{
    if($user != null)
    {
        if($user->getLoginStatus() === true)
        {
            if($user->isVerified() === 1)
            {
                if(isset($_POST['account-details']))
                {
                    $username   = $user->getUsername();  
                    $email      = $user->getEmail();  
                    $name       = $user->getName();  
                    $surname    = $user->getSurname();  
                    $address    = $user->getAddress();  
                    $birthdate  = $user->getBirth();

                    if($name == null)
                        $name = "Non impostato";
                    if($surname == null)
                        $surname = "Non impostato";
                    if($address == null)
                        $address = "Non impostato";

                    echo <<<EOT
                        <div class="dash_header">
                            <h2>Modifica account</h2>
                        </div>
                        <div class="separator"></div>
                        <div class = "internal_container">
                            <div class = "dash_row">
                                <div class = "dash_column">
                                    <span class="dash_label">Username: </span>$username
                                </div>
                                <div class = "dash_column">
                                <butt class = "smallButt" id="id-butt-edit-username">Modifica</butt>   
                                </div>
                            </div>
                            <div class = "dash_row">
                                <div class = "dash_column">
                                    <span class="dash_label">Email: </span>$email
                                </div>
                            </div>                            
                            <div class = "dash_row">
                                <div class = "dash_column">
                                    <span class="dash_label">Password: </span>*****
                                </div>
                                <div class = "dash_column">
                                    <butt class = "smallButt" id="id-butt-edit-password">Modifica</butt>   
                                </div>
                            </div>
                            <div class = "dash_row">
                                <div class = "dash_column">
                                    <span class="dash_label">Nome: </span>$name
                                </div>
                                <div class = "dash_column">
                                    <butt class = "smallButt" id="id-butt-edit-name">Modifica</butt>   
                                </div>
                            </div>                            
                            <div class = "dash_row">
                                <div class = "dash_column">
                                    <span class="dash_label">Cognome: </span>$surname
                                </div>
                                <div class = "dash_column">
                                    <butt class = "smallButt" id="id-butt-edit-surname">Modifica</butt>   
                                </div>
                            </div>                            
                            <div class = "dash_row">
                                <div class = "dash_column">
                                    <span class="dash_label">Data di nascita: </span>$birthdate
                                </div>
                                <div class = "dash_column">
                                    <butt class = "smallButt" id="id-butt-edit-birthdate">Modifica</butt>   
                                </div>
                            </div>     
                            <div class = "dash_row">
                                <div class = "dash_column">
                                    <span class="dash_label">Indirizzo: </span>$address
                                </div>
                                <div class = "dash_column">
                                    <butt class = "smallButt" id="id-butt-edit-address">Modifica</butt>   
                                </div>
                            </div>     
                        </div>
                        EOT;
                    }
                }
            else
                echo USER_NOT_VERIFIED;
        }
        else
            echo NOT_LOGGED_IN;
    }
    else
        echo SESSION_EXPIRED;
}
?>