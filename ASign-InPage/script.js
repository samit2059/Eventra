function display() {
    let a = document.getElementById('pwd');
    let on = document.getElementById('visibilityOn');
    let off = document.getElementById('visibilityOff');

    if (a.type === 'password') {
        a.type = 'text';
        off.style.display = 'none';
        on.style.display = 'inline-block';
    } else {
        a.type = 'password';
        off.style.display = 'inline-block';
        on.style.display = 'none';
    }
}
function submi() {
    let p1 = document.getElementById('pwd');
    if (p1.value.trim() === '') {
        alert('Please enter your password');
    }
    document.addEventListener('submit', (e)=>{
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value; // Get value here
    const number = document.getElementById('contact').value;
    if (username.length < 3) {
        alert('Username must be at least 3 characters long.');
        e.preventDefault();
            return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        e.preventDefault();
        return;
    }
    if(!email.includes('@') || !email.includes('.')){
        alert('Invalid email');
        e.preventDefault();
        return;
    }
    if(number.length !== 10){
        alert('Invalid contact number');
        e.preventDefault();
        return;
    }
     })
}

const i1 = document.getElementById('pwd');
i1.addEventListener('focus', ()=>{
    const password = document.getElementById('pwd').value;
    if(password.length < 8){
        i1.style.border = '2px solid red';
    }
    else{
        i1.style.border = '2px solid green';
        console.log("Detect");
    }
})

const i2 = document.getElementById('username');
i2.addEventListener('blur', ()=>{
    const username = document.getElementById('username').value;
    if(username.length < 3){
        i2.style.border = '2px solid red';
    }
    else{
        i2.style.border = '2px solid green';

    }
})

const i3 = document.getElementById('email');
i3.addEventListener('blur', ()=>{
    const email = document.getElementById('email').value;
        if(!email.includes('@') ){
            i3.style.border = '2px solid red';
        }
        else{
            i3.style.border = '2px solid green';
        }
})
const i4 = document.getElementById('number');
i4.addEventListener('blur', ()=>{
    const number = document.getElementById('number').value;
    if(number.length !== 10){
        i4.style.border = '2px solid red';
    }
    else{
        i4.style.border = '2px solid green';
    }
})