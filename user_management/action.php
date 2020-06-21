<?php
    include_once 'dbmanager.php';
    include_once 'user.php';

    /* ------- CHECK SESSION ------- */
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
    $session_time = $_SERVER['REQUEST_TIME'];
    $timeout_duration = 600; //10 minute session timeout

    if (isset($_SESSION['LAST_ACTIVITY']) && 
    ($session_time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) 
    {
        if($user != null)
        {
            $user->logout();
            $user = null;
            session_unset();
            session_destroy();
            session_start();
        }
    }

    /*------- ReDDOS PROTECTION -------*/
    $time_wait = 0; //Esponenziale

    if(isset($_SESSION['attempts']))
    {
        $attempts = $_SESSION['attempts'];
        if($attempts > 5)
            $time_wait = $attempts * $attempts;
    }

    if (isset($_SESSION['LAST_ACTIVITY']) && 
    ($session_time - $_SESSION['LAST_ACTIVITY']) < $time_wait)
    {
        echo TOO_MANY_REQUESTS;
        exit();
    }

    //TIME RESETS ON EVERY ACTION
    $_SESSION['LAST_ACTIVITY'] = $session_time;

    /* ------- IS THE USER LOGGED IN ------- */
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
        echo NOT_LOGGED_IN;
        exit();
    }

    /* ------- IS THE USER ADMIN ------- */
    if(isset($_POST['check_user_privilege']))
    {
        if($user != null)
        {
            if($user->getLoginStatus() === true)
            {
                if($user->getPrivilege() === 1)
                    echo SUCCESS;
                exit();
            }
        }
        echo false;
        exit();
    }

    /* ------- RETURNS MAP ------- */
    if(isset($_POST['get_map_data']))
    {
        Header('Content-type: text/xml');
        $xml = DbManager::query_stations();
        echo $xml->asXML();
        exit();
    }

    /* ------- REGISTRATION FORM ------- */
    if(isset($_POST['submit_registration']))
    {
        if(isset($_SESSION['attempts']))
            $_SESSION['attempts'] = $_SESSION['attempts'] + 1;
        else
            $_SESSION['attempts'] = 1;

        $result     = false;
        $user       = null;
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
                    $user = null;
                }

                echo $result;
            }
        }
    }

    /* ------- LOGIN FORM ------- */
    if(isset($_POST['submit_login']))
    {
        if(isset($_SESSION['attempts']))
            $_SESSION['attempts'] = $_SESSION['attempts'] + 1;
        else
            $_SESSION['attempts'] = 1;

        $result     = false;
        $user       = null;
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
                //allocate new user
                $user = new User();

                $result = $user->login($emailusername, $password);

                if($result == SUCCESS) // LOGIN SUCCESSFUL
                {
                    session_regenerate_id(true);
                    $user->setSessionID(session_id());
                    $_SESSION['user_cache'] = serialize($user);
                    $_SESSION['attempts'] = 0;
                }
                else // ERROR
                {
                    $user = null;
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
                $user = null;
                unset($_SESSION['user_cache']);
                exit();
            }
        }
    }

    /* ------- DASHBOARD SECTION ------- */

    /* ------- EDIT ACCOUNT ------- */
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
                        include_once "dashboard/overview.php";
                        exit();
                    }

                    if(isset($_POST['account-details']))
                    {
                        include_once "dashboard/edit-account.php";
                        exit();
                    }
    
                    if(isset($_POST['billing-details']))
                    {
                        exit();
                    }
    
                    if(isset($_POST['activity-details']))
                    {
                        include_once "dashboard/activity.php";
                        exit();
                    }

                    if(isset($_POST['admin-management'])
                        AND $user->getPrivilege() === 1)
                    {
                        include_once "dashboard/management.php";
                        exit();
                    }
    
                    if(isset($_POST['manage-stations'])
                        AND $user->getPrivilege() === 1)
                    {
                        include_once "dashboard/manage-stations.php";
                        exit();
                    }
    
                    if(isset($_POST['manage-bikes'])
                        AND $user->getPrivilege() === 1)
                    {
                        include_once "dashboard/manage-bikes.php";
                        exit();
                    }

                    if(isset($_POST['manage-users'])
                        AND $user->getPrivilege() === 1)
                    {
                        include_once "dashboard/manage-users.php";
                        exit();
                    } 

                    if(isset($_POST['query-activity']))
                    {
                        $page           = 0;
                        $offset         = 0;
                        $items_per_page = 15;

                        if(is_numeric($_POST['query-activity']))
                        {
                            $page = $_POST['query-activity'];
                            if($page > 1)
                                $offset = ($page - 1) * $items_per_page;    
                            $count  = $user->countActivities();
                            if($offset < $count)
                            {
                                Header('Content-type: text/xml');
                                echo $user->getActivities(true, $offset, $items_per_page)->asXML();
                            }
                        }
                        exit();
                    }
                    
                    if(isset($_POST['query-stations'])
                    AND $user->getPrivilege() === 1)
                    {
                        $page           = 0;
                        $offset         = 0;
                        $items_per_page = 15;

                        if(is_numeric($_POST['query-stations']))
                        {
                            $page = $_POST['query-stations'];
                            if($page > 1)
                                $offset = ($page - 1) * $items_per_page;

                            $count = DbManager::query_count_stations();
                            
                            if($offset < $count)
                            {
                                Header('Content-type: text/xml');
                                echo DbManager::query_stations($offset, $items_per_page)->asXML();
                            }
                        }                        
                        exit();
                    }

                    if(isset($_POST['query-bikes'])
                        AND $user->getPrivilege() === 1)
                    {
                        
                        exit();
                    }

                    if(isset($_POST['query-users'])
                        AND $user->getPrivilege() === 1)
                    {
                        
                        exit();
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