import React from "react";

function Registration({ register }) {
    const [values, setValues] = React.useState({});
    //получения данных ипнутов
    function handleChange(evt) {
        setValues({...values, [evt.target.name]: evt.target.value});
    }
    //Регистрация
    function handleRegistr(evt) {
        evt.preventDefault();
        register(values.email, values.password, values.name);
    }
    return (
        <main className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleRegistr}>
                <label className="auth-form__label">Имя пользователя</label>
                <input className="auth-form__input" type="name" name="name" required placeholder="Введите имя пользователя" value={values.name || ''} onChange={handleChange}></input>
                <label className="auth-form__label">E-mail</label>
                <input className="auth-form__input" type="email" name="email" pattern="[a-z0-9._%+]+@[a-z0-9.]+\.[a-z]{2,4}$" required placeholder="Введите почту" value={values.email || ''} onChange={handleChange}></input>
                <label className="auth-form__label">Пароль</label>
                <input className="auth-form__input" type="password" name="password" minLength={8} required placeholder="Введите пароль" value={values.password || ''} onChange={handleChange}></input>
                <button className="auth-form__button" type="submit">Зарегистрироваться</button>
            </form>
        </main>
    )
}

export default Registration;