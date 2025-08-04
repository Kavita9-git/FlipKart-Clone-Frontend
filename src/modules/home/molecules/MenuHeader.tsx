import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { menuData } from '@utils/db'
import MenuItem from '../atoms/MenuItem'
import { RFValue } from 'react-native-responsive-fontsize'
import Ionicons from 'react-native-vector-icons/Ionicons';


const MenuHeader: FC<{ scrollY: any }> = ({ scrollY }) => {

    const [focusedIndex, setFocusedIndex] = useState(0)


    const opacityFadingStyles = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 80], [1, 0])
        return {
            opacity
        }
    })


    return (
        <Animated.View style={[styles.container, opacityFadingStyles]}>
            <SafeAreaView />
            <View style={styles.flexRow}>
            {menuData.map((item,index)=>(
                <MenuItem 
                key={index}
                item={item}
                isFocused={focusedIndex===index}
                onSelect={() => setFocusedIndex(index)}
                />
            ) )}
            </View>

         
         <View style={styles.addressContainer}>
            <Ionicons  size={16} name='home'  />
            <Text style={styles.homeText}>HOME</Text>
             <Text numberOfLines={1} style={styles.addressText}>24 taj plaza, Suresh Nagar, Nagpur</Text>
             <Ionicons size={16} name='chevron-forward-sharp'  />
         </View>


        </Animated.View>
    )
}



const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    flexRow:{
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems:'center',
      marginVertical: 5
    },
   

    addressContainer:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginVertical: 5
    },
    homeText:{
       marginHorizontal: 5,
       fontWeight:"bold",
       color:"#000000",
       fontSize:RFValue(11)
    },
    addressText:{
        flex:1,
        color:"#000000",
        fontSize:RFValue(10)
       
    }

})


export default MenuHeader