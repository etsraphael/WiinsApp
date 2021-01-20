import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PlayerMusicActions from './../../../redux/Player/actions'
import * as MyProfileActions from './../../../redux/MyProfile/actions'

class HomeApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            selection: 'MainFeed'
        }
    }

    componentDidMount = async () => {
        this.props.actions.getMyProfile()
        this.props.actions.resetPlayerActions()
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.MyProfile.isLoading && !!newProps.MyProfile.profile) {
            this.setState({ show: true })
        }
    }

    // to navigate the place
    _goTo = (name) => {
        this.setState({ selection: name })
    }

    // to select the loading logo view
    _loading = () => {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="#595959" />
            </View>
        )
    }

    render = () => {
        return (
            <View style={{ flex: 1 }}>
                {(this.state.show) ? this._showHome() : this._loading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFooter: {
        position: 'absolute',
        height: 63,
        width: '100%',
        bottom: 30,
    },
    navbarContainer: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: '#b6b6b6',
        borderRadius: 37,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerIcon: {
        paddingHorizontal: 25
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile
})

const ActionCreators = Object.assign(
    {},
    MyProfileActions,
    PlayerMusicActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeApp)