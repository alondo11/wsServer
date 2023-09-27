const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("A client has connected.");

    const adaptiveCardPayload = {
        topic: "Copilot",
        type: "asd",
        busNo: 123123,
        data: {
            agentAssistSource: "Illuminate",
            contactId: new Date().getTime(),
            utcTimestamp: new Date(),
            assistElements: [
                {
                    content: {
                        summaryText: "wasdhinas jfajsfk",
                        sentimentLevel: "Positive",
                    },
                    contentType: 'SentimentScore' //'RunningSummary' | 'SentimentScore' | 'AdaptiveCard';
                },
            ],
        },
    };

    // Simulate sending JSON data to the client every 5 seconds
    const dataToSend = {
        command: "MESSAGE",
        headers: {
            connectionId: 349282171,
        },
        body: adaptiveCardPayload,
    };
    setInterval(() => {
        dataToSend.body.data.contactId = new Date().getTime();
        dataToSend.body.data.assistElements[0].content.sentimentLevel =
            new Date().getTime % 2 > 0 ? "Positive" : "Negative";
        ws.send(JSON.stringify(dataToSend));
    }, 5000); // Send data every 5 seconds

    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
    });

    ws.on("close", () => {
        console.log("A client has disconnected.");
    });
});

console.log("WebSocket server is running on port 8080.");