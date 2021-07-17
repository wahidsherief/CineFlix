import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

/* Developer Comment: Components for Google Sign In */
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

/* Developer Comment: Component for Firebase Authentication */
import auth from '@react-native-firebase/auth';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      gettingLoginStatus: true,
    };
  }

  componentDidMount() {

    GoogleSignin.configure({
      webClientId: '823437435484-j55q9cdp2pcn4of2stklhiij47ns0a37.apps.googleusercontent.com',
    });

    this._isSignedIn();
  }

  /* Developer Comment: Check if user is already signed in  */
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (isSignedIn) {
      this._getCurrentUserInfo();
      /* Developer Comment: Navigate to Homepage  */
      this.props.navigation.navigate('Home');
    }

    this.setState({ gettingLoginStatus: false });
  };

  /* Developer Comment: Get the User details as user is already signed in  */
  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  /* Developer Comment: Executes when user click on google sign in button  */
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { userInfo, accessToken, idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken, accessToken,);

      /* Developer Comment: Save User Infor into the Firebase  */
      await auth().signInWithCredential(credential);
      this.props.navigation.navigate('Home');
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        alert('Some Other Error Happened');
      }
    }
  };

  signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>CineFlix</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 70 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
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