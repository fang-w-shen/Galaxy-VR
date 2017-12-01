import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
} from 'react-vr';
const AnimatedModel = Animated.createAnimatedComponent(Model);
export default class demo extends React.Component {
  state = {
    rotation: new Animated.Value(0)
  }

  componentDidMount() {
    this.rotate();
  }

  rotate = () => {
    this.state.rotation.setValue(0);
    Animated.timing(
      this.state.rotation,
      {
        toValue: 360,
        duration: 10000,
      }
    ).start(this.rotate);
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <AnimatedModel
          source={{
            obj: asset('untitled.obj')
          }}
          style={{
            color: '#af1e23',
            transform: [
              {translate: [0, -3, -12]},
              {rotateY: this.state.rotation}
            ]
          }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('demo', () => demo);
