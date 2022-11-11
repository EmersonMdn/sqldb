const renderList = (item) => {
  const tr = item
    .map(
      (it) => `
    <tr>
        <td>${it.title}</td>
        <td>${it.price}</td>
        <td><img src=${it.thumbnail} alt=""></td>
    </tr>`
    )
    .join("");
  document.getElementById("tbody").innerHTML = tr;
};

const renderChat = (chat) => {
  const li = chat
    .map(
      (msg) => `
    <li>
    <div classname='msg'>
      <div class='boldtxt'>${msg.author.nombre}</div>
      [<img src=${msg.author.avatar}>]:${msg.text}
    </div>
    </li>`
    )
    .join("");
  document.getElementById("messages").innerHTML = li;
};

const sendMessage = (e) => {
  const mail = document.getElementById("mailInput").value;
  const msg = document.getElementById("messageInput").value;
  const nameInput = document.getElementById("nameInput").value;
  const lastNameInput = document.getElementById("lastNameInput").value;
  const aliasInput = document.getElementById("aliasInput").value;
  const ageInput = document.getElementById("ageInput").value;
  const avatarInput = document.getElementById("avatarInput").value;

  msg.length > 0 &&
    socket.emit("new_msg", {
      author: {
        id: mail,
        nombre: nameInput,
        apellido: lastNameInput,
        edad: ageInput,
        alias: aliasInput,
        avatar: avatarInput,
      },
      text: msg,
    });

  document.getElementById("messageInput").value = "";
};

const socket = io.connect();

socket.on("products", (item) => {
  renderList(item);
});
socket.on("chat-messages", (msg) => {
  renderChat(msg);
});
