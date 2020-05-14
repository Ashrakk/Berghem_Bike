<?php
include_once 'dbmanager.php';

class User {	
    private $logged;
    private $cur_session_id;

    private $email;
    private $passwd;
    private $username;
    private $name;
    private $surname;
    private $address;
    private $birth;
    private $privilege;
    private $rememberToken;
    private $verified;

    //-------GET-------//

    public function getSessionId()
    { if (isset($cur_session_id)) { return $this->cur_session_id; } else return null; }

    public function getLoginStatus()
    { if (isset($logged)) { return $this->logged; } else return null; }

    public function getEmail()
    { if (isset($email)) { return $this->email; } else return null; }

    public function getPassword()
    { if (isset($passwd)) { return $this->passwd; } else return null;  }

    public function getUsername()
    { if (isset($username)) { return $this->username; } else return null;  }

    public function getName()
    { if (isset($name)) { return $this->name; } else return null;  }

    public function getSurname()
    { if (isset($surname)) { return $this->surname; } else return null; }

    public function getAddress()
    { if (isset($address)) { return $this->address; } else return null; }

    public function getBirth()
    { if (isset($birth)) { return $this->birth; } else return null; }

    public function getPrivilege()
    { if (isset($privilege)) { return $this->privilege; } else return null; }

    public function getRememberToken()
    { if (isset($rememberToken)) { return $this->rememberToken; } else return null; }

    public function isVerified()
    { if (isset($verified)) { return $this->verified; } else return null; }

    //-------SET-------//

    public function setSessionID($val)
    { $this->cur_session_id = $val; }

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

    
    public function __construct()
    {
        $this->logged = false;
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
    */
    public function register($tmp_username, $tmp_email, $tmp_birthdate, $tmp_passwd)
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
            return 0;
        }
        else
        {
            $result = preg_match(REGEX_USER, $tmp_username);
            if($result === false)
                return -3;

            $result = preg_match(REGEX_EMAIL, $tmp_email);
            if($result === false)
                return -4;

            $result = DbManager::validateDate($tmp_birthdate);
            if(!$result)
                return -5;

            $result = preg_match(REGEX_PASS, $tmp_passwd);
            if($result === false)
                return -6;

            //EVERYTHING SEEMS FINE.. CALL THE DB!

            $arr = array($tmp_username, $tmp_email, $tmp_birthdate, $tmp_passwd);
            $result = DbManager::query_register($arr);
            if($result !== true)
            {
                if($result === -1)
                    return -1;
                else
                    return 0;
            }
            else
            {
                return true;
            }
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
    public function login($usernameemail, $password): bool
    {
        $this->logged = true;
        $_SESSION['loggedStatus'] = true;

        return true;
    }
    
    public function logout(): bool
    {
        $this->logged = false;
        $_SESSION['loggedStatus'] = false;

        return true;
    }

    public function forgotpass()
    {
        
    }

    public function verifyEmail()
    {
        
    }
}?>