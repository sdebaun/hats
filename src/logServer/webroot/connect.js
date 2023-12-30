const connect = (url, log, rcv) => () => {
    var ws = new WebSocket(url)

    ws.onmessage = msg => rcv(msg.data)

    ws.onopen = () => log('connected')
    ws.onerror = () => log('error')
    ws.onclose = () => {
        log('closed, reconnecting')
        setTimeout(connect(url, log, rcv), 1000)
    }
}