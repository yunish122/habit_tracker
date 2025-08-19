
import { update_state, getState } from "../state.js";
export function renderTheme(){
    let state = getState();
    document.querySelector('html').classList.toggle('dark',state.isDark)
    
}


export function toggleTheme(){
    let state = getState()

    state.isDark = !state.isDark;
    document.querySelector('html').classList.toggle('dark',state.isDark)
    if(state){
        update_state({isDark: state.isDark});
    }
}

export function count_completeion(){
    let state = getState();
    let compeleted = 0;
    state.habit.forEach(element => {
        if(element.isChecked){
            compeleted++
        }
    });
    return compeleted;
}