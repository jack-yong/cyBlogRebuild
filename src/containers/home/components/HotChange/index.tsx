import React, { useState } from 'react';
import { Button } from 'antd';
function App() {
    const [count, setCounts] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (e: any) => {
        setCounts(e.target.value);
    };
    return (
        <>
            <h2>webpack5+react+tss</h2>
            <p>受控组件sss</p>
            <input type='text' value={count} onChange={onChange} />
            <br />
            <p>非受控组</p>
            <input type='text' />
            <Button>Default Buttos n</Button>
            <Button type='primary'>Primary Buttosssn</Button>
        </>
    );
}
export default App;
