import React from "react";
import File from "../File/File";
import { useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";

function Profile({ upload, message, url, getFileById, deleteFile }) {
    //получение и отправка файлов на сервер 
    const files = useSelector(store => store.files);
    function handleChange(evt) {
        const formData = new FormData();
        for (let i = 0; i < evt.target.files.length; i++) {
            let file = evt.target.files[i];
            formData.append('files[]', file);     
        }
        upload(formData);
        evt.target.value = null;
    }
    return (
        <main className="profile">
            <p className="profile__media-counter">{files? `Файлов загружено: ${files.length}/20` : ''}</p>
            <form className="profile-form">
                <label htmlFor="upload" className="profile-form__input">Загрузить файлы...</label>
                <span className="profile-form__text">Не более 1МБ за одну загрузку</span>
                <span className="profile-form__text profile-form__message">{message}</span>
                <input className="profile-form__button" id="upload" name="file[]" type="file" multiple onChange={handleChange}></input> 
            </form>
            <div className="profile__files">
                <ul className="profile__files-list">
                    {files? files.map(file => <File key={file.id} file={file} getFileById={getFileById} url={url} deleteFile={deleteFile}/>) : <Preloader/>}
                </ul>
           </div>
        </main>
    )
}
export default Profile;