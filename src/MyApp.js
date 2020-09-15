import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';


import { Text } from "react-native";
import { getUserWithToken } from './redux/actions/auth';
import AppNavigation from "./navigation/index";


const MyApp = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        await dispatch(getUserWithToken());
        setLoading(false)
    }

    useEffect(() => {
        fetchUser();
    }, [])

    if (loading) return <Text> We are fetching your things ....</Text>

    return <AppNavigation />
}

export default MyApp
