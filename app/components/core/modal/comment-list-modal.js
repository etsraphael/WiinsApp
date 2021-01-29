import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FastImage from 'react-native-fast-image'
import * as SearchActions from '../../../redux/SearchBar/actions'
import * as CommentListActions from '../../../redux/CommentList/actions'

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
                    onSwipeComplete={() => DeviceEventEmitter.emit('toggleModal')}
                    isVisible={true}
                    transparent={true}
                    propagateSwipe={true}
                    animationIn={'bounceInUp'}
                    animationOut={'zoomOut'}
                    animationInTiming={500}
                    style={{ backgroundColor: 'white', flex: 1, margin: 0, borderRadius: 15, overflow: 'hidden' }}
                    swipeDirection='down'
                    swipeThreshold={50}
                >
                <FlatList
                    inverted
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this._loadMoreBtn}
                    style={{ flex: 1 }}
                    data={this.props.CommentList.commentList.sort((a, b) => a.createdAt.localeCompare(b.createdAt))}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (this._oneComment(item))}
                />
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