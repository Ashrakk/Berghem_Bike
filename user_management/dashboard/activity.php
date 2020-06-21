<?php
if(isset($_POST['dashboard']))
{
    if($user != null)
    {
        if($user->getLoginStatus() === true)
        {
            if($user->isVerified() === 1)
            {
                if(isset($_POST['activity-details']))
                {
                    $items_per_page = 15;
                    $count          = $user->countActivities();
                    $pages          = ceil($count / $items_per_page);
                  
                    echo <<<EOT
                    <div class="dash_header">
                    <h1>Attività</h1>
                    </div>
                    <div class="separator"></div>
                    <div class = "internal_container">
                        <div class = "dash_table">
                            <div class="dash_table_header_row">
                                <div class= "dash_table_column_header">
                                    Data
                                </div>
                                <div class= "dash_table_column_header">
                                    Stazione di partenza
                                </div>
                                <div class= "dash_table_column_header">
                                    Stazione d'arrivo
                                </div>
                                <div class= "dash_table_column_header">
                                    Durata del viaggio
                                </div>
                                <div class= "dash_table_column_header">
                                    Distanza stimata
                                </div>
                            </div>
                            <div class = "dash_table_body" id = 'table_body'>
                            </div>
                        </div>
                    </div>
                    <div class="separator"></div>
                    <span class="page_label bigLabel">
                        Pagina: 
                        <span id = 'page-current'>1</span>
                        <span>di</span>
                        <span id = 'page-count'>$pages</span>
                    </span>
                    <butt class="bigButt" id='id-butt-pageBack'><</butt>
                    <butt class="bigButt" id='id-butt-pageForward'>></butt>
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