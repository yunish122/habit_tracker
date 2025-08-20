
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

// helper function to create element
export function create_element(dom, classes = []){
    const element = document.createElement(dom);
    element.classList.add(...classes);
    return element;
}
// create icons
export function createIcon(attr = [],classes = []){
    const icons = create_element('i',[...classes]);
    icons.setAttribute(...attr)
    return icons
}