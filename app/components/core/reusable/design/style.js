import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Theme } from "./theme";


export const StandardCustomBtn = ({ children, fillWidth=false, style, ...rest }) => (
     <TouchableOpacity {...rest} style={[ style, WStyles.wButton, WStyles.wCornerRadius ]}>
          { children }
     </TouchableOpacity>
);

export const WInput = ({ inputRef, label, boxStyle, style, placeholderStyle, flag=false, ...rest }) => (
     <View style={boxStyle}>
          { label && <Text style={[WStyles.wInputLabel, { marginBottom: 9 }]}>{ label }</Text> }
          <TextInput ref={inputRef} style={[style, placeholderStyle, WStyles.wInput, WStyles.wCornerRadius, (flag && WStyles.wInputFlagged)]} placeholderTextColor="#C1C7D0" selectionColor='#002251' { ...rest } />
     </View>
)

export const StandardInputPassword = ({ inputRef, label, boxStyle, style, placeholderStyle, flag=false, ...rest }) => {
     const [visible, setVisible] = React.useState(false);
     return (
          <View style={boxStyle}>
               { label && <Text style={[WStyles.wInputLabel, { marginBottom: 9 }]}>{ label }</Text> }
               <View>
                    <TextInput ref={inputRef} textContentType={visible ? "none": "password"} secureTextEntry={!visible} style={[style, placeholderStyle, WStyles.wInput, WStyles.wCornerRadius, WStyles.pwdInput, (flag && WStyles.wInputFlagged)]} placeholderTextColor="#C1C7D0" selectionColor='#002251' { ...rest } />
                    <View style={WStyles.pwdIconBox}>
                         <TouchableOpacity onPress={() => setVisible(!visible)}>
                              <FontAwesomeIcon icon={!visible ? faEyeSlash : faEye} size={25} color={Theme.wIconTint}/>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     )
}

export const WButton = ({ text, fillWidth=false, style, ...rest }) => (
     <TouchableOpacity {...rest} style={[ style, WStyles.wButton, WStyles.wCornerRadius ]}>
          <Text style={WStyles.wButtonText}>{ text }</Text>
     </TouchableOpacity>
)

export const PrimaryGradientButton = ({ text, fillWidth=false, style, ...rest }) => (
     <TouchableOpacity {...rest}>
          <LinearGradient
               colors={['#00DAFA','#3087D7','#6743E0']}
               location={[0, 0.5217208328780595, 1]}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               style={[ style, WStyles.wButton, WStyles.wCornerRadius, { flex: 1 } ]}
          >
               <Text style={WStyles.wButtonText}>{ text }</Text>
          </LinearGradient>
     </TouchableOpacity>
)


export const WStyles = new StyleSheet.create({
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
          width: "100%",
          color: "#002251",
          fontSize: 16,
     },
     wInputFlagged: { borderColor: 'red', borderWidth: 2 },
     pwdInput: {  paddingRight: 54 },
     pwdIconBox: { position: "absolute", right: 0, height: "100%", width: 45, justifyContent: "center" }
});