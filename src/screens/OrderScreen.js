import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { Block, Button, Text } from '../components/common'
import { theme } from '../constants'

import Input from '../components/Input';
import { useSelector } from 'react-redux';
import { createOrders } from '../redux/actions/orders';


const OrderScreen = (props) => {
    const { navigation } = props;

    const itemsToBuy = navigation.getParam("itemsToBuy");
    const user = useSelector(state => state.auth.user);

    const [values, setValues] = useState({
        fullName: '',
        mobileNumber: '',
        city: '',
        provinceName: '',
        address: '',
        landmark: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (value, prop) => {
        setValues({
            ...values,
            [prop]: value
        })
    }

    const handleSubmit = async () => {
        const errors = {};
        if (values.fullName === "") {
            errors.fullName = "This field is required"
        }
        if (values.city === "") {
            errors.city = "this field is required"
        }
        if (values.mobileNumber === "") {
            errors.mobileNumber = "field is mandatory"
        }
        if (values.provinceName === "") {
            errors.provinceName = "field is mandatory"
        }
        if (values.address === "") {
            errors.address = "field is mandatory"
        }
        if (values.landmark === "") {
            errors.landmark = "field is mandatory"
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        } else {
            //  run function which submits the order 
            await orderProduct()
        }
    }

    const orderProduct = async () => {
        try {
            if (itemsToBuy.length > 0) {
                for (let item of itemsToBuy) {
                    const res = await createOrders(user.userId, item, values);
                    console.log(res)

                }
                navigation.replace("Category")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Block color={theme.colors.white} style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <ScrollView>
                <Input
                    label="Full Name"
                    error={errors.fullName ? true : false}
                    errorMsg={errors.fullName}
                    value={values.fullName}
                    placeholder="Enter your Full Name"
                    keyboardType="default"
                    propertyName='fullName'
                    handleChange={handleChange}
                />
                <Input
                    label="Mobile Number"
                    error={errors.mobileNumber ? true : false}
                    errorMsg={errors.mobileNumber}

                    value={values.mobileNumber}
                    placeholder="Enter your Mobile Number"
                    keyboardType="phone-pad"
                    propertyName="mobileNumber"
                    handleChange={handleChange}
                />
                <Input
                    label="City Name"
                    error={errors.city ? true : false}
                    errorMsg={errors.city}

                    value={values.city}
                    placeholder="Enter your city"
                    keyboardType="default"
                    propertyName="city"
                    handleChange={handleChange}
                />
                <Input
                    label="Province Name"
                    error={errors.provinceName ? true : false}
                    errorMsg={errors.provinceName}

                    value={values.provinceName}
                    placeholder="Enter Province"
                    keyboardType="default"
                    propertyName="provinceName"
                    handleChange={handleChange}
                />
                <Input
                    label="Address"
                    error={errors.address ? true : false}
                    errorMsg={errors.address}

                    value={values.address}
                    placeholder="Enter your address"
                    keyboardType="default"
                    propertyName="address"
                    multiline={true}
                    handleChange={handleChange}
                />
                <Input
                    label="Landmark (optional)"
                    error={errors.landmark ? true : false}
                    errorMsg={errors.landmark}

                    value={values.landmark}
                    placeholder="Enter landmark"
                    keyboardType="default"
                    propertyName="landmark"
                    multiline={true}
                    handleChange={handleChange}
                />
                <Button gradient style={{ width: "100%" }} onPress={handleSubmit}>
                    <Text white h3 center >
                        Buy Now
                    </Text>
                </Button>
            </ScrollView>
        </Block>
    )
}



OrderScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: "Buy Now"
    }
}

export default OrderScreen
