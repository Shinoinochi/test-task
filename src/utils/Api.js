export default class Api {
    constructor({ URL }) {
        this._URL = URL;
    }
    //функции на проверку ответов
    _getErrorAuth(res) {
        return res.json().then((res) => {
            throw new Error(res.message);
        })
    }
    _checkData(res) {
        return res.ok? res.json(): Promise.reject(res);
    }

    //Запрос на создание пользователя
    createUser(email, password, name) {
        return fetch(this._URL + '/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({email, password, name})
        })
        .then(res => {
            if(res.ok) return res.json();
            return this._getErrorAuth(res);
        })
    }
    //Запрос на вход
    login(email, password) {
        return fetch(this._URL + '/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        .then(res => {
            if(res.ok) return res.json();
            return this._getErrorAuth(res);
        })
    }
    //Запрос за загрузку файлов
    upload(files, token) {
        return fetch(this._URL + '/api/media/upload', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: files
        })
        .then(res => {
            return this._checkData(res);
        })

    }
    //Запрос на получения всех файлов
    getMedia(token) {
        return fetch(this._URL + '/api/media', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(res => {
            if(res.ok) return res.json();
            return this._getErrorAuth(res);
        })
    }
    //Запрос на скачивание файла
    getMediaId(id,token) {
        return fetch(this._URL + `/api/media/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(res => {
            if(res.ok) return res.blob();
            return this._checkData(res);
        })
    }
    //Запрос на получение изображения
    loadUrlImage(url, token) {
        return fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(res => {
            if(res.ok) return res.blob();
            return this._checkData(res);
        })
    }
    //Запрос на удаление файла
    deleteFile(id,token) {
        return fetch(this._URL + `/api/media/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(res => {
            if(res.ok) return res.json();
            return this._checkData(res);
        })
    }
    //Запрос на выход из системы
    logout(token) {
        return fetch(this._URL + `/api/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(res => {
            if(res.ok) return res.json();
            return this._checkData(res);
        })
}

}
export const api = new Api({
    URL: 'https://js-test.kitactive.ru'
});