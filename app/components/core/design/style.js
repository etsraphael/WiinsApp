import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";


export const WButton = ({ children, fillWidth=false, style, ...rest }) => (
     <TouchableOpacity {...rest} style={[ style, WStyles.wButton, WStyles.wCornerRadius ]}>
          { children }
     </TouchableOpacity>
);


export const WStyles = new StyleSheet.create({
     wButton: {
          paddingVertical: 10,
     },
     wButtonStroke: {
          
     },
     wCornerRadius: {
          borderRadius: 15
     },
});