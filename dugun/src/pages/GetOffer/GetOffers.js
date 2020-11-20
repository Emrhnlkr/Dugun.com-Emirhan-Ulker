import React, { useState } from 'react'
import GetOfferForm from "./GetOfferForm";
import { colors, makeStyles } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
//teklif al butonuna tıklandığında açılan popup
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        left: '10px'
    }
}))
export default function GetOffers() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    return (
        <>
            <Controls.Button

                text="Teklif Al"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
            />
            <Popup
                title="Ücretsiz Fiyat Teklifi Al"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <div>
                    <GetOfferForm
                        style={{ marginTop: 100 }}
                        recordForEdit={recordForEdit} /></div>
            </Popup>
        </>
    )
}
