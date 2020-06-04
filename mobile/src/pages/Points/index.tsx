/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SvgUri } from 'react-native-svg'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import BackButton from '../components/backButton'
import styles from './styles'

import api from '../../services/api'

interface Item {
  id: number,
  title: string,
  image_url: string
}

interface Point {
  id: number,
  name: string,
  image: string,
  latitude: number,
  longitude: number,
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [selectedIems, setSelectedIems] = useState<number[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('points', {
      params: {
        city: 'Gorpa',
        uf: 'pr',
        items: selectedIems
      }
    }).then(response => {
      setPoints(response.data)
    })
  }, [selectedIems])

  useEffect(() => {
    const loadPosition = async () => {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        return Alert.alert('Oops..', 'a localização é necessária!')
      }

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      setInitialPosition([latitude, longitude])
    }

    loadPosition()
  })

  const navigation = useNavigation()

  const handleNavigateToDetail = (point_id: number) => {
    navigation.navigate('Detail', { point_id })
  }

  const handleSelectItem = (id: number) => {
    const alredySelected = selectedIems.findIndex(item => item === id)

    if (alredySelected >= 0) {
      const filtredItems = selectedIems.filter(item => item !== id)
      setSelectedIems(filtredItems)
    } else {
      setSelectedIems([...selectedIems, id])
    }
  }

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
          {
            initialPosition[0] !== 0 &&
            (<MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >
              {
                points.map(point => (
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
                ))
              }

            </MapView>)
          }
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
                  key={String(item.id)}
                  style={[
                    styles.item,
                    selectedIems.includes(item.id) ? styles.selectedItem : {}
                  ]}
                  onPress={() => { handleSelectItem(item.id) }}
                  activeOpacity={0.6}
                >
                  <SvgUri
                    width={42}
                    height={42}
                    uri={item.image_url}
                  />
                  <Text>{item.title}</Text>
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
