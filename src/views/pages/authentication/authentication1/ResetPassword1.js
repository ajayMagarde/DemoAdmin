import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthResetPassword from '../auth-forms/AuthResetPassword';

// ============================|| AUTH1 - RESET PASSWORD ||============================ //

const ResetPassword = () => {
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
                                                Reset Password
                                            </Typography>
                                            <Typography color="textPrimary" gutterBottom variant="h4">
                                                Please choose new password.
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <AuthResetPassword />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default ResetPassword;
