import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Feed from '../components/space/feed/feed'
import Profile from '../components/space/profile/profile'
import MyProfile from '../components/space/profile/my-profile'
import Setting from '../components/space/setting/setting'
import SettingProfile from '../components/space/setting/setting-profile'
import SettingLedger from '../components/space/setting/setting-ledger'
import SettingOther from '../components/space/setting/setting-other'
import SettingPassword from '../components/space/setting/setting-password'
import SettingCertification from '../components/space/setting/setting-certification'
import SettingPrivacy from '../components/space/setting/setting-privacy'
import SettingLanguage from '../components/space/setting/setting-language'
import NotificationPage from './../components/space/feed/notification/notification-page'

const Stack = createStackNavigator()

const SettingNavigation = () => (
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
        <Stack.Screen name={'SettingLanguage'} component={SettingLanguage} />
    </Stack.Navigator>
)

export default FeedNavigation = (initialProps) => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'Feed'}
    >
        <Stack.Screen name={'Feed'}>
            {(props) => <Feed {...props} params={initialProps.route.params} />}
        </Stack.Screen>
        <Stack.Screen name={'MyProfile'} component={MyProfile} />
        <Stack.Screen name={'Profile'} component={Profile} />
        <Stack.Screen name={'Setting'} component={SettingNavigation} />
        <Stack.Screen name={'Notification'} component={NotificationPage} />
    </Stack.Navigator>
)