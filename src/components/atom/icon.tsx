import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface IconProps {
    color?: string;
    size?: number;
    name: string;
    iconFamily: "Ionicons" | "MaterialCommunityIcons" | 'MaterialIcons'
}


const icon: FC<IconProps> = ({color,size,name,iconFamily}) => {
    return (
        <>
       {iconFamily==='Ionicons' && <Ionicons name={name} size={size}  color={color}/>}
       {iconFamily==='MaterialCommunityIcons' && <Ionicons name={name} size={size}  color={color}/>}
       {iconFamily==='MaterialIcons' && <Ionicons name={name} size={size}  color={color}/>}
        </>
    )
}

export default icon

const styles = StyleSheet.create({})