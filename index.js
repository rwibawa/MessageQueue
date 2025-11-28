const { fork } = require("child_process");
const path = require("path");

class MessageQueue {
  constructor() {
    this.topics = new Map();
  }

  createTopic(name) {
    if (typeof name !== "string") {
      console.error("Error: Topic name should be string");
      return;
    }

    if (!name.trim()) {
      console.error("Error: Empty topic name");
      return;
    }

    if (this.topics.has(name)) {
      console.error("Error: Topic name already exists");
      return;
    }

    const child = fork(path.join(__dirname, "topicWorker.js"));
    this.topics.set(name, child);
    process.stdout.write(`Topic Created: ${name}\n`);
  }

  sendMessage(topic, message) {
    const child = this.topics.get(topic);
    if (!child) {
      console.error("Error: Topic name invalid");
      return;
    }
    
    if (message === undefined || message === null || message === "") {
      console.error("Error: Message is empty");
      return;
    }

    child.send({ action: "send", payload: { message } });
    child.once("message", (msg) => {
      if (msg.status === "added") {
        process.stdout.write(`Message Added: ${msg.message} to topic ${topic}\n`);
      }
    });
  }

  getMessage(topic) {
    const child = this.topics.get(topic);
    if (!child) {
      console.error("Error: Topic name invalid");
      return;
    }

    child.send({ action: "get" });
    child.once("message", (msg) => {
      if (msg.status === "empty") {
        console.error("Error: Queue is empty");
      } else if (msg.status === "received") {
        process.stdout.write(`Message Received: ${msg.message} from Topic ${topic}\n`);
      }
    });
  }

  getSize(topic) {
    const child = this.topics.get(topic);
    if (!child) {
      console.error("Error: Topic name invalid");
      return;
    }

    child.send({ action: "size" });
    child.once("message", (msg) => {
      if (msg.status === "size") {
        process.stdout.write(`${msg.size}\n`);
      }
    });
  }

  destroyAllTopics() {
    for (const [name, child] of this.topics.entries()) {
      child.kill();
    }
    this.topics.clear();
  }
}

module.exports = MessageQueue;