import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';


import { Text, ActivityIndicator } from "react-native";
import { getUserWithToken } from './redux/actions/auth';
import AppNavigation from "./navigation/index";
import { theme } from './constants';


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

    if (loading) return <ActivityIndicator size="large" color={theme.colors.secondary} />

    return <AppNavigation />
}

export default MyApp
