import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

const Gradient = ({ children, height = '100%', opacityColor1 = 0, opacityColor2 = 1 }) => {
    const gradientUniqueId = 'linearGradient'
    return <>
        <View style={[{ ...StyleSheet.absoluteFillObject, height, zIndex: 0, top: 0, left: 0 }]} className='absolute top-0 left-0'>
            <Svg height='100%' width="100%" style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id={gradientUniqueId} x1="0%" y1="60%" x2="0%" y2="100%">
                        <Stop offset="0" stopColor={'transparent'} stopOpacity={opacityColor1} />
                        <Stop offset="1" stopColor={'#605B56'} stopOpacity={opacityColor2} />
                    </LinearGradient>
                </Defs>
                <Rect rx={6.0} width="100%" height="100%" fill={`url(#${gradientUniqueId})`} />
            </Svg>
        </View>
        {children}
    </>
};

export default Gradient