import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BtnLink from '../components/BtnLink';
import Import from '../Images/import.png';
import Export from '../Images/export.png';
import Equal from '../Images/equal.png';
import Btn from '../components/Btn';
import vide from '../Images/vide.xlsx';
import { BASE_API_URL, downloadActiveUsersExcel, token } from '../server/serves';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const UploadUsersExcel = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            if (sheetData.length === 0 || sheetData[0].length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'الملف فارغ',
                    text: 'الملف الذي قمت برفعه فارغ. من فضلك تحقق من البيانات.',
                    confirmButtonText: 'موافق',
                    customClass: {
                        title: 'text-blue',
                        confirmButton: 'blue-button',
                        cancelButton: 'red-button'
                    },
                    didOpen: () => {
                        const popup = document.querySelector('.swal2-popup');
                        if (popup) popup.setAttribute('dir', 'rtl');
                    }
                });
                setFile(null);
            }
        };
        reader.readAsBinaryString(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'لم يتم رفع الملف',
                text: 'من فضلك اختر ملف Excel أولاً.',
                confirmButtonText: 'موافق',
                customClass: {
                    title: 'text-blue',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button'
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
            return;
        }

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!['xlsx', 'xls'].includes(fileExtension)) {
            Swal.fire({
                icon: 'error',
                title: 'صيغة الملف غير مدعومة',
                text: 'من فضلك قم برفع ملف بصيغة Excel فقط (.xlsx أو .xls).',
                confirmButtonText: 'موافق',
                customClass: {
                    title: 'text-red',
                    confirmButton: 'blue-button',
                    cancelButton: 'red-button'
                },
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.setAttribute('dir', 'rtl');
                }
            });
            return;
        }

        Swal.fire({
            icon: 'question',
            title: 'تأكيد',
            text: 'هل أنت متأكد من أنك تريد رفع الملف؟',
            showCancelButton: true,
            confirmButtonText: 'نعم، ارفع الملف',
            cancelButtonText: 'إلغاء',
            customClass: {
                title: 'text-blue',
                confirmButton: 'blue-button',
                cancelButton: 'red-button'
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                if (popup) popup.setAttribute('dir', 'rtl');
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsUploading(true);

                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await axios.post(`${BASE_API_URL}/api/Account/upload-users-excel`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'تم رفع الملف بنجاح',
                        confirmButtonText: 'موافق',
                        customClass: {
                            title: 'text-blue',
                            confirmButton: 'blue-button',
                            cancelButton: 'red-button'
                        },
                        didOpen: () => {
                            const popup = document.querySelector('.swal2-popup');
                            if (popup) popup.setAttribute('dir', 'rtl');
                        }
                    });
                    setFile(null);
                } catch (error) {
                    const errorMessage = error.response ? error.response.data.message : error.message;
                    Swal.fire({
                        icon: 'error',
                        title: 'حدث خطأ أثناء رفع الملف',
                        text: errorMessage,
                        confirmButtonText: 'حسناً',
                        customClass: {
                            title: 'text-red',
                            confirmButton: 'blue-button',
                            cancelButton: 'red-button'
                        },
                        didOpen: () => {
                            const popup = document.querySelector('.swal2-popup');
                            if (popup) popup.setAttribute('dir', 'rtl');
                        }
                    });
                }
                finally {
                    setIsUploading(false);
                }
            }
        });
    };

    return (
        <div>
            <div className="d-flex mb-3 justify-content-between">
                <div className="zzz d-inline-block">
                    <h2 className="m-0">رفع موظف</h2>
                </div>
                <div className="d-flex">
                    <Link to="/employees/UploadUsersExcel" role="button" className="btn btn-primary my-3 d-flex align-items-center ms-3" >
                        <FontAwesomeIcon icon={faUserPlus} style={{ fontSize: "1.2em" }} />
                        <span className="d-none d-sm-inline">&nbsp;رفع موظف بالاكسيل</span>
                    </Link>
                </div>
            </div>

            <div className='p-3'>
                <div className='box'>
                    <div className='row d-flex p-3 parent gap-3'>
                        <section className='col-sm-12 col-lg p-5 box'>
                            <div className='d-flex'>
                                <div>
                                    <h2>الخطوة 1</h2>
                                    <p>تنزيل ملف Excel</p>
                                </div>
                                <img src={Import} className="img-responsive" alt="profilePicture" />
                            </div>
                            <h4>تعليمات</h4>
                            <ul>
                                <li>قم بتنزيل ملف التنسيق واملأه بالبيانات الصحيحة.</li>
                                <li>يمكنك تنزيل ملف المثال لفهم كيفية تعبئة البيانات.</li>
                                <li>يجب رفع ملف Excel.</li>
                            </ul>
                        </section>

                        <section className='col-sm-12 col-lg p-5 box'>
                            <div className='d-flex'>
                                <div>
                                    <h2>الخطوة 2</h2>
                                    <p>مطابقة بيانات جدول البيانات وفقًا للتعليمات</p>
                                </div>
                                <img src={Equal} className="img-responsive" alt="profilePicture" />
                            </div>
                            <h4>تعليمات</h4>
                            <ul>
                                <li>املأ البيانات وفقًا للتنسيق والتحقق.</li>
                                <li>يمكنك الحصول على الرقم القومي واسم المستخدم من قائمتهم، يرجى إدخال البيانات الصحيحة.</li>
                            </ul>
                        </section>

                        <section className='col-sm-12 col-lg p-5 box'>
                            <div className='d-flex'>
                                <div>
                                    <h2>الخطوة 3</h2>
                                    <p>تحقق من البيانات وأكمل الاستيراد</p>
                                </div>
                                <img src={Export} className="img-responsive" alt="profilePicture" />
                            </div>
                            <h4>تعليمات</h4>
                            <ul>
                                <li>في قسم تحميل ملف Excel، اختر أولاً خيار التحميل.</li>
                                <li>قم بتحميل ملفك بتنسيق .xls أو .xlsx.</li>
                                <li>أخيرًا اضغط على زر التحميل.</li>
                                <li>يمكنك تحميل ورفع بيانات الموظفين بكل سهولة.</li>
                            </ul>
                        </section>
                    </div>

                    <div className='text-center mt-3'>
                        <h4>تحميل نموذج جدول البيانات</h4>
                        <div className='mt-3'>
                            <Btn onClick={downloadActiveUsersExcel} name='مع البيانات الحالية' className='btn-outline-primary w-25 ms-3' />
                            <a href={vide} download className="btn btn-primary w-25 ms-3">
                                بدون البيانات الحالية
                            </a>
                        </div>
                    </div>
                </div>

                <div className='row d-flex p-3 parent box mt-4'>
                    <div className='d-flex gap-4'>
                        <section className='col-sm-12 col-md'>
                            <h5 className='title'>اختر نوع تحميل البيانات</h5>
                            <div className="row box-radio h-75">
                                <label className="label1 col-12 flex items-center gap-2 cursor-pointer bg-blue-50">
                                    <span className="text-gray-800 font-medium">تحميل بيانات جديدة</span>
                                    <input type="radio" name="dataOption" value="new" className="accent-black w-4 h-4" defaultChecked />
                                </label>

                                <label style={{backgroundColor:'#e2e2e2'}} className="label2 col-12 flex items-center gap-2 cursor-not-allowed bg-gray-100 opacity-60">
                                    <span className="text-gray-800">تحديث البيانات الحالية</span>
                                    <input type="radio" name="dataOption" value="update" className="accent-black w-4 h-4" disabled />
                                </label>
                            </div>
                        </section>

                        <section className='col-sm-12 col-md'>
                            <h5 className='title'>استيراد ملف الموظفين</h5>
                            <label htmlFor="file-upload" className='p-1 h-75 cursor-pointer w-100 box-input text-center custom-file-upload'>
                                <input 
                                    id="file-upload" 
                                    onChange={handleFileChange} 
                                    accept=".xlsx, .xls" 
                                    type="file" 
                                    style={{ display: 'none' }}
                                />
                                <img src={Export} className="img-responsive" alt="profilePicture" />
                                <p>يجب أن تكون ملفات Excel باستخدام قالب Excel الخاص بنا أعلاه</p>
                            </label>
                        </section>
                    </div>
                    
                    <div className='d-flex gap-3 justify-content-end mt-3'>
                    <Btn onClick={() => { setFile(null); }} name='إعادة تعيين' className='btn-outline-primary' />
                    <Btn onClick={handleUpload} name='تحميل' className='btn-primary' disabled={isUploading} /> {/* تعطيل الزر أثناء التحميل */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadUsersExcel;
