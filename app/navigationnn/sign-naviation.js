import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import OnBoarding from '../components/sign/on-boarding'
import SignIn from '../components/sign/sign-in'
import SignUp from '../components/sign/sign-up'
import SettingPrivacy from '../components/space/setting/setting-privacy'

const SignNavigation = createStackNavigator({
    OnBoarding: OnBoarding,
    SignIn: SignIn,
    Register: SignUp,

    SettingPrivacy: SettingPrivacy
}, {
    initialRouteName: 'OnBoarding',
    headerMode: 'none'
}
)

export default createAppContainer(SignNavigation)