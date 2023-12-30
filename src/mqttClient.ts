import mqtt from 'mqtt'

const url = 'mqtt://homeassistant.local:1883'

// const url = 'mqtt://test.mosquitto.org:1883'

const client = mqtt.connect(url, {
    clean: true,
    connectTimeout: 4000,
    clientId: 'testclient',
    username: 'homeassistant',
    password: 'Raeg4Ouk5eilu2aape3aeth0aeG5ee1eiM1yahShei5EiphuoP2Vahli8ohb4meK'
})

client.on('connect', (packet) => {
    console.log('connected', packet.toString())
    client.subscribe('#') // mqtt wildcard
})

client.on('message', (topic, message) => {
    console.log('message', message.toString())
})

client.on('disconnect', (packet) => {
    console.log('disconnect', packet.toString())
    client.end()
})

client.on('end', () => {
    console.log('end')
})

client.on('close', () => {
    console.log('close')
})