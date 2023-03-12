import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { message, Modal } from 'antd';

// type FnVoid = () => void;

axios.defaults.withCredentials = false;

const allPendingRequest: any[] = [];
const removeAllPendingRequest = function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    allPendingRequest &&
        allPendingRequest.forEach(func => {
            func();
        });
    allPendingRequest.splice(0);
};

export const getConfirmation = (callBack?: any) => {
    removeAllPendingRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    callBack && callBack();
};

const request = axios.create({
    timeout: Number(process.env.TIMEOUT),
    data: {},
    baseURL: `${process.env.BASE_API}`
});

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');

        if (config.headers && token) {
            config.headers.Authorization = token;
        }

        config.cancelToken = new axios.CancelToken(c => {
            allPendingRequest.push(c);
        });
        return config;
    },
    error => Promise.reject(error)
);

request.interceptors.response.use(
    response => {
        const res = response.data;
        if (+res.code !== 200) {
            switch (res.code) {
                case '200':
                    return response.data;
                case '201':
                    message.error(res.msg, 2);
                    break;
                case '401':
                    getConfirmation();
                    Modal.error({
                        title: '系统提示',
                        content: '用户验证失败',
                        onOk() {
                            // router.replace('login')
                        },
                        okText: '重新登录'
                    });

                    break;
                case '402':
                case '403':
                    break;
                case '404':
                    // router.replace('404')
                    break;
                default:
                    message.error(res.msg, 2);
                    break;
            }

            return Promise.reject(res);
        }
        return response;
    },
    error => {
        switch (error.response && error.response.status) {
            case 404:
                // navigate('404')
                break;
            case 500:
                message.error(error.message, 2);
                break;
            default:
                message.error(error.message, 2);

                break;
        }
        return Promise.reject(error);
    }
);

export default request;
