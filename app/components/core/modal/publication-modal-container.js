import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import * as PublicationFeedActions from '../../../redux/FeedPublications/actions'
import * as ProfilePublicationActions from '../../../redux/ProfilePublications/actions'
import * as DiscoverPublicationActions from '../../../redux/DiscoverPublications/actions'
import * as CommentListActions from '../../../redux/CommentList/actions'
import PublicationModalNavigation from '../../../navigation/publication-modal-navigation'

class PublicationModalContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showSuggest: false,
            displayVideo: false,
            background_filter: false,
            page: 1,
            textComment: '',
            commentVisible: false,
            swipDirection: 'down',
            propagateSwipe: false
        }
    }

    render() {
        return (
            <View>
                <Modal
                    onSwipeComplete={() => this.props.toggleModal()}
                    isVisible={true}
                    transparent={true}
                    propagateSwipe={this.state.propagateSwipe}
                    animationIn={'bounceInUp'}
                    animationOut={'bounceOutDown'}
                    animationInTiming={500}
                    style={{ backgroundColor: 'white', flex: 1, margin: 0, overflow: 'hidden' }}
                    swipeDirection={this.state.swipDirection}
                    swipeThreshold={50}
                >
                    <PublicationModalNavigation goToProfile={(payload) => this.props.goToProfile(payload)} pageName={this.props.pageName} toggleModal={this.props.toggleModal} />
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile.profile,
    CommentList: state.CommentList,
    SearchList: state.Search,
    FeedPublications: state.FeedPublications,
    ProfilePublications: state.ProfilePublications,
    DiscoverPublications: state.DiscoverPublications,
    PublicationsInModal: state.PublicationsInModal
})

const ActionCreators = Object.assign(
    {},
    CommentListActions,
    PublicationFeedActions,
    ProfilePublicationActions,
    DiscoverPublicationActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicationModalContainer)