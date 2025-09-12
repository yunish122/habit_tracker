import { validation, hide_hidden_div, hide_hidden_edit_div, show_hidden_div, show_hidden_edit_div, toggleTheme } from "../helper/ui.js";
import { getState, update_state } from "../state.js"
import { create_element, createIcon, renderTheme } from "../helper/utils.js";
import { deleteElement, editElementState } from "../helper/habit.js";

let append_div = document.getElementById('append_div')
const add_new_habit_title = document.getElementById("add_new_habit_title");
const add_new_habit_sidebar = document.getElementById("add_new_habit_sidebar");
const submit_btn = document.getElementById('submit_btn');

document.getElementById('statistic').addEventListener('click', () => {
    window.location.href = 'statistic.html';
});
document.getElementById('today_habit').addEventListener('click', () => {
    window.location.href = 'index.html';
});
document.getElementById('settings').addEventListener('click', () => {
    window.location.href = 'setting.html';
});
// open sidebar form
add_new_habit_sidebar.addEventListener('click', () => {
    show_hidden_div();
    validation();
})
let state = getState()
console.log(state.isDark)
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
// toggles theme
document.getElementById('dark_light').addEventListener('click',()=>{
    let state = getState()
    state.isDark = !state.isDark;
    update_state({isDark: state.isDark})
    toggleTheme()
}
);

submit_btn?.addEventListener('click', () => {

    const titleText = document.getElementById('input1').value;
    const descriptionText = document.getElementById('input2').value;
    const category = document.getElementById('input3');
    const categoryText = category.options[category.selectedIndex].text;

    hide_hidden_div();
    
    addHabitSettingPage(titleText, descriptionText, categoryText);
    render_setting()
    document.getElementById('input1').value = ''
    document.getElementById('input2').value = ''
    category.selectedIndex = 0
});

document.addEventListener('DOMContentLoaded',()=>{
    render_setting()
    let hidden_edit_div = document.getElementById('hidden_edit_div')
    
    document.getElementById('append_div').addEventListener('click',(e)=>{
        let edit_btn = e.target.closest('.edit_div')
        let del_btn = e.target.closest('.delete_div')
        let wrapper_class = e.target.closest('.wrapper-div-class')
        let idx = parseInt(wrapper_class.getAttribute('data-index'))
        if(edit_btn){
            show_hidden_edit_div()
            hidden_edit_div.setAttribute('data-index',idx)
        }
        if(del_btn){
            deleteElement(e)
            render_setting()
        }
        
    })

    document.getElementById('hidden_edit_div').addEventListener('click',(e)=>{
        let save_btn = e.target.closest('#edit_btn')
        let idx = parseInt(hidden_edit_div.getAttribute('data-index'))
        if(save_btn){
            editElementState(idx)
        }
        
        render_setting()

    })
})



//adds habit
function addHabitSettingPage(title, description, category) {
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

}


function render_setting(){
    const state = getState()
    renderTheme();  

    if(state.habit && state.habit.length > 0){
        append_div.querySelector('#toBeHidden')?.classList.add('hidden');

        append_div.querySelectorAll('.wrapper-div-class').forEach(card=>card.remove())

        state.habit.slice().reverse().forEach((habit,i) => {
            let idx = state.habit.length - 1 - i;
            create_card_settings(habit.title_text,habit.category_text, idx);

        });
        let obj = count_category()
        render_category_ui(obj)

    }else{
        append_div.querySelector('#toBeHidden').classList.remove('hidden');
    }
    lucide.createIcons();
}

function create_card_settings(titleText, categoryText, idx) {
    // Outer wrapper
    const wrapperDiv = create_element('div', [
        'wrapper-div-class',
        'border',
        'border-gray-500/40',
        'p-5',
        'rounded-lg',
        'flex',
        'justify-between',
        'items-center',
        'mb-5'
        
    ]);
    wrapperDiv.setAttribute('data-index', idx);
    wrapperDiv.id = 'wrapper_div_class';

    // Left section
    const left_div = create_element('div', [
        'left_div',
        'flex',
        'flex-col',
        'items-start',
        'gap-2'
    ]);

    // Title
    const titleDiv = create_element('div', ['title']);
    const titleH1 = create_element('h1', [
        'left_h1',
        'font-semibold',
        'text-lg',
        'dark:text-white',
        'text-black'
    ]);
    titleH1.textContent = titleText;
    titleDiv.appendChild(titleH1);

    // Category
    const categoryDiv = create_element('div', ['category']);
    const categoryInnerDiv = create_element('div', [
        'px-2',
        'rounded-2xl',
        'border',
        'border-gray-400/50'
    ]);
    const categoryH2 = create_element('h2', [
        'category_p',
        'font-semibold',
        'text-sm',
        'dark:text-white',
        'text-gray-800/70'
    ]);
    categoryH2.textContent = categoryText;
    categoryInnerDiv.appendChild(categoryH2);
    categoryDiv.appendChild(categoryInnerDiv);

    left_div.appendChild(titleDiv);
    left_div.appendChild(categoryDiv);

    // Right section
    const right_div = create_element('div', [
        'flex',
        'items-center',
        'justify-center',
        'gap-3'
    ]);
    right_div.id = 'right_div'
    // Edit button
    const editDiv = create_element('div', [
        'edit_div',
        'border',
        'border-gray-400/50',
        'py-2',
        'px-3',
        'rounded-lg',
        'hover:bg-gray-300/20',
        'transition-colors',
        'duration-200',
        'ease-in-out',
        'hover:cursor-pointer'
    ]);
    const editIcon = createIcon(['data-lucide', 'square-pen'], ['w-5','dark:text-white']);
    editDiv.appendChild(editIcon);

    // Delete button
    const deleteDiv = create_element('div', [
        'delete_div',
        'border',
        'border-gray-400/50',
        'py-2',
        'px-3',
        'rounded-lg',
        'hover:bg-gray-300/20',
        'transition-colors',
        'duration-200',
        'ease-in-out',
        'hover:cursor-pointer'
    ]);
    const deleteIcon = createIcon(['data-lucide', 'trash'], ['w-5', 'text-red-600']);
    deleteDiv.appendChild(deleteIcon);

    right_div.appendChild(editDiv);
    right_div.appendChild(deleteDiv);

    // Append left + right to wrapper
    wrapperDiv.appendChild(left_div);
    wrapperDiv.appendChild(right_div);
    document.getElementById('habitContainer').append(wrapperDiv)
    lucide.createIcons()

    return wrapperDiv;
}

function count_category(){
    let state = getState()

    let counter = [
        {title: 'Health & Fitness',
            count: 0
        },
        {
            title: 'Productivity',
            count: 0
        },
        {
            title: 'Music',
            count: 0
        },
        {
            title: 'Study',
            count: 0
        },
        {
            title: 'Others',
            count: 0
        },

    ]

    state.habit.forEach((habit)=>{
        console.log(habit.category_text)

        switch(habit.category_text){
            case 'Health':
                counter[0].count++
                break
            case 'Productivity':
                counter[1].count++
                break
            case 'study':
                counter[2].count++
                break
            case 'Music':
                counter[3].count++
                break
            case 'Others':
                counter[4].count++
        }
    })
    
    return counter
}

function render_category_ui(obj){
    console.log(obj)
    document.querySelectorAll('.category_div').forEach(elem => {
        elem.remove()
    })
    obj.forEach(elem => {
        if(elem.count >= 1){
            create_category_card(elem.title, elem.count);
        }
    })

}

function create_category_card(categoryText,category_no) {
    // Outer container div
    const categoryDiv = create_element('div', [
        'category_div',
        'bg-gray-400/20',
        'rounded-xl',
        'px-3',
        'py-1'
    ]);

    // Category text
    const categoryH1 = create_element('h1', [
        'font-semibold',
        'text-xs',
        'dark:text-white'
    ]);
    categoryH1.textContent = `${categoryText} (${category_no})`;

    // Append text to container
    categoryDiv.appendChild(categoryH1);
    document.getElementById('category_container').append(categoryDiv)
    return categoryDiv;
}