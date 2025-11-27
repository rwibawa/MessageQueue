# NodeJS: Create Message Queue
```js
//index.js 
const { fork } = require("child_process");

class Message { 
  constructor() {} 
  createTopic() {} 
  destroyAllTopics() {} 
  sendMessage() {} 
  getMessage() {} 
  getSize() {} 
}

module.exports = MessageQueue;
```

/* 

implement a message Queue using child_process in NodeJS.

createTopic
• 	parameters: name - name of the topic (string)
• 	return - void
• 	fork a new child for every new topic
• 	some cases need to be handled:
• 	if the topic name is empty, then print Error: Empty topic name
• 	if the topic name is already present, then print Error: Topic name already exists
• 	if the name data type is not a string, then print Error: Topic name should be string
• 	if the topic is created successfully, then print Topic Created: <TopicName>
sendMessage
• 	parameters:
• 	topic - name of the topic (string)
• 	message - Message to be sent in the queue (any data type)
• 	return void
• 	Send the message to the respective child for the input topic
• 	some cases need to be handled:
• 	if the topic name is invalid or does not exist, then print Error: Topic name invalid
• 	if the message is empty, then print Error: Message is empty
• 	if the message is added successfully, then print Message Added: <Message> to Topic <Topic Name>
getMessage
• 	parameters:
• 	topic - name of the topic (string)
• 	return any (the message retrieved from the queue)
• 	Retrieve and remove a message from the queue of the specified topic
• 	some cases need to be handled:
• 	if the topic name is invalid or does not exist, then print Error: Topic name invalid
• 	if the queue is empty, then print Error: Queue is empty
• 	if the message is received successfully from the queue, then print Message Received: <Message> from Topic <Topic Name>
getSize
• 	parameters:
• 	topic - name of the topic (string)
• 	return Size of the respective queue for the input topic (number)
• 	Get the size of the queue for the topic name
• 	some cases need to be handled:
• 	if the topic name is invalid or does not exist, then print Error: Topic name invalid
destroyAllTopics
• 	return void
• 	Kills all running child processes
Explaination:
• 	the parent process behaves as a broker, responsible for sending messages to the respective child process based on the input topic
• 	in the case of getMessage, the child process sends the message to the parent process and the parent process prints it.
• 	Every child has been assigned to a different topic, so every message of Topic A will go to the assigned child process, i.e., Child A in this case
Notes
• 	Use console.log to print
• 	Use console.error to print the error logs
• 	Use process.stdout.write to print logs
Example: const queue = new MessageQueue(); queue.createTopic('TestA'); queue.sendMessage('TestA', 'test message'); queue.getSize('TestA'); queue.getMessage('TestA'); queue.getMessage('TestA');
Console output: Topic Created: TestA Message Added: test message to topic TestA 1 Message Received: test message from Topic TestA Error: Queue is empty 

*/