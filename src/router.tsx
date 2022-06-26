import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

// where does the Welcome component come from

const route =
{
    path: '/',
    routes: [
        {
            path: '/welcome',
            name: '欢迎',
            icon: <SmileOutlined />,
        },
        {
            path: '/admin',
            name: '管理页',
            icon: <CrownOutlined />,
            // access: 'canAdmin',
            routes: [
                {
                    path: '/admin/sub-page1',
                    name: '一级页面',
                    icon: <CrownOutlined />,
                },
                {
                    path: '/admin/sub-page2',
                    name: '二级页面x',
                    icon: <CrownOutlined />,
                },
                {
                    path: '/admin/sub-page3',
                    name: '三级页面',
                    icon: <CrownOutlined />,
                },
            ],
        },
        {
            path: '/report',
            name: '报告',
            icon: <AntDesignOutlined/>,
            // access: 'canAdmin',
            routes: [
                {
                    path: 'StockCb',
                    name: '可转债',
                    icon: <CrownOutlined />,
                },
                {
                    path: 'SurveyPerformance',
                    name: '问卷性能',
                    icon: <CrownOutlined />,
                },
                {
                    path: 'RedashTableDemo',
                    name: '三级页面',
                    icon: <CrownOutlined />,
                },
            ],
        },
        {
            name: '列表页',
            icon: <TabletOutlined />,
            path: '/list',
            routes: [
                {
                    path: '/list/sub-page',
                    name: '一级列表页面',
                    icon: <CrownOutlined />,
                    routes: [
                        {
                            path: 'sub-sub-page1',
                            name: '一一级列表页面',
                            icon: <CrownOutlined />,
                        },
                        {
                            path: 'sub-sub-page2',
                            name: '一二级列表页面',
                            icon: <CrownOutlined />,
                        },
                        {
                            path: 'sub-sub-page3',
                            name: '一三级列表页面',
                            icon: <CrownOutlined />,
                        },
                    ],
                },
                {
                    path: '/list/sub-page2',
                    name: '二级列表页面',
                    icon: <CrownOutlined />,
                },
                {
                    path: '/list/sub-page3',
                    name: '三级列表页面',
                    icon: <CrownOutlined />,
                },
            ],
        },
        /*
        {
            // TODO: link to outside does not work
            path: 'https://ant.design',
            name: 'Ant Design 外链',
            target: '_blank',
            icon: <AntDesignOutlined />,
        },
        */
    ],
};
export default route