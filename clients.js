"use strict"
import fileSystem from "fs"

import client from './cClient.js'
//import * as clientsRaw from "./data/clients.json"

import clientsRaw from "./data/clients.json"

export default class clients {
  constructor(helper) {
    this.helper = helper

    this.clients = []
  }

  calculateNutritionalRequirements() {
		this.clients = clientsRaw.map(clientRaw => new client(clientRaw))
  }
}