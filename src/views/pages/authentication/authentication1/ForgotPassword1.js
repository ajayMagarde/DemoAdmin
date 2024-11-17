import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthForgotPassword from '../auth-forms/AuthForgotPassword';

// ============================|| AUTH1 - FORGOT PASSWORD ||============================ //

const ForgotPassword = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item container justifyContent="center" md={12} lg={12} sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item sx={{ mb: 3, justifyContent: 'center' }}>
                                <Link to="#" aria-label="theme-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                                    <Logo />
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column-reverse" alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Stack justifyContent="center" textAlign="center">
                                            <Typography color={theme.palette.primary[800]} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                Forgot password?
                                            </Typography>
                                            <Typography color="textPrimary" gutterBottom variant="h4">
                                                Enter credentials to continue
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent={matchDownSM ? 'center' : 'flex-start'}>
                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                        Enter your email address below and we&apos;ll send you password reset OTP.
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AuthForgotPassword />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default ForgotPassword;
