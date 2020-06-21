<?php
if(isset($_POST['dashboard']))
{
    if($user != null)
    {
        if($user->getLoginStatus() === true)
        {
            if($user->isVerified() === 1)
            {
                if(isset($_POST['manage-stations'])
                AND $user->getPrivilege() === 1)
                {
                    $items_per_page = 15;
                    $count          = DbManager::query_count_stations();
                    $pages          = ceil($count / $items_per_page);
                  
                    echo <<<EOT
                    <div class = "dash_free_label text_center">
                    Inserisci una nuova stazione
                    </div>
                    <div id = "addStation">
                        <input type="text" id="name" placeholder="Nome">
                        <input type="text" id="addr" placeholder="Indirizzo">
                        <input type="text" id="slots" placeholder="Numero slot">
                        <input type="text" id="lat" placeholder="Latitudine">
                        <input type="text" id="lon" placeholder="Longitudine">
                        <butt class = "smallButt" id = "send">Invia</butt>
                    </div>
                    <div class="separator"></div>
                    <div class = "internal_container">
                        <div class = "dash_table">
                            <div class="dash_table_header_row">
                                <div class= "dash_table_column_header">
                                    ID
                                </div>
                                <div class= "dash_table_column_header">
                                    Nome
                                </div>
                                <div class= "dash_table_column_header">
                                    Indirizzo
                                </div>
                                <div class= "dash_table_column_header">
                                    Slot
                                </div>
                                <div class= "dash_table_column_header">
                                    Disponibili
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