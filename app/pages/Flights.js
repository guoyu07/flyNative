import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import FlightItem from './../components/FlightItem'

class Flights extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(10)).map(
        (val, i) => ({
          originCity: '上海' + i,
          destinationCity: '北京',
          flightDate: '06:40',
          arrivalDate: '09:10',
          price: '￥1193',
          tips: '联合航空KN5988|波音737（中）',
          isShowCabin: false,
          cabins: [{
            cabin: '经济舱',
            remain: '200',
            price: '￥720'
          },{
            cabin: '头等舱',
            remain: '10',
            price: '￥1240'
          }]
        })
      )
    }
  }
  onFlightClick(row) {
    /**先关闭所有的，再打开点击的，确保只有一个是打开的**/
    let isShowCabin = !row.isShowCabin
    this.state.rowData.map((row, i) => {
      row.isShowCabin = false
    })
    row.isShowCabin = isShowCabin
    this.setState({
      rowData: this.state.rowData
    })
  }
  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <FlightItem key={ii} data={row} onFlightClick={(row) => this.onFlightClick(row)} />
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
            progressBackgroundColor='#ffff00'
          />
        }>
        {rows}
      </ScrollView>
    )
  }

  onRefresh() {
    this.setState({isRefreshing: true})
    setTimeout(() => {
      const rowData = Array.from(new Array(10))
      .map((val, i) => ({
        originCity: '上海' + i,
        destinationCity: '北京',
        flightDate: '06:40',
        arrivalDate: '09:10',
        price: '￥1193',
        tips: '联合航空KN5988|波音737（中）',
        isShowCabin: false,
        cabins: [{
          cabin: '经济舱',
          remain: '200',
          price: '￥720'
        },{
          cabin: '头等舱',
          remain: '10',
          price: '￥1240'
        }]
      }))
      .concat(this.state.rowData)
      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData
      })
    }, 2000)
  }
}
const styles = StyleSheet.create({
  scrollview: {
    flex: 1
  }
})
export default Flights
