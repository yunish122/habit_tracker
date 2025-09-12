import { getState, update_state } from "../state.js";

const hiddenDiv = document.getElementById('hidden_div');
const overlayDiv = document.getElementById('overlay_div');

const add_new_habit_title = document.getElementById("add_new_habit_title");
const add_new_habit_sidebar = document.getElementById("add_new_habit_sidebar");
const submit_btn = document.getElementById('submit_btn');
const append_div = document.getElementById('append_div')

const hidden_edit_div = document.getElementById('hidden_edit_div')
let intervalId;


export function show_hidden_edit_div(){
    hidden_edit_div?.classList.remove('hidden');
    hidden_edit_div?.classList.add('fixed');
}

export function hide_hidden_edit_div(){
    hidden_edit_div?.classList.add('hidden');
    hidden_edit_div?.classList.remove('fixed');
}

export function show_hidden_div() {
    hiddenDiv?.classList.remove('hidden');
    hiddenDiv?.classList.add('fixed');

}
export function hide_hidden_div() {
    hiddenDiv?.classList.remove('fixed');
    hiddenDiv?.classList.add('hidden');
}

export function checkInputValidity() {
    const input1 = document.getElementById('input1');
    const input2 = document.querySelector('select');
    if (input1.checkValidity() && input2.checkValidity()) {
        submit_btn.style.backgroundColor = 'black';
        submit_btn.removeAttribute('disabled');
    } else {
        submit_btn.style.backgroundColor = 'rgba(0,0,0,0.6)';
        submit_btn.setAttribute('disabled', "");
    }
}

export function validation() {
    clearInterval(intervalId);
    intervalId = setInterval(checkInputValidity, 100);
}
export function toggleTheme(){
    let state = getState()
    console.log(state.isDark)
    if(state.isDark){
        document.querySelector('html').classList.add('dark')
    }else{
        document.querySelector('html').classList.remove('dark')

    }
}
