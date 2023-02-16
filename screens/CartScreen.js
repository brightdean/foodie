import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { addToCart, removeFromCart, selectCartItems } from '../slices/cartSlice';
import { useState } from 'react';
import { ArrowDownIcon, MinusIcon, PaperAirplaneIcon, PlusIcon } from 'react-native-heroicons/solid';
import { cartString, changeTimeString, deliverTimeString } from '../strings';

const CartScreen = () => {


    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectCartItems);


    const navigation = useNavigation();
    const [groupedItems, setGroupedItems] = useState({});

    useMemo(() => {
        const result = items.reduce((acc, obj) => (acc[obj.id] = [...acc[obj.id] || [], obj], acc), {});
        setGroupedItems(result);


    }, [items]);


    return (
        <SafeAreaView>
            <ScrollView>
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

                            return <ItemRow key={item.id} count={count} item={item} />

                        })}
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    );



}

const ItemRow = ({ count, item }) => {

    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const handleAddItem = ({ item }) => {
        dispatch(addToCart(item));
    }

    const handleRemoveItem = ({ item }) => {
        if (!items.length > 0) return;

        dispatch(removeFromCart(item));
    }

    const [expand, setExpand] = useState(false);
    return (
        <TouchableOpacity className='border-gray-200 border bg-white' onPress={() => { setExpand(!expand) }}>
            <View className='flex-row p-4 w-full items-center justify-start space-x-4 relative'>
                <Text className='text-lg text-orange-400 font-bold'>{count}x</Text>
                <View>
                    <View >
                        <Text className='flex-wrap text-lg text-gray-600'>{item.title}</Text>
                    </View>
                    <Text className='text-sm text-gray-500'>{item.price.toFixed(2)}€</Text>
                </View>

                <Text className='text-lg font-bold text-gray-500 absolute right-4'>{(item.price * count).toFixed(2)}€</Text>
            </View>
            {expand &&
                <View className='flex-row items-center space-x-6 mt-4 mb-4 w-full justify-end px-4'>
                    <TouchableOpacity className='bg-orange-400 rounded-full p-1' onPress={() => { handleRemoveItem({ item }) }}>
                        <MinusIcon color={'white'} size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity className='bg-orange-400 rounded-full p-1' onPress={() => { handleAddItem({ item }) }}>
                        <PlusIcon color={'white'} size={20} />
                    </TouchableOpacity>
                </View>}


        </TouchableOpacity>

    );
}

export default CartScreen