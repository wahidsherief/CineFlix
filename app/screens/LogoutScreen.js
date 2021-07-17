import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

/* Developer Comment: Components for Google Sign In */
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


export default class LogoutScreen extends Component {

    /* Developer Comment: Signout from Google */
    signOut = async () => {
        //Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.props.navigation.navigate('Login')
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.appTitle}>CineFlix</Text>
                <Button
                    title='Logout'
                    onPress={() => { this.signOut() }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    appTitle: {
        marginBottom: 20,
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red',
    }

})