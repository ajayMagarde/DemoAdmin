import React from 'react';

// assets
import CloseIcon from '@mui/icons-material/Close';

// material-ui
import { Button, Modal, IconButton, Divider, CardContent } from '@mui/material';

// project imports
import Versions from './Versions';
import MainCard from 'ui-component/cards/MainCard';
import UpdateVersion from './UpdateVersions';

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

// ==============================|| Version ||============================== //

const Index = () => {
    const [data, setData] = React.useState([]);
    const versionsRef = React.useRef(null);

    const GetVersion = (data) => {
        setData(data);
    };

    const refreshVersions = () => {
        if (versionsRef.current) {
            versionsRef.current.refreshData();
        }
    };

    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MainCard
                title="Versions"
                secondary={
                    <Button variant="contained" onClick={handleModalOpen}>
                        Update Version
                    </Button>
                }
                content={false}
            >
                <Versions sendVersions={GetVersion} ref={versionsRef} />
            </MainCard>

            <MainCard>
                <Modal
                    open={open}
                    onClose={handleModalClose}
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
                        title="Update Version"
                        content={false}
                        secondary={
                            <IconButton onClick={handleModalClose} size="large">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        <CardContent>
                            <UpdateVersion data={data} handleModalClose={handleModalClose} refreshVersions={refreshVersions} />
                        </CardContent>
                        <Divider />
                    </MainCard>
                </Modal>
            </MainCard>
        </>
    );
};

export default Index;
