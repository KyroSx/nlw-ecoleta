import React from 'react'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { View, Text, Image, SafeAreaView } from 'react-native'

import { RectButton } from 'react-native-gesture-handler'
import styles from './styles'

import BackButton from '../components/backButton'

const Detail = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <BackButton />

        <Image
          style={styles.pointImage}
          source={{ uri: 'https://images.unsplash.com/photo-1591099429057-b2c57ced7326?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }}
        />
        <Text style={styles.pointName}>Point Text </Text>
        <Text style={styles.pointItems}>Items </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endreço</Text>
          <Text style={styles.addressContent}>RS, rs.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button}>
          <FontAwesome name="whatsapp" size={20} color="#fff"/>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button}>
          <Icon name="mail" size={20} color="#fff"/>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail
