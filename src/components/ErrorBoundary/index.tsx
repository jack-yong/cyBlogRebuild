import React from 'react';
import { Result } from 'antd';
type StateType = {
    hasError: boolean;
};

type propType = {
    children: React.ReactNode;
};
export default class ErrorBoundary extends React.Component<propType, StateType> {
    constructor(props: propType) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return <Result status='404' title='未知错误' subTitle='抱歉, 页面发生了未知错误.' />;
        }
        return this.props.children;
    }
}
