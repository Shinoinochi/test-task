import './App.css';
import { api } from '../../utils/Api';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import React from 'react';
import { Routes, Route, useNavigate, Navigate, NavLink } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import store from '../../store/store';

function App() {
  const [auth, setAuth] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const mediaFiles = useSelector(store => store.files);

  //Проверка есть ли токен в браузере
  React.useEffect(() => {
    tokenCheck();
  },[]);

  //Если пользователь авторизован то получаем файлы
  React.useEffect(() => {
    if(auth) {
      getFiles();
    }
  },[auth]);

  //Выход из системы
  function logout() {
    setMessage('');
    const token = localStorage.getItem('token');
    return api.logout(token)
     .then(setAuth(false))
     .catch(err => console.log(err))
     .finally(() => {
      localStorage.removeItem('token')
      store.dispatch({type: 'GET_FILES', files: null})
     });
  }
  //Проверка токена
  function tokenCheck() {
    setMessage('');
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
      navigate('/profile', {replace: true});
    }
  }
  //Создание пользователя
  function createUser(email, password, name) {
   return api.createUser(email, password, name)
      .then(res => navigate('/sign-in', {replace: true}));
  }
  //Вход в систему и навигация в профиль
  function login(email, password) {
   return api.login(email, password)
      .then(res => {
        if (res.token) {
          setAuth(true);
          localStorage.setItem('token', res.token);
          navigate('/profile', {replace: true});
        }
      });
  }
  //Загрузка файлов
  function uploadFile(files) {
    setMessage('');
    const token = localStorage.getItem('token');
    if (mediaFiles.length === 19) {
      setMessage('Превышенно максимальноне колличество файлов');
    }
    else {
     return api.upload(files, token)
      .then(res => {
        getFiles();
      })
      .catch(err => {
        if(err.status === 470) {
          setMessage('Колличество файлов превышает предел');
        }
        else {
          setMessage('Загружаемые файлы превышают размер 1МБ');
        }
        console.log(`Статус ошибки: ${err.status}`)})
    }
  }
  //Получение файлов
  function getFiles() {
    const token = localStorage.getItem('token');
    return api.getMedia(token)
    .then(res => {
      store.dispatch({type: 'GET_FILES', files: res.files.reverse()})
    })
    .catch(err => console.log(err));
  }

  //Получения файла и скачивание его
  function getFileById(file, id) {
    const token = localStorage.getItem('token');
    return api.getMediaId(id, token)
    .then(res => {
      const href = URL.createObjectURL(res);
      const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: file.fileName,
      });
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(href);
      a.remove();
    })
    .catch(err => console.log(err));
  }
  //Удаление файла
  function deleteFile(id) {
    setMessage('');
    const token = localStorage.getItem('token');
    return api.deleteFile(id, token)
      .then(res => getFiles())
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      {!auth? 
        <Header auth={auth}><NavLink className="header__link" to='sign-in'>Вход</NavLink><NavLink className="header__link" to='sign-up'>Регистрация</NavLink></Header> 
        : 
        <Header auth={auth} logout={logout}><NavLink className="header__link" onClick={logout} to='logout'>Выход</NavLink></Header>}
      <Routes>
        <Route path='/profile' element={<Profile upload={uploadFile} message={message} getFiles={getFiles} getFileById={getFileById} deleteFile={deleteFile}/>}/>
        <Route path='/sign-in' element={<Login login={login}/>}/>
        <Route path='/sign-up' element={<Registration register={createUser}/>}/>
        <Route path='/*' element={<Navigate to='/sign-up' replace/>}/>
      </Routes>
    </div>
  );
}

export default App;
