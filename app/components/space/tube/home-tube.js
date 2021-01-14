import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faSearch } from '@fortawesome/pro-light-svg-icons'
import { TubesCategories } from './../../core/data/tubes'
import * as TubeMenuActions from '../../../../redux/TubeMenu/actions'
import I18n from '../../../i18n/i18n'

class HomeTube extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categorySelected: 'trending'
        }
    }

    /* For testing purpose */
    testValue = {
        a: 'https://i.pinimg.com/236x/c7/a1/b8/c7a1b863aeba4b9a409b61ad7201924b.jpg',
        b: 'https://i.pinimg.com/236x/e1/20/a8/e120a8628766f705cfd017ecf9ef00ea.jpg'
    }

    UNSAFE_componentWillMount = () => {
        this.props.actions.getTubeMenuActions()
    }

    // to display the header view of the screen
    _header = () => {
        return (
            <View style={styles.header_container}>
                {/* search bar */}
                <View style={styles.container_search_bar}>
                    <TextInput
                        placeholder='Search'
                        style={styles.search_bar}
                        placeholderTextColor="#737373"
                        value={this.state.search}
                        blurOnSubmit={true}
                    />
                </View>
            </View>
        )
    }

    // to custom the category selected
    _actifCategory = (code) => {
        if (code == this.state.categorySelected) return { color: 'black' }
    }

    // to set the category
    _changeCategory = (category) => {
        this.setState({ categorySelected: category.code })
    }

    // to display all the categories
    _categorieViews = () => {
        return (
            <View style={styles.container_section}>

                {/* Category List */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={TubesCategories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.one_hastag} onPress={() => this._changeCategory(item)}>
                                <Text style={[styles.categoryText, this._actifCategory(item.code)]}>{I18n.t('TUBE.Categorie.' + item.name)}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Video List */}
                {this._showTubeList(this.props.TubeMenu['trending'])}

                {/* Line Separator */}
                {this._lineSeparator()}

            </View>
        )
    }

    // to display one tube
    /*
    TODO: Change render value on real api data
    */
    _oneTubeRender = (item, isLarge = false, isLastIndex) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TubePage', { tubeId: item.tube._id })}
                style={styles.oneTubeContainer(isLarge, isLastIndex)}
            >

                {/* Background Image */}
                <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: item.tube ? item.tube.posterLink : this.testValue.a, priority: FastImage.priority.normal }} // Subject to change
                />

                {/* Footer Card */}
                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 70, }}>
                    <LinearGradient
                        colors={['#fbfbfb00', '#bdc3c72e', '#2c3e50d1']}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: '100%', borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
                        <FastImage
                            style={{ width: 45, height: 45, borderRadius: 45, borderWidth: 2, borderColor: '#FF2D55' }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: item.tube ? item.tube.profile.pictureprofile : this.testValue.b, priority: FastImage.priority.normal }} // Subject to change
                        />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '800' }}>{item.tube ? item.tube.profile._meta.pseudo : 'a'}</Text>
                        </View>
                    </LinearGradient>

                </View>
            </TouchableOpacity>
        )

    }

    // to display the tube list
    _showTubeList = (tubeList, isLarge = false) => {
        return (
            <View style={{ paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingHorizontal: 19 }}
                        data={tubeList}
                        keyExtractor={(item, index) => `tube-item-${index}`} // item.id.toString()
                        renderItem={({ item, index }) => this._oneTubeRender(item, isLarge, index === tubeList.length - 1)}
                    />
                </View>
            </View>
        )
    }

    // to display the line separator
    _lineSeparator = () => {
        return (<View style={{ height: 5, backgroundColor: '#F1F2F6' }} />)
    }

    // to display the tubelist by section
    _tubeListBySection = (tubeList, title, titleStyle = {}, isLarge = false) => {
        if (tubeList === undefined || tubeList === null || tubeList.length == 0) tubeList = [{}, {}, {}] //return null

        return (
            <View style={styles.container_section}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 15, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', letterSpacing: 1, color: '#1E2432', ...titleStyle }}>{title}</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 15, fontFamily: 'Avenir-Heavy', color: '#FF2D55' }}>See All</Text>
                    </View>
                </View>

                {/* Video List */}
                {this._showTubeList(tubeList, isLarge)}

                {/* Line Separator */}
                {this._lineSeparator()}

            </View>
        )
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <ScrollView style={styles.main_container}>
                    {this._header()}
                    {this._tubeListBySection(this.props.TubeMenu.trending, 'Trending', { fontWeight: 'bold' }, true)}
                    {this._tubeListBySection(this.props.TubeMenu.suggestions, 'Recommended For You')}

                    {/* {this._categorieViews()} */}
                    {this._tubeListBySection(this.props.TubeMenu.following, 'Following')}
                    {this._tubeListBySection(this.props.TubeMenu.trending, 'Trending')}
                    {this._tubeListBySection(this.props.TubeMenu.suggestions, 'Suggestion')}
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#eef2f4'
    },
    header_container: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
        paddingBottom: 15,
        paddingHorizontal: 25,
        backgroundColor: '#f9fafc',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        position: 'relative',
        borderWidth: 0.3,
        borderColor: '#c3c3c36e'
    },
    container_search_bar: {
        height: 45,
        fontSize: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        borderRadius: 25,
        backgroundColor: '#edf1f3',
        overflow: 'hidden',
        alignItems: 'center'
    },
    container_search_bar_icon: {
        position: 'absolute',
        left: 0,
        flex: 1,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search_bar: {
        fontSize: 15,
        paddingLeft: 5,
        paddingVertical: 15,
        width: '100%'
    },
    add_button: {
        backgroundColor: 'red',
        width: 35,
        height: 35,
        borderRadius: 30,
        marginLeft: 15,
        overflow: 'hidden',
        shadowColor: "#FF65A0",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.52,
        shadowRadius: 5.46,
        elevation: 9,
    },
    container_section: {
        paddingVertical: 10
    },
    one_hastag: {
        marginHorizontal: 8
    },
    oneTubeContainer: (isLarge = false, isLastIndex = false) => ({
        marginHorizontal: 10,
        marginVertical: 15,
        marginRight: isLastIndex ? 40 : 10,
        height: 197,
        width: isLarge ? 300 : 250,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden'
    }),
    categoryText: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Avenir-Heavy',
        lineHeight: 41,
        letterSpacing: 1,
        color: '#acb1c0e3'
    }
})

const mapStateToProps = state => ({
    MyUser: state.MyUser,
    TubeMenu: state.TubeMenu
})

const ActionCreators = Object.assign(
    {},
    MyUserActions,
    TubeMenuActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeTube)