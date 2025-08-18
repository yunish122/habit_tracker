
//dom cache
const total_habit = document.getElementById('total_habit')


const state = JSON.parse(localStorage.getItem('states')) || {};
console.log(state)

const theme = document.getElementById('dark_light')
if(theme) theme.addEventListener('click',toggleTheme)


//sets total number of habits from state.habit
total_habit.textContent = state.habit.length;


//counts the total percentage of habits complete

const total_completed = state.habit.filter(habit => habit.isChecked).length;
const total = state.total;
console.log(total)

const total_percentage = (total_completed/total) * 100;

document.getElementById('completed_percentage').textContent = `${total_percentage}%`;