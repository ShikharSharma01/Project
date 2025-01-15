import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import RightComponentList from './RightComponentList'
import { useLocation } from 'react-router-dom';

const RestorentList = () => {
    const location = useLocation();
    const { state } = location;
    console.log(state)
    const [restourantList, setRestourantList] = React.useState([]);

    // const restourantList = [
    //     {
    //         name: 'Abc',
    //         image: "https://images.unsplash.com/photo-1707758744913-71cbd9a23303?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D",
    //         place: "noida",
    //         cost: 1200,
    //         freeTable: 12,
    //         rating: 4.3,
    //         availableTable: 12,
    //         billPay: 120
    //     },
    //     {
    //         name: 'Def',
    //         image: "https://images.unsplash.com/photo-1707758744914-71cbd9a23303?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D",
    //         place: "delhi",
    //         cost: 1000,
    //         freeTable: 8,
    //         rating: 4.0,
    //         availableTable: 3,
    //         billPay: 100
    //     },
    //     {
    //         name: 'Ghi',
    //         image: "https://images.unsplash.com/photo-1707758744915-71cbd9a23303?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D",
    //         place: "lucknow",
    //         cost: 900,
    //         freeTable: 10,
    //         rating: 4.8,
    //         availableTable: 4,
    //         billPay: 1120
    //     },
    // ];

    const handleRestaurant = async () => {
        try {

            const response = await fetch(`http://127.0.0.1:8080/restaurant/${state}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                // body: JSON.stringify(signInData),
            });
            const states = await response.json();
            console.log(states);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setRestourantList(states)


        } catch (error) {

        }
    }
    React.useEffect(() => {

        handleRestaurant()

    }, [])

    return (
        <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '70%', padding: '20px', maxHeight: '700px', overflow: 'auto' }}>
                <RightComponentList restourantList={restourantList} />
            </div>
        </div>
    )
}

export default RestorentList