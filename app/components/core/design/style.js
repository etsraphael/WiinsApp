import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, } from "react-native";
import LinearGradient from "react-native-linear-gradient";


export const WCustomButton = ({ children, fillWidth=false, style, ...rest }) => (
     <TouchableOpacity {...rest} style={[ style, WStyles.wButton, WStyles.wCornerRadius ]}>
          { children }
     </TouchableOpacity>
);

export const WInput = ({ label, boxStyle, style, ...rest }) => (
     <View style={[boxStyle, WStyles.wInputLabel]}>
          { label && <Text style={[WStyles.wInputLabel, { marginBottom: 9 }]}>{ label }</Text> }
          <TextInput style={[style, WStyles.wInput, WStyles.wCornerRadius]} selectionColor='#002251' { ...rest } />
     </View>
)

export const WButton = ({ text, fillWidth=false, style, ...rest }) => (
     <TouchableOpacity {...rest} style={[ style, WStyles.wButton, WStyles.wCornerRadius ]}>
          <Text style={WStyles.wButtonText}>{ text }</Text>
     </TouchableOpacity>
)

export const WGradientButton = (props) => (
     <LinearGradient
          colors={['#00DAFA','#3087D7','#6743E0']}
          location={[0, 0.5217208328780595, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={WStyles.wCornerRadius}
     >
          <WButton { ...props } />
     </LinearGradient>
)

export const WCheckBox = ({ checked=false, error=false, onToggle=null }) => {
     const [ state, setState ] = useState({ checked, error });
     return (
          <TouchableOpacity onPress={() => setState({ ...state, checked: !state.checked })} style={[WStyles.wCheckbox, (state.checked ? WStyles.wCheckboxChecked : state.error ? WStyles.wCheckboxError: {})]}></TouchableOpacity>
     )
}


export const WStyles = new StyleSheet.create({
     wCheckbox: {
          width: 16,
          height: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#00DAFA'
     },
     wCheckboxChecked: { backgroundColor: '#00DAFA' },
     wCheckboxError: { borderColor: 'red' },
     wButton: {
          paddingVertical: 10,
     },
     wButtonText: {
          color: '#ffffff',
          fontSize: 16,
          textAlign: 'center'
     },
     wButtonStroke: {
          
     },
     wCornerRadius: {
          borderRadius: 15
     },
     wInputLabel: {
          fontSize: 14,
          color: "#C1C7D0"
     },
     wInput: {
          backgroundColor: "#F2F4F7",
          paddingHorizontal: 16,
          // paddingVertical: 14,
          height: 46,
          color: "#002251",
          fontSize: 16
     }
});