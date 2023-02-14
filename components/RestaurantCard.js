import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { UsersIcon, StarIcon as StarIconSolid, MapPinIcon } from 'react-native-heroicons/solid'
import { StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
const RestaurantCard = ({ imgUrl, name, rating, distance }) => {

    const navigation = useNavigation();

    const [follow, setFollow] = useState(false);

    return (
        <TouchableOpacity className='flex-col w-60 h-72 bg-white relative rounded-md' onPress={() => {
            navigation.navigate('Restaurant', { imgUrl: imgUrl, name: name, rating: rating, distance: distance, follow: follow })
        }}>
            <Image source={imgUrl} className='w-full h-[60%] rounded-t-md' />
            <View className='flex-1 rounded-md p-2 mt-3 space-y-2'>
                <View className='flex-row space-x-2 items-center justify-between'>
                    <Text className='font-bold text-base  text-black'>{name}</Text>
                    {distance ?
                        <View className='flex-row space-x-1 items-center mr-2'>
                            <MapPinIcon color={'#D86631'} size={20} />
                            <Text className='text-[#D86631] text-sm'>{distance}</Text>

                        </View> :
                        <View>
                        </View>}
                </View>


                <View className='flex-row justify-between items-center'>

                    <View className='flex-row items-center mr-2 space-x-2'>

                        <TouchableOpacity onPress={() => {
                            setFollow(!follow);
                        }}>
                            {follow ? <StarIconSolid color={'#FF9A2D'} size={26} /> : <StarIcon color={'#FF9A2D'} size={26} />}

                        </TouchableOpacity>
                        <Text className='text-sm text-[#FF9A2D]'>{rating}</Text>


                    </View>
                </View>



            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard