import React from 'react'
import { TextInput, View, Text, StyleSheet, Button } from 'react-native';
import Video from 'react-native-video';
import UseHomePage from './UseHomePage';
export default function HomePage() {
  const [{ setUrl, url, postLink, loading, setVideoLink, videoLink, checkPermission, play, setPlay }] = UseHomePage();
  if (loading) {
    return (
      <Text>loading...</Text>
    )
  }
  return (
    <View>
      <TextInput
        placeholder='URL'
        onChangeText={(e) => setUrl(e)}
        style={{ borderColor: 'black', borderWidth: 1 }}
      />
      <Button onPress={postLink} title='Paste' />
      {
        play &&
        <Video
          source={{ uri: videoLink }}
          style={{ width: '100%', height: 300 }}
          controls={true}
          ref={(ref) => {
            // player = ref
          }}
           onLoadStart={() => {
            console.log('onLoadStart', new Date());
          }}
          onLoad={() => {
            console.log('onLoad', new Date());
          }}
          repeat={true}
          // poster='https://baconmockup.com/300/200/'
          resizeMode="cover"
        />
      }
      <Button onPress={() => setPlay(!play)} title='Play' />
      <Button onPress={checkPermission} title='Download' />
    </View>
  )
}


// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
