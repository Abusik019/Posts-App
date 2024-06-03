import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../store/slices/posts";
import styles from "./style.module.css";

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

export const EditPostForm = ({ selectedPost, setPost }) => {
    const [formVisible, setFormVisible] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.posts.loading);

    const onFinish = async (values) => {
        try {
            await dispatch(
                editPost({
                    ...selectedPost,
                    title: values.title,
                    description: values.description,
                })
            ).unwrap();

            setFormVisible(false);
            setPost({...selectedPost, title: values.title, description: values.description});
            message.success("Пост успешно отредактирован!");
        } catch (error) {
            message.error("Ошибка при сохранении поста!");
        }
    };

    if (!formVisible) return null;

    return (
        <div className={styles.editFormContainer}>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                initialValues={{
                    title: selectedPost.title,
                    description: selectedPost.description,
                }}
                style={{
                    width: 800,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="title"
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
                    name="description"
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
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
