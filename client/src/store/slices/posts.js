import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const API_URL = "https://6607e4cea2a5dd477b13a1b4.mockapi.io/api/v1";

const initialState = {
    list: [],
    loading: false,
    error: null,
};

// middleware (thunk)
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
        throw "Ошибка при получении постов";
    }

    return await response.json();
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw "Ошибка при удалении поста";
    }

    return await response.json();
});

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (newPost) => {
        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw "Ошибка при создании поста";
        }

        return await response.json();
    }
);

export const editPost = createAsyncThunk(
    "posts/editPost",
    async (editedPost) => {
        const response = await fetch(`${API_URL}/posts/${editedPost.id}`, {
            method: "PUT",
            body: JSON.stringify(editedPost),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw "Ошибка при редактировании поста";
        }

        return await response.json();
    }
);

export const getPostById = createAsyncThunk(
    "posts/getPostsById",
    async (postId) => {
        const response = await fetch(`${API_URL}/posts/${postId}`);

        if (!response.ok) {
            throw "Ошибка при получении поста";
        }

        return await response.json();
    }
);

export const editPostLike = createAsyncThunk(
    "posts/editPostLike",
    async (postId, { getState }) => {
        const state = getState();
        const post = state.posts.list.find((post) => post.id === postId);

        const editedPost = {
            ...post,
            liked: !post.liked,
        };

        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: "PUT",
            body: JSON.stringify(editedPost),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw "Ошибка при редактировании поста";
        }

        return await response.json();
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        // getPosts
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        // deletePost
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deletePost.fulfilled, (state, action) => {
            const deletedPostId = action.payload.id;

            state.list = state.list.filter((post) => {
                return post.id !== deletedPostId;
            });

            state.loading = false;
            state.error = null;
        });

        builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        // addNewPost
        builder.addCase(addNewPost.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addNewPost.fulfilled, (state, action) => {
            state.list.push(action.payload);

            state.loading = false;
            state.error = null;
        });

        builder.addCase(addNewPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        // editPost
        builder.addCase(editPost.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(editPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;

            const editedPost = action.payload;

            state.list = state.list.map((post) => {
                if (post.id === editedPost.id) {
                    return editedPost;
                }

                return post;
            });
        });

        builder.addCase(editPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        // getPostsById
        builder.addCase(getPostById.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getPostById.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getPostById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        // editPostLike
        builder.addCase(editPostLike.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(editPostLike.fulfilled, (state, action) => {
            const editedPost = action.payload;

            state.list = state.list.map((post) => {
                if (post.id === editedPost.id) {
                    return editedPost;
                }

                return post;
            });

            state.loading = false;
            state.error = null;
        });

        builder.addCase(editPostLike.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
