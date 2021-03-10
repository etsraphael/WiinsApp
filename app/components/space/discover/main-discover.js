import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import * as TopHastagActions from '../../../redux/TopHastag/actions'
import * as DiscoverPublicationActions from '../../../redux/DiscoverPublications/actions'
import { bindActionCreators } from 'redux'
import DiscoverNavigation from '../../../navigation/discover-navigation'

class MainDiscover extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.feed_container}>
                <DiscoverNavigation />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    feed_container: {
        flex: 1
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    TopHastag: state.TopHastag,
    DiscoverPublication: state.DiscoverPublication
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    TopHastagActions,
    DiscoverPublicationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainDiscover)