import { Button, Card, CardActionArea, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        password: '',
        confirmPassword: '',
        address: '',
        userRole: '',
        cityId: ''
    });
    const [isDisable, setIsDisable] = useState(true);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [statesInIndia, setStateInIndia] = React.useState([]);
    const [citiesOption, setCitiesOption] = React.useState([]);
    // const [selectedCities, setSelectedCities] = React.useState(0);
    const [selectedStates, setSelectedStates] = React.useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        // setProduct({...product, image: e.target.files[0]})
    };

    const handleOnChange = (e) => {
        console.log("THis", e.target.value);
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        // Integrate Api here
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("imageFile", image);
            formData.append("dto", new Blob([JSON.stringify(signUpData)], { type: "application/json" }));

            const response = await fetch(`http://127.0.0.1:8080/${signUpData.userRole}/signup`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            resetForm();
            navigate('/login')
            // Handle successful response here
            // const responseData = await response.json();
            // console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }

        console.log(signUpData);
    };

    const resetForm = () => {
        setSignUpData({
            firstName: '',
            lastName: '',
            email: '',
            mobileNo: '',
            password: '',
            confirmPassword: '',
            address: '',
            userRole: null
        });
    };


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
        handleState()
    }, [])

    React.useEffect(() => {
        console.log(selectedStates);
        if (selectedStates !== "") {
            const cities = statesInIndia.find((state) => state.id === parseInt(selectedStates));
            setCitiesOption(cities.cities);
        }
    }, [selectedStates, statesInIndia])

    useEffect(() => {
        // Ensure all required fields are filled, including `userType`
        setIsDisable(
            signUpData.firstName === '' ||
            signUpData.lastName === '' ||
            signUpData.confirmPassword === '' ||
            signUpData.email === '' ||
            signUpData.mobileNo === '' ||
            signUpData.password === '' ||
            signUpData.address === '' ||
            signUpData.userRole === ''
        );
    }, [signUpData.firstName,
    signUpData.lastName,
    signUpData.confirmPassword,
    signUpData.email,
    signUpData.mobileNo,
    signUpData.password,
    signUpData.address,
    signUpData.userRole]);

    const allUsers = [
        { label: "Customer", value: "user" },
        { label: "Owner", value: "owner" }
    ];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: '95vh',
                overflowY: 'auto',
                height: '95vh'
            }}>
            <Card sx={{ maxWidth: 600, boxShadow: 3, borderRadius: 2 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">SignUp</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            <TextField
                                style={{ flex: '1 1 45%' }}
                                label="First Name"
                                variant="outlined"
                                name='firstName'
                                value={signUpData.firstName}
                                onChange={handleOnChange}
                                fullWidth
                            />
                            <TextField
                                style={{ flex: '1 1 45%' }}
                                label="Last Name"
                                variant="outlined"
                                name='lastName'
                                value={signUpData.lastName}
                                onChange={handleOnChange}
                                fullWidth
                            />
                            <TextField
                                style={{ flex: '1 1 45%' }}
                                label="Email"
                                variant="outlined"
                                type="email"
                                name='email'
                                value={signUpData.email}
                                onChange={handleOnChange}
                                fullWidth
                            />
                            <TextField
                                style={{ flex: '1 1 45%' }}
                                label="Mobile No."
                                variant="outlined"
                                name='mobileNo'
                                value={signUpData.mobileNo}
                                onChange={handleOnChange}
                                fullWidth
                            />
                            <TextField
                                style={{ flex: '1 1 45%' }}
                                label="Password"
                                variant="outlined"
                                type="password"
                                name='password'
                                value={signUpData.password}
                                onChange={handleOnChange}
                                fullWidth
                            />
                            <TextField
                                style={{ flex: '1 1 45%' }}
                                label="Re-Enter Password"
                                variant="outlined"
                                type="password"
                                name='confirmPassword'
                                value={signUpData.confirmPassword}
                                onChange={handleOnChange}
                                fullWidth
                            />
                            <TextField
                                style={{ flex: '1 1 45%' }}
                                label="Address"
                                variant="outlined"
                                name='address'
                                value={signUpData.address}
                                onChange={handleOnChange}
                                fullWidth
                            />
                            <div style={{ flex: '1 1 45%' }}>
                                <InputLabel id="image-label">Image</InputLabel>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            </div>
                            <FormControl style={{flex: '1 1 45%', marginBottom: '10px' }}>
                                <InputLabel id="state-label">State</InputLabel>
                                <Select
                                    labelId="state-label"
                                    label="State"
                                    name='state'
                                    value={selectedStates}
                                    onChange={(e) => setSelectedStates(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem disabled value="">
                                        <em>Select State</em>
                                    </MenuItem>
                                    {statesInIndia.map((state, index) => (
                                        <MenuItem key={index} value={state.id}>{state.stateName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl style={{ flex: '1 1 45%', marginBottom: '10px' }}>
                                <InputLabel id="city-label">City</InputLabel>
                                <Select
                                    labelId="city-label"
                                    label="City"
                                    name='cityId'
                                    value={signUpData.cityId}
                                    onChange={handleOnChange}
                                    fullWidth
                                >
                                    <MenuItem disabled value="">
                                        <em>Select City</em>
                                    </MenuItem>
                                    {citiesOption.map((city, index) => (
                                        <MenuItem key={index} value={city.id}>{city.cityName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl style={{ flex: '1 1 45%', marginBottom: '10px' }}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    label="Role"
                                    name='userRole'
                                    value={signUpData.userRole}
                                    onChange={handleOnChange}
                                    fullWidth
                                >
                                    <MenuItem disabled value="">
                                        <em>Select Role</em>
                                    </MenuItem>
                                    {allUsers.map((item, index) => (
                                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Button disabled={isDisable} variant="contained" onClick={handleSubmit}>SignUP</Button>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
};

export default SignUp;
