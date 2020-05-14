<?php
    include_once 'user.php';
    
    /* ------- USERS CACHE ------- */
    static $users = array();

    if (session_status() != PHP_SESSION_ACTIVE )
    {
        session_start();
    }

    if(isset($_POST['check_user']))
    {
        //check for auth cookie
        //ask db
        //give response
    }

    if(isset($_POST['get_map_data']))
    {
        //ask db
    }

    if(isset($_POST['get_map_data_adv']))
    {
        //check user in cache, logged in?
        //ask db
    }

    if(isset($_POST['submit_logout']))
    {
        //get session id
        //find user with correct session id
        //delete user from cache
        //destroy session

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
            if (isset($users[session_id()]))
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

            if($result == true) // LOGIN SUCCESSFUL
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
