import { createElement, memo, useEffect, useMemo, useState } from 'react';
import { adminUsersPageStyles as s } from '../assets/dummyStyles';
import { useLibrary } from '../shared/LibraryContext';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Download, Eye, Search, ShieldCheck, UserRoundCog, UsersRound } from 'lucide-react';

const roleStyles = {
    user: "bg-emerald-100 text-emerald-900",
    admin: "bg-amber-100 text-amber-900",
};

const roleLabels = {
    user: "Student",
    admin: "Admin",
};

const statusStyles = {
    Clear: "bg-emerald-100 text-emerald-900",
    Overdue: "bg-rose-100 text-rose-900",
    Borrowing: "bg-amber-100 text-amber-900",
};

const recordStatusStyles = {
    Borrowed: "bg-amber-100 text-amber-900",
    Overdue: "bg-rose-100 text-rose-900",
    Returned: "bg-slate-200 text-slate-800",
};

const studentFilterOptions = [
    { value: "All", label: "All Students" },
    { value: "Overdue", label: "Overdue Students" },
    { value: "Borrowing", label: "Borrowing Students" },
    { value: "Clear", label: "Clear Students" },
];

const overdueSortOptions = [
    { value: "high-to-low", label: "Fine High to Low" },
    { value: "low-to-high", label: "Fine Low to High" },
];

const AdminUsersPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { studentSummaries, clearFineForRecord, returnIssuedRecord } =
        useLibrary();
    const [expandedStudent, setExpandedStudent] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState(() => {
        const initialFilter = searchParams.get("status");
        return studentFilterOptions.some((option) => option.value === initialFilter)
            ? initialFilter
            : "All";
    });
    const [overdueSortOrder, setOverdueSortOrder] = useState(() => {
        const initialSort = searchParams.get("sort");
        return overdueSortOptions.some((option) => option.value === initialSort)
            ? initialSort
            : "high-to-low";
    });
    const [confirmAction, setConfirmAction] = useState(null);
    const [toast, setToast] = useState(null);

    const filteredStudents = useMemo(() => {
        const term = search.trim().toLowerCase();

        const visibleStudents = studentSummaries.filter((member) => {
            const matchesSearch =
                !term ||
                member.name.toLowerCase().includes(term) ||
                member.email.toLowerCase().includes(term) ||
                (member.rollNumber ?? "").toLowerCase().includes(term) ||
                member.history.some(
                    (record) =>
                        record.title.toLowerCase().includes(term) ||
                        record.bookCode.toLowerCase().includes(term),
                );

            const matchesFilter =
                statusFilter === "All" ||
                (statusFilter === "Borrowing" &&
                    member.activeBooks.some(
                        (record) => record.liveStatus === "Borrowed",
                    )) ||
                (statusFilter === "Overdue" && member.status === "Overdue") ||
                (statusFilter === "Clear" && member.status === "Clear");

            return matchesSearch && matchesFilter;
        });

        // Sort by creation date (newest first) by default
        const sorted = [...visibleStudents].sort((first, second) => {
            const firstCreated = new Date(first.createdAt ?? 0).getTime();
            const secondCreated = new Date(second.createdAt ?? 0).getTime();
            return secondCreated - firstCreated;
        });

        // Apply additional sorting for overdue filter
        if (statusFilter === "Overdue") {
            return sorted.sort((first, second) => {
                if (overdueSortOrder === "low-to-high") {
                    return first.totalFine - second.totalFine;
                }
                return second.totalFine - first.totalFine;
            });
        }

        return sorted;
    }, [overdueSortOrder, search, statusFilter, studentSummaries]);

    useEffect(() => {
        const nextParams = {};
        if (statusFilter !== "All") {
            nextParams.status = statusFilter;
        }
        if (statusFilter === "Overdue") {
            nextParams.sort = overdueSortOrder;
        }
        setSearchParams(nextParams, { replace: true });
    }, [overdueSortOrder, setSearchParams, statusFilter]);

    useEffect(() => {
        if (!toast) return undefined;
        const timer = setTimeout(() => setToast(null), 2600);
        return () => clearTimeout(timer);
    }, [toast]);

    const triggerToast = (message, tone = "success") => {
        setToast({ message, tone });
    };

    const buildCsv = () => {
        const rows = [
            [
                "S.No",
                "Student Name",
                "Email",
                "Student ID",
                "Department",
                "Stream",
                "Year",
                "Semester",
                "Roll Number",
                "Student Status",
                "Total Fine",
                "Book Title",
                "Book Code",
                "Record Type",
                "Issue Date",
                "Due Date",
                "Fine Cleared",
                "Return Status",
                "Return Date",
            ],
        ];

        let serial = 1;

        filteredStudents.forEach((member) => {
            if (!member.history.length) {
                rows.push([
                    String(serial++),
                    member.name,
                    member.email,
                    member.studentId ?? "",
                    member.department ?? "",
                    member.stream ?? "",
                    member.academicYear ?? "",
                    member.semester ?? "",
                    member.rollNumber ?? "",
                    member.status,
                    String(member.totalFine),
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);
                return;
            }

            member.history.forEach((record) => {
                rows.push([
                    String(serial++),
                    member.name,
                    member.email,
                    member.studentId ?? "",
                    member.department ?? "",
                    member.stream ?? "",
                    member.academicYear ?? "",
                    member.semester ?? "",
                    member.rollNumber ?? "",
                    member.status,
                    String(member.totalFine),
                    record.title,
                    record.bookCode,
                    record.recordType,
                    record.issueLabel,
                    record.dueLabel,
                    record.fineCleared ? "Yes" : "No",
                    record.returnedOn ? "Returned" : "Pending",
                    record.returnedOnLabel ?? "",
                ]);
            });
        });

        return rows
            .map((row) =>
                row
                    .map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`)
                    .join(","),
            )
            .join("\n");
    };

    const exportCsv = () => {
        const csvContent = buildCsv();
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `student-${statusFilter.toLowerCase()}-${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleConfirm = async () => {
        if (!confirmAction) return;
        if (confirmAction.type === "clear-fine") {
            const result = await clearFineForRecord(confirmAction.payload);
            if (result?.ok) {
                triggerToast("Fine cleared successfully!");
            } else {
                triggerToast("Failed to clear fine. Please try again.", "error");
            }
        }

        if (confirmAction.type === "return-book") {
            const result = await returnIssuedRecord(confirmAction.payload);
            if (result?.ok) {
                triggerToast("Book returned successfully!");
            } else {
                triggerToast("Failed to return fine. Please try again.", "error");
            }
        }

        setConfirmAction(null);
    };
    return (
        <div className={s.pageContainer}>
            {confirmAction && (
                <div className={s.fixedModal}>
                    <p className={s.modalTitle}>{confirmAction.title}</p>
                    <p className={s.modalMessage}>{confirmAction.message}</p>
                    <div className={s.modalButtons}>
                        <button
                            type="button"
                            onClick={() => setConfirmAction(null)}
                            className={s.modalCancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className={s.modalConfirmButton}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}

            {toast && (
                <div
                    className={`${s.toastBase} ${toast.tone === "error" ? s.toastError : s.toastSuccess
                        }`}
                >
                    <div className={s.toastContent}>
                        <CheckCircle2 size={18} />
                        {toast.message}
                    </div>
                </div>
            )}

            <section className={s.statsSection}>
                <div className={s.statsGrid}>
                    {[
                        {
                            label: "Students",
                            value: `${studentSummaries.length}`,
                            icon: UsersRound,
                        },
                        {
                            label: "Overdue Accounts",
                            value: `${studentSummaries.filter((student) => student.status === "Overdue").length}`,
                            icon: ShieldCheck,
                        },
                        {
                            label: "Active Borrowers",
                            value: `${studentSummaries.filter((student) =>
                                student.activeBooks.some(
                                    (record) => record.liveStatus === "Borrowed",
                                ),
                            ).length
                                }`,
                            icon: UserRoundCog,
                        },
                        {
                            label: "Pending Fine Total",
                            value: `Rs. ${studentSummaries.reduce(
                                (sum, student) => sum + (student.totalFine ?? 0),
                                0,
                            )}`,
                            icon: CheckCircle2,
                        },
                    ].map(({ label, value, icon }) => (
                        <div key={label} className={s.statCard}>
                            <span className={s.statIconWrapper}>
                                {createElement(icon, { size: 18 })}
                            </span>
                            <p className={s.statLabel}>{label}</p>
                            <p className={s.statValue}>{value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={s.mainSection}>
                <div className={s.headerFlex}>
                    <div className="min-w-0">
                        <h1 className={s.headerTitle}>
                            Student Accounts and Issued Books
                        </h1>
                        <p className={s.headerSubtitle}>
                            Filter students by borrowing status, export the visible data to
                            CSV, clear fines after payment, and confirm returns from the
                            action cards.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={exportCsv}
                        className={s.exportButton}
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>

                <div className={s.filtersContainer}>
                    <label className={s.filterLabel}>
                        <span className={s.filterLabelSpan}>Search Students And Books</span>
                        <div className={s.searchWrapper}>
                            <Search size={16} className={s.searchIcon} />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search by student name, email, book code, or book name"
                                className={s.searchInput}
                            />
                        </div>
                    </label>

                    <label className={s.filterLabel}>
                        <span className={s.filterLabelSpan}>Student Filter</span>
                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className={s.selectInput}
                        >
                            {studentFilterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    {statusFilter === "Overdue" && (
                        <label className={s.filterLabel}>
                            <span className={s.filterLabelSpan}>Overdue Fine Sort</span>
                            <select
                                value={overdueSortOrder}
                                onChange={(event) => setOverdueSortOrder(event.target.value)}
                                className={s.selectInput}
                            >
                                {overdueSortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                </div>

                <div className={s.studentsGrid}>
                    {filteredStudents.map((member) => {
                        const isExpanded = expandedStudent === member.email;

                        return (
                            <article key={member.email} className={s.studentCard}>
                                <div className={s.studentCardHeader}>
                                    <div className="min-w-0">
                                        <p className={s.studentName}>{member.name}</p>
                                        <p className={s.studentIdEmail}>
                                            {member.studentId ?? "Not assigned"} | {member.email}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setExpandedStudent((current) =>
                                                current === member.email ? "" : member.email,
                                            )
                                        }
                                        className={s.expandButton}
                                        aria-label={isExpanded ? "Hide student details" : "Show student details"}
                                    >
                                        <Eye size={18} />
                                    </button>
                                </div>

                                <div className={s.statsRow}>
                                    <div className={s.statBlock}>
                                        <p className={s.statBlockLabel}>Role</p>
                                        <span
                                            className={`${s.badge} ${roleStyles[member.role]
                                                }`}
                                        >
                                            {roleLabels[member.role] ?? member.role}
                                        </span>
                                    </div>

                                    <div className={s.statBlock}>
                                        <p className={s.statBlockLabel}>Active Books</p>
                                        <p className={s.numericStat}>{member.borrowedCount}</p>
                                    </div>

                                    <div className={s.statBlock}>
                                        <p className={s.statBlockLabel}>Total Fine</p>
                                        <p className={s.numericStat}>Rs. {member.totalFine}</p>
                                    </div>

                                    <div className={s.statBlock}>
                                        <p className={s.statBlockLabel}>Status</p>
                                        <span
                                            className={`${s.badge} ${statusStyles[member.status]
                                                }`}
                                        >
                                            {member.status}
                                        </span>
                                    </div>

                                    <div className={s.statBlock}>
                                        <p className={s.statBlockLabel}>Fine Cleared</p>
                                        <p className={s.numericStat}>{member.fineClearedCount}</p>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className={s.expandedContainer}>
                                        <div className={s.detailsCard}>
                                            <p className={s.detailsCardLabel}>Student details</p>
                                            <div className={s.detailsGrid}>
                                                <div className={s.detailsItem}>
                                                    Department: {member.department ?? "General"}
                                                </div>
                                                <div className={s.detailsItem}>
                                                    Stream: {member.stream ?? "General"}
                                                </div>
                                                <div className={s.detailsItem}>
                                                    Year: {member.academicYear ?? "1st Year"}
                                                </div>
                                                <div className={s.detailsItem}>
                                                    Roll Number: {member.rollNumber ?? "Not assigned"}
                                                </div>
                                                <div className={s.detailsItem}>
                                                    Mobile Number: {member.phone || "Not provided"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={s.booksListContainer}>
                                            <p className={s.detailsCardLabel}>
                                                Issued books with actions
                                            </p>
                                            <div className={s.booksList}>
                                                {member.history.length ? (
                                                    member.history.map((record) => {
                                                        const isOverdue = record.liveStatus === "Overdue";
                                                        const fineAmountToShow = record.fineCleared
                                                            ? (record.clearedFineAmount ?? 0)
                                                            : record.liveFine;
                                                        const showFineHistory =
                                                            isOverdue ||
                                                            Boolean(record.fineCleared) ||
                                                            fineAmountToShow > 0;
                                                        const fineClearDisabled =
                                                            !showFineHistory ||
                                                            Boolean(record.returnedOn) ||
                                                            record.fineCleared ||
                                                            fineAmountToShow <= 0;
                                                        const returnDisabled =
                                                            Boolean(record.returnedOn) ||
                                                            (isOverdue && !record.fineCleared);

                                                        return (
                                                            <div
                                                                key={`${member.email}-${record.id}`}
                                                                className={s.bookCard}
                                                            >
                                                                <div className={s.bookHeader}>
                                                                    <div className="min-w-0">
                                                                        <p className={s.bookTitle}>
                                                                            {record.title}
                                                                        </p>
                                                                        <p className={s.bookCode}>
                                                                            {record.bookCode}
                                                                        </p>
                                                                    </div>
                                                                    <span
                                                                        className={`${s.bookStatusBadge} ${recordStatusStyles[record.liveStatus]
                                                                            }`}
                                                                    >
                                                                        {record.liveStatus}
                                                                    </span>
                                                                </div>

                                                                <div className={s.bookDetailGrid}>
                                                                    <div className={s.bookDetailItem}>
                                                                        Issue: {record.issueLabel}
                                                                    </div>
                                                                    <div className={s.bookDetailItem}>
                                                                        Due: {record.dueLabel}
                                                                    </div>
                                                                    {showFineHistory && (
                                                                        <div className={s.bookDetailItem}>
                                                                            Fine: Rs. {fineAmountToShow}
                                                                        </div>
                                                                    )}
                                                                    {showFineHistory && (
                                                                        <div className={s.bookDetailItem}>
                                                                            Fine Status:{" "}
                                                                            {record.fineCleared ? "Cleared" : "Pending"}
                                                                        </div>
                                                                    )}
                                                                    <div className={s.bookDetailItem}>
                                                                        Return:{" "}
                                                                        {record.returnedOn ? "Returned" : "Pending"}
                                                                    </div>
                                                                    <div className={s.bookDetailItem}>
                                                                        Return Date: {record.returnedOnLabel || "-"}
                                                                    </div>
                                                                </div>

                                                                <div className={s.bookActions}>
                                                                    {showFineHistory && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                setConfirmAction({
                                                                                    type: "clear-fine",
                                                                                    title: "Clear fine for this student?",
                                                                                    message:
                                                                                        "Confirming will set this record fine to Rs. 0 and disable the fine cleared button.",
                                                                                    payload: {
                                                                                        source: record.source,
                                                                                        recordId: record.id,
                                                                                        bookId: record.bookId,
                                                                                    },
                                                                                })
                                                                            }
                                                                            disabled={fineClearDisabled}
                                                                            className={s.clearFineButton}
                                                                        >
                                                                            {record.fineCleared
                                                                                ? "Fine Cleared"
                                                                                : "Clear Fine"}
                                                                        </button>
                                                                    )}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            setConfirmAction({
                                                                                type: "return-book",
                                                                                title: "Return this book?",
                                                                                message:
                                                                                    "Confirming will mark this book as returned with today's date and disable the return button.",
                                                                                payload: {
                                                                                    source: record.source,
                                                                                    recordId: record.id,
                                                                                    bookId: record.bookId,
                                                                                },
                                                                            })
                                                                        }
                                                                        disabled={returnDisabled}
                                                                        className={s.returnButton}
                                                                    >
                                                                        {record.returnedOn
                                                                            ? "Returned"
                                                                            : isOverdue
                                                                                ? "Return Book"
                                                                                : "Return Early"}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p className={s.emptyHistory}>
                                                        No issue history found.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </article>
                        );
                    })}

                    {!filteredStudents.length && (
                        <div className={s.emptyState}>
                            No students or issued books matched your filters.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default memo(AdminUsersPage);