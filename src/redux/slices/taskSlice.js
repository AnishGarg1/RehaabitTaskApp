import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    tasksList: [],
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTasksList(state, action) {
            state.tasksList.push(action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
})

export const { setTasksList, setLoading } = taskSlice.actions;
export default taskSlice.reducer;