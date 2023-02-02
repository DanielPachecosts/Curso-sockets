let socket = io.connect("192.168.0.106:6677", { forceNew: true });

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  let html = data
    .map(function (message, index) {
      return `
                <div class="message">
                    <h2>${message.nickname}</h2> dice:
                    <p>${message.text}</p>
                </div>
            `;
    })
    .join(" ");

  let divMessages = document.getElementById("messages");
  divMessages.innerHTML = html;
  divMessages.scrollTop = divMessages.scrollHeight;
}

function addMessage(e) {
  let message = {
    nickname: document.getElementById("nickname").value,
    text: document.getElementById("text").value,
  };

  document.getElementById("nickname").style.display = "none";

  socket.emit("add-message", message);
  return false;
}
