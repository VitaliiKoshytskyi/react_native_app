import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  // console.log("LAT+LON", route.params.location)
 const lat = route.params.location.latitude;
 const lon = route.params.location.longitude;

  return (
    <View style={styles.container}>
      <MapView style={{flex:1}} region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}>
         <Marker
          title="Travel photo"
          coordinate={{ latitude: lat, longitude: lon }}/>
        </MapView>
    </View>
  );
}


const styles = StyleSheet.create({
     container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
  },
})



