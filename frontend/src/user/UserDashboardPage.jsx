import { memo } from 'react';
import { userDashboardPageStyles as s } from '../assets/dummyStyles';
import { AlertTriangle, BookCopy, GraduationCap, IdCard, ReceiptText, Sparkles } from 'lucide-react';
import { useAuth } from '../shared/AuthContext';
import { useLibrary } from '../shared/LibraryContext';
import { Link } from 'react-router-dom';
import UserBookCard from './UserBookCard';

const UserDashboardPage = () => {

      const { currentUser } = useAuth();
  const { currentUserHistory, currentUserSummary } = useLibrary();

  const activeCount = currentUserHistory.filter(
    (item) => item.liveStatus === "Borrowed",
  ).length;
  const overdueCount = currentUserHistory.filter(
    (item) => item.liveStatus === "Overdue",
  ).length;
  const pendingFine = currentUserSummary?.totalFine ?? 0;
  const clearedFine = currentUserSummary?.totalClearedFine ?? 0;

  const overviewStats = [
    {
      key: "issues",
      label: "Total Issues",
      value: `${currentUserHistory.length}`,
      note: "All library records attached to your student account",
      icon: BookCopy,
    },
    {
      key: "borrowed",
      label: "Active Books",
      value: `${activeCount}`,
      note: "Books currently mapped to your profile",
      icon: GraduationCap,
    },
    {
      key: "overdue",
      label: "Overdue Books",
      value: `${overdueCount}`,
      note: "Needs follow-up before more penalties are added",
      icon: AlertTriangle,
    },
    {
      key: "pending-fine",
      label: "Pending Fine",
      value: `Rs. ${pendingFine}`,
      note: "Fine amount still pending on active records",
      icon: ReceiptText,
    },
    {
      key: "cleared-fine",
      label: "Fine Cleared",
      value: `Rs. ${clearedFine}`,
      note: "Total fine amount already cleared on your account",
      icon: ReceiptText,
    },
  ];

  const recentBooks = currentUserHistory.slice(0, 3);

  return (
    <div className={s.pageContainer}>
        <section className={s.heroSection}>
            <div className={s.heroGrid}>
                <div className={s.heroLeft}>
                    <span className={s.heroBadge}>
                        <Sparkles size={14} />
                        Student Dashboard
                    </span>

                    <h1 className={s.heroTitle}>
                        {currentUser?.name ?? "Reader"} profile, semester status, and your latest library books.
                    </h1>
                    <p className={s.heroText}>
                        Your dashboard now keeps the important account summary at the top and shows the most recent issued books directly below for faster access.
                    </p>
                </div>

                <div className={s.rightColumnGrid}>
                    <article className={s.profileCard}>
                        <div className={s.profileHeader}>
                            <div className='min-w-0'>
                                <p className={s.profileLabel}>Student Profile</p>
                                <p className={s.profileName}>
                                    {currentUser?.name ?? "Campus Reader"}
                                </p>
                            </div>
                            <span className={s.profileIconWrapper}>
                                <IdCard size={20} />
                            </span>
                        </div>
                        <div className={s.profileDetails}>
                            <div className={s.profileDetailItem}>
                                Student ID: {currentUserSummary?.studentId ?? "Not assigned"}
                            </div>
                        </div>
                        <div className={s.profileDetails}>
                            <div className={s.profileDetailItem}>
                                Roll Number: {currentUserSummary?.rollNumber ?? "Not assigned"}
                            </div>
                        </div>
                        <div className={s.profileDetails}>
                            <div className={s.profileDetailItem}>
                                Department {currentUserSummary?.department ?? "General"}
                            </div>
                        </div>
                    </article>

                    <article className={s.semesterCard}>
                        <div className={s.semesterHeader}>
                            <div>
                                <p className={s.semesterLabel}>Semester Details</p>
                                <p className={s.semesterValue}>
                                    {currentUserSummary?.semester ?? "Semester 1"}
                                </p>
                            </div>
                            <span className={s.semesterIconWrapper}>
                                <GraduationCap size={20} />
                            </span>
                        </div>

                        <div className={s.semesterDetails}>
                            <div className={s.semesterDetailItem}>
                                Stream: {currentUserSummary?.stream ?? "General"}
                            </div>
                            <div className={s.semesterDetailItem}>
                                Academic Year: {currentUserSummary?.academicYear ?? "1st Year"}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section className={s.statsGrid}>
            {overviewStats.map((item) => {
                const Icon = item.icon;

                return (
                    <article key={item.key} className={s.statCard}>
                        <div className={s.statHeader}>
                            <span className={s.statIconWrapper}>
                                <Icon size={20} />
                            </span>
                            <span className={s.statLiveBadge}>Live</span>
                        </div>
                        <p className={s.statLabel}>{item.label}</p>
                        <p className={s.statValue}>{item.value}</p>
                        <p className={s.statNote}>{item.note}</p>
                    </article>
                )
            })}
        </section>

        <section className={s.recentSection}>
            <div className={s.recentHeader}>
                <div>
                    <h2 className={s.recentTitle}>Recent Books</h2>
                    <p className={s.recentSubtitle}>
                        The latest three records from your books page are shown here with the same card design so you can continue from the dashboard.
                    </p>
                </div>
                <Link to="/user/books" className={s.viewMoreButton}>
                View More
                </Link>
            </div>

            <div className={s.recentGrid}>
                {recentBooks.length ? (
                    recentBooks.map((record) => (
                        <UserBookCard key={record.id} record={record} borrowerName={currentUser?.name ?? "student"} />
                    ))
                ) : (
                    <div className={s.emptyRecentState}>
                        No recent books found for this account.
                    </div>
                )}
            </div>
        </section>
    </div>
  );
};

export default memo(UserDashboardPage);