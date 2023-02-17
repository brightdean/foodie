import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ArrowRightIcon, CheckIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native';

const RadioGroup = ({ options }) => {

    const [selected, setSelected] = useState(0);

    return (

        <View className='w-full'>
            {
                options.map((option, i) => {
                    return (
                        <TouchableOpacity key={i} className='flex-row items-center py-2 justify-start border-b border-gray-200' onPress={() => { setSelected(i) }}>

                            <View className='mr-4'>
                                {i === selected &&
                                    <View>
                                        <ArrowRightIcon color={'#AD2E24'} />
                                    </View>
                                }
                            </View>
                            {option}

                            {/* <View>
                                {i === selected &&
                                    <View>
                                        <CheckIcon color={'#AD2E24'} />
                                    </View>
                                }
                            </View> */}

                        </TouchableOpacity>
                    )



                })
            }
        </View>



    );
}


export default RadioGroup