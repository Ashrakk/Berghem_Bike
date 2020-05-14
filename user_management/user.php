<?php

include_once 'dbmanager.php';

class User {	

    private static $dbm;
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
        //create instance of dbManager
        if(is_null($this::$dbm))
            $dbm = new DbManager();

        $val = $dbm->init();

        //if connected properly
        if($val === true)
        {
            //do operations such as
            //check for remember me token 
        }
        else
        {
            error_log('PDO DB CONNECTION ERROR!!!');
        }


        $this->logged = false;
        $this->cur_session_id = session_id();
        
    }

    public function register($tmp_username, $tmp_email, $tmp_passwd, $tmp_birthdate)
    {

    }

    public function tryAutoLogin()
    {

    }

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
}
?>