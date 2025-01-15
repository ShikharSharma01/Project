import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Link, Navigate, json } from 'react-router-dom';
import { FormControl, InputLabel, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import userImage from '../assests/user.png'

const pages = [
    { title: 'Home', path: "/" },
    { title: 'ContactUs', path: '/contactus' },
    { title: 'SignUp', path: '/signup' },
    { title: 'Login', path: '/login' }
];
const settings = [
    { title: 'Profile', path: "/contactus" },
    { title: 'Logout', path: '/login' }
];


//     'Andaman and Nicobar',
//     'Andhra Pradesh',
//     'Arunachal Pradesh',
//     'Assam',
//     'Bihar',
//     'Chandigarh',
//     'Chhattisgarh',
//     'Delhi',
//     'Goa',
//     'Gujarat',
//     'Haryana',
//     'Himachal Pradesh',
//     'Jammu and Kashmir',
//     'Jharkhand',
//     'Karnataka',
//     'Kerala',
//     'Ladakh',
//     'Lakshadweep',
//     'Madhya Pradesh',
//     'Maharashtra',
//     'Manipur',
//     'Meghalaya',
//     'Mizoram',
//     'Nagaland',
//     'Odisha',
//     'Puducherry',
//     'Punjab',
//     'Rajasthan',
//     'Sikkim',
//     'Tamil Nadu',
//     'Telangana',
//     'Tripura',
//     'Uttar Pradesh',
//     'Uttarakhand',
//     'West Bengal'
// ];
const citiesInIndia = [
    {
        state: 'Andaman and Nicobar',
        cities: ['Port Blair', 'South Andaman', 'North and Middle Andaman']
    },
    {
        state: 'Andhra Pradesh',
        cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kakinada']
    },
    {
        state: 'Arunachal Pradesh',
        cities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang']
    },
    {
        state: 'Assam',
        cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur']
    },
    {
        state: 'Uttar Pradesh',
        cities: [{ id: '2', name: 'Lucknow' },
            // 'Agra',
            // 'Aligarh',
            // 'Allahabad',
            // 'Amroha',
            // 'Azamgarh',
            // 'Bareilly',
            // 'Basti',
            // 'Bijnor',
            // 'Bulandshahr',
            // 'Chandauli',
            // 'Etawah',
            // 'Faizabad',
            // 'Farrukhabad',
            // 'Fatehpur',
            // 'Firozabad',
            // 'Ghaziabad',
            // 'Gonda',
            // 'Gorakhpur',
            // 'Hapur',
            // 'Hardoi',
            // 'Jaunpur',
            // 'Jhansi',
            // 'Kannauj',
            // 'Kanpur',
            // 'Lakhimpur',
            // 'Lucknow',
            // 'Mathura',
            // 'Meerut',
            // 'Mirzapur',
            // 'Moradabad',
            // 'Muzaffarnagar',
            // 'Noida',
            // 'Pilibhit',
            // 'Prayagraj',
            // 'Rampur',
            // 'Saharanpur',
            // 'Shahjahanpur',
            // 'Sitapur',
            // 'Sultanpur',
            // 'Varanasi'
        ]
    },
    // Add more states and cities as needed
];

function Navbar(props) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [state, setState] = React.useState(0);
    const [statesInIndia, setStateInIndia] = React.useState([]);
    const [selectedCities, setSelectedCities] = React.useState(0);
    const [userName, setUserName] = React.useState(undefined);
    const [citiesOption, setCitiesOption] = React.useState([]);
    const [userData, setUserData] = React.useState('');

    const navigate = useNavigate();
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleChangeSelect = (e) => {
        if (e.target.name === 'state') {
            setState(e.target.value)
            const stateObject = citiesInIndia.find(state => state.state === e.target.value)
            setCitiesOption(stateObject ? stateObject.cities : [])
        } else {
            setSelectedCities(e.target.value)
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('userDetails')
        setUserName(undefined)
        navigate('/home')
    }

    const handleCityId = async (stateId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/${stateId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                // body: JSON.stringify(signInData),
            });
            console.log(response)


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }


            // resetForm();
            const responseData = await response.json();
            setCitiesOption(responseData)

            // sessionStorage.setItem('userDetails', JSON.stringify(responseData));

            // navigate('/home')
            // Handle successful response here
            // const responseData = await response.json();
            // console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleState = async () => {
        try {

            const response = await fetch("http://127.0.0.1:8080");
            const states = await response.json();
            console.log(states);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setStateInIndia(states)


        } catch (error) {

        }
    }

    React.useEffect(() => {
        if (state > 0 && selectedCities > 0) {
            navigate('/restorantList', { state: selectedCities })
        }
    }, [state, selectedCities, navigate])


    const handleNavigate = (e) => {
        e.preventDefault();
        // debugger
        console.log(userData)
        const path = userName !== undefined && userData === 'ROLE_CUSTOMER' ? '/contactus' : '/owner'
        navigate(path, { state: selectedCities })
    }


    React.useEffect(() => {
        const userData = sessionStorage.getItem('userDetails')
        const jsonObject = JSON.parse(userData);
        userData === null ? setUserData(undefined):setUserData(jsonObject.userRole)
        
        userData === null ? setUserName(undefined) : setUserName(jsonObject?.firstName)

    }, [userData])

    React.useEffect(() => {
        handleState()
    }, [])

    React.useEffect(() => {
        handleCityId(state)
    }, [state])

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RESERVO
                    </Typography>
                    {/* // drop down and search  */}

                    <FormControl 
                    style={{ width: "250px", marginRight: "10px" }}>
                        <InputLabel id="state-select-label" sx={{bgcolor:'white'}}>State</InputLabel>

                        {/* State */}
                        <Select
                            displayEmpty
                            labelId="state-select-label"
                            label="State"
                            name="state"
                            value={state}
                            onChange={handleChangeSelect}
                            style={{ backgroundColor: 'white' }} >
                             <MenuItem disabled value="">
                                        <em>Select State</em>
                                    </MenuItem>
                            {statesInIndia.map((states, index) => (
                                // "id": 1,
                                // "stateName": "Uttar Pradesh"
                                <MenuItem key={index} value={states.id}>{states.stateName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl style={{  width: "250px" }}>
                        <InputLabel id="cities-select-label" sx={{bgcolor:'white'}}>Cities</InputLabel>
                        <Select
                            displayEmpty
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCities}
                            name="cities"
                            label="Cities"
                            onChange={handleChangeSelect}
                            style={{ backgroundColor: 'white' }}
                        >
                            <MenuItem disabled value="">
                                        <em>Select City</em>
                                    </MenuItem>
                            {citiesOption.map((cities, index) => (
                                <MenuItem key={index} value={cities.id}>{cities.cityName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((obj, index) => ( */}

                        <Button component={Link} to={'/'} color="inherit" sx={{ my: 2 }}>
                            Home
                        </Button>
                        {/* contact us path / */}
                        <Button component={Link} to={'/'} color="inherit" sx={{ my: 2 }}>
                            ContactUs
                        </Button>

                        {
                            userName === undefined && <>
                                <Button component={Link} to={'/login'} color="inherit" sx={{ my: 2 }}>
                                    Login
                                </Button>
                                <Button component={Link} to={'/signup'} color="inherit" sx={{ my: 2 }}>
                                    SignUP
                                </Button>
                            </>
                        }
                    </Box>
                    {
                        userName
                    }
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={userImage} />
                            </IconButton>
                        </Tooltip>
                        {
                            userName !== undefined
                            &&
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting, index) => (
                                setting.title === 'Logout' && userName !== undefined && */}

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button component={Link} onClick={handleNavigate}
                                        color="inherit" sx={{}}>
                                        Profile
                                    </Button>
                                </MenuItem>


                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button component={Link} to={'/login'}
                                        onClick={handleLogout}
                                        color="inherit" sx={{}}>
                                        Logout
                                    </Button>
                                </MenuItem>
                            </Menu>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;