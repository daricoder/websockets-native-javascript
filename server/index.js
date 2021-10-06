const WebSocket = require("ws")
// const wss = new WebSocket.server({port:3000}) // esto crea un servidor

// esto tambien crea un servidor por default la opion noServer esta en false lo cual crea un servidor de protocolo ws a partir de un sitio http server de node ... con la opcion en true puedes crear multiples websockets que no parten de un servidor. Si no que creas la conexion cliente servidor justo en el evento upgrade del que te manda el cliente , es decir cuando la pagina cliente digamos misitio.com/dashboard aqui se renderiza un scritp o algun javascript donde se crea el websocket cliente para establecer la conexion con el servidor cuando pasa eso directamente en las cabeceras se envia algunas cabeceras commo por ejemplo: upgrade: webSockets y otras mas que solicitan o le dicen al servidor que : queremos actualizar el trasporte de datos a traves de websockets entonces el ws y es ahi donde se hace el handshake


// https://es.javascript.info/websocket // aqui esta mas o menos lo que pasa por detras en las cabeceras como se establece la conexion o handshake 
// https://github.com/websockets/ws // aqui esta la documentacion
// tip: checkea las cabeceras en las herramientas del navegador el tab : ws veras el request mandado y el response
const wss = new WebSocket.WebSocketServer({
    port:3000
})

wss.on("connection", ws => {
    console.log("NEW CLIENT CONNECTION")
    console.log("length clients", wss.clients.size)
    
    ws.on("message",(data) => {
        let message = JSON.parse(data);
        for (const socket of wss.clients) {
            socket.send(JSON.stringify(message))
        }
    })
    
    ws.on("close", () => {
        console.log("CLIENT HAS DISCONTECTED")
    })          
})  