"use strict"

import client from './class/cClient.js'

import clientsRaw from "./../data/clients.json"
import clientRaw from "./../data/client.json"

export default class clients {
  constructor(helper) {
    this.helper = helper

    this.clients = []
  }

  calculateNutritionalRequirements() {
		this.clients = clientRaw.map(clientRaw => new client(clientRaw))
  }
}