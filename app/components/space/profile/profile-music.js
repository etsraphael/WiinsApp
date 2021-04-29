import React from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MusicProjectListActions from '../../../redux/MusicProjectList/actions'
import MusicProjectStandard from '../music/music-project-standard'

class ProfileMusic extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            musicProject: [],
            isLoading: true
        }
    }

    // to display the animation loading
    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="grey" />
            </View>
        )
    }

    // to display the list of the musics project
    _displaymusicProjectList() {

        return (
            <View style={styles.container_musicProjectList}>
                <FlatList
                    data={this.props.MusicProjectList.musicProjects}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (<MusicProjectStandard musicProject={item} />)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.MusicProjectList.isLoading ? this._displayLoading() : this._displaymusicProjectList()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading_container: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        paddingTop: '30%'
    },
    container_musicProjectList: {
        height: '100%',
        width: '100%',
        marginBottom: 150
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    MusicProjectList: state.MusicProjectList
})

const ActionCreators = Object.assign(
    {},
    MusicProjectListActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMusic)