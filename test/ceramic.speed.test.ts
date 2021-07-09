'use strict'
const assert = require('assert')

import { EthereumAuthProvider } from '@3id/connect'
import { Manager } from '@3id/manager'
import CeramicClient from '@ceramicnetwork/http-client'
import { Wallet } from 'ethers'

import { EthereumProvider } from '../src/index'

describe('Ceramic performance test', () => {

    describe('Manage accounts', function() {
        this.timeout(100000)
        
        it('can create new 3ID', async function() {
            const CERAMIC_URL = 'https://ceramic-clay.3boxlabs.com'

            // Wallet 1
            const ceramic = new CeramicClient(CERAMIC_URL)
            const wallet = Wallet.createRandom()
            const address = wallet.address
            const ethProvider = new EthereumProvider(wallet)
            const authProvider = new EthereumAuthProvider(ethProvider, wallet.address)
            const manager = new Manager(authProvider, { ceramic })

            console.log(new Date(), "manager1.createAccount()")
            const did = await manager.createAccount()
            console.log(new Date(), "Complete")

            // Wallet 2
            const ceramic2 = new CeramicClient(CERAMIC_URL)
            const wallet2 = Wallet.createRandom()
            const address2 = wallet2.address
            const ethProvider2 = new EthereumProvider(wallet2)
            const authProvider2 = new EthereumAuthProvider(ethProvider2, wallet2.address)
            const manager2 = new Manager(authProvider2, { ceramic2 })

            console.log(new Date(), "manager2.createAccount()")
            const did = await manager.createAccount()
            console.log(new Date(), "Complete")
        })
    })
});
