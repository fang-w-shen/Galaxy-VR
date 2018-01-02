import React from 'react';
import {
  StyleSheet,
  Text,
  VrButton,
} from 'react-vr';
var interval;
export default class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      truth: true,
      color: 'rgba(255,255,255,.1)',
    }
    this.styles = StyleSheet.create({
      button: {
        margin: 0.05,
        height: 0.4,
        backgroundColor: this.state.color,
        width: .9,
        border: 1,
      },
      text: {
        fontSize: 0.3,
        textAlign: 'center',
      },
    });

    this.interval = function(e) {
      interval = setInterval(()=>{
        e();
      },40)
      this.state.truth = false;

    }
  }

  render() {
    return (
      <VrButton style={{
        margin: 0.05,
        height: 0.4,
        width: .9,
        border: 1,
        backgroundColor: this.state.color
      }}
      onClick={()=>{this.props.callback()}}
      onButtonPress={() => {
        if (this.state.truth) {
          this.interval(this.props.callback)
        }
      }}
      onButtonRelease={() => {
        clearInterval(interval)
        this.state.truth = true;
      }}
      onEnter={() => this.setState({color: 'rgba(255,255,255,.6)'})}
      onExit={() => this.setState({color: 'rgba(255,255,255,.1)'})}>

      <Text style={this.styles.text}>
      {this.props.text}
      </Text>
      </VrButton>
      );
  }
}