import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../static/server';
import axios from 'axios';

const AccountActivation = () => {
    const [hasError, setHasErrors] = useState(false);
    const { activation_token } = useParams();

    useEffect(() => {
        if (activation_token) {
            const validateActivation = async () => {
                try{
                    const response = await axios.post(`${SERVER_URL}/users/activation`, { 
                        activation_token: activation_token 
                    });
                    console.log('res:', response.data);
                } catch(err) {
                    console.log('activation error: ', err.response.data.message);
                    setHasErrors(true);
                }
            };
            // call the async func
            validateActivation();
        }
      }, []);
    

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            { hasError ? <p>Your token is expired!</p> : <p>Your account has been created suceessfully!</p> }
        </div>
    );
}

export default AccountActivation;