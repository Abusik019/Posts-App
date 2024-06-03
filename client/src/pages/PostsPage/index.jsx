import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPostLike, getPosts } from "../../store/slices/posts";
import { NavLink } from "react-router-dom";
import whiteLike from '../../assets/white_like.png';
import redLike from '../../assets/red_like.png';
import { AddPostForm } from './../../components/AddPostForm';
import add from "../../assets/add.png";
import read from "../../assets/read.png";
import deleteImg from "../../assets/delete.png";

function Posts() {
    const [isShowForm, setIsShowForm] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.list);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    const handlePostDeletion = (id) => {
        dispatch(deletePost(id));
    };

    const handlePostEditLike = (id) => {
        dispatch(editPostLike(id));
    };

    if (error) return <h2>{error.message}</h2>;

    if (loading === false && posts.length === 0) {
        return <h1>Нет данных</h1>;
    }

    return (
        <div className={styles.posts}>
            <div className={styles.addPost}>
                <h1>Посты</h1>
                <button onClick={() => {setIsShowForm(true)}}>
                    <img src={add} />
                </button>
            </div>
            {isShowForm && <AddPostForm  setIsShowForm={setIsShowForm}/>}
            <ul
                className={styles.postsList}
            >
                {posts.map((post) => (
                    <li key={post.id}>
                        <div className={styles.postTitleContainer}>
                            <h1>{post.title}</h1>
                            <button
                                onClick={() => {
                                    handlePostEditLike(post.id)
                                }}
                            >
                                <img src={post.liked ? redLike : whiteLike}/>
                            </button>
                        </div>
                        <div className={styles.postActions}>
                            <NavLink to={`/post/${post.id}`}>
                                <button>
                                    <img src={read} />
                                </button>
                            </NavLink>
                            <button
                                onClick={() => {
                                    handlePostDeletion(post.id);
                                }}
                            >
                                <img
                                    src={deleteImg} 
                                    style={{ width: "60px" }}
                                />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Posts;
