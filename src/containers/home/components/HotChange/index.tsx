import React, { useState } from 'react';

function App() {
    const [count, setCounts] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (e: any) => {
        setCounts(e.target.value);
    };
    return (
        <>
            <h2>webpack5+react+ts</h2>
            <p>受控组件</p>
            <input type='text' value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type='text' />
        </>
    );
}
export default App;
