import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import route from './router';
import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom"

import PageLoader from './PageLoader';


function ProHome() {
    let location = useLocation();
    let init_pathname = location.pathname.replace('/react/page', '')
    console.log(init_pathname)
    if (!!init_pathname) {
        init_pathname = '/welcome'
    }

    const [settings] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
    const [pathname, setPathname] = useState(init_pathname);


    return <div
        id="bestqa-pro-layout"
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
                        window.location.pathname = `/react/page${pathname}`;
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