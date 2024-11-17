import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Modal,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { useDispatch, useSelector } from 'store';
import { GetOffersAPI } from 'store/slices/offers';
import OfferForm from './OfferForm';
import MainCard from 'ui-component/cards/MainCard';

const getModalStyle = () => {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
};

const Offers = () => {
    const dispatch = useDispatch();
    const { offers = [], loading = false } = useSelector((state) => state.offers || {});
    const [modalStyle] = useState(getModalStyle);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    console.log(offers);

    useEffect(() => {
        dispatch(GetOffersAPI());
    }, [dispatch]);

    const handleEditClose = () => {
        setOpenEdit(false);
        setSelectedOffer(null);
    };

    const renderTableContent = () => {
        if (loading) {
            return <Typography sx={{ textAlign: 'center', mt: 3 }}>Loading Offers...</Typography>;
        }

        if (!offers.length) {
            return <Typography sx={{ textAlign: 'center', mt: 3 }}>No Offers Found!</Typography>;
        }

        return offers.map((offer, index) => (
            <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{offer.title}</TableCell>
                <TableCell>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${offer.offerPic}`}
                        alt="offerPic"
                        height={50}
                        width={50}
                        style={{ borderRadius: '50%' }}
                    />
                </TableCell>
                <TableCell>{offer.points}</TableCell>
                <TableCell>
                    <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => {
                            setSelectedOffer(offer);
                            setOpenEdit(true);
                        }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Offer Image</TableCell>
                            <TableCell>Points</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableContent()}</TableBody>
                </Table>
            </TableContainer>

            <Modal open={openEdit} onClose={handleEditClose}>
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, sm: 500 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Edit Offer"
                    secondary={
                        <IconButton onClick={handleEditClose}>
                            <CloseIcon />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <OfferForm data={selectedOffer} handleModalClose={handleEditClose} />
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>
        </>
    );
};

export default Offers;
