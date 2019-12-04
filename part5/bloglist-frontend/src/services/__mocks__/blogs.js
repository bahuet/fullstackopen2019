const blogs = [
  {
    _id: "5ddfd1c9fcfe992fdc98c493",
    title: "SuperBlog018",
    author: "Johnyw3",
    url: "www.sblog3.com",
    likes: 55,
    user: {
      username: "jogn22",
      name: "johgn",
      id: "5ddfc1e259dfd41d6cbb26e5"
    },
    __v: 0,
    id: "5ddfd1c9fcfe992fdc98c493"
  },
  {
    _id: "5ddfd9bde206fd3ef0294ba2",
    title: "SuperBlog0TESTTOKEN",
    author: "johgn",
    url: "www.sblog3.com",
    likes: 71,
    user: {
      username: "123",
      name: "johgn",
      id: "5ddfd12e8b5c292594836333"
    },
    __v: 0,
    id: "5ddfd9bde206fd3ef0294ba2"
  },
  {
    _id: "5ddfde286be3050cc0bc28cc",
    title: "SuperBlog0TESTTOKEN22222",
    author: "johgn",
    url: "www.sblog3.com",
    likes: 56,
    user: {
      username: "123",
      name: "johgn",
      id: "5ddfd12e8b5c292594836333"
    },
    __v: 0,
    id: "5ddfde286be3050cc0bc28cc"
  },
  {
    _id: "5de0ebbf6f553e2360cbb64a",
    title: "SuperBlog0TESTTOKEN222224",
    author: "johgn",
    url: "www.sblog3.com",
    likes: 55,
    user: {
      username: "123",
      name: "johgn",
      id: "5ddfd12e8b5c292594836333"
    },
    __v: 0,
    id: "5de0ebbf6f553e2360cbb64a"
  },
  {
    _id: "5de0ec957a47ab019421e24f",
    title: "SuperBlog0TESTTOKEN222224",
    author: "johgn",
    url: "www.sblog3.com",
    likes: 55,
    user: {
      username: "123",
      name: "johgn",
      id: "5ddfd12e8b5c292594836333"
    },
    __v: 0,
    id: "5de0ec957a47ab019421e24f"
  },
  {
    _id: "5de0eca27a47ab019421e250",
    title: "SuperBlog555",
    author: "johgn",
    url: "www.sblog3.com",
    likes: 56,
    user: {
      username: "123",
      name: "johgn",
      id: "5ddfd12e8b5c292594836333"
    },
    __v: 0,
    id: "5de0eca27a47ab019421e250"
  },
  {
    _id: "5de27e85a73551434c247fdf",
    title: "SuperBlog018",
    url: "asssssssaaaaaaaaaaaaaaaaaaaaaa",
    likes: 0,
    user: {
      username: "admin",
      name: "me",
      id: "5de27627a73551434c247fd8"
    },
    author: "me",
    __v: 0,
    id: "5de27e85a73551434c247fdf"
  },
  {
    _id: "5de2826da73551434c247fe3",
    title: "qw",
    url: "w",
    likes: 0,
    user: {
      username: "admin",
      name: "me",
      id: "5de27627a73551434c247fd8"
    },
    author: "me",
    __v: 0,
    id: "5de2826da73551434c247fe3"
  },
  {
    _id: "5de50a1c0daec00f60bd3dfe",
    title: "qwqqqqqqqqqqqqqqq",
    url: "wwwwwwwwwwwww",
    likes: 3,
    user: {
      username: "admin",
      name: "me",
      id: "5de27627a73551434c247fd8"
    },
    author: "me",
    __v: 0,
    id: "5de50a1c0daec00f60bd3dfe"
  },
  {
    _id: "5de50c130daec00f60bd3dff",
    title: "wwwwwwww",
    url: "wqqqqqqqqqq",
    likes: 0,
    user: {
      username: "admin",
      name: "me",
      id: "5de27627a73551434c247fd8"
    },
    author: "me",
    __v: 0,
    id: "5de50c130daec00f60bd3dff"
  },
  {
    _id: "5de51ea50b49491da031b02c",
    title: "qqqqqqqqqqq",
    url: "wwwwwwwwwwwwww",
    likes: 0,
    user: {
      username: "admin",
      name: "me",
      id: "5de27627a73551434c247fd8"
    },
    author: "me",
    __v: 0,
    id: "5de51ea50b49491da031b02c"
  }
]
const getAll = () => {
  return Promise.resolve(blogs)
}
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken, token }