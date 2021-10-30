import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import SettingProfile from '../components/space/setting/setting-profile'
import SettingLedger from '../components/space/setting/setting-ledger'
import SettingOther from '../components/space/setting/setting-other'
import SettingPassword from '../components/space/setting/setting-password'
import SettingCertification from '../components/space/setting/setting-certification'
import SettingPrivacy from '../components/space/setting/setting-privacy'
import SettingLanguage from '../components/space/setting/setting-language'
import SettingMainMenu from '../components/space/setting/setting-main-menu'
import SettingMenuProfile from '../components/space/setting/setting-menu-profile'


const Stack = createStackNavigator()

export const SettingNavigationMain = () => (
    <NavigationContainer independent={true}>
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Default'}
        >
            <Stack.Screen name={'Default'} component={SettingMenuProfile} />
        </Stack.Navigator>
    </NavigationContainer>
)
