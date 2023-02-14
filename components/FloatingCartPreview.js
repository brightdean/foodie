import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../slices/cartSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-web'

import { viewCartString } from '../strings'

const FloatingCartPreview = () => {

    const items = useSelector(selectCartItems)

    const navigation = useNavigation();

    const cartTotal = useSelector(selectCartTotal);

    return (
        <View className='absolute bottom-4 z-10 w-full'>
            <TouchableOpacity className='flex-row rounded-xl p-4 bg-[#CC5D3D] mx-12 justify-around items-center'>
                <View className='px-2 bg-[#C9462C]'>
                    <Text className='text-lg text-white font-bold'>{items.length}</Text>
                </View>
                <Text className='font-bold text-white'>{viewCartString}</Text>
                <Text className='font-bold text-white text-lg'>{cartTotal.toFixed(2)}€</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FloatingCartPreview