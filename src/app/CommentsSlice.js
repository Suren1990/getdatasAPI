import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/posts/1/comments';
const name = 'comments';

const initialState = {
    comments: [],
    status: ''
}

export const fetchComments = createAsyncThunk(
    `${name}/fetchComments`,
    async () => {
        try {
            const response = await axios.get(COMMENTS_URL);
            return response.data;
        } catch (err) {
            return err.message;
        }
    }
)

const commentsSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'success';
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
});

export const getComments = (state) => state.comments.comments;
export const getStatus = (state) => state.comments.status;

export default commentsSlice.reducer;
