const express = require("express")
const jwt = require('jsonwebtoken');  
const cors = require("cors")
const {expressjwt}  = require("express-jwt");
const path = require("path")
const bodyParser = require('body-parser')
const app = express()
const jwtSecret = "admin"; // 你的密钥  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, "./public")))
app.use(
  expressjwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
  }).unless({ path: ["/login"] })
);

app.post("/api/test", (req, res) => {
  if (!req.auth.userId) return res.sendStatus(401);
  console.log(req.body)
  res.json({
    data: [
      {
        id: 1,
        name: "apple",
        hobby: "basketball"
      }
    ]
  })
})

app.get(
  "/api/menu",
  function (req, res) {
    console.log(req.auth)
    // debugger
    if (!req.auth.userId) return res.sendStatus(401);
    // res.sendStatus(200);
    if (req.auth.userId == 'admin') {
      res.json([
      {
        "id": 20,
        "parentId": 0,
        "key": "detail",
        "label": "详情页",
        "element": "Money",
      },
      {
        "id": 21,
        "parentId": 20,
        "key": "person",
        "label": "个人中心",
        "element": "Person",
      },
      {
        "id": 1,
        "parentId": 0,
        "key": "sub",
        "label": "Navigation Two",
        "element": "Home",
      },
      {
        "id":6,
        "parentId": 1,
        "key": "item1",
        "label": "Option 5",
        "element": "Item1"
      },
      {
        "id": 7,
        "parentId": 1,
        "key": "item2",
        "label": "Option 6",
        "element": "Item2"
      },
      {
        "id": 8,
        "parentId": 1,
        "key": "sub3",
        "label": "Submenu",
        "element": "Sub1",
      },
      {
        "id": 9,
        "parentId": 8,
        "key": "iiem1",
        "label": "Option 7",
        "element": "Item3"
      },
      {
        "id": 10,
        "parentId": 8,
        "key": "iiem2",
        "label": "Option 8",
        "element": "Item4"
      },
      {
        "id": 2,
        "parentId": 0,
        "key": "sub4",
        "label": "Navigation Three",
        "element": "List",
      },
      {
        "id": 3,
        "parentId": 2,
        "key": "list1",
        "label": "Option 9",
        "element": "Item5"
      },
      {
        "id": 4,
        "parentId": 2,
        "key": "list2",
        "label": "Option 10",
        "element": "Item6"
      }
    ])
    } else if (req.auth.userId == 'user') {
        res.json([{
        "id": 1,
        "parentId": 0,
        "key": "sub",
        "label": "Navigation Two",
        "element": "Home",
      },
      {
        "id":6,
        "parentId": 1,
        "key": "item1",
        "label": "Option 5",
        "element": "Item1"
      },
      {
        "id": 7,
        "parentId": 1,
        "key": "item2",
        "label": "Option 6",
        "element": "Item2"
      },
      {
        "id": 2,
        "parentId": 0,
        "key": "sub4",
        "label": "Navigation Three",
        "element": "List",
      },
      {
        "id": 3,
        "parentId": 2,
        "key": "list1",
        "label": "Option 9",
        "element": "Item5"
      },
      {
        "id": 4,
        "parentId": 2,
        "key": "list2",
        "label": "Option 10",
        "element": "Item6"
      }
    ])
    }
    
  }
);
app.get("/login", (req, res) => {
  // console.log(req.query)
  const {username, password} = req.query
  // console.log(username, password)
  if (!(username === 'admin' || username === 'user')) {
    return res.json({
      msg: "用户名字错误",
      code: 400
    })
  }

  if (password != '123456') {
    return  res.json({
      msg: "密码错误",
      code: 400
    })
  }
  const token = jwt.sign({ userId: username }, jwtSecret, { expiresIn: '1h' }); 
  res.json({
    username: username,
    // password: "123456",
    token
  })
})

app.listen(9090, () => {
  console.log("success")
})