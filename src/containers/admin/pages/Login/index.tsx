import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Form, Button } from 'antd';
import React from 'react';
import { login } from '@/containers/admin/apis/user';
import { useRequest } from 'ahooks';
import { userInfoStore } from '@/containers/admin/store/account';
import { useNavigate } from 'react-router-dom';
import { userLoginCondition } from '../../interfaces/account';
import s from './index.mod.scss';
import { vistorUserInfo } from '../../utils/constant';

const index: React.FC = () => {
    const navigate = useNavigate();
    const useLogin = useRequest(login, {
        manual: true,
        onSuccess: data => {
            userInfoStore.userInfo = data.data;
            navigate('/');
        }
    });

    const onSubmit = (values: userLoginCondition) => {
        useLogin.run(values);
    };

    const visitorSubmit = () => {
        userInfoStore.userInfo = vistorUserInfo;
        navigate('/');
    };

    return (
        <div className={s.body}>
            <div className={s.container}>
                <h1>cyBlog后台管理</h1>
                <Form
                    name='loginForm'
                    className={s.loginBody}
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                message: '邮箱格式出错辣!'
                            },
                            {
                                required: true,
                                message: '邮箱内容不可以为空!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder='邮箱'
                            className={s.inputNormal}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type='password'
                            placeholder='密码'
                            className={s.inputNormal}
                        />
                    </Form.Item>

                    <div className={s.loginBtn}>
                        <Button type='primary' htmlType='submit' className={s.btnNormal}>
                            登录
                        </Button>

                        <Button type='primary' className={s.btnNormal} onClick={visitorSubmit}>
                            游客
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default index;
