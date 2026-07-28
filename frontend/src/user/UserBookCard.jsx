import { memo } from 'react';
import { userBookCardStyles as s } from '../assets/dummyStyles';

const statusStyles = {
  Borrowed: "bg-amber-100 text-amber-900",
  Overdue: "bg-rose-100 text-rose-900",
  Returned: "bg-slate-200 text-slate-800",
};

const UserBookCard = (record, borrowerName) => {
  return (
    <article className={s.card}>
        <div className={s.header}>
            <div className="min-w-0">
                <p className={s.title}>{record.title}</p>
            </div>
            
            <span className={`${s.statusBadge} ${statusStyles[record.liveStatus]}`}>
                {record.liveStatus}
            </span>
        </div>
        
        <div className={s.detailsGrid}>
            <div className={s.detailBlock}>
                <p className={s.detailLabel}>Book Code</p>
                <p className={s.detailValue}>{record.bookCode}</p>
            </div>

            <div className={s.detailBlock}>
                <p className={s.detailLabel}>Borrower Name</p>
                <p className={s.detailValue}>{borrowerName}</p>
            </div>

            <div className={s.detailBlock}>
                <p className={s.detailLabel}>Issue Date</p>
                <p className={s.numericValue}>{record.issueLabel}</p>
            </div>

            <div className={s.detailBlock}>
                <p className={s.detailLabel}>Due Date</p>
                <p className={s.numericValue}>{record.dueLabel}</p>
            </div>

            <div className={s.detailBlock}>
                <p className={s.detailLabel}>Fine</p>
                <p className={s.numericValue}>Rs. {record.liveFine}</p>
            </div>

            <div className={s.detailBlock}>
                <p className={s.detailLabel}>Return Status</p>
                <p className={s.detailValue}>
                    {record.returnedOn
                    ? "Returned by admin"
                    : "Waiting for admin return"}</p>
            </div>
        </div>
    </article>
  );
};

export default memo(UserBookCard);