const btn = document.querySelectorAll(".buttn");
const cstm = document.getElementById('picker')
const yess = document.getElementById('yessirr')

btn.forEach(element => {
    element.addEventListener('click', ()=> {
        document.body.style.backgroundColor = element.value;
    })
});

yess.addEventListener('click', ()=> {
    document.body.style.backgroundColor = picker.value;
});
