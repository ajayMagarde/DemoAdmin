import React from 'react';

import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, TextField, Box } from '@mui/material';

import { useDispatch, useSelector } from 'store';
import { GetUsersAPI } from 'store/slices/user2';

// ==============================|| USER LIST 1 ||============================== //

const UserList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);
    const { userList2 } = useSelector((state) => state.user2);
    const [searchQuery, setSearchQuery] = React.useState('');  // State to hold the search query

    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const filteredData = data.filter((row) => {
        return row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.mobileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.status.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const indexOfLastRecord = (page + 1) * rowsPerPage;
    const indexOfFirstRecord = page * rowsPerPage;

    const slicedData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    // console.log(slicedData);
    // console.log(page, rowsPerPage);

    const PROXY = process.env.REACT_APP_API_URL;

    React.useEffect(() => {
        dispatch(GetUsersAPI()).then((res) => {
            setData(res.ResponseData);
        });
    }, []);



    return (
        <MainCard title="Users" content={false}>
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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>S.no.</TableCell>
                            {/* <TableCell>Profile</TableCell> */}
                            <TableCell>Title</TableCell>
                            <TableCell>Points</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedData &&
                            slicedData.map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{page * rowsPerPage + index + 1}</TableCell>
                                    {/* <TableCell>
                                        <Avatar
                                            src={`${PROXY}${row.profile_pic}`}
                                            sx={{
                                                ...theme.typography.mediumAvatar,
                                                margin: '8px 0 8px 8px !important',
                                                background:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main,
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                            aria-haspopup="true"
                                            color="secondary"
                                            alt="user-profile"
                                        />
                                    </TableCell> */}
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.points ? row.points : '-'}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
            />
        </MainCard>
    );
};

export default UserList;
