import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import * as SearchActions from '../../../../redux/SearchBar/actions'
import * as CommentListActions from '../../../../redux/CommentList/actions'
import Modal from 'react-native-modal'
import I18n from '../../../i18n/i18n'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments } from '@fortawesome/pro-duotone-svg-icons'


class CommentListModal extends React.Component {

    constructor(props) {
        super(props)
    }

    // to get the view one comment
    _oneComment(comment) {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#00000066', flexWrap: 'wrap', marginVertical: 5, borderRadius: 35, padding: 5 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.container_avatar_comment}>
                            <FastImage
                                style={{ width: 45, height: 45, borderRadius: 45 }} resizeMode={FastImage.resizeMode.cover}
                                source={{ uri: comment.idProfil.pictureprofile, priority: FastImage.priority.normal }}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ paddingLeft: 10, paddingRight: 15 }}>
                            <Text style={{ fontWeight: '200', color: 'white' }}>{comment.idProfil._meta.pseudo}</Text>
                            <Text style={{ color: '#FFFFFF', fontWeight: '400' }}>{comment.text}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // to load more comment
    _loadMoreBtn = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#00000066', flexWrap: 'wrap', marginVertical: 5, borderRadius: 35, padding: 5 }}>
                    <View style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                        <View style={{ paddingLeft: 10, paddingRight: 15 }}>
                            <Text style={{ color: '#FFFFFF', fontWeight: '400' }}>Load more..</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        return (
            <Modal
                    onSwipeComplete={() => this.props.closeModal()}
                    onBackdropPress={() => this.props.closeModal()}
                    isVisible={true}
                    transparent={true}
                    propagateSwipe={true}
                    animationIn={'bounceInUp'}
                    animationOut={'zoomOut'}
                    animationInTiming={500}
                    style={{ backgroundColor: '#fffffff2', flex: 1, margin: 0, borderRadius: 35, overflow: 'hidden',marginTop: '40%' }}
                    swipeDirection='down'
                    swipeThreshold={50}
                >


                <View style={{flex: 1}}>


                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, paddingBottom: 15, borderBottomWidth: 0.5, borderColor: '#cccccc'}}>
                    <FontAwesomeIcon style={{marginHorizontal: 15}} icon={faComments} size={25} color="blue"/>
                    <Text style={{ color: '#1E2022', fontWeight: '400', fontSize: 20, fontFamily: 'Gill Sans',}}>{I18n.t('CORE.Comment')}</Text>
                </View>


                <FlatList
                    inverted={true}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this._loadMoreBtn}
                    data={this.props.CommentList.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt))}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => this._oneComment(item)}
                />




{/* 
                <FlatList
                    style={{backgroundColor: 'red'}}
                    inverted={true}
                    showsVerticalScrollIndicator={false}
                    data={[1,2,3,4,5,6,7,8]}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => {
                        <View style={{flexDirection: 'row', marginHorizontal: 15, backgroundColor: 'red', height: 50}}>
                            <Text>{item}</Text>
                        </View>
                    }}
                /> */}



                
                </View>




                




            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container_avatar_comment: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 46,
        height: 46
    }
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile,
    CommentList: state.CommentList
})

const ActionCreators = Object.assign(
    {},
    SearchActions,
    CommentListActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentListModal)