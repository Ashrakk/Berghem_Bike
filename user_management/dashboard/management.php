<?php
if(isset($_POST['dashboard']))
{
    if($user != null)
    {
        if($user->getLoginStatus() === true)
        {
            if($user->isVerified() === 1)
            {
                if(isset($_POST['admin-management'])
                AND $user->getPrivilege() === 1)
                { 
                    echo <<<EOT
                    <div class="dash_header">
                        <h1>Gestione</h1>
                    </div>
                    <div class="separator"></div>
                    <div class="dash_menu"> 
                        <div class="menu_center">
                            <butt id="id-butt-manage-stations">Stazioni</butt>
                            <butt id="id-butt-manage-bikes">Biciclette</butt>
                            <butt id="id-butt-manage-users">Utenti</butt>
                        </div>
                    </div>
                    <div id = "management-container">
                    </div>
                    EOT;

                }
                else
                    echo NOT_ADMIN;
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