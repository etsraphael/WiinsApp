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
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    flex: 1,
                    backgroundColor: "red",
                    opacity: 1,
                    position: 'relative',
                    overflow: 'visible'
                },
            }}
            initialRouteName={'SettingMainMenu'}
        >
            <Stack.Screen name={'SettingMainMenu'} component={SettingMainMenu} />
            <Stack.Screen name={'SettingMenuProfile'} component={SettingMenuProfile} />
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
