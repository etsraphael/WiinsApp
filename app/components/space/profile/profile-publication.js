import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FlatList } from 'react-native'
import CardNewFeed from './../../core/card/card-new-feed'

class ProfilePublication extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pagePublication: 1,
            publicationLoading: false
        }
    }

    // to show the publications feed
    _getPublicationList = () => {
        if (!this.props.ProfilePublications.isLoading) {
            this.setState({ pagePublication: ++this.state.pagePublication, publicationLoading: true })
            setTimeout(() => this.setState({ publicationLoading: false }), 3000);
        }
    }

    render() {
        return (<FlatList
            data={this.props.ProfilePublications.publications}
            renderItem={({ item, index }) => <CardNewFeed index={index} publication={item} navigation={this.props.navigation} space={'profile'} />}
            keyExtractor={item => item.id}
        />)
    }
}

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    ProfilePublications: state.ProfilePublications,
})

const ActionCreators = Object.assign({})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePublication)