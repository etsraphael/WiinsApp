import React from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as musicProjectListActions from '../../../../redux/musicProjectList/actions'
import MusicProjectStandard from '../music/music-project-standard'

class ProfileMusic extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            musicProject: [],
            isLoading: true
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.musicProjectList.isLoading) {
            if (newProps.musicProjectList.musicProject.length !== 0) {
                this.setState({
                    musicProject: this.state.musicProject.push(newProps.musicProjectList.musicProject),
                    isLoading: false
                })
            }
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
                    data={this.props.musicProjectList.musicProject}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (<MusicProjectStandard musicProject={item} />)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.musicProjectList.isLoading ? this._displayLoading() : this._displaymusicProjectList()}
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
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    musicProjectList: state.musicProjectList
})

const ActionCreators = Object.assign(
    {},
    musicProjectListActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMusic)