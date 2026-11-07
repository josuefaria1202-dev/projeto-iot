const mqtt = require('mqtt')
const { timeStamp } = require('node:console')

const client = mqtt.connect('mqtt://localhost:1884')

client.on('connect', () => {
    console.log('Publicador Conectado!')

    const leitura = {
        dispositvo: 'sensor01',
        temperatura: 26.8,
        umidade: 62,
        timestamp: new Date().toISOString()
    }

    const payload = JSON.stringify(leitura)

    client.publish(
        'iot/sensor/temperatura',
        payload,
        {qos:1},
        (erro) => {
            if(erro){
                console.error('Erro ao publicar', erro)
            } else {
                console.log('Mensagem envidada', payload)
            }

            client.end()
        }
    )
})

client.on('error', (erro) => {
    console.erro('Erro MQTT', erro.message)
})