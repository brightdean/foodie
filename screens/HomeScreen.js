import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RepawSplashScreen from '../components/RepawSplashScreen';
import { logoVisibleTime } from '../globals';
import { AdjustmentsVerticalIcon, Bars2Icon, Bars3BottomLeftIcon, Bars3CenterLeftIcon, Bars3Icon, MagnifyingGlassCircleIcon, UserIcon } from 'react-native-heroicons/solid';
import Category from '../components/Category';
import { activeString, todayDishes, recentString, recommendedRestaurants, searchPrompt, nearYouString } from '../strings';
import RestaurantCard from '../components/RestaurantCard';
import RecommendedCategory from '../components/RecommendedCategory';
import { MagnifyingGlassIcon, ShoppingBagIcon } from 'react-native-heroicons/outline';

const HomeScreen = () => {

    const navigation = useNavigation();

    const [showSplash, setShowSplash] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,

        });

        // setTimeout(() => {
        //     setShowSplash(false);
        // }, logoVisibleTime);

    }, []);

    return (
        <SafeAreaView className='flex-1 bg-white'>
            {showSplash ? <RepawSplashScreen /> :
                <View className='bg-gray-100'>
                    <View className='bg-white py-2 px-2'>
                        <View className='flex-row items-center justify-between'>
                            <View className='flex-row space-x-2'>
                                <TouchableOpacity className='w-9 h-9 bg-gray-300 rounded-full justify-center items-center'>
                                    <UserIcon color={'gray'} size={22} />
                                </TouchableOpacity>
                                <View>
                                    <Text className='text-gray-600 font-bold translate-y-1'>Dimosthenis Zafiropoulos</Text>
                                    <Text className='text-gray-500 text-sm'>Δαβάκη 18, Παπάγου</Text>
                                </View>
                            </View>


                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Cart');
                            }}>
                                <ShoppingBagIcon color={'#9B1D20'} />
                            </TouchableOpacity>

                        </View>
                        <View className='flex-row items-center space-x-2 justify-between'>
                            <View className='flex-row rounded-sm bg-gray-200 mt-3 mb-4 h-10 w-[90%] items-center pl-2'>
                                <MagnifyingGlassIcon color={'gray'} size={22} />
                                <TextInput className='text-gray-500 w-full h-full p-2' placeholder={searchPrompt}></TextInput>
                            </View>
                            <TouchableOpacity>
                                <Bars3BottomLeftIcon color={'#9B1D20'} />
                            </TouchableOpacity>

                        </View>

                    </View>
                    <ScrollView className='flex-1 h-full'>
                        <Category header={todayDishes} data={[{ title: 'French Toast', imgUrl: require('../assets/samples/dish1.jpg') },
                        { title: 'Braised Cinammon Beef', imgUrl: require('../assets/samples/dish2.webp') },
                        { title: 'Bulgogi', imgUrl: require('../assets/samples/dish3.webp') },
                        { title: 'Shrimp Barley', imgUrl: require('../assets/samples/dish4.jpg') },
                        { title: 'Bhaji', imgUrl: require('../assets/samples/dish5.jpg') }]} />
                        <RecommendedCategory header={recommendedRestaurants} data={[{ name: 'Chop Sticks', rating: '4.7', imgUrl: require('../assets/samples/rec1.jpg'), distance: 2500 },
                        { name: 'A for Athens', rating: '4.9', imgUrl: require('../assets/samples/rec2.jpg'), distance: 4000 }]} />
                        <RecommendedCategory header={nearYouString} data={[{ name: `Olivia's Brother`, rating: '4.5', imgUrl: require('../assets/samples/near1.jpg'), distance: 740 },
                        { name: 'El Jiron', rating: '4.4', imgUrl: require('../assets/samples/near2.jpg'), distance: 1200 },
                        { name: `Lisa's Branch`, rating: '4.2', imgUrl: require('../assets/samples/near3.jpg'), distance: 900 }]} />


                        <View className='h-32 flex-1' ></View>
                    </ScrollView>


                </View>

            }
        </SafeAreaView >

    )
}

export default HomeScreen;