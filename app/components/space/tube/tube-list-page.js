import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '../../../../assets/i18n/i18n'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons'

class TubeListPage extends React.Component {

    constructor(props) {
        super(props)
    }

    _showHeader = () => {
        return (
            <View style={{ height: 50, width: '100%', flexDirection: 'row', paddingHorizontal: 25, marginBottom: 10 }}>
                {/* Back Btn */}
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                    <FontAwesomeIcon icon={faArrowLeft} color={'grey'} size={25} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', paddingHorizontal: 25, paddingTop: 15 }}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', letterSpacing: 1, color: '#1E2432', paddingHorizontal: 5 }}>{I18n.t('CORE.Title')}</Text>
                        <View>
                            <LinearGradient colors={['#31B3D8', '#784BEA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 3, width: '100%' }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // to display a miniature tube
    _oneTubeRender = (item) => {
        return (
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TubePage', { tubeId: item.tube._id })}
                style={styles.oneTubeContainer}
            >

                {/* Background Image */}
                <FastImage
                    style={styles.oneTubeImage} resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: item.tube.posterLink, priority: FastImage.priority.normal }}
                />
                <View style={{ paddingVertical: 10 }}>
                    <Text style={styles.greyText}>{item.tube.profile._meta.pseudo}</Text>
                </View>

            </TouchableOpacity>
        )

    }

    // to displau the tube list
    _showTubeList = (tubeList) => {
        return (
            <View style={{marginBottom: 50}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ }}
                        data={tubeList}
                        keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
                        renderItem={({ item }) => this._oneTubeRender(item)}
                    />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this.props.TubeMenu.isLoading ? null :
                    <ScrollView style={{ flex: 1 }}>
                        {/* Header */}
                        {this._showHeader()}

                        {/* Body */}

                        {this._showTubeList(this.props.TubeMenu.trending)}
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#eef2f4',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,

    },
    oneTubeContainer: {
        width: '100%'
    },
    oneTubeImage: {
        height: 210,
        width: '100%'
    },
    greyText: {
        color: '#77838F',
        fontSize: 14,
        fontFamily: 'Avenir-Heavy'
    },
    videoSection: {
        height: 250,
        width: '100%',
        position: 'relative'
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    TubeMenu: state.TubeMenu,
})

const ActionCreators = Object.assign(
    {},
    MyUserActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TubeListPage)