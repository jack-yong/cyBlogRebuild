import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Result404() {
    const navigate = useNavigate();
    return (
        <Result
            status='404'
            title='404'
            subTitle='抱歉, 您访问的页面不存在!'
            extra={
                <Button type='primary' onClick={() => navigate('home')}>
                    主页
                </Button>
            }
        />
    );
}
