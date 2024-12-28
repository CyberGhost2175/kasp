import './App.css';
import React, { useState, useEffect } from "react";
import { Stack, Button, TextField, Box } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Label } from "@mui/icons-material";
import copyIcon from './copy.png';

function App() {
    const [activeTab, setActiveTab] = useState("document");
    const [direction, setDirection] = useState("none");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [details, setDetails] = useState({
        fullName: "",
        iin: "",
        birthDate: "",
        documentNumber: "",
        issueDate: "",
        expiryDate: ""
    });

    useEffect(() => {
        const savedImage = localStorage.getItem("uploadedImage");
        const savedDetails = JSON.parse(localStorage.getItem("details"));
        if (savedImage) setUploadedImage(savedImage);
        if (savedDetails) setDetails(savedDetails);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
                localStorage.setItem("uploadedImage", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field, value) => {
        setDetails((prev) => {
            const updated = { ...prev, [field]: value };
            localStorage.setItem("details", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <>
            <main>
                <div className="header-container">
                    <ArrowBackIosIcon className="back-icon" />
                    <h4>Удостоверение личности</h4>
                </div>

                <Stack style={{ marginTop: "25px", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <Stack direction="row" style={{ backgroundColor: 'lightgray', borderRadius: '8px', padding: '4px' }}>
                        <div className="tabs">
                            <button
                                className={`tab-button ${activeTab === "document" ? "active" : ""}`}
                                onClick={() => handleTabChange("document")}
                            >
                                Документ
                            </button>
                            <button
                                className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                                onClick={() => handleTabChange("details")}
                            >
                                Реквизиты
                            </button>
                        </div>
                    </Stack>
                </Stack>

                <div className={`tab-content-container ${direction}`}>
                    {activeTab === "document" && (
                        <div className="tab-content">
                            {!uploadedImage ? (
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Загрузить
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            ) : (
                                <Box>
                                    <img
                                        className="image-container"
                                        src={uploadedImage}
                                        alt="Uploaded ID"
                                        style={{ width: "90%" }}
                                    />
                                    <Button style={{ textTransform: 'none', width: '100%' ,  marginTop: '150px',}} variant="contained" color="primary">
                                        <img src="https://project-x-pearl-1234.vercel.app/img/qr.png"
                                             style={{ width: '20px', marginRight: '5px' }} alt="dd" />
                                        Предъявить документ
                                    </Button>
                                    <Button style={{ textTransform: 'none', width: '100%', marginTop: '10px' }}
                                            variant="outlined"
                                            color="primary"
                                    >
                                        <svg width="22" style={{ marginRight: '5px' }} height="23" viewBox="0 0 22 23" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <mask id="path-1-inside-1_10_170" fill="white">
                                                <path
                                                    d="M0 12C0 9.79086 1.79086 8 4 8H18C20.2091 8 22 9.79086 22 12V19C22 21.2091 20.2091 23 18 23H4C1.79086 23 0 21.2091 0 19V12Z" />
                                            </mask>
                                            <path
                                                d="M4 10H18V6H4V10ZM20 12V19H24V12H20ZM18 21H4V25H18V21ZM2 19V12H-2V19H2ZM4 21C2.89543 21 2 20.1046 2 19H-2C-2 22.3137 0.686292 25 4 25V21ZM20 19C20 20.1046 19.1046 21 18 21V25C21.3137 25 24 22.3137 24 19H20ZM18 10C19.1046 10 20 10.8954 20 12H24C24 8.68629 21.3137 6 18 6V10ZM4 6C0.686292 6 -2 8.68629 -2 12H2C2 10.8954 2.89543 10 4 10V6Z"
                                                fill="#3256B2" mask="url(#path-1-inside-1_10_170)" />
                                            <path
                                                d="M6.99613 9.78877L7.00153 7.991L15.2472 8.01575L15.2418 9.81352L6.99613 9.78877Z"
                                                fill="white" stroke="white" />
                                            <path
                                                d="M7 5L10.5959 1.17789C10.8191 0.940703 11.1809 0.940703 11.4041 1.17789L15 5"
                                                stroke="#3256B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11 3V17" stroke="#3256B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Отправить документ
                                    </Button>
                                </Box>
                            )}
                        </div>
                    )}

                    {activeTab === "details" && (
                        <div className="tab-content" style={{ textAlign: 'start' }}>
                            <Stack direction="column" spacing={1} style={{ width: '100%' }}>
                                <label style={{  fontSize: '13px',marginBottom:'-5px' }}>ФИО</label>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" style={{marginBottom:'10px'}}>
                                    <input
                                        type="text"
                                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
                                        value={details.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    />
                                    <img className="copy-img" src={copyIcon} alt="copy" style={{ width: '20px', cursor: 'pointer' }} />
                                </Stack>

                                <label style={{ fontSize: '13px',marginBottom:'-5px' }}>ИИН</label>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" style={{marginBottom:'10px'}}>
                                    <input
                                        type="text"
                                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
                                        value={details.iin}
                                        onChange={(e) => handleInputChange('iin', e.target.value)}
                                    />
                                    <img className="copy-img" src={copyIcon} alt="copy" style={{ width: '20px', cursor: 'pointer' }} />
                                </Stack>

                                {/* Birth Date Field */}
                                <label style={{ fontSize: '13px',marginBottom:'-5px' }}>Дата рождения</label>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" style={{marginBottom:'10px'}}>
                                    <input
                                        type="text"
                                        style={{border: 'none', outline: 'none', width: '100%', fontSize: '16px'}}
                                        value={details.birthDate}
                                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                    />
                                    <img className="copy-img" src={copyIcon} alt="copy"
                                         style={{width: '20px', cursor: 'pointer'}}/>
                                </Stack>

                                {/* Document Number Field */}
                                <label style={{  fontSize: '13px',marginBottom:'-5px' }}>Номер документа</label>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" style={{marginBottom:'10px'}}>
                                    <input
                                        type="text"
                                        style={{border: 'none', outline: 'none', width: '100%', fontSize: '16px'}}
                                        value={details.documentNumber}
                                        onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                                    />
                                    <img className="copy-img" src={copyIcon} alt="copy"
                                         style={{width: '20px', cursor: 'pointer'}}/>
                                </Stack>

                                {/* Issue Date Field */}
                                <label style={{ fontSize: '13px' , marginBottom:'-5px'}}>Дата выдачи</label>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" style={{marginBottom:'10px'}}>
                                    <input
                                        type="text"
                                        style={{border: 'none', outline: 'none', width: '100%', fontSize: '16px'}}
                                        value={details.issueDate}
                                        onChange={(e) => handleInputChange('issueDate', e.target.value)}
                                    />
                                    <img className="copy-img" src={copyIcon} alt="copy"
                                         style={{width: '20px', cursor: 'pointer'}}/>
                                </Stack>

                                {/* Expiry Date Field */}
                                <label style={{  fontSize: '13px',marginBottom:'-5px' }}>Дата окончания</label>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" style={{marginBottom:'10px'}}>
                                    <input
                                        type="text"
                                        style={{border: 'none', outline: 'none', width: '100%', fontSize: '16px'}}
                                        value={details.expiryDate}
                                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                    />
                                    <img className="copy-img" src={copyIcon} alt="copy"
                                         style={{width: '20px', cursor: 'pointer'}}/>
                                </Stack>
                            </Stack>

                            <Button
                                style={{
                                    textTransform: 'none',
                                    width: '100%',
                                    marginTop: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                variant="outlined"
                                color="primary"
                            >
                                <svg width="20" style={{marginRight: '5px'}} height="23" viewBox="0 0 22 23" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <mask id="path-1-inside-1_10_170" fill="white">
                                        <path
                                            d="M0 12C0 9.79086 1.79086 8 4 8H18C20.2091 8 22 9.79086 22 12V19C22 21.2091 20.2091 23 18 23H4C1.79086 23 0 21.2091 0 19V12Z"/>
                                    </mask>
                                    <path
                                        d="M4 10H18V6H4V10ZM20 12V19H24V12H20ZM18 21H4V25H18V21ZM2 19V12H-2V19H2ZM4 21C2.89543 21 2 20.1046 2 19H-2C-2 22.3137 0.686292 25 4 25V21ZM20 19C20 20.1046 19.1046 21 18 21V25C21.3137 25 24 22.3137 24 19H20ZM18 10C19.1046 10 20 10.8954 20 12H24C24 8.68629 21.3137 6 18 6V10ZM4 6C0.686292 6 -2 8.68629 -2 12H2C2 10.8954 2.89543 10 4 10V6Z"
                                        fill="#3256B2" mask="url(#path-1-inside-1_10_170)"/>
                                    <path
                                        d="M6.99613 9.78877L7.00153 7.991L15.2472 8.01575L15.2418 9.81352L6.99613 9.78877Z"
                                        fill="white" stroke="white"/>
                                    <path
                                        d="M7 5L10.5959 1.17789C10.8191 0.940703 11.1809 0.940703 11.4041 1.17789L15 5"
                                        stroke="#3256B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11 3V17" stroke="#3256B2" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                                Отправить реквизиты
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default App;
