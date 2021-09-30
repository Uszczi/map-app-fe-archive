import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, {Circle} from 'react-native-maps';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';

const App = () => {
  const [LocationPoints, setLocationPoints] = useState<GeoPosition[]>([]);
  const [currentLocation, setCurrentLocation] = useState<GeoPosition | null>(
    null,
  );

  useEffect(() => {
    if (!currentLocation) {
      return;
    }
    setLocationPoints([...LocationPoints, currentLocation]);
  }, [currentLocation]);

  useEffect(() => {
    Geolocation.watchPosition(
      location => {
        setCurrentLocation(location);
      },
      error => {
        setCurrentLocation(null);
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        interval: 1,
        fastestInterval: 1,
        distanceFilter: 0.1,
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>{LocationPoints.length}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.5906364,
          longitude: 19.1327882,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {LocationPoints.length > 0
          ? LocationPoints.map((location, i) => (
              <Circle
                center={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                radius={1}
                key={i}
              />
            ))
          : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
