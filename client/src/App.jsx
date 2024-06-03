import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import AboutProjectPage from "./pages/AboutProjectPage";
import Post from "./pages/PostPage";
import { Header } from "./components/Header";

function App() {
    const posts = useSelector((state) => state.posts.list);
    const loading = useSelector((state) => state.posts.loading);

    const isFirstLoading = loading && posts.length === 0;

    return (
        <>
            <Header />
            {isFirstLoading ? (
                <h1 style={{marginTop: '200px'}}>Loading...</h1>
            ) : (
                <>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/posts" element={<PostsPage />} />
                        <Route
                            path="/about_project"
                            element={<AboutProjectPage />}
                        />
                        <Route path="/post/:postId" element={<Post />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
