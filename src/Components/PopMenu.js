import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider } from 'react-native-popup-menu';

const OptionsMenu = ({ myRef }) => {
    // const handleOptionSelect = (option) => {
    //     console.log('Selected option:', option);
    //     menuRef.current.close();
    //     // Perform any desired action here.
    // };

    return (
        <View style={{
            alignSelf: 'flex-end',
        }}>
            <Menu ref={myRef}>
                <MenuTrigger text='' />
                <MenuOptions>
                    <MenuOption value={1} text='One' />
                    <MenuOption value={2}>
                        <Text style={{ color: 'red' }}>Two</Text>
                    </MenuOption>
                    <MenuOption value={3} disabled={true} text='Three' />
                </MenuOptions>
            </Menu>
        </View>
    );
};

export default OptionsMenu;
