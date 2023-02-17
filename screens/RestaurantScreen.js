import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, MapPinIcon, StarIcon as StarIconSolid } from 'react-native-heroicons/solid';
import { StarIcon } from 'react-native-heroicons/outline';
import { menuString } from '../strings';

import DishRow from '../components/DishRow';
import FloatingCartPreview from '../components/FloatingCartPreview';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';
import { dishes } from '../api/mockup/dishes';
import DistancePreview from '../components/DistancePreview';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const RestaurantScreen = () => {
    const {
        params: {
            name,
            imgUrl,
            rating,
            distance,
            follow,

        },
    } = useRoute();

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(follow);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);


    useEffect(() => {
        dispatch(setRestaurant({
            name,
            imgUrl,
            rating,
            distance,
            follow,
        }));
    }, [dispatch]);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const headerTop = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    return (
        <>

            <FloatingCartPreview />

            <ScrollView bounces={false} className='bg-gray-200' onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}>
                <Animated.View className='relative'>
                    <Image className='w-full h-52' source={imgUrl} />
                    <TouchableOpacity className='absolute top-12 left-4 rounded-full bg-gray-200 p-2' onPress={() => {
                        navigation.goBack();
                    }}>
                        <ArrowLeftIcon color={'black'} size={20} />
                    </TouchableOpacity>
                </Animated.View>
                <View className='bg-white p-4 space-y-2'>
                    <Text className='text-xl text-black font-bold'>{name}</Text>
                    <View className='flex-row space-x-2'>
                        <View className='flex-row items-center mr-2 space-x-2'>

                            <TouchableOpacity onPress={() => {
                                setLiked(!follow);

                            }}>
                                {liked ? <StarIconSolid color={'#FF9A2D'} size={26} /> : <StarIcon color={'#FF9A2D'} size={26} />}

                            </TouchableOpacity>
                            <Text className='text-sm text-[#FF9A2D]'>{rating}</Text>


                        </View>
                        {distance ? <View className='flex-row items-center space-x-2'>
                            <MapPinIcon color={'#D86631'} size={24} />
                            {/* <Text className='text-[#D86631] text-sm'>{distance}</Text> */}
                            <View><DistancePreview distance={distance} /></View>

                        </View> : <View></View>}
                    </View>

                </View>

                <View className='mt-4'>
                    <Text className='text-lg font-bold ml-4 mb-4'>{menuString}</Text>
                    {dishes.map((dish) => {
                        return <DishRow key={dish.id} dish={dish} />
                    })}
                </View>
                <View className='h-16 bg-white'></View>
            </ScrollView>

        </>

    );
}

export default RestaurantScreen