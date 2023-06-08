import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={{flex:1}} region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}>
         <Marker
          title="Travel photo"
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}/>
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