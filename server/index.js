'use strict'
const Hapi = require('hapi')
const PORT = 8000
const server = new Hapi.Server()
server.connection({port: 8000})
server.route({
  method: 'post',
  path: '/logout',
  handler: function(req, res) {
    console.log('/logout')
    res({
      errno: '',
      errmsg: '',
      data: {

      }
    })
  }
})
server.route({
  method: 'post',
  path: '/login',
  handler:function(req, res) {
    console.log('/login')
    console.log(req.payload)
    res({
      errno: '',
      errmsg: '',
      data: {
        username: req.payload.username,
        account: '900',
        email: '319827688@qq.com',
        userid: '123456',
        token: 'token123'
      }
    })
  }
})
server.route({
  method: 'post',
  path: '/signup',
  handler:function(req, res) {
    console.log('/signup')
    console.log(req.payload)
    res({
      errno: '',
      errmsg: '',
      data: {}
    })
  }
})
server.route({
  method: 'post',
  path: '/feedback',
  handler:function(req, res) {
    console.log('/feedback')
    console.log(req.payload)
    res({
      errno: '',
      errmsg: '',
      data: {}
    })
  }
})
server.route({
  method: 'post',
  path: '/user/{action}',
  handler:function(req, res) {
    console.log('/user/'+req.params.action)
    console.log(req.payload)
    res({
      errno: '',
      errmsg: '',
      data: {}
    })
  }
})
server.route({
  method: 'post',
  path: '/orders/submit',
  handler: function(req, res) {
    console.log('/orders/submit')
    console.log(req.payload)
    res({
      errno: '',
      errmsg: '',
      data: {
        orderInfo: {
          flightNo: 'MU5102',
          flightDay: '2016-12-28',
          flightDate: '10:00',
          arrivalDate: '12:20',
          originCity: '北京',
          destinationCity: '上海',
          price: req.payload.sumPrice,
          orderStatus: '未支付',
          passengers: req.payload.passengers
        }
      }
    })
  }
})
server.route({
  method: 'post',
  path: '/orders/pay',
  handler: function(req, res) {
    console.log('/orders/pay')
    console.log(req.payload)
    var orderItem = {
      flightNo: 'MU5102',
      flightDay: '2016-12-28',
      flightDate: '10:00',
      arrivalDate: '12:20',
      showFlightDate: '10:00',
      showArrivalDate: '12:20',
      originCity: '北京',
      destinationCity: '上海',
      price: '1340',
      orderStatus: '已支付',
      passengers: [{
        name: '路人甲',
        identity: '123456789987654321'
      },{
        name: '路人乙',
        identity: '123456789987654321'
      },{
        name: '路人丙',
        identity: '123456789987654321'
      },{
        name: '路人丁',
        identity: '123456789987654321'
      }]
    }
    res({
      errno: '',
      errmsg: '密码错误',
      data: {
        orderItem: orderItem
      }
    })
  }
})
server.route({
  method: 'post',
  path: '/orders/getOrders',
  handler: function(req, res) {
    console.log('/order/getOrders')
    var orderItem = {
      flightNo: 'MU5102',
      flightDay: '2016-12-28',
      flightDate: '10:00',
      arrivalDate: '12:20',
      originCity: '北京',
      showFlightDate: '10:00',
      showArrivalDate: '12:20',
      destinationCity: '上海',
      price: '340',
      orderStatus: '未支付',
      passengers: [{
        name: '路人甲',
        identity: '123456789987654321'
      },{
        name: '路人乙',
        identity: '123456789987654321'
      },{
        name: '路人丙',
        identity: '123456789987654321'
      },{
        name: '路人丁',
        identity: '123456789987654321'
      }]
    }, orderData = []
    for(var i=0; i<5; i++) {
      orderData.push(orderItem)
    }
    res({
      errno: '',
      errmsg: '',
      data: {
        orderData: orderData
      }
    })
  }
})
server.route({
  method: 'post',
  path: '/flight/search',
  handler: function(req, res) {
    console.log('/flight/search  ' + new Date())
    console.log(req.payload)
    var flightData = [],
        flightItem = {
          originCity: req.payload.originCity,
          destinationCity: req.payload.destinationCity,
          flightDay: req.payload.flightDay,
          flightNo: 'MU1234',
          showFlightDate: '10:00',
          showArrivalDate: '12:20',
          flightDate: '06:40',
          arrivalDate: '09:10',
          tips: '联合航空KN5988|波音737（中）',
          cabins: [{
            cabin: '经济舱',
            remain: '200',
            price: '720'
          },{
            cabin: '头等舱',
            remain: '10',
            price: '1240'
          }]
        }
    for(var i=0; i<10; i++) {
      flightData.push(flightItem)
    }
    res({
      errno: '',
      errmsg: '',
      data: {
        flightData:flightData
      }
    })
  }
})
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
