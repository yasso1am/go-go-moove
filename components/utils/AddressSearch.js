import React from 'react'
import { 
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
  Image,
} from 'react-native'
import algoliasearch from 'algoliasearch/reactnative'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class AddressSearch extends React.Component{

state = {
  textSearch: '',
  searchResults: null,
}

componentDidMount(){
  this.places = algoliasearch.initPlaces({appID: "plVWWLQODWJN"}, {appKey: "efda34499c5c9a6484b809eb95ce131b"})
}

searchAlgolia = (text) => {
  let options = {
    query: text,
    hitsPerPage: 5,
    aroundLatLng: "36.168604, -115.143370",
    countries: "us"
  }
  options.query = text
  if (text.length > 5){
    this.places.search(options).then( res => {
      this.setState({searchResults: res, textSearch: text})
    }).catch( err => {
      console.warn(err)
    })
  }
}

displaySearchResults = () => {
  const { searchResults, textSearch } = this.state
  if (textSearch.length > 5 && searchResults){
    return searchResults.hits.map( (item, i) => {
      console.dir(item)
      return (
        <View key={i} style={styles.rowStyle}>
          <Text>
            - {item.locale_names != undefined ? item.locale_names.default[0] : ''}
          </Text>
        </View>
      )
    }
    )
  }
}
// " + 
// (item.locale_names != undefined ? item.locale_names.default[0] + ", " : "") + 
// (item.city != undefined ? item.city.default[0] + ", " : "") + 
// (item.administrative != undefined ? item.administrative[0] + ", " : "") + 
// (typeof item.country === "string" ? item.country : item.country.default) 
// }




  render(){
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* <TextInput 
          style={styles.input} 
          onChangeText={ text => this.searchAlgolia(text)}
        />
        {this.displaySearchResults()} */}

       

      </View>
    )
  }

}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: Dimensions.get('window').width - 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    margin: 30,
    paddingHorizontal: 15
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  locationStyle: {
      fontSize: 20
  },
  cityStyle: {
      fontSize: 16
  }
})

export default AddressSearch