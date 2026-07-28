import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const LibraryContext = createContext(null);

const LIBRARY_BOOKS_KEY = "library-management-books";
const LIBRARY_MANUAL_ISSUES_KEY = "library-management-manual-issues";
const LIBRARY_FINE_SETTINGS_KEY = "library-management-fine-settings";

const defaultFineSettings = {
    amount: 10,
    interval: "day",
};

const defaultBooks = [
    {
        id: 1,
        bookCode: "1001",
        title: "Engineering Mathematics I",
        category: "Mathematics",
        department: "BTech",
        stream: "B.Sc",
        year: "1st Year",
        shelf: "A-01",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 2,
        bookCode: "1002",
        title: "Data Structures Through C",
        category: "Computer Science",
        department: "BCA",
        stream: "BCA",
        year: "1st Year",
        shelf: "B-04",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 3,
        bookCode: "1003",
        title: "Digital Logic Design",
        category: "Electronics",
        department: "ECE",
        stream: "B.Tech",
        year: "1st Year",
        shelf: "C-19",
        copies: 4,
        availableCopies: 4,
        borrowings: [],
    },
    {
        id: 4,
        bookCode: "1004",
        title: "Operating System Concepts",
        category: "Computer Science",
        department: "B.Tech CSE",
        stream: "B.Tech",
        year: "2nd Year",
        shelf: "D-08",
        copies: 3,
        availableCopies: 3,
        borrowings: [],
    },
    {
        id: 5,
        bookCode: "1005",
        title: "Principles of Economics",
        category: "Commerce",
        department: "B.Com",
        stream: "B.Com",
        year: "1st Year",
        shelf: "E-11",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 6,
        bookCode: "1006",
        title: "Environmental Studies",
        category: "Core Studies",
        department: "All Departments",
        stream: "Common",
        year: "All Years",
        shelf: "F-02",
        copies: 8,
        availableCopies: 8,
        borrowings: [],
    },
    {
        id: 7,
        bookCode: "1007",
        title: "Database Management Systems",
        category: "Computer Science",
        department: "BCA",
        stream: "BCA",
        year: "1st Year",
        shelf: "B-09",
        copies: 6,
        availableCopies: 6,
        borrowings: [],
    },
    {
        id: 8,
        bookCode: "1008",
        title: "Computer Networks Fundamentals",
        category: "Computer Science",
        department: "BCA",
        stream: "BCA",
        year: "1st Year",
        shelf: "B-11",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 9,
        bookCode: "1009",
        title: "Java Programming Essentials",
        category: "Computer Science",
        department: "BCA",
        stream: "BCA",
        year: "2nd Year",
        shelf: "C-07",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 10,
        bookCode: "1010",
        title: "Microprocessors and Interfacing",
        category: "Electronics",
        department: "ECE",
        stream: "B.Tech",
        year: "1st Year",
        shelf: "C-22",
        copies: 4,
        availableCopies: 4,
        borrowings: [],
    },
    {
        id: 11,
        bookCode: "1011",
        title: "Business Statistics",
        category: "Commerce",
        department: "B.Com",
        stream: "B.Com",
        year: "1st Year",
        shelf: "E-15",
        copies: 6,
        availableCopies: 6,
        borrowings: [],
    },
    {
        id: 12,
        bookCode: "1012",
        title: "Software Engineering Essentials",
        category: "Computer Science",
        department: "BCA",
        stream: "BCA",
        year: "3rd Year",
        shelf: "B-15",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 13,
        bookCode: "1013",
        title: "Thermodynamics Fundamentals",
        category: "Mechanical",
        department: "Mechanical Engineering",
        stream: "B.Tech",
        year: "2nd Year",
        shelf: "M-03",
        copies: 4,
        availableCopies: 4,
        borrowings: [],
    },
    {
        id: 14,
        bookCode: "1014",
        title: "Structural Analysis",
        category: "Civil",
        department: "Civil Engineering",
        stream: "B.Tech",
        year: "3rd Year",
        shelf: "C-31",
        copies: 4,
        availableCopies: 4,
        borrowings: [],
    },
    {
        id: 15,
        bookCode: "1015",
        title: "Business Management Principles",
        category: "Management",
        department: "MBA",
        stream: "MBA",
        year: "1st Year",
        shelf: "G-08",
        copies: 6,
        availableCopies: 6,
        borrowings: [],
    },
    {
        id: 16,
        bookCode: "1016",
        title: "Web Technology and Applications",
        category: "Information Technology",
        department: "B.Sc IT",
        stream: "B.Sc",
        year: "2nd Year",
        shelf: "IT-06",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 17,
        bookCode: "1017",
        title: "Corporate Accounting",
        category: "Commerce",
        department: "B.Com",
        stream: "B.Com",
        year: "2nd Year",
        shelf: "E-21",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
    {
        id: 18,
        bookCode: "1018",
        title: "Genetics and Molecular Biology",
        category: "Biotechnology",
        department: "Biotechnology",
        stream: "B.Tech",
        year: "1st Year",
        shelf: "BIO-04",
        copies: 4,
        availableCopies: 4,
        borrowings: [],
    },
    {
        id: 19,
        bookCode: "1019",
        title: "Advanced Java Programming",
        category: "Computer Science",
        department: "BCA",
        stream: "BCA",
        year: "3rd Year",
        shelf: "B-18",
        copies: 5,
        availableCopies: 5,
        borrowings: [],
    },
];

const readJson = (key, fallback) => {
    const value = localStorage.getItem(key);

    if (!value) {
        return fallback;
    }

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
};

const isValidStoredBook = (book) =>
    book &&
    typeof book.id === "number" &&
    typeof book.bookCode === "string" &&
    Array.isArray(book.borrowings);

const normalizeBorrowing = (record, fineSettings) => ({
    ...record,
    fineRate: Number(record?.fineRate ?? record?.finePerDay ?? fineSettings.amount) || 0,
    fineInterval: record?.fineInterval ?? fineSettings.interval,
    manualFine: Number(record?.manualFine ?? 0) || 0,
    fineCleared: Boolean(record?.fineCleared),
    clearedFineAmount: Number(record?.clearedFineAmount ?? 0) || 0,
});

const normalizeStoredBook = (book, fineSettings) => {
    const fallback = defaultBooks.find((item) => item.id === book?.id);

    if (!fallback) {
        return {
            ...book,
            borrowings: Array.isArray(book.borrowings)
                ? book.borrowings.map((record) => normalizeBorrowing(record, fineSettings))
                : [],
        };
    }

    return {
        ...fallback,
        ...book,
        borrowings: Array.isArray(book.borrowings)
            ? book.borrowings.map((record) => normalizeBorrowing(record, fineSettings))
            : fallback.borrowings.map((record) => normalizeBorrowing(record, fineSettings)),
    };
};

const hydrateBooks = (storedBooks, fineSettings) => {
    if (!Array.isArray(storedBooks) || !storedBooks.every(isValidStoredBook)) {
        return defaultBooks.map((book) => normalizeStoredBook(book, fineSettings));
    }

    const normalizedStoredBooks = storedBooks.map((book) => normalizeStoredBook(book, fineSettings));
    const missingDefaultBooks = defaultBooks
        .filter((defaultBook) => !normalizedStoredBooks.some((book) => book.id === defaultBook.id))
        .map((book) => normalizeStoredBook(book, fineSettings));

    return [...normalizedStoredBooks, ...missingDefaultBooks];
};

const hydrateManualIssues = (storedIssues, fineSettings) => {
    if (!Array.isArray(storedIssues)) {
        return [];
    }

    return storedIssues
        .filter(
            (issue) =>
                issue &&
                typeof issue.id === "string" &&
                typeof issue.userEmail === "string" &&
                typeof issue.userName === "string" &&
                typeof issue.title === "string",
        )
        .map((issue) => normalizeBorrowing(issue, fineSettings));
};

const hydrateFineSettings = (storedSettings) => {
    if (!storedSettings || typeof storedSettings !== "object") {
        return defaultFineSettings;
    }

    return {
        amount:
            Number.isFinite(Number(storedSettings.amount)) && Number(storedSettings.amount) >= 0
                ? Number(storedSettings.amount)
                : defaultFineSettings.amount,
        interval:
            ["day", "week", "month", "year"].includes(storedSettings.interval)
                ? storedSettings.interval
                : defaultFineSettings.interval,
    };
};

const getStartOfDay = (value) => {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
};

const today = () => getStartOfDay(new Date());
const getLocalIsoDate = (value = new Date()) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const formatDate = (value) =>
    new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));

const getDiffInDays = (targetDate) => {
    const diff = getStartOfDay(targetDate).getTime() - today().getTime();
    return Math.round(diff / (1000 * 60 * 60 * 24));
};

const getActiveLoan = (book) =>
    [...book.borrowings].reverse().find((record) => !record.returnedOn) ?? null;

const getOverdueUnits = (overdueDays, interval) => {
    if (overdueDays <= 0) {
        return 0;
    }

    if (interval === "week") {
        return Math.ceil(overdueDays / 7);
    }

    if (interval === "month") {
        return Math.ceil(overdueDays / 30);
    }

    if (interval === "year") {
        return Math.ceil(overdueDays / 365);
    }

    return overdueDays;
};

const getFineAmount = (record, fineSettings) => {
    if (!record || record.fineCleared) {
        return 0;
    }

    const overdueDays = Math.max(0, getDiffInDays(record.dueDate) * -1);
    const fineRate = Number(record.fineRate ?? record.finePerDay ?? fineSettings.amount) || 0;
    const fineInterval = record.fineInterval ?? fineSettings.interval;
    const automaticFine = getOverdueUnits(overdueDays, fineInterval) * fineRate;

    return automaticFine + (Number(record.manualFine) || 0);
};

const getTimeline = (record) => {
    if (!record) {
        return "Available for issue";
    }

    const diff = getDiffInDays(record.dueDate);

    if (diff < 0) {
        return `Overdue by ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"}`;
    }

    if (diff === 0) {
        return "Due today";
    }

    return `Due in ${diff} day${diff === 1 ? "" : "s"}`;
};

const getBookView = (book, fineSettings) => {
    const activeLoan = getActiveLoan(book);
    const fineAmount = getFineAmount(activeLoan, fineSettings);
    const status = activeLoan
        ? getDiffInDays(activeLoan.dueDate) < 0
            ? "Overdue"
            : "Borrowed"
        : "Available";

    return {
        ...book,
        activeLoan,
        status,
        borrowerLabel: activeLoan ? `Issued to ${activeLoan.userName}` : "Ready for issue",
        returnDate: activeLoan ? formatDate(activeLoan.dueDate) : "Available now",
        issuedDate: activeLoan ? formatDate(activeLoan.issuedOn) : "-",
        timeline: getTimeline(activeLoan),
        fineAmount,
        fineLabel: fineAmount ? `Rs. ${fineAmount}` : "No fine",
        canReturn: Boolean(activeLoan),
    };
};

const createCatalogRecord = (book, record, fineSettings) => ({
    ...record,
    source: "catalog",
    recordType: "Catalog Book",
    bookId: book.id,
    bookCode: book.bookCode,
    title: book.title,
    author: book.author,
    category: book.category,
    department: book.department,
    stream: book.stream,
    year: book.year,
    semester: "",
    rollNumber: "",
    shelf: book.shelf,
    copies: book.copies,
    availableCopies: book.availableCopies,
    dueLabel: formatDate(record.dueDate),
    issueLabel: formatDate(record.issuedOn),
    returnedOnLabel: record.returnedOn ? formatDate(record.returnedOn) : "",
    liveStatus:
        !record.returnedOn && getDiffInDays(record.dueDate) < 0
            ? "Overdue"
            : !record.returnedOn
                ? "Borrowed"
                : "Returned",
    fineCleared: Boolean(record.fineCleared),
    liveFine: !record.returnedOn ? getFineAmount(record, fineSettings) : 0,
});

const createManualRecord = (issue, fineSettings) => ({
    ...issue,
    source: "manual",
    recordType: "Manual Entry",
    bookId: null,
    bookCode: issue.bookCode ?? "MANUAL",
    author: issue.author ?? "Manual issue entry",
    category: issue.category ?? "Manual",
    department: issue.department ?? issue.studentDepartment ?? "General",
    stream: issue.stream ?? issue.studentStream ?? "General",
    year: issue.year ?? issue.studentYear ?? "1st Year",
    semester: issue.semester ?? issue.studentSemester ?? "Semester 1",
    rollNumber: issue.rollNumber ?? issue.studentRollNumber ?? "Not assigned",
    shelf: "",
    copies: 0,
    availableCopies: 0,
    dueLabel: formatDate(issue.dueDate),
    issueLabel: formatDate(issue.issuedOn),
    returnedOnLabel: issue.returnedOn ? formatDate(issue.returnedOn) : "",
    liveStatus:
        !issue.returnedOn && getDiffInDays(issue.dueDate) < 0
            ? "Overdue"
            : !issue.returnedOn
                ? "Borrowed"
                : "Returned",
    fineCleared: Boolean(issue.fineCleared),
    liveFine: !issue.returnedOn ? getFineAmount(issue, fineSettings) : 0,
});

const API_BOOKS_URL = `${import.meta.env.VITE_API_URL}/api/books`;

const getHeaders = () => {
    const token = localStorage.getItem("library-auth-token");
    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
};

export const LibraryProvider = ({ children }) => {
    const { accounts, currentUser } = useAuth();
    const [books, setBooks] = useState(defaultBooks);
    const [manualIssues, setManualIssues] = useState([]);
    const [fineSettings, setFineSettings] = useState(defaultFineSettings);

    const fetchManualIssues = async () => {
        if (!currentUser) return;
        try {
            const isAdmin = currentUser.role === "admin";
            const issuesUrl = isAdmin ? `${API_BOOKS_URL}/issues` : `${API_BOOKS_URL}/issues/student`;
            const response = await fetch(issuesUrl, {
                headers: getHeaders(),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && Array.isArray(data.issues)) {
                    const formattedIssues = data.issues.map((issue) => ({
                        id: issue._id,
                        _id: issue._id,
                        userEmail: issue.userEmail,
                        userName: issue.userName,
                        title: issue.title,
                        bookCode: issue.bookCode,
                        issuedOn: issue.issuedOn,
                        dueDate: issue.dueDate,
                        returnedOn: issue.returnedOn,
                        finePerDay: issue.fineRate,
                        fineRate: issue.fineRate,
                        fineInterval: issue.fineInterval,
                        manualFine: issue.manualFine,
                        fineCleared: issue.fineCleared,
                        clearedFineAmount: issue.clearedFineAmount,
                        department: issue.department,
                        stream: issue.stream,
                        year: issue.year,
                        semester: issue.semester,
                        rollNumber: issue.rollNumber,
                        studentId: issue.studentId,
                        source: issue.source || "manual",
                        bookId: issue.bookId || null,
                    }));
                    setManualIssues(formattedIssues);
                }
            }
        } catch (error) {
            console.error("Error fetching manual issues from backend:", error);
        }
    };

    const fetchFineSettings = async () => {
        try {
            const response = await fetch(`${API_BOOKS_URL}/fine-settings`, {
                headers: getHeaders(),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.settings) {
                    const fetchedSettings = hydrateFineSettings(data.settings);
                    setFineSettings(fetchedSettings);
                    localStorage.setItem(LIBRARY_FINE_SETTINGS_KEY, JSON.stringify(fetchedSettings));
                }
            }
        } catch (error) {
            console.error("Error fetching fine settings from backend:", error);
        }
    };

    useEffect(() => {
        const storedFineSettings = hydrateFineSettings(
            readJson(LIBRARY_FINE_SETTINGS_KEY, defaultFineSettings),
        );
        const storedBooks = hydrateBooks(readJson(LIBRARY_BOOKS_KEY, defaultBooks), storedFineSettings);

        localStorage.setItem(LIBRARY_BOOKS_KEY, JSON.stringify(storedBooks));
        localStorage.setItem(LIBRARY_FINE_SETTINGS_KEY, JSON.stringify(storedFineSettings));
        setBooks(storedBooks);
        setFineSettings(storedFineSettings);
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchManualIssues();
            fetchFineSettings();
        } else {
            setManualIssues([]);
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem(LIBRARY_BOOKS_KEY, JSON.stringify(books));
    }, [books]);

    useEffect(() => {
        localStorage.setItem(LIBRARY_FINE_SETTINGS_KEY, JSON.stringify(fineSettings));
    }, [fineSettings]);

    const returnBook = (bookId, recordId = null) => {
        const todayIso = getLocalIsoDate();

        setBooks((currentBooks) =>
            currentBooks.map((book) => {
                if (book.id !== bookId) {
                    return book;
                }

                const activeLoan =
                    book.borrowings.find((record) => record.id === recordId && !record.returnedOn) ??
                    getActiveLoan(book);

                if (!activeLoan) {
                    return book;
                }

                return {
                    ...book,
                    availableCopies: Math.min(book.copies, (book.availableCopies ?? 0) + 1),
                    borrowings: book.borrowings.map((record) =>
                        record.id === activeLoan.id ? { ...record, returnedOn: todayIso } : record,
                    ),
                };
            }),
        );
    };

    const applyManualFine = (bookId, amount, recordId = null) => {
        const normalizedAmount = Number(amount);
        const nextAmount = Number.isNaN(normalizedAmount) ? 0 : normalizedAmount;

        setBooks((currentBooks) =>
            currentBooks.map((book) => {
                if (book.id !== bookId) {
                    return book;
                }

                const targetRecordId = recordId ?? getActiveLoan(book)?.id;

                if (!targetRecordId) {
                    return book;
                }

                return {
                    ...book,
                    borrowings: book.borrowings.map((record) =>
                        record.id === targetRecordId
                            ? { ...record, manualFine: nextAmount, fineCleared: nextAmount > 0 ? false : record.fineCleared }
                            : record,
                    ),
                };
            }),
        );
    };

    const issueBookToStudent = ({ bookId, userEmail, dueDate }) => {
        const issueDate = getLocalIsoDate();
        const account = accounts.find((item) => item.email === userEmail);

        if (!account || !dueDate) {
            return { ok: false };
        }

        let didIssue = false;

        setBooks((currentBooks) =>
            currentBooks.map((book) => {
                if (book.id !== bookId || book.availableCopies <= 0) {
                    return book;
                }

                didIssue = true;

                return {
                    ...book,
                    availableCopies: Math.max(0, book.availableCopies - 1),
                    borrowings: [
                        ...book.borrowings,
                        {
                            id: `loan-${book.bookCode}-${Date.now()}`,
                            userEmail: account.email,
                            userName: account.name,
                            issuedOn: issueDate,
                            dueDate,
                            returnedOn: null,
                            finePerDay: fineSettings.amount,
                            fineRate: fineSettings.amount,
                            fineInterval: fineSettings.interval,
                            manualFine: 0,
                            fineCleared: false,
                        },
                    ],
                };
            }),
        );

        return { ok: didIssue };
    };

    const issueManualBooksToStudent = async ({ userEmail, studentDetails, books: manualBooks }) => {
        try {
            const response = await fetch(`${API_BOOKS_URL}/issue-manual`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({
                    userEmail,
                    studentDetails,
                    books: manualBooks,
                    fineRate: fineSettings.amount,
                    fineInterval: fineSettings.interval,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                await fetchManualIssues();
                return { ok: true, count: data.count };
            }
            return { ok: false, error: data.message || "Failed to issue manual books." };
        } catch (error) {
            console.error("Error issuing manual books on backend:", error);
            return { ok: false, error: "Network error issuing manual books." };
        }
    };

    const returnIssuedRecord = async ({ source, recordId, bookId = null }) => {
        // Optimistically update the UI immediately
        const todayIso = getLocalIsoDate();

        // Update manual issues state immediately
        setManualIssues((currentIssues) =>
            currentIssues.map((issue) =>
                issue.id === recordId || issue._id === recordId
                    ? { ...issue, returnedOn: todayIso }
                    : issue,
            ),
        );

        // Update catalog books if applicable
        if (source === "catalog" && bookId) {
            returnBook(bookId, recordId);
        }

        // Make the API call in the background
        try {
            const response = await fetch(`${API_BOOKS_URL}/issues/${recordId}/return`, {
                method: "PUT",
                headers: getHeaders(),
            });

            if (response.ok) {
                // API call succeeded, data is already optimistically updated
                return { ok: true };
            } else {
                // API call failed, revert the optimistic update
                await fetchManualIssues();
                return { ok: false };
            }
        } catch (error) {
            console.error("Error returning book on backend:", error);
            // Network error, revert the optimistic update
            await fetchManualIssues();
            return { ok: false };
        }
    };

    const applyFineToRecord = async ({ source, recordId, bookId = null, amount }) => {
        const normalizedAmount = Number(amount);
        const fineAmount = Number.isNaN(normalizedAmount) ? 0 : normalizedAmount;

        try {
            const response = await fetch(`${API_BOOKS_URL}/issues/${recordId}/fine`, {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify({ amount: fineAmount }),
            });

            if (response.ok) {
                if (source === "catalog" && bookId) {
                    applyManualFine(bookId, fineAmount, recordId);
                }
                await fetchManualIssues();
                return { ok: true };
            }
        } catch (error) {
            console.error("Error applying manual fine on backend:", error);
        }
    };

    const clearFineForRecord = async ({ source, recordId, bookId = null }) => {
        // Optimistically update the UI immediately
        const fineAmount = 0;

        // Update manual issues state immediately
        setManualIssues((currentIssues) =>
            currentIssues.map((issue) =>
                issue.id === recordId || issue._id === recordId
                    ? {
                        ...issue,
                        manualFine: fineAmount,
                        fineCleared: true,
                        clearedFineAmount: getFineAmount(issue, fineSettings),
                    }
                    : issue,
            ),
        );

        // Update catalog books if applicable
        if (source === "catalog" && bookId) {
            setBooks((currentBooks) =>
                currentBooks.map((book) => {
                    if (book.id !== bookId) {
                        return book;
                    }

                    return {
                        ...book,
                        borrowings: book.borrowings.map((record) =>
                            record.id === recordId
                                ? {
                                    ...record,
                                    manualFine: fineAmount,
                                    fineCleared: true,
                                    clearedFineAmount: getFineAmount(record, fineSettings),
                                }
                                : record,
                        ),
                    };
                }),
            );
        }

        // Make the API call in the background
        try {
            const response = await fetch(`${API_BOOKS_URL}/issues/${recordId}/clear-fine`, {
                method: "PUT",
                headers: getHeaders(),
            });

            if (response.ok) {
                // API call succeeded, data is already optimistically updated
                return { ok: true };
            } else {
                // API call failed, revert the optimistic update
                await fetchManualIssues();
                return { ok: false };
            }
        } catch (error) {
            console.error("Error clearing manual fine on backend:", error);
            // Network error, revert the optimistic update
            await fetchManualIssues();
            return { ok: false };
        }
    };

    const saveFineSettings = async ({ amount, interval }) => {
        const updatedSettings = hydrateFineSettings({ amount, interval });
        setFineSettings(updatedSettings);
        localStorage.setItem(LIBRARY_FINE_SETTINGS_KEY, JSON.stringify(updatedSettings));

        try {
            const response = await fetch(`${API_BOOKS_URL}/fine-settings`, {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify({ amount, interval }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.settings) {
                    setFineSettings(hydrateFineSettings(data.settings));
                }
            }
        } catch (error) {
            console.error("Error saving fine settings to backend:", error);
        }
    };

    const bookViews = books.map((book) => getBookView(book, fineSettings));
    const activeBooks = bookViews.filter((book) => book.activeLoan);
    const overdueBooks = activeBooks.filter((book) => book.status === "Overdue");

    const studentAccounts = accounts.filter((account) => account.role === "user");

    const allRecords = manualIssues.map((issue) => createManualRecord(issue, fineSettings));

    const studentSummaries = studentAccounts.map((account) => {
        const records = allRecords
            .filter((record) => record.userEmail === account.email)
            .sort((a, b) => new Date(b.issuedOn).getTime() - new Date(a.issuedOn).getTime());

        const activeRecords = records.filter((record) => !record.returnedOn);
        const overdueRecords = activeRecords.filter((record) => record.liveStatus === "Overdue");

        return {
            ...account,
            borrowedCount: activeRecords.length,
            totalIssued: records.length,
            totalFine: activeRecords.reduce((sum, record) => sum + record.liveFine, 0),
            totalClearedFine: records.reduce(
                (sum, record) => sum + (Number(record.clearedFineAmount ?? 0) || 0),
                0,
            ),
            fineClearedCount: activeRecords.filter((record) => record.fineCleared).length,
            status: overdueRecords.length ? "Overdue" : activeRecords.length ? "Borrowing" : "Clear",
            activeBooks: activeRecords,
            history: records,
        };
    });

    const currentUserSummary = currentUser
        ? studentSummaries.find((student) => student.email === currentUser.email) ?? (() => {
            const records = allRecords
                .filter((record) => record.userEmail === currentUser.email)
                .sort((a, b) => new Date(b.issuedOn).getTime() - new Date(a.issuedOn).getTime());

            const activeRecords = records.filter((record) => !record.returnedOn);
            const overdueRecords = activeRecords.filter((record) => record.liveStatus === "Overdue");

            return {
                ...currentUser,
                borrowedCount: activeRecords.length,
                totalIssued: records.length,
                totalFine: activeRecords.reduce((sum, record) => sum + record.liveFine, 0),
                totalClearedFine: records.reduce(
                    (sum, record) => sum + (Number(record.clearedFineAmount ?? 0) || 0),
                    0,
                ),
                fineClearedCount: activeRecords.filter((record) => record.fineCleared).length,
                status: overdueRecords.length ? "Overdue" : activeRecords.length ? "Borrowing" : "Clear",
                activeBooks: activeRecords,
                history: records,
            };
        })()
        : null;

    const currentUserHistory = currentUserSummary?.history ?? [];
    const totalClearedFine = studentSummaries.reduce(
        (sum, student) => sum + (student.totalClearedFine ?? 0),
        0,
    );

    const activeRecords = allRecords.filter((record) => !record.returnedOn);
    const overdueRecords = allRecords.filter((record) => record.liveStatus === "Overdue");

    const adminStats = [
        {
            label: "Total Issued",
            value: `${allRecords.length}`,
            note: "All manual book issue records",
        },
        {
            label: "Currently Borrowed",
            value: `${activeRecords.length}`,
            note: "Books currently out with students",
        },
        {
            label: "Overdue Books",
            value: `${overdueRecords.length}`,
            note: "Status changes automatically after due date",
        },
        {
            label: "Cleared Fine",
            value: `Rs. ${totalClearedFine}`,
            note: "Fine amount already cleared by students",
        },
    ];

    const value = {
        books: bookViews,
        adminStats,
        studentSummaries,
        currentUserSummary,
        currentUserHistory,
        fineSettings,
        returnIssuedRecord,
        applyFineToRecord,
        clearFineForRecord,
        issueBookToStudent,
        issueManualBooksToStudent,
        saveFineSettings,
    };

    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);

    if (!context) {
        throw new Error("useLibrary must be used inside LibraryProvider");
    }

    return context;
};