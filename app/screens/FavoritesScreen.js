import React from 'react';
import { Text, View, StyleSheet } from 'react-native';



export default class FavoritesScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.appTitle}>This feature is not available now.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})