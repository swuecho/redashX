import React, { useState, useEffect, lazy } from 'react';
import shortid from 'shortid';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import route from './router';

// page loader
const importPage = (pageName: string) =>
    lazy(() =>
        import(`./pages${pageName}`).catch(() =>
            import(`./pages/home`)
        )
    );

interface PageName {
    pageName: string
}

function LoadPage({ pageName }: PageName) {
    const [page, setPage] = useState([]);
    useEffect(() => {
        async function loadPage() {
            console.log(pageName)
            const Page = await importPage(pageName);
            return <Page key={shortid.generate()} />;
        }
        // @ts-ignore 
        loadPage().then(setPage)
    }, [pageName]);
    return (
        <React.Suspense fallback="Loading views...">
            <div className="container">{page}</div>
        </React.Suspense>
    );
}

function ProHome() {
    const [settings] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
    const [pathname, setPathname] = useState('/welcome');


    return <div
        id="test-pro-layout"
        style={{
            height: '100vh',
        }}
    >
        <ProLayout
            route={route}
            location={{
                pathname,
            }}
            /* set path
            onPageChange= {
                const { location } = history;
                // 如果没有登录，重定向到 login
                history.push(loginPath);
            },
            */
            menuFooterRender={(props) => {
                return (
                    <a
                        style={{
                            lineHeight: '48rpx',
                            display: 'flex',
                            height: 48,
                            color: 'rgba(255, 255, 255, 0.65)',
                            alignItems: 'center',
                        }}
                        href="https://preview.pro.ant.design/dashboard/analysis"
                        target="_blank"
                        rel="noreferrer"
                    >
                    </a>
                );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
                <a
                    onClick={() => {
                        console.log(dom);
                        console.log(item);
                        setPathname(item.path || '/welcome');
                    }}
                >
                    {dom}
                </a>
            )}
            rightContentRender={() => (
                <div>
                    <Avatar shape="square" size="small" icon={<UserOutlined />} />
                </div>
            )}
            {...settings}
        >
            <LoadPage pageName={pathname}></LoadPage>
        </ProLayout>
    </div>

}

export default ProHome;