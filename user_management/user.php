<?php
include_once 'dbmanager.php';

class User {	
    private $logged;
    private $cur_session_id = null;

    private $userID      = null;
    private $email      = null;
    private $passwd     = null;
    private $username   = null;
    private $name       = null;
    private $surname    = null;
    private $address    = null;
    private $birth      = null;
    private $privilege  = null;
    private $rememberToken  = null;
    private $verified   = null;

    //-------GET-------//

    public function getSessionId()
    { if (isset($this->cur_session_id)) { return $this->cur_session_id; } else return null; }

    public function getLoginStatus()
    { if (isset($this->logged)) { return $this->logged; } else return null; }
    
    public function getUserID()
    { if (isset($this->userID)) { return $this->userID; } else return null; }

    public function getEmail()
    { if (isset($this->email)) { return $this->email; } else return null; }

    public function getPassword()
    { if (isset($this->passwd)) { return $this->passwd; } else return null;  }

    public function getUsername()
    { if (isset($this->username)) { return $this->username; } else return null;  }

    public function getName()
    { if (isset($this->name)) { return $this->name; } else return null;  }

    public function getSurname()
    { if (isset($this->surname)) { return $this->surname; } else return null; }

    public function getAddress()
    { if (isset($this->address)) { return $this->address; } else return null; }

    public function getBirth()
    { if (isset($this->birth)) { return $this->birth; } else return null; }

    public function getPrivilege()
    { if (isset($this->privilege)) { return $this->privilege; } else return null; }

    public function getRememberToken()
    { if (isset($this->rememberToken)) { return $this->rememberToken; } else return null; }

    public function isVerified()
    { if (isset($this->verified)) { return $this->verified; } else return null; }

    //-------SET-------//

    public function setSessionID($val)
    { $this->cur_session_id = $val; }

    public function setUserID($val)
    { $this->userID = $val; }

    public function setEmail($val)
    { $this->email = $val; }

    public function setPassword($val)
    { $this->passwd = $val; }

    public function setUsername($val)
    { $this->username = $val; }

    public function setName($val)
    { $this->name = $val; }

    public function setSurname($val)
    { $this->surname = $val; }

    public function setAddress($val)
    { $this->address = $val; }

    public function setBirth($val)
    { $this->birth = $val; }

    public function setPrivilege($val)
    { $this->privilege = $val; }

    public function setRememberToken($val)
    { $this->rememberToken = $val; }

    public function setVerified($val)
    { $this->verified = $val; }

    private function setLoginStatus($val)
    { $this->logged = $val; }


    
    public function __construct()
    {
        $this->setLoginStatus(false);
        $this->cur_session_id = session_id();
    }

    /*
        SUCCESS = true
        ----ERROR CODES----
         0: Something went really wrong.
        -1: There is already a user registered with that username or email
        -2: The username entered is not valid
        -3: The email entered is not valid
        -4: The date entered is not valid
        -5: The password entered is not valid
        -10: User already logged in
    */
    public function register($tmp_username, $tmp_email, $tmp_birthdate, $tmp_passwd): int
    {
        //CHECK AND SANITIZE STRINGS
        //HAPPY REGEX!
        $result = false;

        if( 
            $tmp_username     === '' or $tmp_username  == null 
            or $tmp_email     === '' or $tmp_email     == null 
            or $tmp_passwd    === '' or $tmp_passwd    == null
            or $tmp_birthdate === '' or $tmp_birthdate == null)
        {
            return GENERAL_ERROR;
        }
        else
        {
            //SECURITY CHECK: ARE VALUES ARRAYS?

            if(is_array($tmp_username)      or
                is_array($tmp_email)        or
                is_array($tmp_birthdate)    or
                is_array($tmp_passwd))
            {
                return GENERAL_ERROR;
                exit();
            }

            $result = preg_match(REGEX_USER, $tmp_username);
            if(!$result)
                return INVALID_USERNAME;

            if(strlen($tmp_username) >= LENGHT_LIMIT_DEFAULT)
                return LENGHT_LIMIT;

            $result = preg_match(REGEX_EMAIL, $tmp_email);
            if(!$result)
                return INVALID_EMAIL;
            
            if(strlen($tmp_email) >= LENGHT_LIMIT_EMAIL)
                return LENGHT_LIMIT;

            $result = DbManager::validateDate($tmp_birthdate);
            if(!$result)
                return INVALID_DATE;

            if(strlen($tmp_birthdate) >= LENGHT_LIMIT_DEFAULT)
                return LENGHT_LIMIT;

            $result = preg_match(REGEX_PASS, $tmp_passwd);
            if(!$result)
                return INVALID_PASSWORD;

            if(strlen($tmp_passwd) >= LENGHT_LIMIT_PASS)
                return LENGHT_LIMIT;

            //EVERYTHING SEEMS FINE.. CALL THE DB!

            /*HASHING*/
            //
            $finalpass = password_hash( base64_encode( hash( 'sha256', $tmp_passwd, true ) ), PASSWORD_DEFAULT);

            $this->setUsername($tmp_username);
            $this->setEmail($tmp_email);
            $this->setBirth($tmp_birthdate);
            $this->setPassword($finalpass);
            $this->setVerified(0);
            $this->setPrivilege(0);

            $result = DbManager::query_register($this);
            if($result === SUCCESS)
            {
                $this->setLoginStatus(true);       
            }
            return $result;
        }
    }

    public function tryAutoLogin()
    {

    }

    /*
        SUCCESS: true
        ----ERROR CODES----
        0: Wrong username or password
    */
    
    public function login($tmp_username_email, $tmp_passwd): int
    {
        //CHECK AND SANITIZE STRINGS
        $result = false;

        if( 
            $tmp_username_email     === '' or $tmp_username_email  == null  
            or $tmp_passwd    === '' or $tmp_passwd    == null)
        {
            return GENERAL_ERROR;
        }
        else
        {
            //SECURITY CHECK: ARE VALUES ARRAYS?

            if(is_array($tmp_username_email) or is_array($tmp_passwd))
            {
                return GENERAL_ERROR; //comunicate to client that there was an error
                exit();
            }

            $result = preg_match(REGEX_EMAIL, $tmp_username_email);
            if(!$result)
            {
                $result = preg_match(REGEX_USER, $tmp_username_email);
                if(!$result)
                    return WRONG_EMAIL_OR_PASS;
                $kind = true;
            }

            if($kind)   //if username
            {
                if(strlen($tmp_username_email) >= LENGHT_LIMIT_DEFAULT)
                    return LENGHT_LIMIT;
                $this->setUsername($tmp_username_email);
            }
            else        //if email
            {
                if(strlen($tmp_username_email) >= LENGHT_LIMIT_EMAIL)
                    return LENGHT_LIMIT;
                $this->setEmail($tmp_username_email);
            }

            $result = preg_match(REGEX_PASS, $tmp_passwd);
            if(!$result)
                return WRONG_EMAIL_OR_PASS;

            if(strlen($tmp_passwd) >= LENGHT_LIMIT_PASS)
                return LENGHT_LIMIT;

            //EVERYTHING SEEMS FINE.. CALL THE DB!
            $this->setPassword($tmp_passwd);

            $result = DbManager::query_login($this);
            if($result === SUCCESS)
            {
                $this->setLoginStatus(true);       
            }
            return $result;
        }
    }
    
    public function logout()
    {
        $this->setLoginStatus(false);
    }

    public function forgotpass()
    {
        
    }

    public function verifyEmail()
    {
        
    }

    public function countActivities()
    {
        $count = DbManager::countUserActivities($this);
        return $count;
    }

    public function getTodayActivities()
    {
        $activities = DbManager::getUserTodayActivities($this);

        $xml = new SimpleXMLElement("<user_activities></user_activities>");

        if($activities != null or $activities != false)
        {
            foreach($activities as $row)
            {
                $xmlActivity = $xml->addChild('activity');
                
                $start  = DateTime::createFromFormat('Y/m/d H:i:s', $row['startTime']);
                $end    = DateTime::createFromFormat('Y/m/d H:i:s', $row['endTime']);
                $duration = $start->diff($end, true);
    
                $xmlActivity->addChild('duration',  $duration->format("PT%HH%iM0S"));
                $xmlActivity->addChild('distance',  $row['dist']);
            }
        }

        return $xml;
    }

    public function getActivities($complete, $offset, $limit)
    {
        if($complete === true)
            $activities = DbManager::getUserActivities($this, $offset, $limit);
        else
            $activities = DbManager::getUserOverviewActivities($this);

        $xml = new SimpleXMLElement("<user_activities></user_activities>");

        if($activities != null or $activities != false)
        {    
            foreach($activities as $row)
            {
                $xmlActivity = $xml->addChild('activity');
                $start  = DateTime::createFromFormat('Y/m/d H:i:s', $row['startTime']);
                $end    = DateTime::createFromFormat('Y/m/d H:i:s', $row['endTime']);
                $duration = $start->diff($end, true);
                if($complete === true)
                {
                    $xmlActivity->addChild('date',          $start->format("Y/m/d"));
                    $xmlActivity->addChild('origin',        $row['originName']);
                    $xmlActivity->addChild('destination',   $row['destName']);
                }
                $xmlActivity->addChild('duration',  $duration->format("%H Ore e %i Min"));
                $xmlActivity->addChild('distance',      $row['dist']);
            }
        }

        return $xml;
    }

}?>