<?php
    include_once 'dbmanager.php';
    include_once 'user.php';

    if(session_status() == PHP_SESSION_NONE)
    {
        session_start();
    }

    /* ------- USERS CACHE ------- */
    $user = null;
    if(isset($_SESSION['user_cache']))
    {
        $user = unserialize($_SESSION['user_cache']);
    }

    /*------- SESSION TIMEOUT CHECK -------*/
    $time = $_SERVER['REQUEST_TIME'];
    $timeout_duration = 600; //10 minute session timeout

    if (isset($_SESSION['LAST_ACTIVITY']) && 
    ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
        session_unset();
        session_destroy();
        session_start();
    }
    //TIME RESETS ON EVERY ACTION
    $_SESSION['LAST_ACTIVITY'] = $time;

    //is the user still logged in?
    if(isset($_POST['check_user']))
    {
        if($user != null)
        {
            if($user->getLoginStatus() === true)
            {
                echo ALREADY_LOGGED_IN;
                exit();
            }
        }
        return false;
    }

    /*RETURNS map_data XML*/
    if(isset($_POST['get_map_data']))
    {
        Header('Content-type: text/xml');
        $xml = DbManager::query_map();
        echo $xml->asXML();
    }

    /* ------- REGISTRATION FORM ------- */
    if(isset($_POST['submit_registration']))
    {
        $result     = false;
        $user       = null;
        $ses_id     = session_id();
        $username   = $_POST['username'];
        $email      = $_POST['email'];
        $birthdate  = $_POST['birth'];
        $password   = $_POST['password'];

        //check if users already exist in cache

        if($user != null)
        {
            if($user->getLoginStatus() === true)
            {
                echo ALREADY_LOGGED_IN;
                exit();
            }
        }      
        else
        {
            if( !empty($username)   and 
                !empty($email)      and
                !empty($birthdate)  and
                !empty($password))
            {
                //allocate new user with current session id as key 
                $user = new User();

                $result = $user->register($username, $email, $birthdate, $password);

                if($result === SUCCESS) // LOGIN SUCCESSFUL
                {
                    session_regenerate_id(true);
                    $user->setSessionID(session_id());
                    $_SESSION['user_cache'] = serialize($user);
                }
                else // ERROR CODE
                {
                    unset($user);
                }

                echo $result;
            }
        }
    }

    /* ------- LOGIN FORM ------- */
    if(isset($_POST['submit_login']))
    {
        $result     = false;
        $user       = null;
        $ses_id     = session_id();
        $emailusername  = $_POST['emailusername'];
        $password       = $_POST['password'];

        //check if users already exist in cache
        if($user != null)
        {
            if($user->getLoginStatus() === true)
            {
                echo ALREADY_LOGGED_IN;
                exit();
            }
        }
        else
        {
            if( !empty($emailusername) and 
            !empty($password))
            {
                //allocate new user with current session id as key 
                $user = new User();

                $result = $user->login($emailusername, $password);

                if($result == SUCCESS) // LOGIN SUCCESSFUL
                {
                    session_regenerate_id(true);
                    $user->setSessionID(session_id());
                    $_SESSION['user_cache'] = serialize($user);
                }
                else // ERROR
                {
                    unset($user);
                }

                echo $result;
            }
        }       
    }

    /* ------- LOGOUT ------- */
    if(isset($_POST['submit_logout']))
    {
        if($user != null)
        {
            if($user->getLoginStatus() === true)
            {
                $user->logout();
                unset($user);
                session_unset();
                session_destroy();
                exit();
            }
        }
    }
?>