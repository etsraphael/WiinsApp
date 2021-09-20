import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { faSearch, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SearchView = ({ searchTermLimit = 0, style, onChangeText, value = '', ...rest }) => {
    const [s, setValue] = useState(value);
    const hasValuePastSearchLimit = s.length > searchTermLimit;
    const clearValue = () => {
        setValue('');
        onChangeText && onChangeText('');
    };
    const handleTextChange = (val) => {
        setValue(val.trim());
        onChangeText && onChangeText(val.trim());
    }
    return (
        <View style={styles.searchViewBox}>
            <TextInput
                style={[styles.searchBar, style]}
                onChangeText={handleTextChange}
                {...{ ...rest, value: s }}
            />
            <TouchableOpacity onPress={hasValuePastSearchLimit ? clearValue : null} style={styles.iconBox}>
                <FontAwesomeIcon icon={hasValuePastSearchLimit ? faTimes : faSearch} color={'grey'} size={21} style={{ opacity: 0.8 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchViewBox: {
        height: 45,
        borderRadius: 25,
        backgroundColor: '#edf1f3',
        overflow: 'hidden',
        position: 'relative'
    }, searchBar: {
        fontSize: 15,
        paddingHorizontal: 15,
        paddingRight: 55,
        flex: 1,
        width: '100%',
    }, iconBox: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SearchView;