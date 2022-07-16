// where all client side JS will go

const socket = io("http://localhost:3000"); // socket connection to server
const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const userName = prompt("What is your name?"); // prompts user for their name upon connection to webpage
appendMessage("You joined");
socket.emit("new-user", userName); // sends name from client to server

socket.on("chat-message", (data) => {
  //console.log(data); // logs the data we sent down from the server event "chat message" inside the console
  appendMessage(`${data.userName}: ${data.message}`); // showcases user's name along with message like "jim: hi"
});

socket.on("user-connected", (usersName) => {
  appendMessage(`${usersName} connected`);
});

socket.on("user-disconnected", (usersName) => {
  appendMessage(`${usersName} disconnected`);
});

// addEventListener listens to the "submit" event
messageForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stops our page from refreshing after form submission, keeps from losing chat messages
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message); // sends message from client to server
  messageInput.value = ""; // empties out text box everytime we submit message
});

// function to append messages sent in chat
function appendMessage(message) {
  const messageElement = document.createElement("div"); // creates new div element to store message
  messageElement.innerText = message; // assigns a value to the element, the value being the message that was sent
  messageContainer.append(messageElement); // adds element to message container in HTML file, outputs message
}
