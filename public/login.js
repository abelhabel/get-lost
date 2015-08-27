var Login = {
  menu: document.getElementById('loginMenu'),
  loginButton: document.getElementById('login'),
  logoutButton: document.getElementById('logout'),
  submitButton: document.getElementById('submitLogin'),
  username: document.getElementById('username'),
  password: document.getElementById('password'),
  popup: function(msg) {
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = msg;
    go.body.appendChild(popup);
    return popup;
  },
  createButton: function(parent) {
    var create = document.createElement('div');
    create.className = "stat-frame center-text";
    create.innerHTML = "create";
    parent.appendChild(create);
    return create;
  },
  cancelButton: function(parent) {
    var cancel = document.createElement('div');
    cancel.className = "stat-frame center-text";
    cancel.innerHTML = "Cancel";
    parent.appendChild(cancel);
    cancel.addEventListener('mousedown', function() {
      parent.parentNode.removeChild(parent);
    }, false);
    return cancel;
  },
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
    var credentials = Login.credentials();
    if(credentials.username != "" && credentials.password != "") {
      socket.emit('login', Login.credentials());
    }else {
      var popup = Login.popup("Fields can't be blank");
      var cancel = Login.cancelButton(popup);
    }
  },
  loginReturn: function() {
    socket.emit('login', JSON.parse(localStorage.credentials));
  },
  loginFail: function() {
    var msg = "The credentials you provided do not match" +
              " anyone on record. Do you want to create a" +
              " new user with these credentials?";
    var popup = Login.popup(msg);
    var create = Login.createButton(popup);
    var cancel = Login.cancelButton(popup);
        
    create.addEventListener('mousedown', function(){
      Login.signup();
      go.body.removeChild(popup);
    }, false);
  },
  signup: function() {
    console.log('signup');
    socket.emit('signup', Login.credentials());
  },
  signupFail: function() {
    var msg = "Could not create your account. Please try again."
    var popup = Login.popup(msg);
    var cancel = Login.cancelButton(popup);
  },
  signedIn: function(msg) {
    Login.loginButton.style.display = "none";
    Login.menu.style.display = "none";
    Login.logoutButton.style.display = "block";
    localStorage.credentials = JSON.stringify(msg);
    socket.emit('get player', true);
  },
  logout: function() {
    localStorage.credentials = "";
    Login.loginButton.style.display = "block";
    Login.menu.style.display = "block";
    Login.logoutButton.style.display = "none";
    socket.emit('logout', player);
    player = null;
    go.validGame = false;
    clearInterval(go.collisionTimer);
    clearInterval(go.miningTimer);
    clearInterval(go.positionTimer);
    go.mode = 'menu';
    go.playersTable = {};
  }
};

window.onload = function(){Login.loginReturn()};