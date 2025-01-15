import { Button, Card, CardActionArea, CardContent, CardMedia, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function RightComponentList(props) {
    
    const [sortByPopularity, setSortByPopularity] = useState('')
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSortByPopularity(e.target.value)
    }
    const handlePayBill = (e) => {
        console.log("Integrate api for bill payment");
    }
    const handleBookATable = (e) => {
        navigate('/tableDetails', { state: props.restourantList })
       
        // console.log("Integrate api for Book table");
    }

    console.log("props restaruant"+JSON.stringify(props.restourantList))
    return (
        <div >
            <FormControl sx={{ width: '400px' }} >
                <InputLabel id="demo-simple-select-label">Sort By Popularity : </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortByPopularity}
                    label="Sort By Popularity : " 
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            
            {props.restourantList.map((item, index) => (
                <Card key={index} sx={{ margin: '20px auto' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            // image={item.image}
                            image="https://images.unsplash.com/photo-1679678690998-88c8711cbe5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHwwfDB8fHww"

                            alt="green iguana"
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Restouran Name : {item.restaurantName}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Place : {item.address}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Cost of two RS : {item.amount}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Number of table free : {item.availableSeats}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{
                                display: 'grid',
                                gridAutoColumns: 'max-content'
                            }}>
                                {/* rating ke liye item.rating likh sakte */}
                                <Chip label="4.8" />
                                {item.amount > 0 && <Button onClick={handlePayBill} sx={{ marginBottom: '5px' }} variant="contained">Pay Bill</Button>}
                                {item.availableSeats > 0 && <Button onClick={handleBookATable} variant="contained">Book a table</Button>}
                            </CardContent>
                        </div>
                    </CardActionArea>
                </Card>
            ))}

        </div >
    )
}

export default RightComponentList