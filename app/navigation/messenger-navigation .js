import { createStackNavigator } from 'react-navigation-stack'
import HomeMessenger from '../components/space/messenger/home-messenger'
import OneRoom from '../components/space/messenger/one-room'
import { createAppContainer } from 'react-navigation'

const HomeMessengerRoute = createStackNavigator(
    { HomeMessenger: { screen: HomeMessenger } },
    { headerMode: 'none', initialRouteName: 'HomeMessenger' }
)

const OneRoomRoute = createStackNavigator(
    { OneRoom: { screen: OneRoom } },
    { initialRouteName: 'OneRoom', headerMode: 'screen' }
)

const MessengerNavigation = createStackNavigator(
    {
        HomeMessenger: HomeMessengerRoute,
        OneRoom: OneRoomRoute
    },
    { headerMode: 'none', initialRouteName: 'HomeMessenger' }
)

export default createAppContainer(MessengerNavigation)

