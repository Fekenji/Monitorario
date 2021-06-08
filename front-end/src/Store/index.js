import { createStore } from 'redux';

const INITIAL_STATE = {
    modules: 
        { raUsuario: '' }
    
}

function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'LOGIN') {
        return { modules: action.modules }
    }

    return state;
}

const store = createStore(reducer);

export default store;