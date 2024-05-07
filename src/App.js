import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  const [ user, setUser] = useState(null);//오브젝트니까 기본값null

  const getUser = async () => { //토큰을 통해 유저정보를 가져온다.
    try {
      const storedToken = sessionStorage.getItem('token');   //LoginPage.js가보면  sessionStorage.setItem('token', response.data.token) 이렇게 저장했기때문에 그대로 token으로 가져옴
      if(storedToken){
        // api.defaults.headers['authorization'] = 'Bearer '+ storedToken //이렇게 여기에서 해도되지만 그냥 어차피 하는거 api.js에서 headers에 세팅하는게 좋을거같다. 
        const response = await api.get('/user/me');   //await빼먹으니까 리턴값이 오기전에 넘어가서 제대로 user값이 넘어오지않음.. await 꼭 쓰기
        setUser(response.data.user);
      }
    } catch(error) {
      setUser(null);
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute user={user}>
          {/* 컴포넌트안에 있는 컴포넌트를 react에서는 children이라고 한다. 뭘 따로 넘겨주지않아도 됨*/}
          <TodoPage setUser={setUser}/>            
        </PrivateRoute>
      } />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;

//1. 회원가입
//2. 로그인
//3. 유저 권한확인 (투두페이지는 로그인한 유저만! 들어갈 수 있다.)
// 4. 내가 이미 로그인한 유저라면 추가 로그인 없이 바로 메인페이지로 돌아오기

// 1. 로그인을 했다면 로그인페이지로 돌아갈 수 없다.
//   0.로그인을 했다면 토큰을 저장한다.
//   1.토큰값을 읽어온다
//   2.토큰이 사용 가능한 토큰인지 체크한다 (토큰이 만료되지않고, 토큰을 해독했을때 유저 ID가 있다 ==> 백엔드)
//   2-1 토큰이 사용가능하다면, 토큰을 바탕으로 유저객체를 보내준다.
//   3.유저값을 저장을 한다
//   4.유저가 있다면 투두 페이지를 보여준다

// 2. 로그인을 안했다면 투두페이지로 돌아갈 수 없다.