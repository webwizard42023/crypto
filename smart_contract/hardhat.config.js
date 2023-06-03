//https://eth-goerli.g.alchemy.com/v2/drOwZjLogvbvOsFjrqi-s6V9DJyuumSZ

require('@nomiclabs/hardhat-waffle')

module.exports ={
   solidity: '0.8.0',
   networks: {
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/drOwZjLogvbvOsFjrqi-s6V9DJyuumSZ',
      accounts: [ '0eea65e0cb78881b54788557923afea56f2829a0f5abcb3f2ec8800172913b18' ],
    }
  }
}