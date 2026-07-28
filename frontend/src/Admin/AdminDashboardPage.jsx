import { memo } from 'react';
import { adminDashboardStyles as s } from '../assets/dummyStyles';
import { Activity, AlertTriangle, ArrowRight, ShieldEllipsis, UserRound } from 'lucide-react';
import { useLibrary } from '../shared/LibraryContext';
import { Link } from 'react-router-dom';

const icons = [UserRound, Activity, ShieldEllipsis, AlertTriangle];

const AdminDashboardPage = () => {

  const { adminStats, studentSummaries } = useLibrary();
  const overdueStudents = studentSummaries.filter(
    (student) => student.status === "Overdue",
  );

  const attentionRecords = overdueStudents.map((student) => {
    const topOverdueRecord = student.activeBooks
      .filter((record) => record.liveStatus === "Overdue")
      .sort((first, second) => second.liveFine - first.liveFine)[0];

    if (!topOverdueRecord) {
      return null;
    }

    return {
      studentName: student.name,
      studentId: student.studentId,
      email: student.email,
      department: student.department,
      totalFine: student.totalFine,
      borrowedCount: student.borrowedCount,
      ...topOverdueRecord,
    };
  })
  .filter(Boolean)
  .sort((first, second) => second.totalFine - first.totalFine)
  .slice(0,10);
  return (
    <div className={s.container}>
      <section className={s.heroSection}>
        <div className={s.heroInner}>
          <div>
            <span className={s.badge}>College administration workspace</span>
            <h1 className={s.heading}>
              Manage issued books, student records, returns, overdue status, and fines.
            </h1>
            <p className={s.heroParagraph}>
              The admin area now focuses on visual trend graphs while keeping the existing admin workflow unchanged.
            </p>
          </div>
        </div>
      </section>

      <section className={s.statsGrid}>
        {adminStats.map((item, index) => {
          const Icon = icons[index];

          return (
            <article key={item.label} className={s.statCard}>
              <span className={s.statIcon}>
                <Icon size={20} />
              </span>
              <p className={s.statLabel}>{item.label}</p>
              <p className={s.statValue}>{item.statValue}</p>
              <p className={s.statNote}>{item.note}</p>
            </article>
          )
        })}
      </section>

      <section className={s.overdueSection}>
        <div className={s.overdueHeader}>
          <div>
            <h2 className={s.overdueTitle}>Overdue Attention List</h2>
            <p className={s.overdueSubtitle}>
              Top 4 overdue students ranked by total imposed fine, with the highest fine shown first.
            </p>
          </div>
          <span className={s.alertIcon}>
            <AlertTriangle size={20} />
          </span>
        </div>
        <div className={s.overdueGrid}>
          {attentionRecords.length ? (
            attentionRecords.map((record, index) => (
              <div key={`${record.email}-${record.id}`} className={s.overdueCard}>
                {index === 0 ? (
                  <span className={s.mostFineBadge}>
                    Most Fine Imposed
                  </span>
                ) : null }

                <div className={s.overdueCardInner}>
                  <div>
                    <p className={s.studentName}>
                      {record.studentName}
                    </p>
                    <p className={s.studentDetails}>
                      {record.studentId ?? "Not assigned"} | {record.email}
                    </p>
                    <p className={s.studentFine}>
                      Rs. {record.totalFine}
                    </p>
                  </div>
                  <div className={s.highestFineBookContainer}>
                    <p className={s.highestFineLabel}>
                      Highest Fine Book
                    </p>
                    <p className={s.highestFineTitle}>
                      {record.title}
                    </p>
                  </div>
                </div>
                <div className={s.detailsGrid}>
                  <div className={s.detailItem}>
                    Department: {record.department ?? "General"}
                  </div>
                  <div className={s.detailItem}>Book Code: {record.bookCode}</div>
                  <div className={s.detailItem}>
                    Highest Book Fine: Rs. {record.liveFine}
                  </div>
                </div>
              </div>
            ))
          ):(
            <div className={s.emptyState}>
              No overdue books need urgent attention right now.
            </div>
          )}
        </div>

        {attentionRecords.length ? (
          <div className={s.viewMoreContainer}>
            <Link to="/admin/users?status=Overdue&sort=high-to-low"
            className={s.viewMoreLink}>
              View More
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default memo(AdminDashboardPage);