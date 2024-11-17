import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// assets
import CloseIcon from '@mui/icons-material/Close';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Box, Button, Modal, IconButton, CardContent, Divider, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// project imports
import AvatarForm from './AvatarForm';
import MainCard from '../../ui-component/cards/MainCard';

// API calling
import { GetAvatarsAPI, DeleteAvatarAPI } from 'store/slices/avatar';
import { openSnackbar } from 'store/slices/snackbar';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

// ==============================|| Avatar ||============================== //

const Avatar = ({ handleFetchData }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const PROXY = process.env.REACT_APP_API_URL;

    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState({});

    const [modalStyle] = React.useState(getModalStyle);

    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleModalOpenEdit = (e) => {
        setOpenEdit(true);
        setSelectedAvatar(e);
    };

    const handleModalCloseEdit = () => {
        setOpenEdit(false);
        setSelectedAvatar({});
    };

    const handleModalOpenDelete = (e) => {
        setOpenDelete(true);
        setSelectedAvatar(e);
    };

    const handleModalCloseDelete = () => {
        setOpenDelete(false);
        setSelectedAvatar({});
    };

    const fetchData = () => {
        dispatch(GetAvatarsAPI()).then((res) => {
            setAvatars(res.ResponseData);
        });
    };

    useEffect(() => {
        fetchData();
        handleFetchData(fetchData);
    }, []);

    const DeleteAvatar = async () => {
        await dispatch(DeleteAvatarAPI({ _id: selectedAvatar._id })).then((res) => {
            if (res.succeeded === true) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        }
                    })
                );
                fetchData();
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'danger'
                        }
                    })
                );
            }
        });
        handleModalCloseDelete();
    };

    return (
        <>
            <Container>
                <Grid container spacing={2} sx={{ marginY: 1 }}>
                    {avatars.map((avatar) => (
                        <Grid item xs={12} sm={4} md={3} key={avatar._id}>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img
                                        src={`${PROXY}${avatar.path}`}
                                        width="100"
                                        height="100"
                                        alt="Avatar"
                                        style={{ borderRadius: '50%' }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginY: 1
                                    }}
                                >
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleModalOpenEdit(avatar)}
                                        size="large"
                                        sx={{ paddingX: 0.25 }}
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        size="large"
                                        onClick={() => handleModalOpenDelete(avatar)}
                                        sx={{ paddingX: 0.25 }}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Modal
                open={openEdit}
                onClose={handleModalCloseEdit}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, sm: 500 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Update Avatar"
                    content={false}
                    secondary={
                        <IconButton onClick={handleModalCloseEdit} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <AvatarForm data={selectedAvatar} handleModalCloseEdit={handleModalCloseEdit} fetchData={fetchData} />
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>

            <Modal
                open={openDelete}
                onClose={handleModalCloseDelete}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, sm: 500 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Delete Avatar"
                    content={false}
                    secondary={
                        <IconButton onClick={handleModalCloseDelete} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <Box>
                            <Typography sx={{ textAlign: 'center' }}>Are you sure you want to delete this Avatar?</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: 2 }}>
                                <Button variant="contained" sx={{ marginX: 1 }} onClick={handleModalCloseDelete}>
                                    Close
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginX: 1,
                                        backgroundColor: theme.palette.error.main,
                                        '&:hover': {
                                            backgroundColor: theme.palette.error.main
                                        }
                                    }}
                                    onClick={DeleteAvatar}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>
        </>
    );
};

export default Avatar;
