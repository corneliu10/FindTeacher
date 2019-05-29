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
                height: 30,
                width: (WIDTH - 52)
            }}>
                <TouchableOpacity onPress={() => onPressResult(item)} style={styles.button}>
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { visible, results } = this.props;

        if (visible && results.length > 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        style={styles.list}
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
        zIndex: 1,
        position: 'absolute',
        width: (WIDTH - 40),
        maxHeight: 200,
        top: 150,
        left: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    list: {
        flex: 1,
        margin: 4
    },
    text: {
        fontSize: 20,
    },
    button: {
        marginLeft: 6,
        marginRight: 6,
        marginTop: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#545454'
    }
})

