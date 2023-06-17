// Images spec
import micro from '../public/icons/micro.svg'
import bluetooth from '../public/icons/bluetooth.svg'
import battery from '../public/icons/battery.svg'
// Products
import rose from '../public/images/rose.png'
import dark_blue from '../public/images/dark_blue.png'
import green from '../public/images/green.png'

const specifications = [
  {
    img: battery,
    title: 'Battery',
    desc: 'Battery 6.2V-AAC codec'
  },
  {
    img: bluetooth,
    title: 'Bluetooth',
    desc: 'Battery 6.2V-AAC codec'
  },
  {
    img: micro,
    title: 'Microphone',
    desc: 'Battery 6.2V-AAC codec'
  },
]

const products = [
  {
    name: 'red headphones',
    rating: 5.0,
    price: '256',
    img: rose,
    id: 'red_headphones',
    specifications: {
      battery: 'Battery 6.2V-AAC codec',
      bluetooth: 'Battery 6.2V-AAC codec',
      microphone: 'Battery 6.2V-AAC codec'
    }
  },
  {
    name: 'blue headphones',
    rating: 4.5,
    price: '256',
    img: dark_blue,
    id: 'blue_headphones',
    specifications: {
      battery: 'Battery 6.2V-AAC codec',
      bluetooth: 'Battery 6.2V-AAC codec',
      microphone: 'Battery 6.2V-AAC codec'
    }
  },
  {
    name: 'green headphones',
    rating: 5.0,
    price: '256',
    img: green,
    id: 'green_headphones',
    specifications: {
      battery: 'Battery 6.2V-AAC codec',
      bluetooth: 'Battery 6.2V-AAC codec',
      microphone: 'Battery 6.2V-AAC codec'
    }
  }
]

export { specifications, products }