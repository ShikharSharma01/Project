import React, { useEffect, useState } from 'react'
import SwiperBanner from './SwiperBanner'
import Cards from './Cards'
import { Typography } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WineBarIcon from '@mui/icons-material/WineBar';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import PickOption from './PickOption';
import axios from 'axios';

const cardDetails1 = [
  {
    id: 1,
    name: 'Card1',
    image: "https://images.unsplash.com/photo-1679678690998-88c8711cbe5f",
    description: "This is description"
  },
  {
    name: 'Card2',
    image: "https://plus.unsplash.com/premium_photo-1675745329378-5573c360f69f", description: "This is description"
  },
  {
    name: 'Card3',
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461", description: "This is description"
  },
  {
    name: 'Card2',
    image: "https://plus.unsplash.com/premium_photo-1675745329378-5573c360f69f", description: "This is description"
  },
  {
    name: 'Card3',
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461", description: "This is description"
  },
  {
    name: 'Card2',
    image: "https://plus.unsplash.com/premium_photo-1675745329378-5573c360f69f", 
    description: "This is description"
  },

];

const pickOption = [
  {
    name: 'Near Me',
    image: <AddLocationIcon />,

  },
  {
    name: 'Bar/Pub',
    image: <WineBarIcon />
  },
  {
    name: 'Dinner',
    image: <RamenDiningIcon />
  }
];


const Home = () => {


  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/restaurants');
        setCardDetails(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
  
    fetchCards();
  }, []);

  return (
    <div>
      <SwiperBanner />
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
        {cardDetails.map((obj, index) => (
          <Cards key={index} data={obj} />
        ))}
      </div>
      <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
        <Typography variant="h4">
          Hi Foodies, What's Your pick
        </Typography>
        <div style={{display:'flex'}}>
          {pickOption.map((obj, index) => (
            <PickOption key={index} data={obj} />
          ))}
        </div>
      </div>
    </div>

  )
}

export default Home