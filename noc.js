const data = {
  id: "999",
  posts: [
    {
      id: "123",
      author: {
        id: "1",
        nombre: "Pablo",
        apellido: "Perez",
        DNI: "20442654",
        direccion: "CABA 123",
        telefono: "1567876547",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "324",
          commenter: {
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
          },
        },
        {
          id: "325",
          commenter: {
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
          },
        },
      ],
    },
    {
      id: "1123",
      author: {
        id: "2",
        nombre: "Nicole",
        apellido: "Gonzalez",
        DNI: "20442638",
        direccion: "CABA 456",
        telefono: "1567811543",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "1324",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
          },
        },
        {
          id: "1325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
          },
        },
      ],
    },
    {
      id: "2123",
      author: {
        id: "3",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20446938",
        direccion: "CABA 789",
        telefono: "1567291542",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "2324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
          },
        },
        {
          id: "2325",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
          },
        },
      ],
    },
  ],
};

const newdata = {
  id: "999",
  mensajes: [
    {
      author: {
        id: "Nahuel@gmail.com",
        nombre: "Nahuel",
        apellido: "Britez",
        edad: 32,
        alias: "NahuB",
        avatar: "https://loremflickr.com/640/480",
      },
      _id: new ObjectId("636ec16ec16874ddecd36bb5"),
      text: "Hola que tal!!!",
      __v: 0,
    },
    {
      author: {
        id: "Feliper@gmail.com",
        nombre: "Felipe",
        apellido: "Alvarez",
        edad: 24,
        alias: "FeliP",
        avatar: "https://picsum.photos/200",
      },
      _id: new ObjectId("636ec73f1e5b68468490ed5e"),
      text: "TODO BIEEN..!!",
      __v: 0,
    },
    {
      author: {
        id: "juan@mail.com",
        nombre: "Juan",
        apellido: "Perez",
        edad: 31,
        alias: "JuanP",
        avatar: "https://picsum.photos/200",
      },
      _id: new ObjectId("636ecb0ad652634befc9d9fc"),
      text: "Como va? :)",
      __v: 0,
    },
    {
      author: {
        id: "Feliper@gmail.com",
        nombre: "Felipe",
        apellido: "Perez",
        edad: 34,
        alias: "FeliP",
        avatar: "https://picsum.photos/200",
      },
      _id: new ObjectId("636ece0db99267f121537e0b"),
      text: "Alguien sabe como hacer el un CRUD en Python?",
      __v: 0,
    },
  ],
};
