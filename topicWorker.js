// topicWorker.js
const queue = [];

process.on("message", (msg) => {
  const { action, payload } = msg;

  switch (action) {
    case "send":
      queue.push(payload.message);
      process.send({ status: "added", message: payload.message });
      break;

    case "get":
      if (queue.length === 0) {
        process.send({ status: "empty" });
      } else {
        const message = queue.shift();
        process.send({ status: "received", message });
      }
      break;

    case "size":
      process.send({ status: "size", size: queue.length });
      break;

    default:
      break;
  }
});