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


export function updateHabit(idx, updates) {
    const state = getState();
    const newHabits = state.habit.map((h, i) => i === idx ? { ...h, ...updates } : h);
    update_state({ habit: newHabits });
    return newHabits; // optional, if you want to use the updated array immediately
}

