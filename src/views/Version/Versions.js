import React, { forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'store';

import { Grid, Typography, Avatar, Box } from '@mui/material';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';

import { GetVersionsAPI } from 'store/slices/version';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const Versions = forwardRef(({ sendVersions }, ref) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [data, setData] = React.useState([]);

    const fetchData = () => {
        dispatch(GetVersionsAPI()).then((res) => {
            setData(res.ResponseData);
        });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        sendVersions(data);
    }, [data]);

    useImperativeHandle(ref, () => ({
        refreshData: fetchData
    }));

    return (
        <MainCard>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
                <Grid container spacing={gridSpacing} sx={{ maxWidth: 'md', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6}>
                        <SubCard sx={{ borderColor: 'black', paddingY: 1, height: '8rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor:
                                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main,
                                        mt: 1
                                    }}
                                >
                                    <AndroidIcon sx={{ fontSize: 100, color: 'white', paddingX: 3, paddingY: 3.5 }} />
                                </Avatar>
                                <Box sx={{ display: 'block', paddingY: 1 }}>
                                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 1 }}>
                                        Android Minimum Version
                                    </Typography>
                                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                        {data.android_minimum_version}
                                    </Typography>
                                </Box>
                            </Box>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard sx={{ borderColor: 'black', paddingY: 1, height: '8rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor:
                                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main,
                                        mt: 1
                                    }}
                                >
                                    <AndroidIcon sx={{ fontSize: 100, color: 'white', paddingX: 3, paddingY: 3.5 }} />
                                </Avatar>
                                <Box sx={{ display: 'block', paddingY: 1 }}>
                                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 1 }}>
                                        Android Latest Version
                                    </Typography>
                                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                        {data.android_latest_version}
                                    </Typography>
                                </Box>
                            </Box>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard sx={{ borderColor: 'black', paddingY: 1, height: '8rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor:
                                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main,
                                        mt: 1
                                    }}
                                >
                                    <AppleIcon sx={{ fontSize: 100, color: 'white', paddingX: 3, paddingY: 3.5 }} />
                                </Avatar>
                                <Box sx={{ display: 'block', paddingY: 1 }}>
                                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 1 }}>
                                        iOS Minimum Version
                                    </Typography>
                                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                        {data.ios_minimum_version}
                                    </Typography>
                                </Box>
                            </Box>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard sx={{ borderColor: 'black', paddingY: 1, height: '8rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor:
                                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main,
                                        mt: 1
                                    }}
                                >
                                    <AppleIcon sx={{ fontSize: 100, color: 'white', paddingX: 3, paddingY: 3.5 }} />
                                </Avatar>
                                <Box sx={{ display: 'block', paddingY: 1 }}>
                                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 1 }}>
                                        iOS Latest Version
                                    </Typography>
                                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                        {data.ios_latest_version}
                                    </Typography>
                                </Box>
                            </Box>
                        </SubCard>
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    );
});

export default Versions;
