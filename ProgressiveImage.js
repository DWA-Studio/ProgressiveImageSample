import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const picture = `https://unsplash.it/${width}/${height}?image=214`;
const pictureMin = 'https://unsplash.it/80/120?image=214&blur';

class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  onThumbnailLoad(){
    this.setState({isLoading:false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            opacity: 1,
            width: width,
            height: height,
            position: 'absolute'
          }}
          source={{ uri: pictureMin }}
          onLoad={() => this.onThumbnailLoad()} />
          {this.renderLoader()}
      </View>
    );
  }

  renderLoader(){
    if(this.state.isLoading){
      return(
        <ActivityIndicator size="small" color="white" animating={true}/>
      )
    }
  }
}

export default ProgressiveImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
});