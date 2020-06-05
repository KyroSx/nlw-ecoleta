/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { View, Text, Image, SafeAreaView, Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'
import api from '../../services/api'

import BackButton from '../components/backButton'

interface Params {
  point_id: number
}

interface Item {
  title: string
}

interface Point {
  image: string,
  image_url: string,
  name: string,
  email: string,
  whatsapp: string,
  city: string,
  uf: string,
}

interface ResponseData {
  point: Point
  items: Item[]
}

const Detail = () => {
  const [responseData, setResponseData] = useState<ResponseData>({} as ResponseData)

  const route = useRoute()

  const routeParams = route.params as Params

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`)
      .then(response => setResponseData(response.data))
  }, [])

  const handleMailComposer = () => {
    const { email } = responseData.point

    MailComposer.composeAsync({
      subject: 'Interessa na coleta de Resíduos',
      recipients: [email]
    })
  }

  const handleWhatsapp = () => {
    const { whatsapp } = responseData.point
    Linking.openURL(`whatsapp://send?phone=${whatsapp}`)
  }

  /* Implement loading screen */
  if (!responseData.point) {
    return null
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <BackButton />

        <Image
          style={styles.pointImage}
          source={{ uri: responseData.point.image_url }}
        />
        <Text style={styles.pointName}>{responseData.point.name}</Text>
        <Text style={styles.pointItems}>
          {
            responseData.items.map(item => (
              item.title
            )).join(', ')
          }
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {responseData.point.uf}, {responseData.point.city}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={handleWhatsapp}
        >
          <FontAwesome name="whatsapp" size={20} color="#fff"/>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton
          style={styles.button}
          onPress={handleMailComposer}
        >
          <Icon name="mail" size={20} color="#fff"/>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail
