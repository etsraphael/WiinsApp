import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Camera from '../components/space/publication/camera'
import PendingPublication from '../components/space/publication/pending-publication'
import MyStory from '../components/space/publication/my-story'

const CameraRoute = createStackNavigator(
    { Camera: { screen: Camera } },
    { headerMode: 'none', initialRouteName: 'Camera' }
)

const PendingPublicationRoute = createStackNavigator(
    { PendingPublication: { screen: PendingPublication } },
    { headerMode: 'none', initialRouteName: 'PendingPublication' }
)

const MyStoryRoute = createStackNavigator(
    { MyStory: { screen: MyStory } },
    { headerMode: 'none', initialRouteName: 'MyStory' }
)

const PublicationNavigation = createStackNavigator(
    {
        Camera: CameraRoute,
        PendingPublication: PendingPublicationRoute,
        MyStory: MyStoryRoute
    },
    {
        headerMode: 'none',
        initialRouteName: 'Camera',
    }
)

export default createAppContainer(PublicationNavigation)

