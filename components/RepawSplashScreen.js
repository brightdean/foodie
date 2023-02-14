import { View, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'

const RepawSplashScreen = () => {

    return (
        <View className='flex-1 justify-center items-center bg-white'>
            <PulsatingLogo />
        </View>
    );
}


const PulsatingLogo = ({ minOpacity = 0.55, duration = 640 }) => {

    const [opacity] = useState(new Animated.Value(minOpacity));

    useEffect(() => {

        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: duration * 2,
                    easing: Easing.in,
                }),
                Animated.timing(opacity, {
                    toValue: minOpacity,
                    duration: duration,
                    easing: Easing.in,
                }),

            ]),
        ).start();
    }, []);

    return (
        <View className='w-full h-full flex-1 items-center justify-center'>
            <View className='h-1/3 w-full justify-center items-center'>
                <Animated.Image style={{ opacity: opacity }} className='w-[100%] h-[100%] max-w-[400px] max-h-[400px]' source={require('../assets/favicon.png')} />
            </View>
        </View>
    );
}

export default RepawSplashScreen