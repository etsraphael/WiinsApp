import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import SettingProfile from '../components/space/setting/setting-profile'
import SettingLedger from '../components/space/setting/setting-ledger'
import SettingOther from '../components/space/setting/setting-other'
import SettingPassword from '../components/space/setting/setting-password'
import SettingCertification from '../components/space/setting/setting-certification'
import SettingPrivacy from '../components/space/setting/setting-privacy'
import SettingLanguage from '../components/space/setting/setting-language'
import SettingMainMenu from '../components/space/setting/setting-main-menu'

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
        border: 0
    },
};

const Stack = createStackNavigator()

export const SettingNavigationMain = () => (
    <NavigationContainer theme={MyTheme} independent={true}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: "transparent",
                    opacity: 1
                }
            }}
            initialRouteName={'SettingMainMenu'}
        >
            <Stack.Screen name={'SettingMainMenu'} component={SettingMainMenu} />
            <Stack.Screen name={'SettingCertification'} component={SettingCertification} />
            <Stack.Screen name={'SettingProfile'} component={SettingProfile} />
            <Stack.Screen name={'SettingLedger'} component={SettingLedger} />
            <Stack.Screen name={'SettingOther'} component={SettingOther} />
            <Stack.Screen name={'SettingPassword'} component={SettingPassword} />
            <Stack.Screen name={'SettingPrivacy'} component={SettingPrivacy} />
            <Stack.Screen name={'SettingLanguage'} component={SettingLanguage} />
        </Stack.Navigator>
    </NavigationContainer>
)
