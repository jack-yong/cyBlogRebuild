import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import { marked } from 'marked';
import s from './index.mod.scss';
import { Input } from 'antd';

export interface MarkDownProps {
    content: string;
    // eslint-disable-next-line
    setContent: Function;
}
const MarkDown: React.FC<MarkDownProps> = ({ content, setContent }) => {
    const [htmldata, setHtmlData] = useState('');
    hljs.configure({
        classPrefix: 'hljs-'
        // languages: ['CSS', 'SCSS', 'HTML', 'JavaScript', 'TypeScript', 'Markdown']
    });

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: code => hljs.highlightAuto(code).value,
        gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
        // tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
        breaks: true // 默认为false。 允许回车换行。该选项要求 gfm 为true。
        // smartLists: true, // 使用比原生markdown更时髦的列表
    });

    useEffect(() => {
        const htmlcode = marked(content);
        setHtmlData(htmlcode);
    }, [content]);

    return (
        <div className={s.makedarea}>
            <Input.TextArea
                className={s.edit}
                onChange={e => {
                    setContent(e.target.value);
                }}
                value={content}
                placeholder='编辑内容'
            />

            <div
                className={s.showarea}
                dangerouslySetInnerHTML={{
                    __html: marked(htmldata || '').replace(/<pre>/g, "<pre class='hljs'>")
                }}
            ></div>
        </div>
    );
};

export default MarkDown;
