import React from "react";
import { TouchableOpacity } from "react-native";

export const StandardCustomBtn = ({ children, fillWidth = false, style, ...rest }) => (
    <TouchableOpacity {...rest} style={[style, { paddingVertical: 10, borderRadius: 15 }]}>
         {children}
    </TouchableOpacity>
);