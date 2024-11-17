// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconBuildingArch,
    IconBuildingCommunity,
    IconTower,
    IconVersions,
    IconHistory,
    IconChartInfographic,
    IconTargetArrow,
    IconUser,
    IconPuzzle,
    IconBrandAsana,
    IconBook2,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics
} from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconBuildingArch,
    IconBuildingCommunity,
    IconTower,
    IconPuzzle,
    IconHistory,
    IconChartInfographic,
    IconTargetArrow,
    IconUser,
    IconVersions,
    IconBrandAsana,
    IconBook2,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const AdminDashboard = {
    id: 'dashboard',
    // title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    // caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'item',
            url: '/users',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'offers',
            title: <FormattedMessage id="offers" />,
            type: 'item',
            url: '/offers',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        // {
        //     id: 'offer-users',
        //     title: <FormattedMessage id="offer-users" />,
        //     type: 'item',
        //     url: '/offer-users',
        //     icon: icons.IconUser,
        //     breadcrumbs: false
        // },
        {
            id: 'version',
            title: <FormattedMessage id="version" />,
            type: 'item',
            url: '/version',
            icon: icons.IconVersions,
            breadcrumbs: false
        }
    ]
};

export default AdminDashboard;
