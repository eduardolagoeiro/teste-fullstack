new Vue({
  el: '#app',
  data: {
    newUser: false,
    logged: false,
    email: '',
    password: '',
    name: '',
    birthday: null,
    alertType: '',
    message: '',
    token: '',
    user: {},
    updateForm: false
  },
  computed: {
    alertClasses(){
      return 'alert alert-'+this.alertType;
    }
  },
  methods: {
    pushInfo(msg){
      this.alertType = 'info'
      this.message = msg;
    },
    pushSuccess(msg){
      this.alertType = 'success'
      this.message = msg;
    },
    pushError(msg){
      this.alertType = 'danger'
      this.message = msg;
    },
    clearMessage(){
      this.alertType = '';
      this.message = '';
    },
    signupShower(){
      this.clearMessage();
      this.newUser = true;
    },
    signinShower(){
      this.clearMessage();
      this.newUser = false;
    },
    updateShower(){
      this.clearMessage();
      this.updateForm = true;
    },
    signinHandler(){
      this.clearMessage();
      if(!this.email && !this.password){
        this.pushError('Email and password are required.');
      }else{
        fetch('http://localhost:3000/api/users/signin', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })
        .then(res => {
          if(res.status == 200){
            res.json().then(res => {
              this.email = res.data.user.email;
              this.name = res.data.user.name;
              this.birthday = res.data.user.birthday;
              this.token = res.data.token;
              this.logged = true;
              this.pushSuccess('Login completed');
            });
          }else{
            res
              .json()
              .then(res=>{
                this.pushError(res.message)
              })
              .catch(this.pushError)
          }
        })
        .catch(this.pushError)
      }
    },
    updateHandler(){
      this.clearMessage();
      if(!this.password){
        this.pushError('Password not match');
      } else {
        fetch('http://localhost:3000/api/users/', {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.token
          },
          method: 'PATCH',
          body: JSON.stringify({
            email: this.email,
            name: this.name,
            birthday: this.birthday,
            password: this.password
          })
        })
        .then(res => {
          this.updateForm = false;
          if(res.status == 200){
            this.pushSuccess('Updated succesfull!');
          }else{
            res.text().then(this.pushError);
          }
        })
        .catch(this.pushError)
      }
    },
    signoffHandler(){
      this.clearMessage();
      this.logged = false;
    },
    deleteHandler(){
      this.clearMessage();
      this.logged = false;
      fetch('http://localhost:3000/api/users/', {
        headers: {
          'x-access-token': this.token
        },
        method: 'DELETE'
      })
      .then(res => {
        if(res.status == 200){
          res.json().then(res => {
            this.pushSuccess(res.message);
          });
        }else{
          res
            .text()
            .then(res=>{
              this.pushError(res.message)
            })
            .catch(this.pushError)
        }
      })
      .catch(this.pushError)
    },
    signupHandler(){
      this.clearMessage()
      fetch('http://localhost:3000/api/users/signup', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          name: this.name,
          birthday: this.birthday})
      })
      .then(res => {
        if(res.status == 200){
          res.json().then(res => {
            this.pushSuccess(res.message);
          });
        }else{
          res.text().then(this.pushError);
        }
      })
      .catch(this.pushError)
    }
  }
})