const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost:1884', {
    reconnectPeriod: 2000,
    connectTimeout: 10000,
    clean:true
})

client.on('connect', ()=>{
    console.log('Conectado ao MQTT!')

    client.subscribe(
        'iot/sensor/temperatura',
        {qos: 0},
        (erro, concedidos) =>{
            if(erro){
                console.log('Erro ao assinar tópico', erro)
                return
            }
            console.log('Assinatura Realizada!')
        }
    )
})


client.on('message', (topico, mensagem) => {
    console.log('Tópico', topico)
    console.log('Mensagem', mensagem.toString())
})

client.on('error', (erro) => {
    console.log('Erro MQTT', erro.message)
})

client.on('reconnect', () => {
    console.log('Tentando reconectar...')
})