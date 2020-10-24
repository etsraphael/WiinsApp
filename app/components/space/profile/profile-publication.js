import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PublicationStandard from '../../core/publication-standard'
import MasonryList from '@appandflow/masonry-list';

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

        if (!this.props.PublicationFeed.publication.isLoading && !this.state.publicationLoading) {
            this.setState({pagePublication: ++this.state.pagePublication, publicationLoading: true})
            setTimeout(() => this.setState({ publicationLoading: false }), 3000); 
        }

    }

    render() {
        return (
            <MasonryList
                onRefresh={this._refreshRequest}
                refreshing={this.state.isRefreshing}
                data={this.props.PublicationFeed.publication}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PublicationStandard publication={item} navigation={this.props.navigation} space={'profile'} />}
                getHeightForItem={({ item }) => 15}
                numColumns={2}
                onEndReachedThreshold={0.5}
                onEndReached={() => this._getPublicationList()}
            />
        )
    }
}

const styles = StyleSheet.create({
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    PublicationFeed: state.publicationProfile,
})

const ActionCreators = Object.assign({})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePublication)