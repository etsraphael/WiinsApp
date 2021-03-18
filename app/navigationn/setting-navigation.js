import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Setting from '../components/space/setting/setting'
import SettingProfile from '../components/space/setting/setting-profile'
import SettingLedger from '../components/space/setting/setting-ledger'
import SettingOther from '../components/space/setting/setting-other'
import SettingPassword from '../components/space/setting/setting-password'
import SettingCertification from '../components/space/setting/setting-certification'
import SettingPrivacy from '../components/space/setting/setting-privacy'

const Stack = createStackNavigator()

export default SettingNavigation = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Setting'}
    >
        <Stack.Screen name={'Setting'} component={Setting} />
        <Stack.Screen name={'SettingProfile'} component={SettingProfile} />
        <Stack.Screen name={'SettingLedger'} component={SettingLedger} />
        <Stack.Screen name={'SettingOther'} component={SettingOther} />
        <Stack.Screen name={'SettingPassword'} component={SettingPassword} />
        <Stack.Screen name={'SettingCertification'} component={SettingCertification} />
        <Stack.Screen name={'SettingPrivacy'} component={SettingPrivacy} />
    </Stack.Navigator>
)