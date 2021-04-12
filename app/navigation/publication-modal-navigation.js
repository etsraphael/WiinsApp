import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CardModal from './..//components/core/reusable/card/card-modal'
import CommentPage from './../components/core/reusable/comment/comment-page'

const Stack = createStackNavigator()

export default PublicationModalNavigation = (propsInitial) => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'CardModal'}
    >
        <Stack.Screen name={'CardModal'}>
            {(props) => <CardModal {...props} goToProfile={(payload) => propsInitial.goToProfile(payload)} toggleModal={propsInitial.toggleModal} pageName={propsInitial.pageName}/>}
        </Stack.Screen>
        <Stack.Screen name={'Comments'} component={CommentPage} />
    </Stack.Navigator>
)