import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import PreviewCard from './PreviewCard'

const Category = ({ header, data }) => {
    return (
        <View className='mt-4 mb-4'>
            <Text className='text-lg font-bold mb-3 px-2 text-black'>{header}</Text>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 12 }} showsHorizontalScrollIndicator={false} horizontal={true} className='flex-row space-x-4'>
                {data.map((d, i) => { return <View key={i}><PreviewCard key={i} title={d.title} imgUrl={d.imgUrl} /></View> })}
            </ScrollView>
        </View>
    );
}

export default Category;