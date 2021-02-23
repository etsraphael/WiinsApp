import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '../../../i18n/i18n'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons'

class TubeListPage extends React.Component {

    constructor(props) {
        super(props)
    }

    _showHeader = () => {
        return (
            <View style={{ height: 50, width: '100%', flexDirection: 'row', paddingHorizontal: 25 }}>
                {/* Back Btn */}
                <TouchableOpacity onPress={() => this.props.screenProps.rootNavigation.goBack(null)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faArrowLeft} color={'grey'} size={30} />
                </TouchableOpacity>
            </View>
        )
    }

    // to display a separator line
    _lineSeparator = () => {
        return (<View style={{ height: 5, backgroundColor: '#f3f3f6' }} />)
    }

    // to display some tube by section
    _tubeListBySection = (tubeList, title, line) => {

        if (!tubeList || tubeList.length == 0) return null

        return (
            <View style={styles.container_section}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 15, alignItems: 'center' }}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', letterSpacing: 1, color: '#1E2432', paddingHorizontal: 5 }}>{title}</Text>
                        <View>
                            <LinearGradient colors={['#31B3D8', '#784BEA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 3, width: '100%' }} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 15, fontFamily: 'Avenir-Heavy', color: '#FF2D55' }}>{I18n.t('CORE.Show-more')}</Text>
                    </View>
                </View>

                {/* Video List */}
                {this._showTubeList(tubeList)}

                {/* Line Separator */}
                {line ? this._lineSeparator() : null}

            </View>
        )
    }

    // to display a miniature tube
    _oneTubeRender = (item) => {
        return (
            <TouchableOpacity
                onPress={() => this.uploadPageTube(item.tube._id)}
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
            <View style={{ paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={tubeList}
                        keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
                        renderItem={({ item }) => this._oneTubeRender(item)}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this.props.TubeMenu.isLoading ? null :
                    <ScrollView style={{ flex: 1, marginBottom: 50 }}>
                        {/* Header */}
                        {this._showHeader()}

                        {/* Body */}
                        {this._tubeListBySection(this.props.TubeMenu.trending, 'Suggestion', false)}
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
    },
    container_section: {
        backgroundColor: 'white'
    },
    oneTubeContainer: {
        marginHorizontal: 10,
        marginVertical: 15,
        width: 160
    },
    oneTubeImage: {
        borderRadius: 5,
        height: 110,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
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