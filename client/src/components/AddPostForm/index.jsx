import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../store/slices/posts";
import styles from "./style.module.css";
import { useState } from "react";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: "Поле ${label} обязательно!",
};

export const AddPostForm = ({setIsShowForm}) => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState(true);

    const loading = useSelector((state) => state.posts.loading);

    const onFinish = ({ post }) => {
        dispatch(
            addNewPost({
                title: post.title,
                description: post.description,
                liked: false,
                thumbnail: "https://loremflickr.com/640/480/people",
            })
        );

        setFormVisible(false);
    };

    if (!formVisible) return null;

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.AddPostForm}>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        width: 600,
                        paddingRight: 100
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={["post", "title"]}
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={["post", "description"]}
                        label="Description"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                        <Button loading={loading} type="primary" htmlType="submit">
                            Создать пост
                        </Button>
                    </Form.Item>
                </Form>
                <button className={styles.closeForm} onClick={() => {setIsShowForm(false)}}>&#10006;</button>
            </div>
        </>
    );
};
