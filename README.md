# MessageQueue
implement a message Queue using child_process in NodeJS.

# 1. Program Skeleton
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

# 2. Method Specifications:

## 2.1. createTopic()
### parameters: 
* name - name of the topic (string)
* return - void
### specifications:
* fork a new child for every new topic
* some cases need to be handled:
* if the topic name is empty, then print Error: Empty topic name
* if the topic name is already present, then print Error: Topic name already exists
* if the name data type is not a string, then print Error: Topic name should be string
* if the topic is created successfully, then print Topic Created: <TopicName>

## 2.2. sendMessage()
### parameters:
* topic - name of the topic (string)
* message - Message to be sent in the queue (any data type)
* return void
### specifications:
* Send the message to the respective child for the input topic
* some cases need to be handled:
* if the topic name is invalid or does not exist, then print Error: Topic name invalid
* if the message is empty, then print Error: Message is empty
* if the message is added successfully, then print Message Added: <Message> to Topic <Topic Name>

## 2.3. getMessage
### parameters:
* topic - name of the topic (string)
* return any (the message retrieved from the queue)
### specifications:
* Retrieve and remove a message from the queue of the specified topic
* some cases need to be handled:
* if the topic name is invalid or does not exist, then print Error: Topic name invalid
* if the queue is empty, then print Error: Queue is empty
* if the message is received successfully from the queue, then print Message Received: <Message> from Topic <Topic Name>

## 2.4. getSize()
### parameters:
* topic - name of the topic (string)
* return Size of the respective queue for the input topic (number)
### specifications:
* Get the size of the queue for the topic name
* some cases need to be handled:
* if the topic name is invalid or does not exist, then print Error: Topic name invalid

## 2.5. destroyAllTopics
* return void
### specifications:
* Kills all running child processes

# 3. Explaination:
* the parent process behaves as a broker, responsible for sending messages to the respective child process based on the input topic
* in the case of getMessage, the child process sends the message to the parent process and the parent process prints it.
* Every child has been assigned to a different topic, so every message of Topic A will go to the assigned child process, i.e., Child A in this case

# 4. Notes
* Use console.log to print
* Use console.error to print the error logs
* Use process.stdout.write to print logs

# 5. Example:
## input:
```js
const queue = new MessageQueue(); 
queue.createTopic('TestA'); 
queue.sendMessage('TestA', 'test message'); 
queue.getSize('TestA'); 
queue.getMessage('TestA'); 
queue.getMessage('TestA');
```
## Console output: 
```shell
Topic Created: TestA 
Message Added: test message to topic TestA 
1 
Message Received: test message from Topic TestA 
Error: Queue is empty 
```

# 6. Test
```shell
$ node
Debugger attached.
Welcome to Node.js v22.11.0.
Type ".help" for more information.
> const MessageQueue = require('./index.js');
undefined
> const queue = new MessageQueue();
undefined
> queue.createTopic('TestB');
Topic Created: TestB
undefined
> Debugger attached.
> queue.createTopic('TestA');
Topic Created: TestA
undefined
> Debugger attached.
> queue.sendMessage('TestB', 'test message 1');
undefined
> Message Added: test message 1 to topic TestB
> queue.sendMessage('TestB', 'test message 2');
undefined
> Message Added: test message 2 to topic TestB
> queue.sendMessage('TestA', 'test message a');
undefined
> Message Added: test message a to topic TestA
> queue.sendMessage('TestA', 'test message b');
undefined
> Message Added: test message b to topic TestA
> queue.sendMessage('TestA', 'test message c');
undefined
> Message Added: test message c to topic TestA
  queue.getSize('TestB');
undefined
> 2
> queue.getSize('TestA');
undefined
> 3
  queue.getMessage('TestB');
undefined
> Message Received: test message 1 from Topic TestB
> queue.getMessage('TestA');
undefined
> Message Received: test message a from Topic TestA
> queue.getMessage('TestB');
undefined
> Message Received: test message 2 from Topic TestB
> queue.getMessage('TestB');
undefined
> Error: Queue is empty
  queue.destroyAllTopics();
undefined
> .exit
Waiting for the debugger to disconnect...
```