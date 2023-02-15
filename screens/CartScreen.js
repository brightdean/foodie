import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { selectCartItems } from '../slices/cartSlice';
import { useState } from 'react';
import { ArrowDownIcon, PaperAirplaneIcon } from 'react-native-heroicons/solid';
import { cartString, changeTimeString, deliverTimeString } from '../strings';

const CartScreen = () => {


    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectCartItems);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [groupedItems, setGroupedItems] = useState({});

    useMemo(() => {
        const result = items.reduce((acc, obj) => (acc[obj.dish.id] = [...acc[obj.dish.id] || [], obj.dish], acc), {});


        //console.log(result);
        setGroupedItems(result);


    }, [items]);



    return (
        <SafeAreaView>
            <View>
                <View className='flex-row w-full justify-center bg-white pt-5 pb-2 relative'>
                    <View className='items-center justify-center'>
                        <Text className='font-bold text-base text-gray-600'>{cartString}</Text>
                        <Text className='text-sm text-gray-500 -translate-y-1'>{restaurant.name}</Text>
                    </View>

                    <TouchableOpacity className='p-3 bg-orange-400 rounded-full absolute right-4 top-5' onPress={() => { navigation.goBack() }}>
                        <ArrowDownIcon color={'white'} size={18} />
                    </TouchableOpacity>
                </View>

                <View className='flex-row mt-6 bg-white p-4 items-center justify-between'>
                    <PaperAirplaneIcon color={'#AD2E24'} size={24} />
                    <Text className=''>{deliverTimeString} 45 λεπτά</Text>
                    <TouchableOpacity>
                        <Text className='text-[#AD2E24] text-base font-bold'>{changeTimeString}</Text>
                    </TouchableOpacity>
                </View>

                <View className='mt-12 bg-white w-full'>
                    { }
                    {Object.keys(groupedItems).map(key => {

                        const count = groupedItems[key].length;
                        const item = groupedItems[key][0];

                        return (<View className='flex-row p-4 border-gray-200 border h-16 w-full items-center justify-start space-x-4 relative'>
                            <Text className='text-lg text-orange-400 font-bold'>{count}x</Text>
                            <View className=''>
                                <View className=''>
                                    <Text className='flex-wrap text-lg text-gray-600'>{item.title}</Text>
                                </View>

                                <Text className='text-sm text-gray-500'>{item.price.toFixed(2)}€</Text>
                            </View>

                            <Text className='text-lg font-bold text-gray-500 absolute right-4'>{(item.price * count).toFixed(2)}€</Text>
                        </View>);
                    })}
                </View>

            </View>
        </SafeAreaView>
    );
}

export default CartScreen