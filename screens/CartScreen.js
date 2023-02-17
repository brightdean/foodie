import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { addToCart, removeFromCart, selectCartItems, selectCartTotal } from '../slices/cartSlice';
import { useState } from 'react';
import { ArrowDownIcon, BanknotesIcon, ChevronDownIcon, ChevronUpIcon, CreditCardIcon, MinusIcon, PaperAirplaneIcon, PlusIcon } from 'react-native-heroicons/solid';
import { cartString, cartTotalString, cashString, changeTimeString, deliverTimeString, deliveryTipString, orderTotalString, paymentMethodString, payString, sampleCreditCardString } from '../strings';
import RadioGroup from '../components/RadioGroup';
const CartScreen = () => {


    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const navigation = useNavigation();
    const [groupedItems, setGroupedItems] = useState({});

    useMemo(() => {
        const result = items.reduce((acc, obj) => (acc[obj.id] = [...acc[obj.id] || [], obj], acc), {});
        setGroupedItems(result);


    }, [items]);


    return (
        <SafeAreaView className='flex-1'>

            <View className='flex-1'>

                <View className='flex-row w-full justify-center bg-white pt-5 pb-2 relative border-b-2 border-gray-200'>
                    <View className='items-center justify-center'>
                        <Text className='font-bold text-base text-gray-600'>{cartString}</Text>
                        <Text className='text-sm text-gray-500 -translate-y-1'>{restaurant.name}</Text>
                    </View>

                    <TouchableOpacity className='p-3 bg-orange-400 rounded-full absolute right-4 top-5' onPress={() => { navigation.goBack() }}>
                        <ArrowDownIcon color={'white'} size={18} />
                    </TouchableOpacity>
                </View>


                {/* <View className='flex-row mt-4 bg-white p-4 items-center justify-between mb-5'>
                    <PaperAirplaneIcon color={'#AD2E24'} size={24} />
                    <Text className=''>{deliverTimeString} 45 λεπτά</Text>
                    <TouchableOpacity>
                        <Text className='text-[#AD2E24] text-base font-bold'>{changeTimeString}</Text>
                    </TouchableOpacity>
                </View> */}

                <ScrollView className='w-full mt-4'>

                    {Object.keys(groupedItems).map(key => {

                        const count = groupedItems[key].length;
                        const item = groupedItems[key][0];

                        return <ItemRow key={item.id} count={count} item={item} />

                    })}
                </ScrollView>

                <CompleteOrderFragment cartTotal={cartTotal} />

            </View>



        </SafeAreaView >
    );



}

const CompleteOrderFragment = ({ cartTotal }) => {

    const [expand, setExpand] = useState(false);
    const [tip, setTip] = useState(0);

    const handleAddTip = () => {
        setTip(tip + 0.5);
    }

    const handleRemoveTip = () => {
        tip >= 0.5 && setTip(tip - 0.5);
    }

    return (
        <View className='p-4 w-full bg-white items-start mt-2'>
            <View className='flex-row w-full justify-between items-center mb-4'>
                <Text className='text-base text-gray-500'>{cartTotalString}</Text>
                <Text className='text-base text-gray-500 font-bold'>{cartTotal.toFixed(2)}€</Text>
            </View>

            <View className='flex-row w-full justify-between items-center mb-4'>
                <Text className='text-base text-gray-500'>{deliveryTipString}</Text>
                <View className='flex-row space-x-4'>
                    <TouchableOpacity className='w-6 h-6 rounded-full border-2 border-orange-400 justify-center items-center' onPress={handleRemoveTip}>
                        <MinusIcon color={'orange'} size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity className='w-6 h-6 rounded-full border-2 border-orange-400 justify-center items-center' onPress={handleAddTip}>
                        <PlusIcon color={'orange'} size={18} />
                    </TouchableOpacity>
                    <Text className='text-base text-gray-500 font-bold'>{tip.toFixed(2)}€</Text>
                </View>

            </View>

            <View className='flex-row w-full justify-between items-center mb-4'>
                <Text className='text-base text-gray-500 font-semibold'>{orderTotalString}</Text>
                <Text className='text-base text-gray-500 font-bold'>{(cartTotal + tip).toFixed(2)}€</Text>
            </View>

            <TouchableOpacity className='flex-row w-full items-center space-x-4' onPress={() => { setExpand(!expand) }}>
                <Text className='text-base font-bold text-gray-700 '>{paymentMethodString}</Text>
                {expand ? <ChevronUpIcon color={'#AD2E24'} /> : <ChevronDownIcon color={'#AD2E24'} />}
            </TouchableOpacity>

            {expand && <RadioGroup options={[
                <PaymentMethodButton icon={<CreditCardIcon color={'#AD2E24'} />} text={sampleCreditCardString} />,
                <PaymentMethodButton icon={<BanknotesIcon color={'#AD2E24'} />} text={cashString} />,
            ]} />}

            <TouchableOpacity className='flex-row bg-orange-400 w-full p-4 justify-center mt-6 rounded-md'>
                <Text className='text-white font-bold'>{payString}</Text>
            </TouchableOpacity>

        </View>
    );
}

const PaymentMethodButton = ({ icon, text }) => {

    return (
        <View className='flex-row p-2 space-x-4 items-center'>
            {icon}
            <Text className='text-gray-500 font-bold'>{text}</Text>
        </View>);
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
            <View className='flex-row p-2 w-full items-center justify-start space-x-4 relative'>
                <Text className='text-base text-orange-400 font-bold'>{count}x</Text>

                <Image className='w-10 h-10 rounded-full ' source={item.imgUrl} />


                <View>
                    <View >
                        <Text className='flex-wrap text-base text-gray-600'>{item.title}</Text>
                    </View>
                    <Text className='text-sm text-gray-500'>{item.price.toFixed(2)}€</Text>
                </View>

                <Text className='text-base font-bold text-gray-500 absolute right-4'>{(item.price * count).toFixed(2)}€</Text>
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