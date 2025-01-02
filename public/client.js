// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});

// Check if the user has entered a name
const nameForm = document.getElementById("userNameForm");
const nameButton = document.getElementById("nameButton");
const userNameBox = document.getElementById("name");
const userName = userNameBox.value;
nameButton.addEventListener("click", function(){
  message = JSON.stringify({action: "nameButtonPressed", name: userName});
  socket.send(message);
  nameForm.style.display("none");
})