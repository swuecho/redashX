import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import route from './router';

import PageLoader from './PageLoader';
import { useHistory } from "react-router-dom";


import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom"
import path from 'path/posix';

function ProHome() {
    let history = useHistory();
    let location = useLocation();
    let init_pathname = location.pathname.replace('/page', '')
    console.log(init_pathname)
    if (!init_pathname) {
        init_pathname = '/welcome'
    }

    const [settings] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
    const [pathname, setPathname] = useState(init_pathname);
    console.log(pathname)


    return <div
        id="bestqa-pro-layout"
        style={{
            height: '100vh',
        }}
    >
        <ProLayout
            route={route}
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
                        history.push(item.path || '/welcome');
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
            <PageLoader pageName={pathname} />
        </ProLayout>
    </div>

}

export default ProHome;