const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost:1884')

client.on('connect', () => {
    console.log('Publicador Conectado!')

    setInterval(() => {
        const leitura = {
        dispositvo: 'sensor01',
        temperatura: Number((20 + Math.random() * 15).toFixed(2)),
        umidade: Math.floor(40 + Math.random() * 40),
        timestamp: new Date().toLocaleDateString()
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
                return console.log('Mensagem enviada', payload)
            }
        } 
    )

    //client.end()

    }, 5000)
})



client.on('error', (erro) => {
    console.erro('Erro MQTT', erro.message)
})