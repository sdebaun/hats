const connect = (url, log, rcv) => () => {
    var ws = new WebSocket(url)

    ws.onmessage = msg => rcv(msg.data)

    ws.onopen = () => {
        log('connected')
        setTimeout(() => ws.send('client connected'), 1000)
    }
    ws.onerror = () => log('error')
    ws.onclose = () => {
        log('closed, reconnecting')
        setTimeout(connect(url, log, rcv), 1000)
    }
}