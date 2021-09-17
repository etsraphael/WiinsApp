import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Theme } from "../design";


export const StandardInput = ({ inputRef, label, boxStyle, style, placeholderStyle, flag = false, ...rest }) => (
     <View style={boxStyle}>
          {label && <Text style={Styles.inputContainer}>{label}</Text>}
          <TextInput
               ref={inputRef}
               style={[style, placeholderStyle, Styles.inputText, { borderRadius: 15 }, (flag && Styles.inputFlagged)]}
               placeholderTextColor="#C1C7D0"
               selectionColor='#002251'
               {...rest}
          />
     </View>
)

export const StandardInputPassword = ({ inputRef, label, boxStyle, style, placeholderStyle, flag = false, ...rest }) => {
     const [visible, setVisible] = React.useState(false);
     return (
          <View style={boxStyle}>
               {label && <Text style={Styles.inputContainer}>{label}</Text>}
               <View>
                    <TextInput
                         ref={inputRef}
                         textContentType={visible ? "none" : "password"}
                         secureTextEntry={!visible}
                         style={[style, placeholderStyle, Styles.inputText, { borderRadius: 15, paddingRight: 54 }, (flag && Styles.inputFlagged)]}
                         placeholderTextColor="#C1C7D0"
                         selectionColor='#002251'
                         {...rest}
                    />
                    <View style={Styles.pwdIconBox}>
                         <TouchableOpacity onPress={() => setVisible(!visible)}>
                              <FontAwesomeIcon icon={!visible ? faEyeSlash : faEye} size={25} color={Theme.wIconTint} />
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     )
}

export const PrimaryGradientButton = ({ text, fillWidth = false, style, ...rest }) => (
     <TouchableOpacity {...rest}>
          <LinearGradient
               colors={['#00DAFA', '#3087D7', '#6743E0']}
               location={[0, 0.5217208328780595, 1]}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               style={[style, { flex: 1, paddingVertical: 10, borderRadius: 15 }]}
          >
               <Text style={Styles.buttonText}>{text}</Text>
          </LinearGradient>
     </TouchableOpacity>
)

export const Styles = new StyleSheet.create({
     inputContainer: {
          marginBottom: 9,
          fontSize: 14,
          color: "#C1C7D0"
     },
     buttonText: {
          color: '#ffffff',
          fontSize: 16,
          textAlign: 'center'
     },
     inputText: {
          backgroundColor: "#F2F4F7",
          paddingHorizontal: 16,
          height: 46,
          width: "100%",
          color: "#002251",
          fontSize: 16,
     },
     inputFlagged: {
          borderColor: 'red',
          borderWidth: 2
     },
     pwdIconBox: {
          position: "absolute",
          right: 0,
          height: "100%",
          width: 45,
          justifyContent: "center"
     }
});