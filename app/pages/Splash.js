import React, { PropTypes } from 'react';
import { Dimensions, Animated } from 'react-native';
import UserStorage from './../storage/User'
import { login } from './../store/actions'

const contextTypes = {
  routes: PropTypes.object.isRequired
};

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    const { routes } = this.context;
    Animated.timing(
      this.state.bounceValue, { toValue: 1.2, duration: 3000 }
    ).start();
    this.timer = setTimeout(() => {
      routes.tabbar()
      UserStorage.load().then(userInfo => {
          if(userInfo.isLogin) {
             this.props.dispatch(login(userInfo))
          }
      }).catch(error => {
      })
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={{ width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }] }}
        source={splashImg}
      />
    );
  }
}

Splash.contextTypes = contextTypes;

export default Splash;
