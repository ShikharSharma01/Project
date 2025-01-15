import { Button, Card, CardActionArea, CardContent, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const AddRestaurant = () => {
    const [signUpData, setSignUpData] = useState({
        address: "",
        amount: 0,
        availableSeats: 0,
        email: "",
        restaurantName: "",
        status: "",
        description: "",
        about: "",
        features: ""
    });
    const [isDisable, setIsDisable] = useState(true);
    const [ownerId, setOwnerId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [image, setImage] = useState(null);


    const handleOnChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: (e.target.name === 'availableSeats' || e.target.name === 'amount') ?
                parseInt(e.target.value)
                : e.target.value
            ,
        });
    };
    useEffect(() => {
        const userData = sessionStorage.getItem('userDetails')
        const jsonObject = JSON.parse(userData);
        setOwnerId(jsonObject.id)
    }, [])

    const handleAdd = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("imageFile", image);
        formData.append("reqDto", new Blob([JSON.stringify(signUpData)], { type: "application/json" }));
        console.log(formData)

        // const response = await fetch(`http://127.0.0.1:8080/restaurant/add/${ownerId}/${state}`, {
        //     method: 'POST',
        //     body: formData // Pass formData directly
        // });

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        resetForm();
        navigate('/owner');
    } catch (error) {
        console.error('Error:', error);
    }
};


    const resetForm = () => {
        setSignUpData({
            address: "",
            amount: 0,
            availableSeats: 0,
            email: "",
            restaurantName: "",
            status: "",
            description: "",
            about: "",
            features: ""
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        // setProduct({...product, image: e.target.files[0]})
    };

    useEffect(() => {
        setIsDisable(
            signUpData.address === '' ||
            signUpData.amount === 0 ||
            signUpData.availableSeats === 0 ||
            signUpData.email === '' ||
            signUpData.restaurantName === '' ||
            signUpData.status === '',
            signUpData.description === '',
            signUpData.about === '',
            signUpData.features === ''
        );
    }, [signUpData.address,
    signUpData.amount,
    signUpData.availableSeats,
    signUpData.email,
    signUpData.restaurantName,
    signUpData.status,
    signUpData.description,
    signUpData.about,
    signUpData.features]);

    const openClose = [
        { label: "Close", value: "CLOSE" },
        { label: "Open", value: "OPEN" },
    ];

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: '95vh',
            overflowY: 'auto',
            height: '120vh'
        }}>

           <Card sx={{ maxWidth: 600 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Add Restaurant
                    </Typography>
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="Restaurant Name"
                        multiline
                        maxRows={4}
                        name='restaurantName'
                        value={signUpData.restaurantName}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="email"
                        multiline
                        maxRows={4}
                        name='email'
                        value={signUpData.email}
                        onChange={(e) => handleOnChange(e)}

                    />
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="address"
                        multiline
                        maxRows={4}
                        name='address'
                        value={signUpData.address}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="Amount"
                        multiline
                        maxRows={4}
                        name='amount'
                        value={signUpData.amount}
                        type='number'
                        onChange={(e) => handleOnChange(e)}
                    />
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="Available Seates"
                        multiline
                        maxRows={4}
                        name='availableSeats'
                        type='number'
                        value={signUpData.availableSeats}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        maxRows={4}
                        name='description'
                        value={signUpData.description}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="About"
                        multiline
                        maxRows={4}
                        name='about'
                        value={signUpData.about}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <TextField style={{ width: "100%", marginBottom: '5px' }}
                        id="outlined-multiline-flexible"
                        label="Features"
                        multiline
                        maxRows={4}
                        name='features'
                        value={signUpData.features}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <div>
                        <InputLabel id="demo-simple-select-label">Image</InputLabel>
                        <input
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        sx={{ width: '100px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={signUpData.userRole}
                        label="Status"
                        name='status'
                        onChange={(e) => handleOnChange(e)}
                    >
                        {openClose.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                    <br />
                    <Button variant="contained" onClick={handleAdd}>Add</Button>
                </CardContent>
            </CardActionArea>
        </Card> 
        </div>
        
    )
};

export default AddRestaurant;




