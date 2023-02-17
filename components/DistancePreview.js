import { View, Text } from 'react-native'
import React, { useMemo, useRef } from 'react'

const DistancePreview = ({ distance }) => {

    const displayDistance = useRef('');
    useMemo(() => {
        const km = distance / 1000;
        displayDistance.current = km > 1 ? km.toFixed(1).toString() + ' km' : distance.toString() + ' m';
    }, [distance]);

    return (
        <Text className='text-[#D86631] text-sm'>{displayDistance.current}</Text>
    )
}

export default DistancePreview