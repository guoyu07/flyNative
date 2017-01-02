import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl, ToastAndroid } from 'react-native'
import FlightItem from './../components/FlightItem'
import { SearchFlightApi } from './../Api'
import { Actions } from 'react-native-router-flux'

class Flights extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.searchFlight()
    }, 200)
  }
  searchFlight() {
    this.setState({isRefreshing: true})
    SearchFlightApi(this.props.searchFlightForm).then(response => response.json())
    .then(responseJson => {
      if(!responseJson.errno) {
        //控制每一列是否显示舱位信息
        responseJson.data.flightData.map((item) => {
          item.isShowCabin = false
        })
        this.props.actions.setFlightData(responseJson.data.flightData)
      }
      else {
        ToastAndroid.show(responseJson.errmsg, ToastAndroid.SHORT)
      }
      this.setState({isRefreshing: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({isRefreshing: false})
    })
  }
  onRefresh() {
    this.searchFlight()
  }
  onFlightClick(i) {
    /**先关闭所有的，再打开点击的，确保只有一个是打开的**/
    let flightData = JSON.parse(JSON.stringify(this.props.flight.flightData))
    let isShowCabin = !flightData[i].isShowCabin
    flightData.map((row, i) => {
      row.isShowCabin = false
    })
    flightData[i].isShowCabin = isShowCabin
    this.props.actions.setFlightData(flightData)
  }
  onBtnClick(flightInfo, cabinInfo) {
    let flight = {...flightInfo, ...cabinInfo}
    Actions.makeOrder({flightInfo: flight})
  }
  render() {
    const rows = this.props.flight.flightData.map((row, ii) => {
      return <FlightItem key={ii} rowIndex={ii} data={row}
        onFlightClick={(ii) => this.onFlightClick(ii)}
        onBtnClick={(flightInfo, cabinInfo) => this.onBtnClick(flightInfo, cabinInfo)} />
    })
    return(
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this.onRefresh()}
            tintColor="#ff0000"
            title="Loading"
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00','#0000ff']}
            progressBackgroundColor='#fff'
          />
        }>
        {rows}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  scrollview: {
    flex: 1
  }
})
export default Flights
