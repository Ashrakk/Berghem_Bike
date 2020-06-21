<?php
if(isset($_POST['dashboard']))
{
    if($user != null)
    {
        if($user->getLoginStatus() === true)
        {
            if($user->isVerified() === 1)
            {
                if(isset($_POST['overview']))
                {
                    $xmlToday   = $user->getTodayActivities();
                    $xmlForever = $user->getActivities(false, 0, PHP_INT_MAX);
                  
                    $today_time     = 0;
                    $today_distance = 0;
                    $today_trips    = 0;

                    $avoided_emission       = 0;
                    $total_trips            = 0;
                    $total_distance         = 0;

                    //TODAY
                    if($xmlToday->activity != false or $xmlToday->activity != null)
                    {
                        $temp = new DateTime();
                        $temp->setTime(0, 0);
                        foreach($xmlToday->activity as $act)
                        {
                            $temp->add(new DateInterval($act->duration));
                            $today_distance = $today_distance + $act->distance;
                            $today_trips    = $today_trips + 1;
                        }
                        $hours          =   $temp->format("H");
                        $minutes        =   $temp->format("i");
                        $today_time     =   "$hours Ore e $minutes Minuti";
                        $today_distance =   "$today_distance km";
                    }

                    //FOREVER
                    if($xmlForever->activity != false or $xmlForever->activity != null)
                    {
                        foreach($xmlForever->activity as $act)
                        {
                            //average 0.120 kg CO2 
                            $avoided_emission   = $avoided_emission + 0.120;
                            $total_distance     = $total_distance + $act->distance;
                            $total_trips        = $total_trips + 1;
                        }
                        $avoided_emission   = "$avoided_emission kg di CO2";
                        $total_distance     = "$total_distance km";
                    }    

                    echo <<<EOT
                    <div class="dash_header">
                    <h1>Riepilogo</h1>
                    </div>
                    <div class="separator"></div>
                    <div class = "internal_container">
                        <div class = "dash_row">
                            <h2 class="dash_color dash_label">
                                Oggi
                            </h2>
                        </div>
                        <div class = "dash_row">
                            <div class = "dash_column">
                                <span class="dash_label">Tempo trascorso pedalando: </span>
                                $today_time
                            </div>
                        </div>
                        <div class = "dash_row">
                            <div class = "dash_column">
                                <span class="dash_label">Distanza percorsa: </span>
                                $today_distance
                            </div>
                        </div>
                        <div class = "dash_row">
                            <div class = "dash_column">
                                <span class="dash_label">Numero viaggi: </span>
                                $today_trips
                            </div>
                        </div>
                        <div class = "dash_row">
                            <h2 class="dash_color dash_label">
                                Sempre
                            </h2>
                        </div>
                        <div class = "dash_row">
                            <div class = "dash_column">
                                <span class="tooltip dash_label">Emissioni Evitate: 
                                    <span class="tooltiptext">Questo valore indica la quantità di emissioni
                                    che avresti sprigionato percorrendo in macchina la stessa distanza
                                    </span>
                                </span>
                                $avoided_emission
                            </div>
                        </div>
                        <div class = "dash_row">
                            <div class = "dash_column">
                                <span class="dash_label">Totale viaggi: </span>
                                $total_trips
                            </div>
                        </div>
                        <div class = "dash_row">
                            <div class = "dash_column">
                                <span class="dash_label">Distanza percorsa totale: </span>
                                $total_distance
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