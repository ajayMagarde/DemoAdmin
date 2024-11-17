import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';

// assets
import LoginAuth from '../auth-forms/LoginAuth';

// ================================|| AUTH1 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }} style={{ "background": "#94beed" }}>
                <Grid item container justifyContent="center" md={12} lg={12} sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item sx={{ mb: 3 }}>
                                <Link to="#" aria-label="theme-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: 1 }}>
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
                                                Hi, Welcome
                                            </Typography>
                                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                                Enter your credentials to continue
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <LoginAuth />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
