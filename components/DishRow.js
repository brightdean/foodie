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
        dispatch(addToCart({ dish }));
    }

    const handleRemoveItem = () => {
        if (!items.length > 0) return;

        dispatch(removeFromCart(dish.id));
    }

    const QuantityViewer = () => {

        return (
            <View className='flex-row space-x-4 items-center'>

                <TouchableOpacity className='rounded-lg bg-[#AD2E24] p-2' onPress={handleRemoveItem}>
                    <MinusIcon size={18} color={'white'} />
                </TouchableOpacity>

                <Text className='text-black text-lg'>{items.length}</Text>

                <TouchableOpacity className='rounded-lg bg-[#AD2E24] p-2' onPress={handleAddItem}>
                    <PlusIcon size={18} color={'white'} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity className='flex-row w-full p-4 bg-white items-start justify-around border border-gray-200' onPress={() => { setPressed(!pressed) }}>
            <View className='flex-col w-[85%]'>
                <Text className='text-lg flex-wrap w-full' >{dish.title}</Text>
                <Text className='text-sm text-gray-500 mb-3'>{dish.description}</Text>
                <Text className='text-gray-500 text-base mb-8'>{dish.price}€</Text>

                {pressed &&
                    <QuantityViewer />}

            </View>

            <Image className='w-16 h-16 rounded-md' source={dish.imgUrl} />
        </TouchableOpacity>
    );
}



export default DishRow