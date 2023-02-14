import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Gradient from './Gradient'


const PreviewCard = ({ title, imgUrl }) => {
    return (
        <TouchableOpacity className='w-32 h-32 relative bg-white rounded-md'>
            <Image className='w-full h-full rounded-md' source={imgUrl} />

            <Gradient />
            <Text className='font-bold text-white p-2 absolute bottom-0 left-0'>{title}</Text>
        </TouchableOpacity>
    );
}

export default PreviewCard