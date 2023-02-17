import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MinusIcon, PlusIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemsById } from '../slices/cartSlice';


const DishRow = ({ dish }) => {

    const [pressed, setPressed] = useState(false);

    const items = useSelector((state) => selectCartItemsById(state, dish.id));

    const dispatch = useDispatch();

    const handleAddItem = () => {
        dispatch(addToCart(dish));
    }

    const handleRemoveItem = () => {
        if (!items.length > 0) return;
        dispatch(removeFromCart(dish));
    }

    const QuantityViewer = () => {

        return (
            <View className='flex-row space-x-4 items-center mt-6'>

                <TouchableOpacity className='rounded-full bg-[#AD2E24] p-2' onPress={handleRemoveItem}>
                    <MinusIcon size={18} color={'white'} />
                </TouchableOpacity>

                <Text className='text-black text-lg'>{items.length}</Text>

                <TouchableOpacity className='rounded-full bg-[#AD2E24] p-2' onPress={handleAddItem}>
                    <PlusIcon size={18} color={'white'} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity className='w-full px-3 pt-3 pb-6 bg-white border border-gray-200' onPress={() => { setPressed(!pressed) }}>
            <View className='flex-row items-center justify-between'>
                <View className='flex-col w-[70%]'>
                    <Text className='text-lg flex-wrap w-full' >{dish.title}</Text>
                    <Text className='text-sm text-gray-500 mb-3 truncate'>{dish.description}</Text>
                    <Text className='text-gray-500 text-base'>{dish.price}€</Text>
                </View>

                <Image className='w-20 h-20 rounded-md' source={dish.imgUrl} />

            </View>

            {pressed &&
                <QuantityViewer />}

        </TouchableOpacity>
    );
}



export default DishRow