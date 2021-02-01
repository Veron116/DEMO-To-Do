export default {
    state: {
        notesList: [],
    },
    mutations: {
        setNote(state, notes) {
            // console.log('before ', state.notesList);
            // state.notesList.push(note);
            // console.log('after ',state.notesList);
            state.notesList = notes;
        }
    },
    actions: {
        setNote({commit}, payload) {
            commit('setNote', payload);
        }
    },
    getters: {
        getNotesList(state) {
            return state.notesList
        }
    },
}