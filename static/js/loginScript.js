'use strict';

const form_login = document.getElementById('form-login');
const email = document.getElementById('email');
const password = document.getElementById('password');

//Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success 
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


//Check email validity. RegEx is from Stackoverflow

function isValidEmail(email){
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(String(email).toLowerCase());
}

//Event listener
form.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log(username.value);

    // if(username.value === ''){
    //     //alert('Username is required');
    //     showError(username, 'Username is required');
    // }else{
    //     showSuccess(username);
    // }

    if(email.value === ''){
        //alert('Username is required');
        showError(email, 'Email is required');
    }else if(!isValidEmail(email.value)){
        showError(email, 'Email isn\'t valid');
    }else{
        showSuccess(email);
    }

    if(password.value === ''){
        //alert('Username is required');
        showError(password, 'Password is required');
    }else{
        showSuccess(password);
    }

    // if(password2.value === ''){
    //     //alert('Username is required');
    //     showError(password2, 'Confirm password');
    // }else{
    //     showSuccess(password2);
    // }

    document.getElementById("form_login").submit(); 

});

// form.addEventListener('onclick', function(e){
//     e.preventDefault();
// });