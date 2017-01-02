import React, {Component} from 'react'
import { StyleSheet, Navigator } from 'react-native'
import { Router, Scene, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Query from './../pages/Query'
import HomeContainer from './../containers/HomeContainer'
import OrdersContainer from './../containers/OrdersContainer'
import OrderDetailContainer from './../containers/OrderDetailContainer'
import FlightsContainer from './../containers/FlightsContainer'
import MakeOrderContainer from './../containers/MakeOrderContainer'
import Splash from './../pages/Splash'
import LoginContainer from './../containers/LoginContainer'
import WalletContainer from './../containers/WalletContainer'
import SettingContainer from './../containers/SettingContainer'
import WebviewPage from './../pages/WebviewPage'
import TabIcon from './../components/TabIcon'
const RouterWithRedux = connect()(Router);
const backButton = require('../img/arrow_left.png');

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: 'rgb(242, 245, 246)',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ?
      0 : Navigator.NavigationBar.Styles.General.TotalNavHeight;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RouterWithRedux
        getSceneStyle={getSceneStyle}
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navBarTitle}
        backButtonImage={backButton}
      >
        <Scene key="root">
          <Scene key="splash" component={Splash} hideNavBar hideTabBar initial={true} />
          <Scene key="tabbar" tabs pressOpacity={0.8} type={ActionConst.REPLACE} >
            <Scene
              key="query"
              component={Query}
              hideNavBar
              title="航班"
              icon={TabIcon}
              iconName="md-jet"
            />
            <Scene
              key="orders"
              component={OrdersContainer}
              title="订单列表"
              icon={TabIcon}
              iconName="md-apps"
            />
            <Scene
              key="me"
              component={HomeContainer}
              title="我的"
              hideNavBar
              icon={TabIcon}
              iconName="md-person"
            />
          </Scene>
          <Scene
            key="flights"
            component={FlightsContainer}
            title="航班列表"
            hideTabBar
          />
          <Scene
            key="makeOrder"
            component={MakeOrderContainer}
            title="订单填写"
            hideTabBar
          />
          <Scene
            key="orderDetail"
            component={OrderDetailContainer}
            title="订单详情"
            hideTabBar
          />
          <Scene
            key="loginOrReg"
            component={LoginContainer}
            title="登录注册"
            hideTabBar
          />
          <Scene
            key="wallet"
            component={WalletContainer}
            title="我的钱包"
            hideTabBar
          />
          <Scene
            key="setting"
            component={SettingContainer}
            title="设置"
            hideTabBar
          />
          <Scene
            key="webview"
            component={WebviewPage}
            title="webview"
            hideTabBar
          />
        </Scene>
      </RouterWithRedux>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#3e9ce9'
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 18,
  }
});

export default App
