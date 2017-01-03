import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, ListView, RefreshControl, ToastAndroid, ActivityIndicator } from 'react-native'
import FlightItem from './../components/FlightItem'
import { SearchFlightApi } from './../Api'
import { Actions } from 'react-native-router-flux'

class Flights extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      isRefreshing: false,
      dataSource: ds
    }
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.searchFlight()
    }, 500)
  }
  componentWillUnmount() {
      clearTimeout(this.timer)
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
      ToastAndroid.show('请检查网络链接哦', ToastAndroid.SHORT)
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
  renderRow(rowData, sectionId, rowId) {
      return (
          <FlightItem rowIndex={rowId} data={rowData}
            onFlightClick={(rowId) => this.onFlightClick(rowId)}
            onBtnClick={(flightInfo, cabinInfo) => this.onBtnClick(flightInfo, cabinInfo)} />
      )
  }
  renderFooter() {
      if(this.state.isRefreshing) {
          return (
              <View style={styles.footerContainer} >
                <ActivityIndicator size="small" color="#3e9ce9" />
                <Text> 数据加载中……</Text>
              </View>
          )
      }
      return (
          <View>
            <Text>没有更多数据了哦</Text>
          </View>
      )
  }
  render() {
    return(
      <ListView
        style={styles.scrollview}
        dataSource = {this.state.dataSource.cloneWithRows(this.props.flight.flightData)}
        renderRow={(rowData, sectionId, rowId) => this.renderRow(rowData, sectionId, rowId)}
        enableEmptySections={true}
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
      </ListView>
    )
  }
}
const styles = StyleSheet.create({
  scrollview: {
    flex: 1
  },
  footerContainer: {
    height: 20
  }
})
export default Flights
