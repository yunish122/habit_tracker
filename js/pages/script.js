import { toggleTheme, renderTheme, count_completeion} from "../helper/utils.js";
import { getState, update_state } from "../state.js";
let intervalId;

let state = getState() || {
    isDark: false,
    habit: [],
    total: 0
};

const hiddenDiv = document.getElementById('hidden_div');
const overlayDiv = document.getElementById('overlay_div');

const add_new_habit_title = document.getElementById("add_new_habit_title");
const add_new_habit_sidebar = document.getElementById("add_new_habit_sidebar");
const submit_btn = document.getElementById('submit_btn');
const append_div = document.getElementById('append_div')

const hidden_edit_div = document.getElementById('hidden_edit_div')

document.addEventListener('DOMContentLoaded', () => {
    if(append_div){
        lucide.createIcons();
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

// open sidebar form
add_new_habit_sidebar?.addEventListener('click', () => {
    show_hidden_div();
    validation();
})
add_new_habit_title?.addEventListener('click', () => {
    show_hidden_div();
    validation();
})

document.getElementById('cross')?.addEventListener('click', () => {
    hide_hidden_div();
})


document.getElementById('edit_cross')?.addEventListener('click', () => {
    hide_hidden_edit_div();
})

// toggles theme
document.getElementById('dark_light').addEventListener('click',toggleTheme)

// toggles checkbox
document.getElementById('append_div').addEventListener('click',(e)=>{    

    if(e.target.closest('.left_icon')){
        console.log(e)
        update_checkBox(e)
    }

    const right_icon_closest = e.target.closest('.right_icon_div')
    const right_icon_delete = right_icon_closest.querySelector('.right_icon_delete')

    right_icon_closest.querySelector('.right_hidden_div').classList.toggle('hidden')
    
    right_icon_delete.addEventListener('click',(e)=>{
        delete_element(e)
    })

    const right_icon_edit = right_icon_closest.querySelector('.right_icon_edit');

    right_icon_edit.addEventListener('click',(e)=>{
        edit_element(e);
    })
})

//function to edit element
function edit_element(e){
    show_hidden_edit_div();

    const edit_btn = document.getElementById('edit_btn');
    const wrapper_div = e.target.closest('.wrapper-div-class')

    edit_btn.addEventListener('click',()=>{

        const titleText = document.getElementById('edit_input1').value;
        const descriptionText = document.getElementById('edit_input2').value;
        const category = document.getElementById('edit_input3');
        const categoryText = category.options[category.selectedIndex].text;
        
        console.log(wrapper_div)
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
             category_text: categoryText} : iterable )})
            
    })
}

// function to delete element
function delete_element(e){
    const card = e.target.closest('.wrapper-div-class')
    const idx = card.getAttribute('data-index');
    state.habit.splice(idx,1);
    
    state.total--;
    update_state({total: state.total})
    update_state({habit: state.habit});
    card.remove()
}

// updates check box when check box is clied
function update_checkBox(e){
    const closest = e.target.closest('.wrapper-div-class')

    let idx = parseInt(closest.getAttribute('data-index'));
    state.habit[idx].isChecked = !state.habit[idx].isChecked;

    const square_box = state.habit[idx].isChecked;
    render_check_uncheck(square_box, closest)


    update_state({habit: state.habit.map((iterable, i)=> i === idx ? {...iterable, isChecked: square_box} : iterable)})
    isComplete()
}

submit_btn?.addEventListener('click', () => {
    const titleText = document.getElementById('input1').value;
    const descriptionText = document.getElementById('input2').value;
    const category = document.getElementById('input3');
    const categoryText = category.options[category.selectedIndex].text;

    hide_hidden_div();

    addHabit(titleText, descriptionText, categoryText);
});



function addHabit(title, description, category) {

    const habits = {
        title_text: title,
        description_text: description,
        category_text: category,
        isChecked: false,
    };
    state.total++;

    update_state({total: state.total});
    update_state({habit: [...state.habit, habits]});
    render();
    
}
  


// function that updates the completion div
function isComplete(){
    let completed = count_completeion();
    document.getElementById('completed').textContent = `${completed}/${state.total}`
}

function render() {
    console.log(state.total)
    renderTheme();  
    isComplete()
    if(state.habit && state.habit.length > 0){
        append_div.innerHTML = '';
        state.habit.forEach((habit,i) => {

            let card = create_card(habit.title_text, habit.description_text, habit.category_text, i);
            render_check_uncheck(habit.isChecked, card)

        });
    }
    

    lucide.createIcons();
}


//function to render checked unchecekd
function render_check_uncheck(check_uncheck,card){


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
    intervalId = setInterval(check_input_validity, 100);
}
function check_input_validity() {
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

// helper function to create element
function create_element(dom, classes = []){
    const element = document.createElement(dom);
    element.classList.add(...classes);
    return element;
}
// create icons
function createIcon(attr = [],classes = []){
    const icons = create_element('i',[...classes]);
    icons.setAttribute(...attr)
    return icons
}
// create card UI
function create_card(titleText, descriptionText, categoryText, idx) {
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
    const streak_icon = createIcon(['data-lucide','flame'],['w-4','h-4'])
    streak_icon.setAttribute('stroke','red')
    const streak = create_element('h1',['text-sm','font-semibold','dark:text-white/80']);
    streak.textContent = 1;

    const category_div = create_element('div',['category_div','text-md', 'font-semibold', 'border', 'border-black/10', 'px-3', 'py-0.5', 'rounded-2xl','dark:bg-black','dark:border-gray-400/30']);
    const category_p = create_element('p',['category_p','text-sm','font-semibold','dark:text-white/90']);
    category_p.textContent = categoryText;

    // settings div/options
    const right_icon_div = create_element('div',['right_icon_div','flex', 'items-end', 'p-3', 'rounded-xl','relative']);

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
    const description_div = create_element('div','text-md', 'text-gray-500/80', 'font-semibold');
    const description_p = create_element('p',['description_p']);
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
