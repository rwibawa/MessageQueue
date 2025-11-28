# MessageQueue Project - AI Coding Agent Instructions

## Architecture Overview

This is a **multi-process message queue system** using Node.js `child_process` module. The architecture follows a **broker-worker pattern**:

- **Parent Process (Broker)**: `index.js` - The `MessageQueue` class manages topics and routes messages
- **Child Processes (Workers)**: `topicWorker.js` - Each topic gets its own forked process with an independent queue
- **Communication**: IPC (Inter-Process Communication) via `child.send()` and `process.on('message')`

### Key Design Decision
Each topic runs in isolation as a separate child process. This ensures:
- Queue operations for different topics don't block each other
- Topic independence (one topic crashing doesn't affect others)
- Each worker maintains its own in-memory queue array

## Critical Patterns

### 1. Output Methods (Project-Specific Convention)
The codebase uses **three different output methods** with specific purposes:
```javascript
process.stdout.write()  // Success messages (e.g., "Topic Created: TestA")
console.error()         // Error messages (e.g., "Error: Topic name invalid")
console.log()           // General logging (if needed)
```
**Always use `process.stdout.write()` for success output, not `console.log()`.**

### 2. IPC Message Protocol
Parent-to-child messages follow this structure:
```javascript
{ action: "send|get|size", payload: { message } }
```
Child-to-parent responses:
```javascript
{ status: "added|received|empty|size", message?, size? }
```

### 3. Asynchronous Event Handling
All child process communication is asynchronous. Use `child.once('message', callback)` pattern:
```javascript
child.send({ action: "get" });
child.once("message", (msg) => {
  if (msg.status === "received") {
    process.stdout.write(`Message Received: ${msg.message}\n`);
  }
});
```

### 4. Error Handling Pattern
All methods validate inputs before processing:
1. Check if topic exists in the Map
2. Validate data types (e.g., topic name must be string)
3. Check for empty/null values
4. Print specific error messages with `console.error()`

Example from `sendMessage()`:
```javascript
if (!child) {
  console.error("Error: Topic name invalid");
  return;
}
if (message === undefined || message === null || message === "") {
  console.error("Error: Message is empty");
  return;
}
```

## Developer Workflows

### Running Tests
```bash
node test01.js  # Main test file demonstrating queue operations
```

### Module System
- Uses CommonJS (`module.exports`, `require()`)
- Package.json specifies `"type": "commonjs"`

### Key Files
- `index.js` - Main MessageQueue class exported as module
- `topicWorker.js` - Forked process template, never imported directly
- `test01.js` - Example usage (note: missing `const MessageQueue = require('./index.js')` import)

## Common Pitfalls

1. **Missing MessageQueue Import**: `test01.js` instantiates MessageQueue but doesn't import it. Always add:
   ```javascript
   const MessageQueue = require('./index.js');
   ```

2. **Output Method Confusion**: Don't use `console.log()` for success messages - use `process.stdout.write()` with explicit `\n`

3. **Topic Lifecycle**: Remember to call `destroyAllTopics()` to clean up child processes, or they'll remain orphaned

4. **Queue State**: Each topic's queue is ephemeral (in-memory array in child process). No persistence mechanism exists.

## References
- Full specifications: `README.md` (contains detailed method contracts and example output)
- Architecture context: See sections 1-3 of README.md for broker-worker design rationale
