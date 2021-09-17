import React from 'react'
import { View, StatusBar } from 'react-native'
import FastImage from "react-native-fast-image"
import { AppTheme } from "../utility/theme-util"

const SplashScreen = () => {
    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: AppTheme.colors.background }}>
            <StatusBar
                animated={true}
                backgroundColor={AppTheme.colors.background}
                barStyle='dark-content'
                hidden={false}
            />
            <FastImage 
                source={require('../../../../../assets/image/icon/icon-single.png')} 
                resizeMode={FastImage.resizeMode.contain}
                style={{ width: 125, height: 131, marginRight: 25, resizeMode: 'contain', }}
            />
        </View>
    )
}

export default SplashScreen;