import React from 'react'
import { View, Image, Text } from 'react-native'
import { Marker } from 'react-native-maps'

import styles from './styles'

interface Point {
  id: number,
  name: string
  image: string,
  latitude: number,
  longitude: number
}

interface MapMarkerProps {
  point: Point,
  handleNavigateToDetail: Function,
}

const MapMarker = ({ point, handleNavigateToDetail }: MapMarkerProps) => {
  return (
    <Marker
      key={String(point.id)}
      style={styles.mapMarker}
      onPress={() => handleNavigateToDetail(point.id)}
      coordinate={{
        latitude: point.latitude,
        longitude: point.longitude
      }}
    >
      <View style={styles.mapMarkerContainer}>
        <Image
          style={styles.mapMarkerImage}
          source={{ uri: point.image }}
        />
        <Text style={styles.mapMarkerTitle}>
          {point.name}
        </Text>
      </View>
    </Marker>
  )
}

export default MapMarker
