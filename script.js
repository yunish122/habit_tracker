
var state = {

    isDark : false

}
let intervalId;
const hiddenDiv = document.getElementById('hidden_div');
const overlayDiv = document.getElementById('overlay_div');

const add_new_habit_title = document.getElementById("add_new_habit_title");
const add_new_habit_sidebar = document.getElementById("add_new_habit_sidebar") 

const submit_btn = document.getElementById('submit_btn');

document.addEventListener('DOMContentLoaded',()=>{
    lucide.createIcons();
})

document.getElementById('statistic').addEventListener('click',()=>{
    window.location.href = 'statistic.html'
})
document.getElementById('today_habit').addEventListener('click',()=>{
    window.location.href = 'home-screen.html'
})
document.getElementById('settings').addEventListener('click',()=>{
    window.location.href = 'setting.html'
})



// this is for sidebar add button
add_new_habit_sidebar?.addEventListener('click',()=>{
    show_hidden_div()
    validation();
})

add_new_habit_title?.addEventListener('click',()=>{
    show_hidden_div();
    validation();
})

document.getElementById('cross')?.addEventListener('click',()=>{
    hide_hidden_div();
})

document.getElementById("dark_light").addEventListener('click',()=>{
    state = JSON.parse(localStorage.getItem('states')) || {isDark : false}

    if(state.isDark){
        state.isDark = false;
        document.querySelector('html').classList.remove('dark');
    }else{
        document.querySelector('html').classList.add('dark');
        state.isDark = true;
    }
    localStorage.setItem('states',  JSON.stringify(state))
})

submit_btn?.addEventListener('click',()=>{
    document.getElementById('hide_if_add_habit_exist').style.display = 'none';
    let titleText = document.getElementById('input1').value;
    let descriptionText = document.getElementById('input2').value;
    let category = document.getElementById('input3')
    let category_value = category.value;
    let categoryText = category.options[category.selectedIndex].text;
    create_card(titleText,descriptionText,categoryText)
    hide_hidden_div()
})

function show_hidden_div(){
    document.getElementById('hidden_div').classList.remove('hidden')
    document.getElementById('hidden_div').classList.add('fixed')
}

function hide_hidden_div(){
    document.getElementById('hidden_div').classList.remove('fixed');
    document.getElementById('hidden_div').classList.add('hidden')
}

function validation(){
    clearInterval(intervalId);
    intervalId = setInterval(check_input_validity,100);

}

function setTheme(){
    state = JSON.parse(localStorage.getItem('states')) || {isDark : false}

     if(state.isDark){
        document.querySelector('html').classList.add('dark');
    }else{
        document.querySelector('html').classList.remove('dark');
    }   
}




// checks validity of inputs of hidden div
function check_input_validity(){
    const input1 = document.getElementById('input1');
    const input2 = document.querySelector('select');
    if(input1.checkValidity() && input2.checkValidity()){
        document.getElementById('submit_btn').style.backgroundColor = 'black'
        document.getElementById('submit_btn').removeAttribute('disabled');

    }else{

        document.getElementById('submit_btn').style.backgroundColor = 'rgba(0,0,0,0.6)'
        document.getElementById('submit_btn').setAttribute('disabled', "")

    }

}


function create_card(titleText, descriptionText, categoryText){

    //wrapper div
    const wrapperDiv = document.createElement('div')
    wrapperDiv.classList.add('flex', 'flex-col', 'gap-3' ,'border' ,'border-black/10' ,'rounded-xl', 'p-5' ,'m-5');
    //first inner div
    const wrapperDiv2 = document.createElement('div');
    wrapperDiv2.classList.add('flex','justify-between' ,'items-center');


    //left icon and h1 tag
    const left_div = document.createElement('div');
    left_div.classList.add('flex','gap-3');
    const left_i = document.createElement('i');
    left_i.setAttribute('data-lucide','square');
    const left_h1 = document.createElement('h1');
    left_h1.classList.add('text-md' ,'font-semibold')
    left_h1.textContent = titleText;

    //right div
    const right_div = document.createElement('div');
    right_div.classList.add('flex','flex-col','gap-3');
    //right inner div category ra icon
    const right_inner_div = document.createElement('div')
    right_inner_div.classList.add('flex', 'gap-3' ,'items-center');
    //category ko lai div
    const category_div = document.createElement('div');
    category_div.classList.add('text-md' ,'font-semibold' ,'border' ,'border-black/10' ,'px-3' ,'py-0.5' ,'rounded-2xl');

    const category_p = document.createElement('p');
    category_p.textContent = categoryText;

    const right_icon_div = document.createElement('div');
    right_icon_div.classList.add('flex' ,'items-end' ,'p-3' ,'hover:bg-gray-50' ,'rounded-xl')
    const right_icon = document.createElement('i');
    right_icon.setAttribute('data-lucide','ellipsis');


    // lower div
    const description_div = document.createElement('div');
    description_div.classList.add('text-md' ,'text-gray-500/80' ,'font-semibold');
    const description_p = document.createElement('p');
    description_p.textContent = descriptionText;

    left_div.append(left_i,left_h1)

    //category
    category_div.append(category_p)
    right_icon_div.append(right_icon)

    right_inner_div.append(category_div,right_icon_div);
    right_div.append(right_inner_div);

    wrapperDiv2.append(left_div,right_div)
    //lower div
    description_div.append(description_p);

    wrapperDiv.append(wrapperDiv2,description_div);

    const append_div = document.getElementById('append_div');
    append_div.append(wrapperDiv);
    lucide.createIcons();
}

setTheme();
