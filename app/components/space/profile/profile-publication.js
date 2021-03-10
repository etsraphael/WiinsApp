import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FlatList } from 'react-native'
import CardNewFeed from './../../core/card/card-new-feed'

class ProfilePublication extends React.Component {

    constructor(props) {
        super(props)
    }

    _cardRender = (item, index) => {
        return (
            <CardNewFeed
                index={index}
                publication={item}
                navigation={this.props.navigation}
                space={'profile'}
                toggleModal={(event) => this.props.toggleModal(event)}
            />)
    }

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
                data={this.props.ProfilePublications.publications}
                renderItem={({ item, index }) => this._cardRender(item, index)}
                keyExtractor={item => item.id}
            />
        )
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