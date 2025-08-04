import { StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS, screenWidth } from '@utils/Constants'
import { navigate } from '@navigation/NavigationUtil'

const AnimatedHorizontalList: FC<{ data: any }> = ({ data }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                {data?.title}
            </Text>

            <FlatList
                data={data?.data}
                keyExtractor={(item) => item?.id}
                horizontal
                style={{ paddingHorizontal: 15 }}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigate('Categories')}>
                        <Image source={{ uri: item?.image_uri }} style={styles.image} />
                    </Pressable>
                )}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    textStyle: {
        fontSize: RFValue(14),
        marginHorizontal: 15,
        marginBottom: 15,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imgContainer: {
        width: screenWidth * 0.45,
        height: screenWidth * 0.6,
        marginRight: 15,
    }

})


export default AnimatedHorizontalList