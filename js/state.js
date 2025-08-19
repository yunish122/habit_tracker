let state = JSON.parse(localStorage.getItem('states')) || {
    isDark: false,
    habit: [],
    total: 0
}

export function getState(){
    return state
}

export function update_state(updated_state){
    state = {...state, ...updated_state}
    localStorage.setItem('states',JSON.stringify(state))
}