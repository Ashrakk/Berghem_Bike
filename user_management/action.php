<?php
    include_once 'user.php';
    /* ------- USERS CACHE ------- */
    $users = Costants::getUserCache();

    if (session_status() != PHP_SESSION_ACTIVE )
    {
        session_start();
    }

    //check for auth cookie in DB
    if(isset($_POST['check_user']))
    {

    }

    if(isset($_POST['get_map_data']))
    {
        Header('Content-type: text/xml');
        $xml = DbManager::query_map();
        echo $xml->asXML();
    }

    //get session id
    //find user with correct session id
    //delete user from cache
    //destroy session
    if(isset($_POST['submit_logout']))
    {
        $ses_id = session_id();
        if(!empty($users))
        {
            if (isset($users[$ses_id]))
            {
                if(isset($_SESSION['loginStatus']))
                {
                    $users[$ses_id]->logout();
                    unset($users[$ses_id]);
                    session_destroy();
                }        
            }
        }
    }

    /* ------- REGISTRATION FORM ------- */
    if(isset($_POST['submit_registration']))
    {
        $result     = false;
        $ses_id     = session_id();
        $username   = $_POST['username'];
        $email      = $_POST['email'];
        $birthdate  = $_POST['birth'];
        $password   = $_POST['password'];

        //check if users already exist in cache and that has a loggedStatus cookie..
        if(!empty($users))
        {
            if (isset($users[$ses_id]))
            {
                if(isset($_SESSION['loginStatus']))
                {
                    //user is already logged in. tell him.
                    echo 'User already logged in';
                    exit();
                }        
            }
        }
        if( !empty($username)   and 
            !empty($email)      and
            !empty($birthdate)  and
            !empty($password))
        {
            //allocate new user with current session id as key 
            $users[$ses_id] = new User();

            $result = $users[$ses_id]->register($username, $email, $birthdate, $password);

            if($result === true) // LOGIN SUCCESSFUL
            {
                session_regenerate_id(true);
                $users[session_id()] = $users[$ses_id];
                $users[session_id()]->setSessionID(session_id());
                unset($users[$ses_id]);
            }
            else // ERROR CODE
            {
                unset($users[$ses_id]);
            }

            echo $result;
        }
    }

    /* ------- LOGIN FORM ------- */
    if(isset($_POST['submit_login']))
    {
        $result = false;
        $ses_id = session_id();
        $emailusername = $_POST['emailusername'];
        $password = $_POST['password'];

        //check if users already exist in cache and that has a loggedStatus cookie..
        if(!empty($users))
        {
            if (isset($users[$ses_id]))
            {
                if(isset($_SESSION['loginStatus']))
                {
                    //user is already logged in. tell him.
                    echo 'User already logged in';
                    exit();
                }        
            }
        }
        if( !empty($emailusername) and 
            !empty($password))
        {
            //allocate new user with current session id as key 
            $users[$ses_id] = new User();

            $result = $users[$ses_id]->login($emailusername, $password);

            if($result === true) // LOGIN SUCCESSFUL
            {
                session_regenerate_id(true);
                $users[session_id()] = $users[$ses_id];
                $users[session_id()]->setSessionID(session_id());
                unset($users[$ses_id]);
            }
            else // ERROR CODE
            {
                unset($users[$ses_id]);
            }

            echo $result;
        }
    }
?>