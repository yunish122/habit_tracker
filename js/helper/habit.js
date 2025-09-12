import { getState, update_state, updateHabit } from "../state.js";
import { hide_hidden_edit_div, show_hidden_div, show_hidden_edit_div } from "./ui.js";

//add_habit



export function editElementState(idx){
    let state = getState()
    console.log(state)
    const titleText = document.getElementById('edit_input1').value;
    const descriptionText = document.getElementById('edit_input2').value;
    const category = document.getElementById('edit_input3');
    const categoryText = category.options[category.selectedIndex].text;

    console.log(titleText,categoryText)
    console.log(idx)
    updateHabit(idx,{
        title_text: titleText,
        description_text: descriptionText,
        category_text: categoryText
    })
    console.log(state.habit)
    hide_hidden_edit_div()

}


// function to delete element
//delete
export function deleteElement(e){
    const state = getState()
    const card = e.target.closest('.wrapper-div-class')
    const idx = card.getAttribute('data-index');
    state.habit.splice(idx,1);
    
    state.total -= 1;
    update_state({total: state.total})
    update_state({habit: state.habit});
    card.remove()
    if(state.total === 0){
        return true
    }
}