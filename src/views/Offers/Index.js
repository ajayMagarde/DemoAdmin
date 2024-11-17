import React from 'react';
import { Button, Modal, IconButton, Divider, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch } from 'store';
import { GetOffersAPI } from 'store/slices/offers';

import Offers from './Offers';
import MainCard from 'ui-component/cards/MainCard';
import OfferForm from './OfferForm';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const Index = () => {
    const dispatch = useDispatch();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
        dispatch(GetOffersAPI()); // Refresh offers after modal close
    };

    return (
        <>
            <MainCard
                title="Offers"
                secondary={
                    <Button variant="contained" onClick={handleModalOpen} color="secondary">
                        Add Offer
                    </Button>
                }
                content={false}
            >
                <Offers />
            </MainCard>
            <Modal open={open} onClose={handleModalClose}>
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, sm: 500 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Add Offer"
                    secondary={
                        <IconButton onClick={handleModalClose} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <OfferForm handleModalClose={handleModalClose} />
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>
        </>
    );
};

export default Index;
