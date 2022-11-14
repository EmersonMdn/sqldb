const renderList = (item) => {
  const tr = item
    .map(
      (it) => `
    <tr>
        <td>${it.title}</td>
        <td>$${it.price}</td>
        <td><img className="avatar-img" src=${it.thumbnail} alt=""></td>
    </tr>`
    )
    .join("");
  document.getElementById("tbody").innerHTML = tr;
};

const renderChat = (chat) => {
  const hora = new Date().toLocaleTimeString();
  const li = chat
    .map(
      (msg) => `
    <li>
    <div class='msg'>
    <img class='avatar-img' src=${msg.author.avatar}>
      <h5 class='boldtxt'>${msg.author.nombre}</h5>
     
        <p class="text">${msg.text} </p>
        <small class="time">${
          hora /* La hora solo se la puse de forma ilustrativa, ya que en el desafio no lo pedia */
        } ✓✓</small> 
      
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

  const myData = { id: "mensajes", mensajes: [...msg] };
  const mensaje = new normalizr.schema.Entity(
    "mensajes",
    {},
    { idAttribute: "email" }
  ); //al agrgarle el idAttribute devuelve undefined por consola
  const mySchema = { mensajes: [mensaje] };
  const mensajesNormalized = normalize(myData, mySchema);

  console.log(msg.length);
  console.log(JSON.stringify(mensajesNormalized).length);
});
