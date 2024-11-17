import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, TextField, Box } from '@mui/material';

import { useDispatch, useSelector } from 'store';
import { GetUsersAPI } from 'store/slices/user1';

// ==============================|| USER LIST 1 ||============================== //

const OfferUserList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);
    const { userList1 } = useSelector((state) => state.user1);
    const [searchQuery, setSearchQuery] = React.useState('');  // State to hold the search query

    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    React.useEffect(() => {
        dispatch(GetUsersAPI()).then((res) => {
            setData(res.ResponseData);
        });
    }, [dispatch]);

    // Filter data based on the search query (case-insensitive)
    const filteredData = data.filter((row) => {
        return row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.mobileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.status.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Pagination logic: get the data for the current page
    const indexOfLastRecord = (page + 1) * rowsPerPage;
    const indexOfFirstRecord = page * rowsPerPage;
    const slicedData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
        <MainCard title="Offer Utilized Users" content={false}>
            {/* Container for Search Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <TextField
                    label="Search by name OR Mobile number"
                    variant="outlined"
                    size="small"  // Reduce the size of the search bar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  // Update search query on input change
                    sx={{
                        width: '250px',   // Set a fixed width for the search bar
                    }}
                />
            </Box>

            {/* Table Container */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>S.no.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedData &&
                            slicedData.map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.mobileNumber ? row.mobileNumber : '-'}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={filteredData.length}  // Use filtered data length for total count
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
            />
        </MainCard>
    );
};

export default OfferUserList;
