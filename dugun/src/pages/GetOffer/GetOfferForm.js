import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import axios from 'axios';

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
    const [formElements, setFormElements] = useState([]);
    useEffect(() => {
        axios.get("https://private-1be47-duguncomapis.apiary-mock.com/companies/" + props.cardId +"/forms")
        .then((response) => {
            // handle success
            console.log(response);
            setFormElements(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    return (
        <Form onSubmit={handleSubmit} >
            <Grid container >
                <Grid item xs={12}>
                    {formElements.map(item => {
                        if(item.fieldType == "text" || item.fieldType == "textarea"){
                        return(
                            <Controls.Input
                                name={item.fieldName}
                                label={item.fieldLabel}
                                value={null}
                                isRequired={item.isRequired}
                                onChange={handleInputChange}
                                error={errors.fullName}
                            />
                        )
                        } else if(item.fieldType == "select"){
                            return(
                                <Controls.Select
                                name={item.fieldName}
                                label={item.fieldLabel}
                                isRequired={item.isRequired}
                                onChange={handleInputChange}
                                options={item.infoRequestFormOptions}
                                error={errors.feePerPerson}
                                />
                            )
                        }
                    })}

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


