import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';

//Açılan popup'in içindeki form alanları
const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    departmentId: '',
    feePerPerson: '',
    guestCount: '',
    message: '',
    hireDate: new Date(),
    isRead: false,
}
export default function GetOfferForm(props) {
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "Bu alan zorunlu."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email geçerli değiş."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "En az 11 rakam giriniz"
        if ('feePerPerson' in fieldValues)
            temp.feePerPerson = fieldValues.feePerPerson.length != 0 ? "" : "Bu alan zorunlu."
        if ('guestCount' in fieldValues)
            temp.guestCount = fieldValues.guestCount.length != 0 ? "" : "Bu alan zorunlu."
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFValues, true, validate);
    const handleSubmit = e => {
        alert("Fiyat Teklifin Başarıyla İletildi.")
    }
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    const getGuestCountCollection = () => ([
        { id: '1', title: '1' },
        { id: '2', title: '3' },
        { id: '3', title: '5' },
        { id: '4', title: '10' },
    ])
    const getFeePerPersontCollection = () => ([
        { id: '1', title: '300tl' },
        { id: '2', title: '500tl' },
        { id: '3', title: '700tl' },
        { id: '4', title: '1000tl' },
    ])
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container >
                <Grid item xs={12}>
                    <Controls.Input
                        name="fullName"
                        label="Ad Soyad"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="E-posta"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Cep Telefonu"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.DatePicker
                        name="birthDate"
                        label="Doğum Tarihi"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        name="feePerPerson"
                        label="Kişi Başı Bütçe"
                        value={values.feePerPerson}
                        onChange={handleInputChange}
                        options={getFeePerPersontCollection()}
                        error={errors.feePerPerson}
                    />
                    <Controls.Select
                        name="guestCount"
                        label="Davetli Sayısı"
                        value={values.guestCount}
                        onChange={handleInputChange}
                        options={getGuestCountCollection()}
                        error={errors.guestCount}
                    />
                    <Controls.Input
                        label="Mesaj (Opsiyonel)"
                        name="message"
                        value={values.message}
                        onChange={handleInputChange}
                        error={errors.message}
                    />
                    <Controls.Checkbox
                        name="isRead"
                        color="#DB0962"
                        label="Kullanıcı sözleşmesi ve pazarlama izni metinlerini okudum ve kabul ediyorum."
                        value={values.isRead}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            color="#DB0962"
                            type="Ücretsiz Teklif Al"
                            text="Ücretsiz Teklif Al" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}


