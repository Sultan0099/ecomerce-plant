
import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

// ---------screens--------------------------------------
import LoginScreen from "../screens/LoginScreen";
import ProductsScreen from '../screens/ProductsScreen';
import RegisterScreen from "../screens/RegisterScreen";
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import CategoryScreen from "../screens/CategoryScreen";

import Icon from "react-native-vector-icons/AntDesign"
import { theme } from '../constants';
import SearchScreen from "../screens/SearchScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import OrderScreen from "../screens/OrderScreen";


const defaultHeaderStyle = {
    headerStyle: { backgroundColor: theme.colors.dark },
    headerTintColor: "white"
}

// ------ Auth Navigator 
const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
    },
}, {
    defaultNavigationOptions: { headerShown: false }
})


// ----- Home Navigator ------

const HomeNavigator = createStackNavigator({
    Category: {
        screen: CategoryScreen
    },
    Products: {
        screen: ProductsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Product: {
        screen: ProductDetailScreen,

    },
    Search: {
        screen: SearchScreen
    },
    Order: {
        screen: OrderScreen
    }

}, {
    defaultNavigationOptions: {
        ...defaultHeaderStyle,
        initialRouteName: "Category"
    }
})

// ------- Cart Navigator -------

const CartNavigator = createStackNavigator({
    Cart: {
        screen: CartScreen
    }
}, {
    defaultNavigationOptions: { ...defaultHeaderStyle }
})

// ------- Cart Navigator -------

const AccountNavigator = createStackNavigator({
    Account: {
        screen: AccountScreen
    },
    User: {
        screen: AuthNavigator
    }
}, {
    defaultNavigationOptions: { ...defaultHeaderStyle }
})


// ----- bottom tab navigator------



const TabNavigator = createMaterialBottomTabNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            tabBarIcon: <Icon name="home" size={24} color="white" />
        }
    },
    Cart: {
        screen: CartNavigator,
        navigationOptions: {
            tabBarIcon: <Icon name="shoppingcart" size={24} color="white" />
        }
    },
    Account: {
        screen: AccountNavigator,
        navigationOptions: {
            tabBarIcon: <Icon name="user" size={24} color="white" />
        }
    }
}, {
    initialRouteName: "Home",
    shifting: true,
    barStyle: { backgroundColor: theme.colors.dark }
})



// ---------------main navigator 
const AppNavigator = createStackNavigator({
    Auth: {
        screen: AuthNavigator,
        navigationOptions: {
            headerShown: false
        }
    },
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            headerShown: false
        }
    }
}, {
    initialRouteName: "Main"
});

export default createAppContainer(AppNavigator);