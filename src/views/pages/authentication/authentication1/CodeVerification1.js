import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthCodeVerification from '../auth-forms/AuthCodeVerification';

// assets
import { useEffect, useState } from 'react';
import { LOGIN_PATH } from 'config';

// ===========================|| AUTH1 - CODE VERIFICATION ||=========================== //

const CodeVerification = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const initialTimer = 1 * 60;
    const [timer, setTimer] = useState(initialTimer);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate(LOGIN_PATH, { replace: true });
            localStorage.removeItem('adminToken');
        }, 1 * 60 * 1000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item container justifyContent="center" md={12} lg={12} sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item sx={{ mb: 3, justifyContent: 'center' }}>
                                <Link to="#" aria-label="theme-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                                    <Logo />
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography color={theme.palette.primary[800]} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                Verify Code
                                            </Typography>
                                            <Typography variant="h6" fontSize="14px">
                                                Please enter OTP provided to you
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <AuthCodeVerification />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default CodeVerification;
