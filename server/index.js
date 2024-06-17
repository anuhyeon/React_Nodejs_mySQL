const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//\\ 서버사이드렌더링 템플릿 엔진
// const ejs = require('ejs');
// app.set('view engine', 'ejs');
// app.set('views','./views');

//\\post 요청시 query가 아닌 body를 파싱하기 위한 툴
// var bodyParser = require('body-parser'); //서드파티 미들웨어
// app.use(bodyParser.urlencoded({ extended: false }))

//DB 임포트
const db = require('./database/db');

// 컨트롤러 폴더에서 index.js 임포트
const {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
    signup } = require('./controller') // 컨트롤러디렉토리안에 index.js라고 'index'라는 이름을 사용하게 되면, 해당 폴더까지만 써줘도 임포트 됨.

const app = express();
dotenv.config();

//기본 설정 
//1. 먼저 우리는 클라이언트와 서버간에 통신을 하기 위해서 json형식의 데이터를 다룰 것이므로 express모듈에 기본적으로 설치되어있는 json 미들웨어를 설치해준다.
app.use(express.json());
//2. 우리는 쿠키를 사용해서  jsonwebtoken을 사용할 예정이므로 cookieParser를 설정
app.use(cookieParser());
//3. 클라이언트와 서버간 origin이 다른 상황에서 통신을 하기 위해서 cors 설정을 해줌
app.use(cors({
    origin : 'http://localhost:3000',
    methods : ['GET','POST'],
    credentials : true   // 사용자 클라이언트와 서버 간에 통신에서 쿠키를 사용해서 통신을 진행할 예정이므로 신뢰성 옵션을 true로 설정
}))

// app.use(express.static('./build'));
// app.get('/',(req,res)=>{
//     res.sendFile('./build/index.html')
// })
// app.use(express.static('../client/build'))
// app.get('/', (req, res) => {
//     res.sendFile('index.html')
// })
app.get('/',(req,res)=>{
    res.send('<h1>여기는 서버입니다다다다다다 ui 보고싶으면 포트 3000으로 ㄱ</h1>')
})

// 로그인 관련 기능
app.post('/login',login ) // 로그인 요청 기능
app.get('/accesstoken', accessToken) // 액세스 토큰 발급 받아오는 요청
app.get('/refreshtoken', refreshToken) // 액세스 토큰을 갱신하는 용도
app.get('/login/success', loginSuccess) // 로그인이 성공을 했을 때 사용자가 요청을 하면 현재 쿠키에 담겨있는 액세스 토큰을 가지고 사용자 정보를 파싱해서 전달해주는 역할
app.post('/logout', logout) // 로그아웃을 진행을 하여 현재 쿠키에 담겨있는 accesstoken을 제거하는 역할을 담당.

//회원가입 관련기능
app.post('/signup',signup) // 회원가입 요청 기능

app.listen(process.env.PORT, () =>{
    console.log(`server is on ${process.env.PORT}`);
});