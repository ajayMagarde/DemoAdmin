import React, { useState } from 'react';

// assets
import CloseIcon from '@mui/icons-material/Close';

// material-ui
import { Button, Modal, IconButton, CardContent, Divider } from '@mui/material';

// project imports
import Avatar from './Avatar';
import AvatarForm from './AvatarForm';
import MainCard from '../../ui-component/cards/MainCard';

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

const Index = () => {
    const [fetchData, setFetchData] = useState(() => () => {});

    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleFetchData = (fetchFunction) => {
        setFetchData(() => fetchFunction);
    };

    return (
        <>
            <MainCard
                title="Avatars"
                secondary={
                    <Button variant="contained" onClick={handleModalOpen}>
                        Add Avatar
                    </Button>
                }
                content={false}
            >
                <Avatar handleFetchData={handleFetchData} />
            </MainCard>

            <Modal open={open} onClose={handleModalClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, sm: 500 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Add Avatar"
                    content={false}
                    secondary={
                        <IconButton onClick={handleModalClose} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <AvatarForm handleModalClose={handleModalClose} fetchData={fetchData} />
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>
        </>
    );
};

export default Index;
