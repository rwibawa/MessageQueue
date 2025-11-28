
const MessageQueue = require('./index.js');

const queue = new MessageQueue(); 
queue.createTopic('TestA');
queue.getMessage('TestA');
queue.sendMessage('TestA', 'test message'); 
queue.getSize('TestA'); 
queue.getMessage('TestA'); 
queue.getMessage('TestA');

// queue.destroyAllTopics();