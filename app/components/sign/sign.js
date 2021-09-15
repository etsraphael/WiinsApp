import React from 'react';
import { View, StatusBar, Platform, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import * as MyUserActions from '../../redux/MyUser/actions'
import { bindActionCreators } from 'redux'
import { WGradient02 } from '../core/reusable/design';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

class Sign extends React.Component {
     _displayLoading() {
          return (
              <View style={styles.loading_container}>
                  <ActivityIndicator size='large' color='#2CB0D6' />
              </View>
          )
     }
     render() {
          return (
               <>
               <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
               <WGradient02 style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 30 : StatusBar.currentHeight + 30 }}>
                    <View style={styles.headerSection}>
                         <FontAwesomeIcon icon={faLongArrowLeft} size={25} color={'white'} onPress={() => this.props.onBackPress ? this.props.onBackPress() : this.props.navigation ? this.props.navigation.navigate('OnBoarding') : null} />
                         <Text style={styles.headerText}>{ this.props.label }</Text>
                    </View>
                    <View style={styles.bodySection}>
                         { this.props.children }
                    </View>
               </WGradient02>
               { this.props.MyUser.isLoading &&  this._displayLoading()}
               </>
          )
     }
}

const styles = StyleSheet.create({
     headerText: { fontSize: 28, textAlign: 'left', fontWeight: '400', marginTop: 25, color: 'white' },
     headerSection: { marginHorizontal: 30 },
     bodySection: { flex: 1, marginTop: 10, backgroundColor: 'white', borderTopRightRadius: 15, borderTopLeftRadius: 15, overflow: 'hidden' },
     loading_container: {
          position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center',
          color: 'white', backgroundColor: 'rgba(1, 1, 1, .5)'
     }
})

const mapStateToProps = state => ({
     MyUser: state.MyUser
 })
 

const ActionCreators = Object.assign(
    {},
    MyUserActions
)

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sign)