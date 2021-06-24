import React from "react";
import LinearGradient from "react-native-linear-gradient";

export const Theme = {
     "wColor": "#6245D8",
}

export const WGradient = ({ children, ...rest }) => (
     <LinearGradient 
          { ...rest }
          colors={["#58AED2", "#4A85D1", "#6245D8", "#ED6569"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          location={[0, 0.3185752069888036, 0.7042528970334923, 1]}
          >
          { children }
     </LinearGradient>
)
