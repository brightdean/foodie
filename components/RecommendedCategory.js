import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import RestaurantCard from './RestaurantCard'

const RecommendedCategory = ({ header, data }) => {
    return (
        <View className='mt-6 mb-4'>
            <Text className='text-lg font-bold mb-3 px-2 text-black'>{header}</Text>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12 }} showsHorizontalScrollIndicator={false} horizontal={true} className='flex-row space-x-4'>
                {data.map((d, i) => { return <View key={i}><RestaurantCard key={i} name={d.name} rating={d.rating} imgUrl={d.imgUrl} distance={d.distance || false} /></View> })}
            </ScrollView>
        </View>
    )
}

export default RecommendedCategory