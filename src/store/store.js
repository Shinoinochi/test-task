import { createStore } from 'redux';

const reducer = (state = [], action) => {
    switch (action.type) {
        case "GET_FILES":
            return {...state, files: action.files} 
        default: 
            return state;
    }
}
const store = createStore(reducer);
export default store

