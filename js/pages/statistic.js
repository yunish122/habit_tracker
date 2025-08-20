import { getState, update_state } from "../state.js";
import { toggleTheme, create_element } from "../helper/utils.js";
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
let total_percentage = ((total_completed/total) * 100).toFixed(2);

document.getElementById("completed_percentage").textContent = `${total_percentage}%`

document.getElementById("total_completed").textContent = `${total_completed}`

// to listen tab change dom refresh
document.addEventListener('visibilitychange',checkHighest)


function create_card(title_text, category_text,idx){

    //wrapper div which will contain all other child class
    const wrapper_div = create_element('div',['flex','flex-col','gap-3'])
    wrapper_div.setAttribute('data-index',idx)
    //first inner div that will contain title text and category
    const first_inner_div = create_element('div',['flex', 'flex-row', 'items-center', 'justify-between'])

    const first_inner_child_div = create_element('div',['flex' ,'items-center' ,'gap-4'])

    const titleText = create_element('h1',["text-xl" ,"font-medium"])
    titleText.textContent = title_text;

    const category_div = create_element('div',['border', 'border-gray-400/50', "rounded-2xl", 'px-3'])
    const categoryText = create_element('h1',['text-sm', 'font-semibold'])
    categoryText.textContent = category_text;

    //group which contains title text 
    category_div.append(categoryText);
    first_inner_child_div.append(titleText,category_div);
    first_inner_div.append(first_inner_child_div);

    // progress bar
    const progress_bar = create_element('div',['h-2', 'rounded-2xl' ,'bg-black' ,'w-full','progress_bar'])

    // groupp 3
    const third_bar = create_element('div', ['flex', 'items-center', 'justify-between'])

    const track_text = create_element('h1', ['text-sm', 'text-gray-900/70'])
    track_text.textContent = 'Tracked for 1 days';

    const completed_text = create_element('h1', ['text-sm', 'text-gray-900/70'])
    completed_text.textContent = '1 completions';
    //group 3
    third_bar.append(track_text,completed_text);

    wrapper_div.append(first_inner_div,progress_bar,third_bar)
    
    document.getElementById('append_div').append(wrapper_div);

    return wrapper_div;

}


function checkHighest(){
    const state = getState();

    const highest = state.habit[0].streak;

    for(let i = 0; i < state.habit.length; i++){
        if(state.habit[i].streak > highest){
            highest = streak.habit[0].streak;
        }
    }

    document.getElementById('longest_streak').textContent = highest

}


function render(){
    const state = getState()
    if(state.habit.length > 0){
        console.log('hidden')
        document.getElementById("div_if_no_habit").classList.add('hidden')
        state.habit.forEach((habit,i)=> {
            let card = create_card(habit.title_text, habit.category_text,i);
            if(state.habit[i].isChecked) {
                card.querySelector('.progress_bar').classList.add('bg-black')
            }else{
                card.querySelector('.progress_bar').classList.add('bg-gray-400/30')

            }
        });
    }


}
render()