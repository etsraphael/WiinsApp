import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as PublicationFeedActions from '../../../../redux/PublicationFeed/actions'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import { bindActionCreators } from 'redux'
import FeedNavigation from '../../../navigation/feed-navigation'

class MainFeed extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.feed_container}>
                <FeedNavigation />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    feed_container: { flex: 1 }
})

const mapStateToProps = state => ({
    PublicationFeed: state.PublicationFeed,
    MyUser: state.MyUser,
    SearchList: state.Search,
    MyProfile: state.MyProfile
});

const ActionCreators = Object.assign(
    {},
    PublicationFeedActions,
    SearchActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed)