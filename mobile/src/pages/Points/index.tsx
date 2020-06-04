import React from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SvgUri } from 'react-native-svg'
import MapView, { Marker } from 'react-native-maps'

import BackButton from '../components/backButton'
import styles from './styles'

const Points = () => {
  const navigation = useNavigation()

  const handleNavigateToDetail = () => {
    navigation.navigate('Detail')
  }

  const items = [1, 2, 3, 4, 5, 6]

  return (
    <>
      <View style={styles.container}>

        <BackButton />

        <Text style={styles.title}>
          Bem-vindo
        </Text>

        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta
        </Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -24.8343557,
              longitude: -51.3050986,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}
          >
            <Marker
              style={styles.mapMarker}
              onPress={handleNavigateToDetail}
              coordinate={{
                latitude: -24.8343557,
                longitude: -51.3050986
              }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1591099429057-b2c57ced7326?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }} />
                <Text style={styles.mapMarkerTitle}>Map</Text>
              </View>
            </Marker>

          </MapView>
        </View>

        <View style={styles.itemsContainer}>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentScrollView}
          >
            {
              items.map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.item}
                  onPress={() => {}}
                >

                  <SvgUri
                    width={42}
                    height={42}
                    uri="http://192.168.100.104:3333/uploads/lampadas.svg"
                  />

                  <Text>Lampadas</Text>

                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>

      </View>
    </>
  )
}

export default Points
