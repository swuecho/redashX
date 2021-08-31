import React, { useState } from 'react';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import route from './router';
import { PageLoading } from '@ant-design/pro-layout';
import PageContainerX from "./pages/PageContainTable";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";


import MyProTable from "./components/demo/ProEditTable";
import ExcelView from "./bestqa/Excel";

import { Card, Col, Row } from 'antd';


// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}


export const initialStateConfig = {
    loading: <PageLoading />,
};

function ViewExecl() {
    let query = useQuery();
    let name = query.get('name')
    let eid = query.get('eid')
    if (name && eid) {
        return <ExcelView name={name} eid={eid as unknown as number}></ExcelView>
    }
    return null;
}
function Home() {
    return <div className="site-card-wrapper">
        <Row gutter={16}>
            <Col span={6}>
                <Card title="Table" bordered={false}>
                    <Link to="/table">Table</Link>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Card title" bordered={false}>
                    <Link to="/about">About</Link>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Card title" bordered={false}>
                    <Link to="/users">Users</Link>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Excel" bordered={false} extra={<a href="#">O</a>}>
                    <Link to="/excel?eid=1&name=test">Excel</Link>
                </Card>
            </Col>
        </Row>
    </div>
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
            <PageContainerX />
        </ProLayout>
    </div>

}

export default () => {

    return (
        <div className="App">
            <Router basename="/react" >
                {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <MyProTable />
                    </Route>
                    <Route path="/users">
                        <MyProTable />
                    </Route>
                    <Route path="/excel">
                        <ViewExecl></ViewExecl>
                    </Route>
                    <Route path="/table">
                        <MyProTable />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/">
                        <ProHome />
                    </Route>
                </Switch>
            </Router>
        </div>

    );
};