const express = require("express")
const app = express()

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send();  //让options尝试请求快速结束
    else
        next();
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const students = [
    {id: 0, name: '王二小', age: 18, gender: 1, hobbies: ['唱', '跳', 'rap']},
    {id: 1, name: '王三小', age: 18, gender: 1, hobbies: ['唱', '跳', 'rap']},
    {id: 2, name: '王四小', age: 18, gender: 0, hobbies: ['吃', '喝', 'rap']},
]
//查看所有学生
app.get("/show-students", (req, res) => {
    res.send(students)
})
//添加学生
app.post("/add-student", (req, res) => {
    console.log(req.body)
    const newStudent = {...req.body}
    newStudent.id = students[students.length - 1].id + 1
    students.push(newStudent)
    res.send(true)
})

//修改学生信息
app.post("/edit-student", (req, res) => {
    console.log(req.body)
    res.send(true)
    //通过id找到在数组中的位置并替换掉
    students[students.findIndex(value=>value.id===req.body.id)]={...req.body}
/*    const editStudent = {...req.body}
    for (i = 0; i <= students.length - 1; i++) {
        if (students[i].id === editStudent.id) {
            const index = students.findIndex(editStudent => students[i].id === editStudent.id)
            students.splice(index, 1, editStudent)
        }
    }*/
})


app.listen(3000, () => console.log("app is running"))