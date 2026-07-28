import { memo, useEffect, useState } from 'react';
import { adminFinesPageStyles as s } from '../assets/dummyStyles';
import { useLibrary } from '../shared/LibraryContext';
import { CheckCircle2, Currency, Pencil } from 'lucide-react';

const fineIntervals = [
    { value: "day", label: "Per Day" },
    { value: "week", label: "Per Week" },
    { value: "month", label: "Per Month" },
    { value: "year", label: "Per Year" },
];

const AdminFinesPage = () => {

    const {fineSettings, saveFineSettings} =useLibrary();
    const [form, setForm] = useState(fineSettings);
    const [toast, setToast] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(()=>{
        setForm(fineSettings);
    }, [fineSettings]);

    useEffect(()=>{
        if(!toast) return undefined;
        const timer = setTimeout(() => setToast(""), 2200);
        return() => clearTimeout(timer);
    }, [toast]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        saveFineSettings(form);
        setIsEditing(false);
        setToast("Fine settings saved successfully.");
    } 
    return (
        <div className={s.pageContainer}>
            {toast && (
                <div className={s.toastWrapper}>
                    <div className={s.toastContent}>
                        <CheckCircle2 size={18} />
                        {toast}
                    </div>
                </div>
            )}

            <section className={s.mainSection}>
                <div className={s.headerFlex}>
                    <div>
                        <h1 className={s.title}>Fine Settings</h1>
                        <p className={s.subtitle}>
                            Save the overdue fine rule here. After saving, use the edit icon to update it again.
                        </p>
                    </div>
                    {!isEditing && (
                        <button type="button" onClick={() => {
                            setForm(fineSettings);
                            setIsEditing(true);
                        }} className={s.editButton}>
                            <Pencil size={18} />
                        </button>
                    )}
                </div>

                <form className={s.formContainer} onSubmit={handleSubmit}>
                    <label className={s.label}>
                        <span className={s.labelSpan}>Fine Amount</span>
                        <input type="number" min="0" value={form.amount}
                        onChange={(event) => 
                            setForm((current) => ({
                                ...current,
                                amount: event.target.value,
                            }))
                        } disabled={!isEditing} className={s.input} />
                    </label>
                    <label className={s.label}>
                        <span className={s.labelSpan}>Fine Interval</span>
                        <select value={form.interval} onChange={(event) => 
                        setForm((current)=> ({
                            ...current,
                            interval: event.target.value,
                        }))
                    } disabled = {!isEditing} className={s.select} >
                        {fineIntervals.map((option) => {
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>
                        })}
                    </select>
                    </label>

                    {isEditing ? (
                        <button type="submit" className={s.submitButton}>
                            Save Fine Rule
                        </button>
                    ) : (
                        <div className={s.readOnlyDisplay}>
                            Rs. {fineSettings.amount} per {fineSettings.interval}
                        </div>
                    )}
                </form>
            </section>
        </div>
    );
};

export default memo(AdminFinesPage);