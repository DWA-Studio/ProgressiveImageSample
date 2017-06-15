/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const picture = `https://unsplash.it/${width}/${height}?image=215`;
const preview = 'https://unsplash.it/80/120?image=215&blur';

export default class ProgressiveImageSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.previewOpacity = new Animated.Value(0);
  }

  onPreviewLoad() {
    Animated.timing(this.previewOpacity, {
      toValue: 1,
      duration: 250
    }).start();
    this.setState({ isLoading: false });
  }

  onLoad() {
    Animated.timing(this.previewOpacity, {
      toValue: 0,
      duration: 350
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          resizeMode={'cover'}
          style={{ position: 'absolute', width: width, height: height }}
          source={{ uri: picture }}
          onLoad={() => this.onLoad()} />
        <Animated.Image
          style={{
            opacity: this.previewOpacity,
            width: width,
            height: height,
            position: 'absolute'
          }}
          source={{ uri: preview }}
          onLoad={() => this.onPreviewLoad()} />
        {this.renderLoader()}
      </View>
    );
  }

  renderLoader() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator size="small" color="white" animating={true} />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

AppRegistry.registerComponent('ProgressiveImageSample', () => ProgressiveImageSample);

