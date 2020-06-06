import React, { useState } from 'react'
import { Image, ImageBackground, View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import styles from './styles'

const Home = () => {
  const [uf, setUf] = useState('')
  const [city, setcity] = useState('')

  const navigation = useNavigation()

  const handleNavgiationToPoints = () => {
    navigation.navigate('Points', {
      uf, city
    })
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.fullScreen}>
        <ImageBackground
          source={require('../../assets/home-background.png')}
          style={styles.container}
          resizeMode="contain"
          imageStyle={styles.ImageBackground}
        >
          <View style={styles.main}>

            <Image source={require('../../assets/logo.png')} />
            <View>
              <Text style={styles.title}>Seu Marketplace de coleta de resíduos</Text>
              <Text style={styles.description}>
              Ajudamos você a encontrar o melhor lugar para descartar seus resíduos
              </Text>
            </View>
          </View>

          <View style={styles.footer}>

            <TextInput
              style={styles.input}
              placeholder="Digite a UF"
              value={uf}
              maxLength={2}
              autoCapitalize='characters'
              autoCorrect={false}
              onChangeText={setUf}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite a Cidade"
              value={city}
              onChangeText={setcity}
              autoCorrect={false}
            />

            <RectButton
              style={styles.button}
              onPress={handleNavgiationToPoints}>

              <View style={styles.buttonIcon}>
                <Icon name="arrow-right" color="#FFF" size={24} ></Icon>
              </View>

              <Text style={styles.buttonText}>
              Entrar
              </Text>

            </RectButton>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  )
}

export default Home
