import { getState, update_state } from "../state.js";
import { toggleTheme } from "../helper/utils.js";
//dom cache
const total_habit = document.getElementById('total_habit')
// states
const state = getState();

// listener for page change
document.getElementById('statistic').addEventListener('click', () => {
    window.location.href = 'statistic.html';
});
document.getElementById('today_habit').addEventListener('click', () => {
    window.location.href = 'home-screen.html';
});
document.getElementById('settings').addEventListener('click', () => {
    window.location.href = 'setting.html';
});


const theme = document.getElementById('dark_light')
if(theme) theme.addEventListener('click',toggleTheme)


//sets total number of habits from state.habit
total_habit.textContent = state.habit.length;


//counts the total percentage of habits complete
let total = state.total;
let total_completed = state.habit.filter((habit)=> habit.isChecked).length;
let total_percentage = (total_completed/total) * 100;

document.getElementById("completed_percentage").textContent = `${total_percentage}%`

document.getElementById("total_completed").textContent = `${total_completed}`


