import React, { Component } from 'react';
import {
    Text, View, FlatList,
    StyleSheet, Dimensions, TouchableOpacity
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const keyExtractor = item => item.key;

export default class SearchResult extends Component {
    renderItem = ({ item }) => {
        const { onPressResult } = this.props;

        return (
            <View key={item.key} style={{
                justifyContent: 'center',
                padding: 4,
            }}>
                <TouchableOpacity onPress={() => onPressResult(item)}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { visible, results } = this.props;

        if (visible) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={results}
                        renderItem={this.renderItem}
                        keyExtractor={keyExtractor}
                        keyboardShouldPersistTaps={'handled'}
                    />
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: 8,
        position: 'absolute',
        width: (WIDTH - 40),
        maxHeight: 100,
        top: 150,
        left: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    list: {
        flex: 1,
        overflow: 'visible', // Prevents clipping on resize!
    }
})

