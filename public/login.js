var Login = {
  menu: document.getElementById('loginMenu'),
  loginButton: document.getElementById('login'),
  logoutButton: document.getElementById('logout'),
  submitButton: document.getElementById('submitLogin'),
  username: document.getElementById('username'),
  password: document.getElementById('password'),
  show: function() {
    if(Login.menu.style.display == "block") {
      Login.menu.style.display = "none";
    }else {
      Login.menu.style.display = "block";
    }
  },
  credentials: function() {
    return {
      username: Login.username.value,
      password: Login.password.value
    };
  },
  login: function() {
    socket.emit('login', Login.credentials());
  },
  signup: function() {
    console.log('signup');
    socket.emit('signup', Login.credentials());
  },
  signedIn: function() {
    Login.loginButton.style.display = "none";
    Login.menu.style.display = "none";
    Login.logoutButton.style.display = "block";
  }
};