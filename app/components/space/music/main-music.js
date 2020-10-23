import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import MusicNavigation from '../../../navigation/music-navigation'

class MainMusic extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <MusicNavigation />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white'
    }

})

const mapStateToProps = state => ({
    MyUser: state.MyUser
});

const ActionCreators = Object.assign(
    {},
    MyUserActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMusic)