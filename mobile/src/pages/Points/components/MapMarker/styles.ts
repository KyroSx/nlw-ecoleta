import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },
  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23
  },
  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover'
  },
  mapMarker: {
    width: 90,
    height: 80
  }
})

export default styles
