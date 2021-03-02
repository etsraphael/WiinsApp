import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'

class OptionPublicationModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _separatorItem = () => {
        return (<View style={{ height: 1, backgroundColor: '#9b9b9b45' }} />)
    }

    _selectedAction = (code) => {
        switch (code) {
            case 'reportPublication': return alert('reportPublication')
            case 'blockUser': return alert('block')
            case 'close': return alert('close')
        }
    }


    render() {

        const optionsList = [
            { code: 'reportPublication', title: 'Report Publication', color: 'red' },
            { code: 'blockUser', title: 'Block User', color: 'black' }
        ]

        return (
            <View>

                <Modal
                    onSwipeComplete={() => this.props.toggleReportModal()}
                    onBackdropPress={() => this.props.toggleReportModal()}
                    isVisible={true}
                    transparent={true}
                    animationIn={'bounceInUp'}
                    animationOut={'bounceOutDown'}
                    animationInTiming={500}
                    style={styles.container_modal}
                    swipeDirection={'down'}
                    propagateSwipe={true}
                >
                    <View style={{ height: 'auto' }}>
                        <FlatList
                            scrollEnabled={false}
                            ItemSeparatorComponent={this._separatorItem}
                            style={{ backgroundColor: 'white', borderRadius: 15  }}
                            data={optionsList}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={{ paddingVertical: 23, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this._selectedAction(item.code)}>
                                    <Text style={{color: item.color}}>{item.title}</Text>
                                </TouchableOpacity>
                            }
                        />
                        <View style={{marginVertical: 15}}>
                        <TouchableOpacity 
                        onPress={() => this.props.toggleReportModal()} 
                        style={{backgroundColor: 'white', paddingVertical: 23, paddingHorizontal: 20, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container_modal: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 0,
        height: 'auto',
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
})

const mapStateToProps = state => ({
    MyProfile: state.MyProfile.profile
})

const ActionCreators = Object.assign(
    {}
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionPublicationModal)