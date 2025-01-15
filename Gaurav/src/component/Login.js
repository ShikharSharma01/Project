import { Button, Card, CardActionArea, CardContent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Login = () => {
    const [signInData, setSignInData] = useState(
        {
            email: '',
            password: '',
        })
    const [isDisable, setIsDisable] = useState(true)
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value
        })

    }

    const handleLogin = async (e) => {
        // Integrate Api here for login

        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8080/owner/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                body: JSON.stringify(signInData),
            });
            console.warn(response)
            if (!response.ok) {
                // resetForm();
                toast.error("Invalid Username or Password")
                throw new Error('Network response was not ok');

            }
            toast.success("Login Successfully")
            resetForm();
            const responseData = await response.json();

            sessionStorage.setItem('userDetails', JSON.stringify(responseData));

            navigate('/home')
            // Handle successful response here
            // const responseData = await response.json();
            // console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }

        // console.log(signInData.email, " this ", signInData.password);
    }

    useEffect(() => {
        setIsDisable(signInData.email === '' ||
            signInData.password === '')
    }, [signInData.email, signInData.password])

    const resetForm = () => {
        setSignInData({
            email: '',
            password: '',
        })

    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: '95vh',
            overflowY: 'auto',
            height: '95vh'
        }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Login
                        </Typography>
                        <TextField style={{ width: "100%", marginBottom: '5px' }}
                            id="outlined-multiline-flexible"
                            label="Email"
                            multiline
                            maxRows={4}
                            name='email'
                            value={signInData.email}
                            onChange={handleOnChange}
                        />
                        <TextField style={{ width: "100%", marginBottom: '5px' }}
                            id="outlined-multiline-flexible"
                            label="password"
                            multiline
                            maxRows={4}
                            name='password'
                            value={signInData.password}
                            onChange={handleOnChange}
                        />
                        <Button disabled={isDisable} variant="contained" onClick={handleLogin}>Login</Button>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

    )
}

export default Login