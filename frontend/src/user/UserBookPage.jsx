import { memo, useMemo, useState } from 'react';
import { userBooksPageStyles as s } from '../assets/dummyStyles';
import { Search } from 'lucide-react';
import { useAuth } from '../shared/AuthContext';
import { useLibrary } from '../shared/LibraryContext';
import UserBookCard from './UserBookCard';

const UserBookPage = () => {

    const { currentUser } = useAuth();
    const { currentUserHistory } = useLibrary();
    const [filter, setFilter] = useState({
        search: "",
        status: "All",
    });

    const filteredIssuedBooks = useMemo(() => {
        return currentUserHistory.filter((record) => {
            const term = filters.search.toLowerCase();
            const matchesSearch =
                !filters.search ||
                record.title.toLowerCase().includes(term) ||
                record.author.toLowerCase().includes(term) ||
                record.bookCode.toLowerCase().includes(term) ||
                currentUser?.name?.toLowerCase().includes(term);

            const matchesStatus =
                filters.status === "All" || record.liveStatus === filters.status;

            return matchesSearch && matchesStatus;
        });
    }, [currentUser?.name, currentUserHistory, filter]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter((current) => ({
            ...current,
            [name]: value,
        }));
    };

    return (
        <div className={s.pageContainer}>
            <section className={s.heroSection}>
                <div className={s.heroFlex}>
                    <div>
                        <span className={s.heroBadge}>Student books page</span>
                        <h1 className={s.heroTitle}>
                            Book cards with richer content and cleaner grouped details.
                        </h1>
                        <p className={s.heroText}>
                            Each card now uses a clearer top summary, status badge, context chips, and a better medium-card layout so the details feel more structured and elegant.
                        </p>
                    </div>
                </div>
            </section>

            <section className={s.mainSection}>
                <div className={s.sectionHeader}>
                    <div>
                        <h2 className={s.sectionTitle}>My Issued Books</h2>
                        <p className={s.sectionSubtitle}>
                            Medium-size cards now seperate the headline details from the supporting record data.
                        </p>
                    </div>
                </div>

                <div className={s.filtersContainer}>
                    <label className={s.filterLabel}>
                        <span className={s.filterLabelSpan}>Search My Books</span>
                        <div className={s.searchWrapper}>
                            <Search size={16} className={s.searchIcon} />
                            <input type="text" name="search" value={filter.search}
                                onChange={handleFilterChange} placeholder='Search by book name, code, borrower, or author' className={s.searchInput} />
                        </div>
                    </label>
                    <label className={s.filterLabel}>
                        <span className={s.filterLabelSpan}>Status</span>
                        <select name='status' value={filter.status} onChange={handleFilterChange} className={s.selectInput}>
                            <option value="All">All Status</option>
                            <option value="Borrowed">Borrowed</option>
                            <option value="Overdue">Overdue</option>
                            <option value="Returned">Returned</option>
                        </select>
                    </label>
                </div>

                <div className={s.booksGrid}>
                    {filteredIssuedBooks.length ? (
                        filteredIssuedBooks.map((record) => (
                            <UserBookCard key={record.id} record={record} borrowerName={currentUser?.name ?? "Student"} />
                        ))
                    ): (
                        <div className={s.emptyState}>
                            No issued books matched your search
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default memo(UserBookPage);