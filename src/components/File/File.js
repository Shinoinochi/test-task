import React from "react";
import fileIcon from '../../images/file.svg';
import deleteIcon from '../../images/deleteIcon.svg';
import downloadIcon from '../../images/downloadIcon.svg'
import { api } from "../../utils/Api";
import Preloader from "../Preloader/Preloader";

function File({ file, getFileById, deleteFile }) {
    const [myUrl, setMyUrl] = React.useState(null);
    //Загрузка изображений
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        api.loadUrlImage(file.url, token)
            .then(blob => {
            setMyUrl(URL.createObjectURL(blob))
          })
    },[file.url])
    //Удаление файла
    function handleDeleteFile() {
        deleteFile(file.id);
    }
    //Скачивание файла
    function handleDownloadFile() {
        getFileById(file, file.id);
    }
    return (
        <li className="file">
            {myUrl? <img className="file__image" onClick={handleDownloadFile} src={file.mimeType === 'image/png' || file.mimeType === 'image/jpeg' || file.mimeType === 'image/svg+xml' || file.mimeType === 'image/gif'? myUrl : fileIcon} alt={file.name}></img>: <Preloader/>}
            <p className="file__name">{file.fileName}</p>
            <div className="file__buttons">
                <img className="file__button" onClick={handleDownloadFile} src={downloadIcon} alt="download"></img>
                <img className="file__button" onClick={handleDeleteFile} src={deleteIcon} alt="delete"></img>
            </div>
        </li>
    )
}

export default File;