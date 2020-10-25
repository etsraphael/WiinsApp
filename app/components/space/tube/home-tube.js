import React from 'react'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as MyUserActions from '../../../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { TubesCategories } from './../../core/data/tubes'
import * as TubeMenuActions from '../../../../redux/TubeMenu/actions'

class HomeTube extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categorySelected: 'trending'
        }
    }

    UNSAFE_componentWillMount = () => {
        this.props.actions.getTubeMenuActions()
    }

    // to display the header tube
    _headerTube = () => {
        return (
            <View style={styles.header_container}>

                {/* search bar */}
                <View style={{ flex: 8 }}>
                    <View style={styles.container_search_bar}>
                        <Image style={{ marginLeft: 20, width: 18, height: 18 }} source={require('../../../../assets/image/icon/search-icon.png')} />
                        <TextInput
                            placeholder='Search'
                            style={styles.search_bar}
                            placeholderTextColor="#737373"
                        />
                    </View>
                </View>

                {/* Add Btn */}
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'red', width: 30, height: 30, borderRadius: 30, marginLeft: 15, overflow: 'hidden' }}>
                        <LinearGradient
                            colors={['#FF906A', '#FF3F64']}
                            start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                            style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                            <FontAwesomeIcon icon={faPlus} color={'white'} size={19} />
                        </LinearGradient>
                    </TouchableOpacity>
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
                                <Text style={[styles.categoryText, this._actifCategory(item.code)]}>{'TUBE.Categorie.' + item.name}</Text>
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
    _oneTubeRender = (item) => {

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TubePage', { tubeId: item.tube._id })}
                style={styles.oneTubeContainer}
            >

                {/* Background Image */}
                <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: item.tube.posterLink, priority: FastImage.priority.normal }}
                />

                {/* Footer Card */}
                <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 70, }}>
                    <LinearGradient
                        colors={['#fbfbfb00', '#bdc3c72e', '#2c3e50d1']}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: '100%', borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
                        <FastImage
                            style={{ width: 45, height: 45, borderRadius: 45, borderWidth: 2, borderColor: '#FF2D55' }} resizeMode={FastImage.resizeMode.cover}
                            source={{ uri: item.tube.profile.pictureprofile, priority: FastImage.priority.normal }}
                        />
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '800' }}>{item.tube.profile._meta.pseudo}</Text>
                        </View>
                    </LinearGradient>

                </View>
            </TouchableOpacity>
        )

    }

    // to display the tube list
    _showTubeList = (tubeList) => {
        return (
            <View style={{ paddingBottom: 10 }}>

                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, paddingLeft: 19 }}
                        data={tubeList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => this._oneTubeRender(item)}
                    />
                </View>
            </View>
        )
    }

    // to display the line separator
    _lineSeparator = () => {
        return (<View style={{ height: 5, backgroundColor: '#f3f3f6' }} />)
    }

    // to display the tubelist by section
    _tubeListBySection = (tubeList, title) => {
        if(tubeList.length == 0) return null
        return (
            <View style={styles.container_section}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 15, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 30, fontFamily: 'Avenir-Heavy', letterSpacing: 1, color: '#1E2432' }}>{title}</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: '400', fontSize: 15, fontFamily: 'Avenir-Heavy', color: '#FF2D55' }}>See All</Text>
                    </View>
                </View>

                {/* Video List */}
                {this._showTubeList(tubeList)}

                {/* Line Separator */}
                {this._lineSeparator()}

            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                {this._headerTube()}
                {this._categorieViews()}
                {this._tubeListBySection(this.props.TubeMenu.following, 'Following')}
                {this._tubeListBySection(this.props.TubeMenu.suggestions, 'Suggestion')}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0,
        backgroundColor: 'white'
    },
    header_container: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    container_search_bar: {
        height: 38,
        fontSize: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        borderRadius: 18,
        backgroundColor: '#f2f3f7',
        overflow: 'hidden',
        alignItems: 'center'
    },
    search_bar: {
        fontSize: 15,
        paddingLeft: 10
    },
    container_section: {
        backgroundColor: 'white'
    },
    one_hastag: {
        marginHorizontal: 8
    },
    oneTubeContainer: {
        marginHorizontal: 10,
        marginVertical: 15,
        height: 155,
        width: 175,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
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
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeTube)