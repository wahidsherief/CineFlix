import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, View, FlatList, TextInput, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'react-native-axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome';

/* Developer Comment: Rendering items - Passing value from API */
const renderItem = ({ item }) => (
  <Item props={item} />
);

/* Developer Comment: Rendering items view component */
const Item = ({ props }) => (
  <View style={styles.item} >
    <View style={styles.imageContainer}>
      <ImageBackground source={{ uri: props.Poster }} resizeMode="cover" style={styles.image} />
    </View>

    <View style={styles.info}>
      <Text style={styles.title}>{props.Title}</Text>
      <Text style={styles.genre}>Genre: {props.Genre ? props.Genre : 'N/A'}</Text>
      <Text style={styles.releaseDate}>Release Year: {props.Year ? props.Year : 'N/A'}</Text>
      <Text style={styles.imdb}>Rating: {props.imdb ? props.imdb : 'N/A'}</Text>
    </View>

    <TouchableOpacity onPress={() => alert('This feature is not available now.')} style={styles.fav}>
      <Text style={styles.favText}>Add to favorite movie</Text>
      <Icon style={styles.favIcon} name="heart-o" size={28} color="gray" />
    </TouchableOpacity>

  </View >
);


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sectionTitle: 'Featured Movies'
    }
  }

  componentDidMount = () => {
    this.getItems()
  }

  /* Developer Comment: Loads default movies when page loads */
  getItems() {
    const api = 'https://www.omdbapi.com/?s=kill&apikey=fa4205f4'
    axios.get(api).then((response) => {
      console.log(response.data['Search'])
      if (response.data) {
        this.setState({
          data: response.data['Search']
        })
      }
    })

  }

  /* Developer Comment: Searches movies when user onpress on search input  */
  search = (text) => {
    if (text.length > 0) {
      this.setState({ sectionTitle: 'Search Results..' })
      const api = 'https://www.omdbapi.com/?s=' + text + '&apikey=fa4205f4'
      axios.get(api).then((response) => {
        console.log(response.data['Search'])
        if (response.data) {
          this.setState({
            data: response.data['Search']
          })
        }
      })
    } else {
      this.setState({ sectionTitle: 'Featured Movies' })
      this.getItems()
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.search} placeholder="Search for a movie" onChangeText={text => this.search(text)} />
        </View>
        <Text style={styles.sectionTitle}>{this.state.sectionTitle}</Text>
        <FlatList
          style={styles.card}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </KeyboardAwareScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  imageContainer: {
    flex: 1,
    height: 300
  },

  item: {
    backgroundColor: '#eee',
    marginVertical: 8,
    marginHorizontal: 16,
    width: 250,
    height: 500,
    backgroundColor: "white",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: "column",
    borderRadius: 5,
  },

  info: {
    height: 200,
    padding: 15
  },

  image: {
    width: '100%',
    flex: 1,
    justifyContent: "center",
    borderRadius: 5,
  },

  title: {
    fontSize: 24,
  },

  genre: {
    fontSize: 16,
    color: 'red',
  },

  releaseDate: {
    fontSize: 16,
  },

  imdb: {
    fontSize: 16,
  },

  searchWrapper: {
    flex: 1,
    alignSelf: 'stretch',
  },

  search: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  sectionTitle: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },

  fav: {
    backgroundColor: 'whitesmoke',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 12,
  },

  favText: {
    marginTop: 2,
    fontSize: 16,
  },

  favIcon: {
    alignItems: 'flex-end',
  }
})