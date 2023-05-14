import React, { useEffect } from 'react';
import s from './index.mod.scss';
import Card from '../../components/Card';
import { linkBase, linkType } from '../../interfaces/link';
import { useRequest } from 'ahooks';
import { fetchLinkInfo } from '../../apis/link';

const Link = () => {
    const useLinkList = useRequest(fetchLinkInfo, { manual: true });

    const linkData = useLinkList.data?.data;
    useEffect(() => {
        useLinkList.run();
    }, []);

    function listItem(list: linkBase[], type: linkType) {
        const ListArr = list.map((element: linkBase) => {
            if (element.linkType === type) {
                return (
                    <div className={s.linkitem} key={element.linkId}>
                        <a
                            href={element.linkUrl}
                            rel='noreferrer'
                            target={'_blank'}
                            className={s.linkto}
                        >
                            <div className={s.left}>
                                <img src={element.linkAvater} alt='' className={s.avatar}></img>
                            </div>
                            <div className={s.right}>
                                <span className={s.title}>{element.linkName}</span>
                                <span className={s.desc}>{element.linkDescription}</span>
                            </div>
                        </a>
                    </div>
                );
            }
        });

        return ListArr;
    }

    return (
        <Card className={s.link} isStatic={true}>
            <div className={s.allKinds}>
                <div className={s.linkcontent} key='friendlink'>
                    <div className={s.linktitle}>友链</div>
                    <div className={s.linkList}>
                        {linkData && listItem(linkData as linkBase[], linkType.friend)}
                    </div>
                </div>

                <div className={s.linkcontent} key='recomdation'>
                    <div className={s.linktitle}>友链</div>
                    <div className={s.linkList}>
                        {linkData && listItem(linkData as linkBase[], linkType.recommend)}
                    </div>
                </div>

                <div className={s.linkcontent} key='ltool'>
                    <div className={s.linktitle}>友链</div>
                    <div className={s.linkList}>
                        {linkData && listItem(linkData as linkBase[], linkType.tool)}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Link;
