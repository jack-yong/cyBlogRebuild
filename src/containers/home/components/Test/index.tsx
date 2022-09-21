import React, { PureComponent } from 'react';
import smallImg from '@/containers/home/assets/images/5kb.png';
import bigImg from '@/containers/home/assets/images/22kb.png';
import s from './index.mod.scss';
import './index.scss';

// 装饰器为,组件添加age属性
// eslint-disable-next-line @typescript-eslint/ban-types
function addAge(Target: Function) {
    Target.prototype.age = 123;
    Target.prototype.name = 'caicai';
}
// 使用装饰圈
@addAge
class Test extends PureComponent {
    age?: number;
    name?: string;
    render() {
        return (
            <>
                <h2 className={s.test}>
                    我是类组件---{this.age} 名字是---{this.name}
                </h2>
                <h3 className='name1'>绿色的ss</h3>
                <img src={smallImg} alt='小于10kb的图片' />
                <img src={bigImg} alt='大于于10kb的图片' />
            </>
        );
    }
}

export default Test;
