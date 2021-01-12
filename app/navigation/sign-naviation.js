import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import OnBoarding from '../components/sign/on-boarding'
import SignIn from '../components/sign/sign-in'
import SignUp from '../components/sign/sign-up'

const SignNavigation = createStackNavigator({
        SignIn: SignIn,
        Register: SignUp,
        OnBoarding: OnBoarding,
    },{
        initialRouteName: 'OnBoarding',
        headerMode: 'none'
    }
)

export default createAppContainer(SignNavigation)