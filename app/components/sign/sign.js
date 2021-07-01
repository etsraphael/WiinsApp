import React from 'react';
import { View, StatusBar, Platform, Text, StyleSheet } from 'react-native';
import { WGradient02 } from '../core/design';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import SignIn from './sign-in';
import SignUp from './sign-up';

const SignRoute = ({ props }) => ({
     'SignIn': <SignIn { ...props } />,
     'SignUp': <SignUp { ...props } />
})

class Sign extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               route: 'SignIn'
          }
     }

     navigateTo = (route) => {
          this.setState({ route })
     }

     render() {
          return (
               <>
               <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
               <WGradient02 style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 30 : StatusBar.currentHeight + 30 }}>
                    <View style={styles.headerSection}>
                         <FontAwesomeIcon icon={faLongArrowLeft} size={25} color={'white'} />
                         <Text style={styles.headerText}>Create an account</Text>
                    </View>
                    <View style={styles.bodySection}>
                         { SignRoute({ navigateTo: this.navigateTo })[this.state.route] }
                    </View>
               </WGradient02>
               </>
          )
     }
}

const styles = StyleSheet.create({
     headerText: {
          fontSize: 28,
          textAlign: 'left',
          fontWeight: '400',
          marginTop: 25,
          color: 'white'
     },
     headerSection: {
          marginHorizontal: 30
     },
     bodySection: {
          flex: 1,
          marginTop: 10,
          backgroundColor: 'white',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15
     }
})

export default Sign;