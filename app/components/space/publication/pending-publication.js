import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import * as PendingPubicationsActions from '../../../redux/PendingPublications/actions'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faTimes } from '@fortawesome/pro-light-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import MinPublication from './../../core/miniature/min-publication'
import { DotIndicator } from 'react-native-indicators';

class PendingPublication extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 5 }}>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 25, borderBottomWidth: 1, borderColor: '#743db8' }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => this.props.navigation.goBack(null)}>
            <FontAwesomeIcon icon={faAngleLeft} color={'#b1b1b1'} size={39} />
            <Text style={{ fontSize: 19, color: '#1a73e8', fontWeight: '400' }}> Uploading publication </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 11 }}>
          <FlatList
            style={styles.list}
            data={this.props.publication}
            keyExtractor={(item) => item.savingDate.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ aspectRatio: 1, width: 40, marginVertical: 15, borderRadius: 5, overflow: 'hidden' }}>
                    <MinPublication publication={item}/>
                  </View>
                </View>
                <View style={{ flex: 5, justifyContent: 'center', paddingTop: 4}}>
                  <Text style={{paddingLeft: 15 }}> {item.savingDate} </Text>
                  <View style={{height: 15, width: '50%'}}>
                  <DotIndicator color='#f2e6ff' size={7} style={{padding: 0}} />
                  </View>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.actions.cancelPublicationActions(item.savingDate)}>
                    <FontAwesomeIcon icon={faTimes} color={'#b9b9b9'} size={22} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({

})

const mapStateToProps = state => ({
  Publication: state.PendingPublications.publication,
})

const ActionCreators = Object.assign(
  {},
  PendingPubicationsActions
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingPublication)