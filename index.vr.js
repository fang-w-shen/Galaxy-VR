import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  AmbientLight,
  PointLight
} from 'react-vr';
import {
  Easing
} from 'react-native';
const AnimatedModel = Animated.createAnimatedComponent(Model);
export default class demo extends React.Component {

  constructor() {
    super();

    this.state = {color: 'gold',rotation: new Animated.Value(0)};
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
        easing: Easing.linear
      }
      ).start(this.rotate);
  }

  render() {
    return (
      <View>
      <Pano source={asset('room.jpg')}/>
      <AmbientLight intensity={0.5} />
      <PointLight
      style={{
        color:'white', transform:[{translate:[0, 0, 0]}]
      }}
      />
      <AnimatedModel
      id='poop'
      lit
      source={{
        obj: asset('untitled.obj')
      }}
      style={{
        color:this.state.color,
        transform: [
        {translate: [0, -3, -40]},
        {rotateY: this.state.rotation}
        ]
      }}

      onEnter={(e) => {this.setState({color: 'green'})

      console.log(self);
          // e.target.addEventListener("click",()=>{
          //   console.log('hi')
          // })
        }
      }
      onExit={() => this.setState({color: 'gold'})}
      onClick={() => console.log("hi")}
      onHover={() => console.log("hi")}

      />

      <AnimatedModel
      id='poops'
      lit
      source={{
        obj: asset('github.obj')
      }}
      style={{
        color:this.state.color,
        transform: [
        {translate: [0, -3, -40]},
        {rotateY: this.state.rotation}
        ]
      }}

      onEnter={(e) => {this.setState({color: 'green'})

      console.log(self);
          // e.target.addEventListener("click",()=>{
          //   console.log('hi')
          // })
        }
      }
      onExit={() => this.setState({color: 'gold'})}
      onClick={() => console.log("hi")}
      onHover={() => console.log("hi")}

      />
      </View>
      );
  }
};

AppRegistry.registerComponent('demo', () => demo);
