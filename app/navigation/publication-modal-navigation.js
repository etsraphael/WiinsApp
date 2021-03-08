import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import CardModal from './../components/core/card/card-modal'
import CommentPage from './../components/core/reusable/comment/comment-page'

const MainRoute = createStackNavigator(
    { 
        CardModal: { screen: CardModal },
        Comments: { screen: CommentPage }
    },
    { headerMode: 'none', initialRouteName: 'CardModal' }
)

const PublicationModalNavigation = createStackNavigator(
    { Main: MainRoute },
    { headerMode: 'none', initialRouteName: 'Main' }
)

export default createAppContainer(PublicationModalNavigation)