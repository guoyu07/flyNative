import React, { Component } from 'react'
import { View, Text, TextInput, Modal, Button, StyleSheet, ScrollView } from 'react-native'

class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advice: ''
    }
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={()=>{this.props.hide()}}
        visible={this.props.isShow}
      >
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>反馈</Text>
          </View>
          <View style={styles.body}>
            <TextInput
              style={{
                textAlign: 'left',
                textAlignVertical: 'top',
                marginBottom: 0,
                paddingBottom: 0
              }}
              placeholder="写下你的建议..."
              underlineColorAndroid="transparent"
              numberOfLines={10}
              multiline={true}
              autoFocus={true}
              onChangeText={(advice) => this.setState({advice})}
            />
          </View>
          <View style={styles.footer}>
            <View style={{width: 80}}>
              <Button
                title="取消"
                onPress={() => this.props.hide()}
              />
            </View>
            <View style={{width: 80}}>
              <Button
                title="提交"
                color="red"
                onPress={() => this.props.submit(this.state.advice)}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  container: {

  },
  header: {
    height: 50,
    backgroundColor: '#3e9ce9',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#fff'
  },
  body: {
    minHeight: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  },

})
export default Feedback
