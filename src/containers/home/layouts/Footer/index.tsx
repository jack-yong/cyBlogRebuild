import React from 'react';
import { Button, Layout } from 'antd';
const { Footer } = Layout;

const CustomFooter: React.FC = () => {
    return (
        <Footer
            style={{
                textAlign: 'center'
            }}
        >
            cyongBlog主页面 <Button type='link'>github</Button>
        </Footer>
    );
};

export default CustomFooter;
