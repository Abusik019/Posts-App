import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostById } from "../../store/slices/posts";
import { EditPostForm } from "../../components/EditPostForm";
import editImg from "../../assets/edit.png";

function Post() {
    // const { postId } = useParams();
    const params = useParams();

    // console.log(useParams())

    const dispatch = useDispatch();
    const [postId, setPostId] = useState(null);
    const [post, setPost] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {

        console.log('Params value: ', params.postId)

        if(params.postId && !postId && postId !== params.postId){
            setPostId(params.postId)
        }
    }, [params.postId, postId])

    useEffect(() => {

        console.log('Fetching post id: ', postId)

        if(!postId) return;

        const fetchPost = async () => {
            try{
                const post = await dispatch(getPostById(postId)).unwrap();
                setPost(post);
            }catch(error){
                console.error('Error fetching post: ', error)
            }
        };

        fetchPost();

    }, [postId]);

    const showEditPostForm = (post) => {
        setSelectedPost(post);
    };

    if (!post) {
        return <h1 style={{ marginTop: "400px" }}>Loading...</h1>;
    }

    return (
        <div className={styles.post}>
            <div className={styles.postInfo}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <button onClick={() => showEditPostForm(post)}>
                    <img src={editImg} />
                </button>
            </div>
            {selectedPost !== null && (
                <EditPostForm selectedPost={selectedPost} setPost={setPost}/>
            )}
        </div>
    );
}

export default Post;
