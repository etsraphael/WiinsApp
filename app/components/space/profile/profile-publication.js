import React from 'react'
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

        if (!this.props.ProfilePublications.isLoading) {
            this.setState({pagePublication: ++this.state.pagePublication, publicationLoading: true})
            setTimeout(() => this.setState({ publicationLoading: false }), 3000); 
        }

    }

    render() {

        return (
            <MasonryList
                onRefresh={this._refreshRequest}
                refreshing={this.state.isRefreshing}
                data={this.props.ProfilePublications.publications}
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

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    ProfilePublications: state.ProfilePublications,
})

const ActionCreators = Object.assign({})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePublication)