import React, { FC } from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from "@modules/onboard"
import Home from "@modules/home"
import { navigationRef } from "./NavigationUtil"
import MainNavigator from "./MainNavigator"
import Products from "@modules/products"
import Cart from "@modules/cart"
import ProductDetailScreen from "@modules/products/atoms/ProductDetail"
import WishlistScreen from "src/screens/WishlistScreen"
import OrderSuccess from '../modules/cart/screens/OrderSuccess';
import PaymentSuccessScreen from "src/screens/PaymentSuccessScreen"


const Stack = createNativeStackNavigator()


const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Splash"
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen name="Cart" component={Cart} />

                {/* -------ProductDetail------- */}
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

                <Stack.Screen name="Wishlist" component={WishlistScreen} />

                <Stack.Screen name="OrderSuccess" component={OrderSuccess} />

                <Stack.Screen
                    name="paymentSuccess"
                    component={PaymentSuccessScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

