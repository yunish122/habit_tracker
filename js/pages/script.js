import { toggleTheme, renderTheme, count_completeion, create_element, createIcon} from "../helper/utils.js";
import { getState, update_state, updateHabit } from "../state.js";
let intervalId;


const hiddenDiv = document.getElementById('hidden_div');
const overlayDiv = document.getElementById('overlay_div');

const add_new_habit_title = document.getElementById("add_new_habit_title");
const add_new_habit_sidebar = document.getElementById("add_new_habit_sidebar");
const submit_btn = document.getElementById('submit_btn');
const append_div = document.getElementById('append_div')

const hidden_edit_div = document.getElementById('hidden_edit_div')

//dom event listener
document.addEventListener('DOMContentLoaded', () => {
    let state = getState()
    if(append_div){
        lucide.createIcons();

        state.habit.forEach((habit,i)=>{
            let diff = checkForDiff(habit);
            updateStreakState(i,habit,diff);
            updateReseCheckBoxState(habit,i);
            updateWarningState(habit,i,diff);
        })
        render();    
    }

});


// navigation
document.getElementById('statistic').addEventListener('click', () => {
    window.location.href = 'statistic.html';
});
document.getElementById('today_habit').addEventListener('click', () => {
    window.location.href = 'home-screen.html';
});
document.getElementById('settings').addEventListener('click', () => {
    window.location.href = 'setting.html';
});
//navigation end


// open sidebar form
add_new_habit_sidebar?.addEventListener('click', () => {
    show_hidden_div();
    validation();
})

add_new_habit_title?.addEventListener('click', () => {
    show_hidden_div();
    validation();
})

//hides the hidden div
document.getElementById('cross')?.addEventListener('click', () => {
    hide_hidden_div();
})
//hides the edit hidden div
document.getElementById('edit_cross')?.addEventListener('click', () => {
    hide_hidden_edit_div();
})

// toggles theme
document.getElementById('dark_light').addEventListener('click',toggleTheme);

//check for reset 

document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState === 'visible'){
        let state = getState();
        state.habit.forEach((elem,i)=>{
            // let diff = checkForDiff(elem);
            let diff = checkForDiff(elem);
            updateStreakState(i,elem,diff);
            updateReseCheckBoxState(elem,i);
            updateWarningState(elem,i,diff);

        })
    }
    render();
})


// main event delegation
document.getElementById('append_div').addEventListener('click',(e)=>{    
    
    let state = getState()
    let idx_elem = e.target.closest('.wrapper-div-class')
    let idx = parseInt(idx_elem.getAttribute("data-index"))
    let habit = state.habit[idx]
    let left_icon = e.target.closest('.left_icon')

    if(left_icon){
        
        if(state.habit[idx].isChecked) return;

        updateCheckbox(e);
        let diff = checkForDiff(habit)
        updateStreakState(idx,habit,diff)
        render();

    }
    
    const right_icon_closest = e.target.closest('.right_icon_div')
    const right_icon_delete = right_icon_closest?.querySelector('.right_icon_delete')

    right_icon_closest?.querySelector('.right_hidden_div').classList.toggle('hidden')
    
    right_icon_delete?.addEventListener('click',(e)=>{
        deleteElement(e)
    })

    const right_icon_edit = right_icon_closest?.querySelector('.right_icon_edit');

    right_icon_edit?.addEventListener('click',(e)=>{
        editElement(e);
    })
})

//this is event listener for add habit button
submit_btn?.addEventListener('click', () => {
    const titleText = document.getElementById('input1').value;
    const descriptionText = document.getElementById('input2').value;
    const category = document.getElementById('input3');
    const categoryText = category.options[category.selectedIndex].text;

    hide_hidden_div();

    addHabit(titleText, descriptionText, categoryText);
    document.getElementById('input1').value = ''
    document.getElementById('input2').value = ''
    category.selectedIndex = 0
});
//dom event listener end


//function realted to streak



//checks for difference
 function checkForDiff(habit){
    if(!habit.lastCheckedAt) return 0;
    let date = new Date(habit.lastCheckedAt) || 0;

    let currDate = new Date();
    
    let diff = Math.floor((currDate - date)/(1000*60*60*24));
    return diff;
}


//updates streak state. this function updates the state of streak according to the difference of last checked and today's date
//up_streak
function updateStreakState(idx,state_habit,diff){
    if(diff === 0){

// works
        //increment if isStreakChecked is false and set it to true later. this will avoid double increment
        if(state_habit.isChecked && !state_habit.isStreakChecked){

            console.log('b')
            state_habit.streak++;
            state_habit.lastCheckedAt = new Date()
            
            updateHabit(idx,{lastCheckedAt: state_habit.currDate, isStreakChecked: true, streak: state_habit.streak, lastCheckedAt: state_habit.lastCheckedAt, needWarning: false});
        
        }
// works
    }else if(diff === 1){ //yesterday missed 
        if(state_habit.isChecked && !state_habit.isStreakChecked){
            state_habit.streak++
            state_habit.lastCheckedAt = new Date();
            updateHabit(idx,{streak: state_habit.streak, isStreakChecked: false, needWarning: false})
        }

// works 
    }else if(diff > 1){
        console.log('works')
        state_habit.streak = 0
        updateHabit(idx,{streak: state_habit.streak, isStreakChecked: false, isChecked: false, lastCheckedAt: null})
    }
}

//updates warning state
//st_warning
export function updateWarningState(elem,i,diff){
// works
    if(diff === 1 && !elem.isChecked && !elem.isStreakChecked){
        console.log('waringin')
        updateHabit(i,{needWarning: true})
    }else{
        updateHabit(i,{needWarning: false})
    }
}

//updates warning ui
//ui_warning
export function updateWarningUi(i,habit){
    // works
    let arr = document.querySelectorAll('.wrapper-div-class')
    let elem = arr[i]
    if(habit.needWarning){
        console.log('warning')
        elem.classList.add('bg-red-200/20','border-red-300/60','dark:border-red-400/50','dark:bg-black')
        elem.querySelector('.streak').classList.add('border-red-300/60');
    }

}


//checks for checkbox reset.
// st_reset
export function updateReseCheckBoxState(elem,i){
    //works
    let diff = checkForDiff(elem);
    //dosent work if diff is 0. This works
    if(diff === 1){
        if(elem.isChecked && elem.isStreakChecked){
            elem.isChecked = false;
            elem.isStreakChecked = false
            updateHabit(i,{isChecked: elem.isChecked, isStreakChecked: elem.isStreakChecked})
        }
    }

}


//function related with streak end

function localClear(){
    localStorage.clear()
}
document.getElementById('clearBtn').addEventListener('click',localClear)

//function to edit element
function editElement(e){
    const state = getState()
    show_hidden_edit_div();

    const edit_btn = document.getElementById('edit_btn');
    const wrapper_div = e.target.closest('.wrapper-div-class')

    edit_btn.addEventListener('click',()=>{

        const titleText = document.getElementById('edit_input1').value;
        const descriptionText = document.getElementById('edit_input2').value;
        const category = document.getElementById('edit_input3');
        const categoryText = category.options[category.selectedIndex].text;
        
        hide_hidden_edit_div()

        const title_text = wrapper_div.querySelector('.left_h1')
        
        if(titleText) title_text.textContent = titleText;

        const categoryP = wrapper_div.querySelector('.category_p')
        if(categoryText) categoryP.textContent = categoryText;
        
        const descP = wrapper_div.querySelector('.description_p')
        if(descriptionText) descP.textContent = descriptionText || '';
            
        const idx = parseInt(wrapper_div.getAttribute('data-index'))
        update_state({habit: state.habit.map((iterable,i)=> idx === i ?  {...iterable
            ,title_text: titleText,
             description_text: descriptionText,
             category_text: categoryText} : iterable 
            )})
            
    })
}

// function to delete element
//delete
function deleteElement(e){
    const state = getState()
    const card = e.target.closest('.wrapper-div-class')
    const idx = card.getAttribute('data-index');
    state.habit.splice(idx,1);
    
    state.total -= 1;
    update_state({total: state.total})
    update_state({habit: state.habit});
    card.remove()
    render()
    if(state.total === 0){
        render()
    }
}

// updates check box when check box is add
//up_checkbox
function updateCheckbox(e){
    const state = getState()
    const closest = e.target.closest('.wrapper-div-class')
    let idx = parseInt(closest.getAttribute('data-index'));

    state.habit[idx].isChecked = !state.habit[idx].isChecked;

    toggleCheckbox(state.habit[idx].isChecked, closest)
    // state.habit[idx].reset = false; //this means reset gareko xaina
    updateHabit(idx,{isChecked: state.habit[idx].isChecked, lastCheckedAt: new Date()})
    isComplete()
}

//add_habit
function addHabit(title, description, category) {
    const state = getState()
    const habits = {
        title_text: title,
        description_text: description,
        category_text: category,
        streak: 0,
        isChecked: false,
        lastCheckedAt: null,
        isStreakChecked: false,
        needWarning: false,
    };
    state.total+=1;
    update_state({total: state.total});
    update_state({habit: [...state.habit, habits]});

    render();
 
}
  


//my action plan.. 
// first add date to new habit. this is done
// make one listener visibilitychange, which will render every time tab shows up.
// this will contain one function renderChange()

// function that updates the completion div
function isComplete(){
    const state = getState()
    let completed = count_completeion();
    document.getElementById('completed').textContent = `${completed}/${state.total}`
}

//main
function render() {
    const state = getState()

    renderTheme();  
    isComplete();

    if(state.habit && state.habit.length > 0){
        append_div.querySelector('.hidden_if_no_elem')?.classList.add('hidden');

        append_div.querySelectorAll('.wrapper-div-class').forEach(card=>card.remove())

        state.habit.slice().reverse().forEach((habit,i) => {
            let card = create_card(habit.title_text, habit.description_text, habit.category_text,habit.streak, i);
            toggleCheckbox(habit.isChecked, card)

            updateWarningUi(i,habit)
        });


    }else{
        append_div.querySelector('.hidden_if_no_elem').classList.remove('hidden');
    }
    
    lucide.createIcons();
}

//function to render checked unchecekd
function toggleCheckbox(check_uncheck,card){
    if(check_uncheck){
        card.querySelector('.left_icon').setAttribute('data-lucide','square-check');
        card.classList.add('bg-green-200/20','border-green-300/60','dark:border-green-400/50','dark:bg-black')
        card.querySelector('.streak').classList.remove('hidden')


    }else {
        card.querySelector('.left_icon').setAttribute('data-lucide','square');
        card.classList.remove('bg-green-200/20','border-green-300/60','dark:border-green-400/50','dark:bg-black')
        card.querySelector('.left_icon').setAttribute('data-lucide','square');
        card.querySelector('.streak').classList.add('hidden')

    }

    lucide.createIcons()
}



//extra function
//extra
function show_hidden_edit_div(){
    hidden_edit_div.classList.remove('hidden');
    hidden_edit_div.classList.add('fixed');
}

function hide_hidden_edit_div(){
    hidden_edit_div.classList.add('hidden');
    hidden_edit_div.classList.remove('fixed');
}

function show_hidden_div() {
    hiddenDiv.classList.remove('hidden');
    hiddenDiv.classList.add('fixed');

}
function hide_hidden_div() {
    hiddenDiv.classList.remove('fixed');
    hiddenDiv.classList.add('hidden');
}

export function validation() {
    clearInterval(intervalId);
    intervalId = setInterval(checkInputValidity, 100);
}
function checkInputValidity() {
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


// create card UI
function create_card(titleText, descriptionText, categoryText,st, idx) {
    const wrapperDiv = create_element('div',['wrapper-div-class','flex', 'flex-col', 'gap-1', 'border', 'border-black/10','dark:border-gray-400/50', 'rounded-xl', 'p-3', 'm-3']);
    wrapperDiv.setAttribute('data-index',idx)
    wrapperDiv.id = 'wrapper_div'
    const wrapperDiv2 = create_element('div',['flex', 'justify-between', 'items-center']);

    const left_div = create_element('div',['left_div','flex', 'gap-2','items-center','justify-center']);

    const left_i = createIcon(['data-lucide', 'square'],['w-5','h-5','left_icon','dark:text-white']);    

    const left_h1 = create_element('h1',['text-md', 'font-semibold','left_h1','dark:text-white']);
    left_h1.textContent = titleText;

    //right div which will contain streak and other stuff
    const right_div = create_element('div',['flex', 'flex-col', 'gap-2']);
    const right_inner_div = create_element('div',['flex', 'gap-2', 'items-center','justify-center']);

    // streak div
    const streak_div = create_element('div',['rounded-2xl','px-3','py-0.5','flex','gap-1','bg-gray-100','items-center','justify-center','hidden','streak','dark:bg-gray-800']);
    const streak_icon = createIcon(['data-lucide','flame'],['w-4','h-4','streak_icon'])
    streak_icon.setAttribute('stroke','red')
    
    const streak = create_element('h1',['text-sm','font-semibold','dark:text-white/80','streak_no']);
    streak.textContent = st;

    const category_div = create_element('div',['category_div','text-md', 'font-semibold', 'border', 'border-black/10', 'px-3', 'py-0.5', 'rounded-2xl','dark:bg-black','dark:border-gray-400/30']);
    const category_p = create_element('p',['category_p','text-sm','font-semibold','dark:text-white/90']);
    category_p.textContent = categoryText;

    // settings div/options
    const right_icon_div = create_element('div',['right_icon_div','flex', 'items-end', 'p-1', 'rounded-xl','relative']);

    const right_icon = createIcon(['data-lucide', 'ellipsis'],['hover:bg-gray-50','dark:text-white']);
    const right_hidden_div = create_element('div',['right_hidden_div','hidden','bg-white','shadow-lg','shadow-gray-400/50','absolute','right-0','top-full','flex','flex-col','items-start','justify-center','gap-2','p-1','w-30','rounded-sm','border','border-gray-500/40']);

    // right hidden edit div
    const right_hidden_edit_div = create_element('div',['right_icon_edit','flex','justify-start','items-center','gap-2','hover:border','hover:border-2','hover:cursor-pointer','hover:border-black','w-full','h-full','px-2','rounded-sm']);
    const right_hidden_edit_icon = createIcon(['data-lucide','square-pen'],['w-4','h-4']);
    const right_hidden_div_edit_p = create_element('h1',['text-md','font-semibold']);
    right_hidden_div_edit_p.textContent = 'Edit';
    right_hidden_edit_div.append(right_hidden_edit_icon,right_hidden_div_edit_p);

    // right hidden delete div
    const right_hidden_delete_div = create_element('div',['right_icon_delete','flex','justify-start','items-center','gap-2','hover:border','hover:border-2','hover:border-black','w-full','h-full','px-2','rounded-sm','hover:cursor-pointer']);
    const right_hidden_delete_icon = createIcon(['data-lucide','trash'],['w-4','h-4']);
    const right_hidden_div_delete_p = create_element('h1',['text-md','font-semibold']);
    right_hidden_div_delete_p.textContent = 'Delete';
    right_hidden_delete_div.append(right_hidden_delete_icon,right_hidden_div_delete_p);

    // hidden div append
    right_hidden_div.append(right_hidden_edit_div,right_hidden_delete_div)

    // descrition div
    const description_div = create_element('div',['text-md', 'text-gray-700/80', 'font-semibold','my-1']);
    const description_p = create_element('p',['description_p','dark:text-white']);
    description_p.textContent = descriptionText;
    

    // append
    left_div.append(left_i, left_h1);
    streak_div.append(streak_icon, streak);
    category_div.append(category_p);
    right_icon_div.append(right_icon);
    right_icon_div.append(right_hidden_div);
    right_inner_div.append(streak_div,category_div, right_icon_div); 
    right_div.append(right_inner_div);
    wrapperDiv2.append(left_div, right_div);
     description_div.append(description_p);
    wrapperDiv.append(wrapperDiv2, description_div);


    document.getElementById('append_div').append(wrapperDiv)
    lucide.createIcons()
    return wrapperDiv;
}

