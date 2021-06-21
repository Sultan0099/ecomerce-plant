import React, { useEffect, useState, Component } from 'react'
import { ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';

import CartCard from '../components/CartCard';

import { Block, Button, Text } from "../components/common";
import { theme } from '../constants';
import { getCartItems, updateCart } from '../redux/actions/cart';


const CartScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.auth.user)

    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState([])

    const fetchCartItems = async () => {
        const res = await dispatch(getCartItems());
        console.log('cart response', res)
        setLoading(false)
    }


    useEffect(() => {
        const focusListener = navigation.addListener('didFocus', async () => {
            if (!user) {
                setLoading(false)
                return

            }
            fetchCartItems()
        });

        return () => {
            focusListener.remove()
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }
        fetchCartItems()
    }, [])

    const handleShowPrice = (productId) => {
        const index = selectedProduct.findIndex(product => product === productId);
        if (index === -1) {
            setSelectedProduct([...selectedProduct, productId])
        } else {
            const copySelectedProduct = [...selectedProduct];
            copySelectedProduct.splice(index, 1)
            setSelectedProduct(copySelectedProduct)
        }
    }

    const totalPrice = (selectedProducts) => {
        let total = 0;
        const cartItems = cart.cartItem;
        for (let productId of selectedProducts) {
            for (let cartItem of cartItems) {
                if (cartItem.product === productId) {
                    total = total + cartItem.total;
                }
            }
        }
        return total;
    }

    const decreaseQuantity = async (productId) => {
        await handleUpdateCart(productId, -1);
    }

    const increaseQuantity = async (productId) => {
        await handleUpdateCart(productId, 1);
    }

    const handleUpdateCart = async (productId, quantity) => {
        try {

            let product = cart.cartItem.find(item => item.product === productId);
            product = {
                productId: product.product,
                quantity: parseInt(product.quantity) + parseInt(quantity),
                newQuantity: quantity,
                price: product.price,
                total: parseFloat(product.total) + parseFloat(product.price * quantity)
            }
            if (product.quantity <= 0) {
                return;
            }
            const response = await dispatch(updateCart(user.userId, product));
        } catch (error) {
            console.log(error);
        }

    }

    const _renderCard = ({ item }) => {
        return (
            <CartCard
                productId={item.product}
                key={item.product}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                category={item.category}
                productTotal={item.total}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                handleShowPrice={handleShowPrice}
            />
        )
    }



    if (loading) return <ActivityIndicator size="large" color={theme.colors.secondary} />

    if (!user) return (
        <Block center middle >
            <Button style={styles.button} onPress={() => props.navigation.navigate("Auth")}>
                <Text center color={theme.colors.white}>
                    LOGIN / REGISTER
                </Text>
            </Button>
        </Block>
    )


    return (
        <Block flex={false} color={"rgba(0,0,0,0.100)"}>

            <FlatList
                style={{ width: "100%", height: "80%" }}
                data={cart.cartItem}
                renderItem={_renderCard}
                keyExtractor={item => item.product}
                numColumns={1}
                refreshing={loading}
                onRefresh={fetchCartItems}
            />
            <Block flex={false} center style={{ height: "19%", marginTop: 5, backgroundColor: theme.colors.white }}>
                <Text h1 bold secondary >
                    <Text caption gray> Total : </Text>
                    {totalPrice(selectedProduct)}
                </Text>
                <Button gradient style={{ width: "80%", justifyContent: "center", alignItems: 'center' }}
                    onPress={() => {
                        console.log(selectedProduct)
                        if (selectedProduct.length > 0) {
                            return navigation.navigate("Order", { itemsToBuy: [...selectedProduct] })
                        } else return
                    }}>
                    <Text white bold >
                        BUY NOW
                    </Text>
                </Button>
            </Block>
        </Block>
    )
}




CartScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: "Shopping Cart"
    }
}

const styles = StyleSheet.create({

    button: {
        width: "80%",
        display: "flex",
        justifyContent: 'center',
        backgroundColor: theme.colors.dark,
        color: theme.colors.white
    }
})

export default withNavigation(CartScreen);
