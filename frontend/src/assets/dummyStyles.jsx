// assets/dummyStyles.js

export const adminBooksPageStyles = {
  // top‑level containers
  pageContainer: "space-y-8",
  mainSection: "rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[30px] sm:p-6",
  innerContainer: "rounded-[22px] border border-library-ink/10 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-library-paper)_90%,white),color-mix(in_srgb,white_96%,transparent))] p-4 shadow-[0_20px_42px_rgba(20,35,29,0.08)] sm:rounded-[26px] sm:p-5",
  headerFlex: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
  title: "font-display text-2xl font-semibold text-library-ink sm:text-3xl",
  subtitle: "mt-1 text-sm text-library-ink/65",
  fineRuleBadge: "w-full rounded-2xl border border-library-ink/10 bg-white/80 px-4 py-2 text-sm text-library-ink/62 sm:w-auto sm:rounded-full",
  form: "mt-5 space-y-5",
  formGrid: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",

  // form labels & inputs
  label: "block",
  labelSpan: "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  searchInputWrapper: "flex items-center gap-2 rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3",
  searchIcon: "text-library-ink/55",
  readonlyInput: "w-full bg-transparent text-library-ink/80 outline-none",
  textInput: "w-full rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3 outline-none",

  // matching students section
  matchingContainer: "rounded-3xl border border-library-ink/10 bg-white/80 p-4",
  matchingTitle: "text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  studentList: "mt-3 flex flex-wrap gap-2",
  searchingMessage: "rounded-full border border-library-ink/10 bg-library-paper/80 px-4 py-2 text-sm text-library-ink/65",
  studentButtonBase: "rounded-full border px-4 py-2 text-sm font-semibold transition",
  studentButtonSelected: "border-library-panel bg-library-panel text-library-paper",
  studentButtonUnselected: "border-library-ink/10 bg-library-paper/80 text-library-ink hover:bg-library-paper",
  studentRollSpan: "ml-2 text-library-ink/60",
  noMatchText: "text-sm text-library-ink/60",
  errorText: "mt-2 text-sm text-library-red-600",
  selectedStudentContainer: "mt-4 flex items-center gap-3",
  selectedStudentBadge: "rounded-full bg-library-paper/90 px-3 py-2 text-sm font-semibold text-library-ink/80",
  clearButton: "rounded-full border border-library-ink/10 bg-white/80 px-3 py-2 text-sm text-library-ink transition hover:bg-library-paper",

  // books section
  booksSection: "space-y-4",
  booksHeader: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  booksTitle: "font-display text-xl font-semibold text-library-ink sm:text-2xl",
  addBookButton: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-library-panel px-4 py-2 text-sm font-semibold text-library-paper sm:w-auto",
  booksGrid: "grid gap-4 xl:grid-cols-2",
  bookCard: "rounded-3xl border border-library-ink/10 bg-white/86 p-4 shadow-[0_16px_36px_rgba(20,35,29,0.08)]",
  bookCardHeader: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  bookIndexWrapper: "min-w-0",
  bookIndexLabel: "text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  bookIndexHelper: "mt-1 text-sm text-library-ink/62",
  deleteButton: "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-library-ink/10 text-library-ink/55",
  bookFieldsGrid: "grid gap-3",
  bookFieldLabel: "block",
  bookFieldInput: "w-full rounded-2xl border border-library-ink/10 bg-library-paper/80 px-4 py-3 outline-none",
  dateGrid: "grid gap-3 sm:grid-cols-2",
  dateInputDisabled: "w-full rounded-2xl border border-library-ink/10 bg-library-ink/6 px-4 py-3 text-library-ink/65 outline-none",
  dateInput: "w-full rounded-2xl border border-library-ink/10 bg-library-paper/80 px-4 py-3 outline-none",

  // messages & submit
  formMessage: "rounded-2xl border border-library-ink/10 bg-library-paper px-4 py-3 text-sm text-library-ink/72",
  submitButton: "rounded-2xl bg-library-panel px-5 py-3 text-sm font-semibold text-library-paper",
};

// assets/dummyStyles.js
// assets/dummyStyles.js

export const adminDashboardStyles = {
  // Outer container
  container: "space-y-8",

  // Hero section
  heroSection:
    "rounded-[26px] border border-white/65 bg-library-panel p-5 text-library-paper shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[30px] sm:p-6 lg:rounded-[34px] lg:p-8",
  heroInner: "grid gap-6 xl:grid-cols-[1.25fr_0.95fr] xl:items-end",
  badge: "inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-library-paper/85 sm:px-4 sm:text-xs sm:tracking-[0.3em]",
  heading:
    "mt-5 font-display text-4xl font-semibold leading-tight text-library-gold-soft sm:text-5xl sm:leading-none lg:text-6xl",
  heroParagraph: "mt-4 max-w-2xl text-sm leading-7 text-library-paper/72",

  // Stats grid
  statsGrid: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
  statCard:
    "rounded-[28px] border border-white/70 bg-white/72 p-5 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px]",
  statIcon:
    "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-library-panel text-library-paper",
  statLabel: "mt-5 text-sm font-medium text-library-ink/62",
  statValue:
    "[font-family:var(--font-numeric)] mt-2 text-3xl font-semibold text-library-ink tabular-nums sm:text-4xl",
  statNote: "mt-2 text-sm text-library-ink/55",

  // Overdue section
  overdueSection:
    "rounded-[26px] border border-white/70 bg-white/74 p-5 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[30px] sm:p-6",
  overdueHeader: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
  overdueTitle: "font-display text-2xl font-semibold text-library-ink sm:text-3xl",
  overdueSubtitle: "mt-1 text-sm text-library-ink/60",
  alertIcon: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-900",

  overdueGrid: "mt-6 grid gap-4 xl:grid-cols-2",
  overdueCard: "rounded-3xl border border-library-ink/10 bg-library-paper/70 p-4",
  mostFineBadge:
    "inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-rose-900",
  overdueCardInner: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
  studentName: "text-lg font-semibold text-library-ink",
  studentDetails: "mt-1 text-sm text-library-ink/60",
  studentFine: "mt-2 font-display text-3xl font-semibold text-library-ink",
  highestFineBookContainer: "rounded-2xl bg-white/80 px-4 py-3 text-left sm:text-right",
  highestFineLabel: "text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  highestFineTitle: "mt-2 text-lg font-semibold text-library-ink",
  detailsGrid: "mt-4 grid gap-3 md:grid-cols-3",
  detailItem: "rounded-2xl bg-white/80 px-4 py-3 text-sm text-library-ink/72",
  emptyState:
    "rounded-3xl border border-library-ink/10 bg-library-paper/70 px-5 py-8 text-center text-library-ink/65 xl:col-span-2",
  viewMoreContainer: "mt-6 flex justify-end",
  viewMoreLink:
    "inline-flex items-center gap-2 rounded-2xl bg-library-paper/70 px-4 py-3 text-sm font-semibold transition hover:opacity-90",
};


// assets/dummyStyles.js

export const adminFinesPageStyles = {
  // top-level container
  pageContainer: "space-y-6",

  // toast notification
  toastWrapper: "fixed left-4 right-4 top-4 z-80 rounded-[22px] border border-emerald-200 bg-white px-4 py-4 text-sm font-semibold text-emerald-900 shadow-2xl transition-all duration-300 sm:left-auto sm:right-5 sm:top-5 sm:px-5",
  toastContent: "flex items-center gap-3",

  // main section
  mainSection: "rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[30px] sm:p-6",
  headerFlex: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  title: "font-display text-3xl font-semibold text-library-ink sm:text-4xl",
  subtitle: "mt-2 max-w-3xl text-sm leading-7 text-library-ink/65",
  editButton: "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-library-ink/10 bg-white text-library-panel",

  // form container
  formContainer: "mt-6 grid gap-4 rounded-3xl border border-library-ink/10 bg-library-paper/70 p-4 sm:p-5 lg:grid-cols-[0.8fr_1fr_auto]",
  label: "block",
  labelSpan: "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  input: "w-full rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3 outline-none",
  select: "w-full rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3 outline-none",
  submitButton: "mt-auto w-full rounded-2xl bg-library-panel px-5 py-3 text-sm font-semibold text-library-paper lg:w-auto",
  readOnlyDisplay: "mt-auto rounded-2xl border border-library-ink/10 bg-white/85 px-5 py-3 text-sm font-semibold text-library-ink/60",
};

// assets/dummyStyles.js

export const adminUsersPageStyles = {
  // top-level containers
  pageContainer: "space-y-5 sm:space-y-8",

  // confirmation modal / toast common
  fixedModal: "fixed left-4 right-4 top-4 z-90 w-auto max-w-sm rounded-3xl border border-library-ink/10 bg-white px-4 py-4 shadow-2xl transition-all duration-300 sm:left-auto sm:right-5 sm:top-5 sm:w-full sm:px-5",
  modalTitle: "text-sm font-semibold text-library-ink",
  modalMessage: "mt-2 text-sm text-library-ink/65",
  modalButtons: "mt-4 flex flex-col gap-3 sm:flex-row",
  modalCancelButton: "flex-1 rounded-2xl border border-library-ink/10 bg-white px-4 py-2 text-sm font-semibold text-library-ink",
  modalConfirmButton: "flex-1 rounded-2xl bg-library-panel px-4 py-2 text-sm font-semibold text-library-paper",

  // toast notification
  toastBase: "fixed left-4 right-4 top-4 z-80 rounded-[22px] border bg-white px-4 py-4 text-sm font-semibold shadow-2xl transition-all duration-300 sm:left-auto sm:right-5 sm:top-5 sm:px-5",
  toastSuccess: "border-emerald-200 text-emerald-900",
  toastError: "border-rose-200 text-rose-900",
  toastContent: "flex items-center gap-3",

  // stats section
  statsSection: "rounded-[22px] border border-white/65 bg-[linear-gradient(rgba(20,35,29,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,35,29,0.03)_1px,transparent_1px)] bg-library-paper/80 p-4 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] [background-size:28px_28px] sm:rounded-[32px] sm:p-6 lg:rounded-4xl lg:p-7",
  statsGrid: "grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4",
  statCard: "min-w-0 rounded-[22px] border border-library-ink/10 bg-white/80 p-4 sm:rounded-3xl sm:p-5",
  statIconWrapper: "inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-library-panel text-library-paper",
  statLabel: "mt-4 text-sm text-library-ink/62",
  statValue: "[font-family:var(--font-numeric)] mt-2 break-words text-2xl font-semibold text-library-ink tabular-nums sm:text-3xl",

  // main section (list)
  mainSection: "rounded-[22px] border border-white/70 bg-white/75 p-4 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[30px] sm:p-6",
  headerFlex: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
  headerTitle: "font-display text-2xl font-semibold leading-tight text-library-ink sm:text-4xl",
  headerSubtitle: "mt-2 text-sm leading-7 text-library-ink/65",
  exportButton: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-library-panel px-4 py-3 text-sm font-semibold text-library-paper sm:w-fit",

  // filters container
  filtersContainer: "mt-5 grid gap-4 rounded-[22px] border border-library-ink/10 bg-library-paper/70 p-3 sm:rounded-3xl sm:p-4 lg:grid-cols-3",
  filterLabel: "block",
  filterLabelSpan: "mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-library-ink/45 sm:tracking-[0.2em]",
  searchWrapper: "flex items-center gap-2 rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3",
  searchIcon: "text-library-ink/55",
  searchInput: "min-w-0 w-full bg-transparent text-sm outline-none",
  selectInput: "w-full rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3 outline-none",

  // student cards
  studentsGrid: "mt-5 grid gap-4 sm:mt-6 xl:grid-cols-1",
  studentCard: "min-w-0 rounded-[22px] border border-library-ink/10 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-library-paper)_90%,white),color-mix(in_srgb,white_96%,transparent))] p-4 shadow-[0_18px_40px_rgba(20,35,29,0.08)] sm:rounded-[26px] sm:p-5",
  studentCardHeader: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  studentName: "[overflow-wrap:anywhere] break-words text-lg font-semibold text-library-ink",
  studentIdEmail: "[overflow-wrap:anywhere] break-words mt-1 text-sm text-library-ink/60",
  expandButton: "inline-flex h-11 w-full shrink-0 items-center justify-center rounded-2xl border border-library-ink/10 bg-white/80 text-library-panel sm:w-11",

  // student stats row (5 columns)
  statsRow: "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5",
  statBlock: "rounded-[20px] bg-white/80 px-4 py-4",
  statBlockLabel: "break-words text-xs font-bold uppercase tracking-[0.12em] text-library-ink/45 sm:tracking-[0.2em]",
  badge: "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold",
  numericStat: "[font-family:var(--font-numeric)] mt-3 text-sm font-semibold text-library-ink tabular-nums",

  // expanded details
  expandedContainer: "mt-5 grid gap-4 xl:grid-cols-2",
  detailsCard: "min-w-0 rounded-[22px] border border-library-ink/10 bg-white/82 p-4",
  detailsCardLabel: "break-words text-xs font-bold uppercase tracking-[0.12em] text-library-ink/45 sm:tracking-[0.2em]",
  detailsGrid: "mt-3 grid gap-2 text-sm text-library-ink/72",
  detailsItem: "[overflow-wrap:anywhere] rounded-2xl bg-library-paper/80 px-3 py-3",

  // books list inside expanded
  booksListContainer: "min-w-0 rounded-[22px] border border-library-ink/10 bg-white/82 p-4",
  booksList: "mt-3 space-y-3",
  bookCard: "min-w-0 rounded-[18px] bg-library-paper/82 p-3",
  bookHeader: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
  bookTitle: "[overflow-wrap:anywhere] break-words font-semibold text-library-ink",
  bookCode: "[overflow-wrap:anywhere] break-words mt-1 text-sm text-library-ink/62",
  bookStatusBadge: "inline-flex w-fit self-start rounded-full px-3 py-1 text-xs font-bold",
  bookDetailGrid: "mt-3 grid gap-2 text-sm sm:grid-cols-2",
  bookDetailItem: "[overflow-wrap:anywhere] rounded-2xl bg-white/85 px-3 py-2",
  bookActions: "mt-3 flex flex-col gap-2 sm:flex-row",
  clearFineButton: "w-full rounded-xl bg-library-panel px-3 py-2 text-xs font-semibold text-library-paper disabled:cursor-not-allowed disabled:bg-library-ink/30 sm:w-auto",
  returnButton: "w-full rounded-xl bg-library-success px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-library-ink/30 sm:w-auto",
  emptyHistory: "text-sm text-library-ink/60",

  // empty state
  emptyState: "rounded-3xl border border-library-ink/10 bg-library-paper/65 px-5 py-8 text-center text-library-ink/65 xl:col-span-2",
};

// assets/dummyStyles.js

export const adminLayoutStyles = {
  // outer container
  layoutContainer: "relative min-h-screen",

  // main content area
  mainContent: "min-h-screen px-4 pb-8 pt-20 md:ml-72.5 md:px-8 md:pt-8",

  // inner container for max width
  innerContainer: "mx-auto max-w-7xl",
};

// assets/dummyStyles.js

export const sidebarStyles = {
  // mobile menu button
  mobileMenuButton: "fixed left-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-library-panel text-library-paper shadow-lg md:hidden",

  // mobile overlay
  mobileOverlay: "fixed inset-0 z-40 bg-library-ink/40 transition md:hidden",
  mobileOverlayOpen: "opacity-100",
  mobileOverlayClosed: "pointer-events-none opacity-0",

  // sidebar container
  sidebar: "fixed left-0 top-0 z-50 flex h-full w-[min(18.5rem,calc(100vw-1rem))] max-w-full flex-col border-r border-white/10 bg-library-panel text-library-paper transition-transform duration-300 md:w-72.5 md:translate-x-0",
  sidebarOpen: "translate-x-0",
  sidebarClosed: "-translate-x-full",

  // header section
  sidebarHeader: "flex items-start justify-between border-b border-white/10 px-6 pb-5 pt-6",
  logoWrapper: "mb-3 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/10 text-library-gold",
  logoImage: "h-12 w-12 object-cover",
  title: "wrap-anywhere font-display text-2xl font-semibold tracking-wide sm:text-3xl",
  subtitle: "wrap-break-word mt-1 text-sm text-library-paper/70",
  badgeBase: "mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1",
  badgeAdmin: "bg-amber-100 text-amber-900 ring-amber-300/80",
  badgeUser: "bg-emerald-100 text-emerald-900 ring-emerald-300/80",
  closeButton: "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-library-paper/80 md:hidden",

  // navigation
  nav: "flex-1 space-y-2 overflow-y-auto px-4 py-6",
  navLink: "group flex items-center gap-3 rounded-2xl px-4 py-3 transition",
  navLinkActive: "bg-white text-library-ink shadow-lg",
  navLinkInactive: "text-library-paper/85 hover:bg-white/10 hover:text-white",
  navIconWrapper: "inline-flex h-10 w-10 items-center justify-center rounded-xl",
  navIconWrapperActive: "bg-library-paper text-library-panel",
  navIconWrapperInactive: "bg-white/10",
  navLabel: "wrap-anywhere block text-sm font-semibold",
  navDescription: "wrap-anywhere block text-xs",
  navDescriptionActive: "text-library-ink/60",
  navDescriptionInactive: "text-library-paper/60",
  navChevron: "transition",
  navChevronActive: "text-library-ink/60",
  navChevronInactive: "text-library-paper/55",

  // footer
  footer: "space-y-3 border-t border-white/10 px-4 py-5",
  footerButton: "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
  footerButtonPrimary: "bg-library-gold text-library-ink hover:bg-library-gold-soft",
  footerButtonSecondary: "border border-white/15 bg-white/5 text-library-paper hover:bg-white/10",
  footerLink: "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
  footerLinkPrimary: "bg-library-gold text-library-ink hover:bg-library-gold-soft",
  footerLinkSecondary: "border border-white/15 bg-white/5 text-library-paper hover:bg-white/10",
  footerIconWrapper: "inline-flex items-center gap-3",
};

// assets/dummyStyles.js

export const loginStyles = {
  // outer container
  pageContainer: "relative flex min-h-screen items-center justify-center px-4 py-6 sm:py-10",

  // main card grid
  mainCard: "grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/60 bg-library-paper/85 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[36px] lg:grid-cols-[1fr_0.95fr]",

  // left panel (info)
  infoPanel: "bg-library-panel p-5 text-library-paper sm:p-8 lg:p-10",
  roleBadge: "inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-library-paper/85 sm:px-4 sm:text-xs sm:tracking-[0.28em]",
  infoTitle: "mt-6 font-display text-4xl font-semibold leading-tight text-library-gold-soft sm:text-5xl sm:leading-none lg:text-6xl",
  infoDescription: "mt-4 max-w-xl text-sm leading-7 text-library-paper/72",
  infoBoxesContainer: "mt-10 grid gap-4",
  infoBox: "rounded-3xl border border-white/10 bg-white/7 p-5",
  infoBoxTitle: "inline-flex items-center gap-2 text-sm font-semibold text-white",
  infoBoxText: "mt-2 text-sm leading-6 text-library-paper/70",

  // right panel (form)
  formPanel: "p-5 sm:p-8 lg:p-10",
  formInner: "mx-auto max-w-md",
  backLink: "text-sm font-semibold text-library-ink/62",
  formTitle: "mt-4 font-display text-4xl font-semibold text-library-ink sm:text-5xl",
  formSubtitle: "mt-2 text-sm text-library-ink/65",

  // role selection
  roleContainer: "rounded-3xl border border-library-ink/10 bg-white/70 p-4",
  roleLabel: "text-sm font-semibold text-library-ink",
  roleGrid: "mt-3 grid gap-3 sm:grid-cols-2",
  roleOption: "rounded-[20px] border px-4 py-4 transition",
  roleOptionSelected: "border-library-panel bg-library-panel text-library-paper",
  roleOptionUnselected: "border-library-ink/10 bg-library-paper/70 text-library-ink",
  roleRadio: "sr-only",
  roleIconLabel: "inline-flex items-center gap-2 text-sm font-semibold",

  // form fields
  form: "mt-8 space-y-4",
  fieldLabel: "mb-2 inline-flex items-center gap-2 text-sm font-semibold text-library-ink/72",
  input: "w-full rounded-2xl border border-library-ink/10 bg-white/75 px-4 py-3 outline-none transition focus:border-library-panel",
  passwordWrapper: "flex items-center rounded-2xl border border-library-ink/10 bg-white/75 px-4 py-3 transition focus-within:border-library-panel",
  passwordInput: "w-full bg-transparent outline-none",
  togglePasswordButton: "inline-flex h-9 w-9 items-center justify-center rounded-xl text-library-ink/60 transition hover:bg-library-paper",

  // error message
  errorMessage: "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800",

  // footer links
  footerFlex: "flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between",
  footerText: "text-library-ink/58",
  signupLink: "font-semibold text-library-panel",

  // submit button
  submitButton: "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-library-panel px-5 py-3 text-sm font-semibold text-library-paper transition hover:bg-library-panel-soft disabled:opacity-75 disabled:cursor-not-allowed",
};

// assets/dummyStyles.js

export const signupStyles = {
  // outer container
  pageContainer: "relative flex min-h-screen items-center justify-center px-4 py-6 sm:py-10",

  // toast notification
  toastBase: "fixed left-4 right-4 top-4 z-80 rounded-[22px] border px-4 py-4 text-sm font-semibold shadow-2xl transition-all duration-300 sm:left-auto sm:right-5 sm:top-5 sm:px-5",
  toastError: "border-rose-200 bg-white text-rose-900",
  toastSuccess: "border-emerald-200 bg-white text-emerald-900",
  toastContent: "flex items-center gap-3",

  // main card grid
  mainCard: "grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/60 bg-library-paper/85 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[36px] lg:grid-cols-[0.96fr_1fr]",

  // left panel (form)
  formPanel: "p-5 sm:p-8 lg:p-10",
  formInner: "mx-auto max-w-md",
  backLink: "text-sm font-semibold text-library-ink/62",
  panelTitle: "mt-4 font-display text-4xl font-semibold text-library-ink sm:text-5xl",
  panelSubtitle: "mt-3 text-sm leading-7 text-library-ink/68",

  // step indicators
  stepGrid: "mt-8 grid gap-3 sm:grid-cols-3",
  stepCard: "rounded-[20px] border px-4 py-4",
  stepCardCompleted: "border-library-panel bg-library-panel text-library-paper",
  stepCardPending: "border-library-ink/10 bg-white/65 text-library-ink/62",
  stepLabel: "text-xs font-bold uppercase tracking-[0.2em]",
  stepTitle: "mt-2 text-sm font-semibold",

  // form elements
  form: "mt-8 grid gap-4",
  fieldLabel: "mb-2 inline-flex items-center gap-2 text-sm font-semibold text-library-ink/72",
  fieldLabelBlock: "mb-2 block text-sm font-semibold text-library-ink/72",
  input: "w-full rounded-2xl border border-library-ink/10 bg-white/75 px-4 py-3 outline-none transition focus:border-library-panel",
  passwordWrapper: "flex items-center rounded-2xl border border-library-ink/10 bg-white/75 px-4 py-3 transition focus-within:border-library-panel",
  passwordInput: "w-full bg-transparent outline-none",
  toggleButton: "inline-flex h-9 w-9 items-center justify-center rounded-xl text-library-ink/60 transition hover:bg-library-paper",
  select: "w-full rounded-2xl border border-library-ink/10 bg-white/75 px-4 py-3 outline-none transition focus:border-library-panel",
  twoColumnGrid: "grid gap-4 sm:grid-cols-2",

  // OTP info box
  otpInfoBox: "rounded-3xl border border-dashed border-library-panel/30 bg-white/72 p-5",
  otpInfoLabel: "text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  otpInfoText: "mt-3 text-sm text-library-ink/65 leading-relaxed",
  emailHighlight: "font-semibold",

  // error message
  errorMessage: "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800",

  // buttons
  buttonGroup: "mt-3 flex gap-3",
  backButton: "flex-1 rounded-2xl border border-library-ink/10 bg-white/75 px-5 py-3 text-sm font-semibold text-library-ink disabled:opacity-50 disabled:cursor-not-allowed",
  nextButton: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-library-panel px-5 py-3 text-sm font-semibold text-library-paper transition hover:bg-library-panel-soft disabled:opacity-75 disabled:cursor-not-allowed",
  submitButton: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-library-panel px-5 py-3 text-sm font-semibold text-library-paper transition hover:bg-library-panel-soft disabled:opacity-75 disabled:cursor-not-allowed",

  // right panel (info)
  infoPanel: "bg-library-panel p-5 text-library-paper sm:p-8 lg:p-10",
  infoBadge: "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-library-paper/85 sm:px-4 sm:text-xs sm:tracking-[0.28em]",
  infoTitle: "mt-6 font-display text-4xl font-semibold leading-tight text-library-gold-soft sm:text-5xl sm:leading-none lg:text-6xl",
  infoList: "mt-8 space-y-4",
  infoListItem: "flex items-center gap-3 rounded-3xl border border-white/10 bg-white/7 px-5 py-4 text-sm",
  infoIcon: "text-library-gold-soft",
};

// assets/dummyStyles.js

export const homeStyles = {
  // outer container
  layoutContainer: "relative min-h-screen",

  // main content (same as admin layout but we keep separate for home)
  mainContent: "min-h-screen px-4 pb-8 pt-20 md:ml-72.5 md:px-8 md:pt-8",
  innerContainer: "mx-auto max-w-7xl space-y-6",

  // hero section
  heroSection: "overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(rgba(20,35,29,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,35,29,0.03)_1px,transparent_1px)] bg-library-paper/80 p-5 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] [background-size:28px_28px] sm:rounded-[32px] sm:p-6 lg:rounded-[36px] lg:p-10",
  heroGrid: "grid gap-8 xl:grid-cols-[1.25fr_0.9fr] xl:items-center",
  heroBadge: "inline-flex rounded-full bg-library-panel px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-library-paper sm:px-4 sm:text-xs sm:tracking-[0.3em]",
  heroTitle: "mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-library-ink sm:text-5xl sm:leading-none lg:text-6xl xl:text-7xl",
  heroText: "mt-5 max-w-2xl text-sm leading-7 text-library-ink/72 sm:text-base sm:leading-8",
  heroButtons: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4",
  heroButtonPrimary: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-library-success px-6 py-3 text-sm font-semibold transition sm:w-auto text-library-paper",
  heroButtonSecondary: "inline-flex w-full items-center justify-center gap-2 rounded-full border border-library-ink/12 bg-white/80 px-6 py-3 text-sm font-semibold text-library-ink transition hover:bg-library-paper sm:w-auto",

  // right info card
  infoCard: "rounded-[24px] border border-library-ink/10 bg-library-panel p-5 text-library-paper sm:rounded-[28px] sm:p-6",
  infoCardLabel: "text-[0.65rem] font-bold uppercase tracking-[0.18em] text-library-paper/55 sm:text-xs sm:tracking-[0.24em]",
  infoCardTitle: "mt-4 font-display text-3xl font-semibold text-library-gold-soft sm:text-4xl",
  infoCardText: "mt-3 text-sm leading-7 text-library-paper/72",

  // features section
  featuresGrid: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
  featureCard: "rounded-[24px] border border-white/65 bg-white/72 p-5 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[30px] sm:p-6",
  featureIconWrapper: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-library-paper-deep text-library-panel",
  featureTitle: "mt-5 font-display text-2xl font-semibold text-library-ink sm:text-3xl",
  featureText: "mt-3 text-sm leading-7 text-library-ink/68",
};

// assets/dummyStyles.js

export const protectedRouteStyles = {
  // loading container
  loadingContainer: "relative flex min-h-screen items-center justify-center px-4",
  loadingCard: "rounded-[28px] border border-white/60 bg-library-paper/80 px-6 py-5 text-sm font-semibold text-library-ink shadow-library backdrop-blur-[18px]",
};

// assets/dummyStyles.js

export const userBookCardStyles = {
  // main card
  card: "flex h-full flex-col overflow-hidden rounded-[30px] border border-library-ink/10 bg-[linear-gradient(145deg,color-mix(in_srgb,white_98%,transparent),color-mix(in_srgb,var(--color-library-paper)_92%,white))] p-5 shadow-library-soft",

  // header section
  header: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
  title: "wrap-anywhere font-display text-[1.65rem] font-semibold leading-tight text-library-ink sm:text-[2rem]",
  statusBadge: "inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold",

  // details grid
  detailsGrid: "mt-5 grid gap-3 sm:grid-cols-2",
  detailBlock: "rounded-[22px] border border-library-ink/10 bg-library-paper/75 px-4 py-4",
  detailLabel: "text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  detailValue: "wrap-anywhere mt-2 text-sm font-semibold text-library-ink",
  numericValue: "font-numeric mt-2 text-sm font-semibold text-library-ink tabular-nums",
};

// assets/dummyStyles.js

export const userLayoutStyles = {
  // outer container
  layoutContainer: "relative min-h-screen",

  // main content area
  mainContent: "min-h-screen px-4 pb-8 pt-20 md:ml-72.5 md:px-6 md:pt-8 lg:px-8",

  // inner container with custom max-width (max-w-375)
  innerContainer: "mx-auto max-w-375",
};

// assets/dummyStyles.js

export const userBooksPageStyles = {
  // top-level container
  pageContainer: "space-y-8",

  // hero section
  heroSection: "rounded-[26px] border border-white/65 bg-[linear-gradient(rgba(20,35,29,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,35,29,0.03)_1px,transparent_1px)] bg-library-paper/80 p-5 shadow-library backdrop-blur-[18px] bg-size-[28px_28px] sm:rounded-4xl sm:p-6 lg:rounded-4xl lg:p-7",
  heroFlex: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
  heroBadge: "inline-flex rounded-full bg-library-panel px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-library-paper sm:px-4 sm:text-xs sm:tracking-[0.28em]",
  heroTitle: "mt-5 font-display text-4xl font-semibold leading-tight text-library-ink sm:text-5xl",
  heroText: "mt-4 max-w-2xl text-sm leading-7 text-library-ink/68",

  // main section (list)
  mainSection: "rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-library backdrop-blur-[18px] sm:rounded-[30px] sm:p-6",
  sectionHeader: "mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
  sectionTitle: "font-display text-2xl font-semibold text-library-ink sm:text-3xl",
  sectionSubtitle: "text-sm text-library-ink/60",

  // filters container
  filtersContainer: "mb-5 grid gap-4 rounded-3xl border border-library-ink/10 bg-library-paper/70 p-4 lg:grid-cols-2",
  filterLabel: "block",
  filterLabelSpan: "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-library-ink/45",
  searchWrapper: "flex items-center gap-2 rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3",
  searchIcon: "text-library-ink/55",
  searchInput: "w-full bg-transparent outline-none",
  selectInput: "w-full rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3 outline-none",

  // books grid
  booksGrid: "grid gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
  emptyState: "rounded-3xl border border-library-ink/10 bg-library-paper/65 px-5 py-8 text-center text-library-ink/65 md:col-span-2 xl:col-span-3",
};

// assets/dummyStyles.js

export const userDashboardPageStyles = {
  // top-level container
  pageContainer: "space-y-8",

  // hero section
  heroSection: "overflow-hidden rounded-[26px] border border-white/65 bg-[linear-gradient(rgba(20,35,29,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,35,29,0.03)_1px,transparent_1px)] bg-library-paper/82 p-5 shadow-library backdrop-blur-[18px] bg-size-[28px_28px] sm:rounded-[30px] sm:p-6 lg:rounded-[34px] lg:p-8",
  heroGrid: "grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end",
  heroLeft: "max-w-3xl",
  heroBadge: "inline-flex items-center gap-2 rounded-full bg-library-panel px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-library-paper sm:px-4 sm:text-xs sm:tracking-[0.28em]",
  heroTitle: "mt-5 font-display text-4xl font-semibold leading-tight text-library-ink sm:text-5xl sm:leading-none lg:text-6xl",
  heroText: "mt-4 max-w-2xl text-sm leading-7 text-library-ink/68 sm:text-base",

  // right column (profile + semester)
  rightColumnGrid: "grid gap-4 md:grid-cols-1 lg:grid-cols-2",
  profileCard: "rounded-[28px] border border-library-ink/10 bg-white/82 p-5 shadow-library-soft",
  profileHeader: "flex items-start justify-between gap-4",
  profileLabel: "text-xs font-bold uppercase tracking-[0.24em] text-library-ink/45",
  profileName: "wrap-anywhere mt-3 font-display text-2xl font-semibold text-library-ink sm:text-3xl",
  profileIconWrapper: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-library-paper text-library-panel",
  profileDetails: "mt-5 grid gap-3 text-sm text-library-ink/72",
  profileDetailItem: "rounded-[20px] bg-library-paper/80 px-4 py-3",

  semesterCard: "rounded-[28px] border border-white/10 bg-library-panel p-5 text-library-paper shadow-library-medium",
  semesterHeader: "flex items-start justify-between gap-4",
  semesterLabel: "text-xs font-bold uppercase tracking-[0.24em] text-library-paper/55",
  semesterValue: "mt-3 font-display text-3xl font-semibold text-library-gold-soft",
  semesterIconWrapper: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-library-gold-soft",
  semesterDetails: "mt-5 grid gap-3 text-sm text-library-paper/78",
  semesterDetailItem: "rounded-[20px] bg-white/8 px-4 py-3",

  // stats grid
  statsGrid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  statCard: "rounded-[28px] border border-white/70 bg-white/74 p-5 shadow-library backdrop-blur-[18px]",
  statHeader: "flex items-center justify-between gap-3",
  statIconWrapper: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-library-panel text-library-paper",
  statLiveBadge: "rounded-full bg-library-paper px-3 py-1 text-xs font-semibold text-library-ink/60",
  statLabel: "mt-5 text-sm font-medium text-library-ink/65",
  statValue: "font-numeric mt-2 text-3xl font-semibold text-library-ink tabular-nums sm:text-4xl",
  statNote: "mt-2 text-sm text-library-ink/55",

  // recent books section
  recentSection: "overflow-hidden rounded-[26px] border border-white/70 bg-white/78 p-5 shadow-library backdrop-blur-[18px] sm:rounded-[30px] sm:p-6 lg:rounded-[34px] lg:p-8",
  recentHeader: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
  recentTitle: "font-display text-3xl font-semibold text-library-ink sm:text-4xl",
  recentSubtitle: "mt-2 max-w-2xl text-sm leading-7 text-library-ink/60",
  viewMoreButton: "inline-flex w-fit items-center justify-center rounded-full bg-library-paper/82 px-5 py-2.5 text-sm font-semibold transition",
  recentGrid: "mt-8 grid gap-5 lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-3",
  emptyRecentState: "rounded-3xl border border-library-ink/10 bg-library-paper/65 px-5 py-8 text-center text-library-ink/65 md:col-span-2 xl:col-span-3",
};

// assets/dummyStyles.js

export const userEditProfilePageStyles = {
  // top-level container
  pageContainer: "space-y-8",

  // toast notification
  toastWrapper: "fixed left-4 right-4 top-4 z-80 rounded-[22px] border border-emerald-200 bg-white px-4 py-4 text-sm font-semibold text-emerald-900 shadow-2xl transition-all duration-300 sm:left-auto sm:right-5 sm:top-5 sm:px-5",
  toastContent: "flex items-center gap-3",

  // main section
  mainSection: "rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-[0_25px_60px_rgba(20,35,29,0.18)] backdrop-blur-[18px] sm:rounded-[30px] sm:p-6",
  headerFlex: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  title: "font-display text-3xl font-semibold text-library-ink sm:text-4xl",
  subtitle: "mt-2 text-sm leading-7 text-library-ink/65",
  editButton: "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-library-ink/10 bg-white text-library-panel",

  // form container
  formContainer: "mt-6 grid gap-4 rounded-3xl border border-library-ink/10 bg-library-paper/70 p-4 sm:p-5 lg:grid-cols-3",
  label: "block",
  labelSpan: "mb-2 block text-sm font-semibold text-library-ink/72",
  input: "w-full rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3 outline-none",
  inputDisabled: "w-full rounded-2xl border border-library-ink/10 bg-library-ink/[0.04] px-4 py-3 outline-none cursor-not-allowed text-library-ink/50",
  helperText: "mt-1.5 block text-[11px] font-medium text-library-ink/45",
  select: "w-full rounded-2xl border border-library-ink/10 bg-white/85 px-4 py-3 outline-none",
  errorMessage: "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 lg:col-span-3",
  buttonGroup: "flex flex-col gap-3 sm:flex-row lg:col-span-3",
  saveButton: "inline-flex items-center justify-center gap-2 rounded-2xl bg-library-panel px-6 py-3 text-sm font-semibold text-library-paper transition hover:bg-library-panel-soft disabled:opacity-75 disabled:cursor-not-allowed",
  cancelButton: "inline-flex items-center justify-center rounded-2xl border border-library-ink/10 bg-white/70 px-6 py-3 text-sm font-semibold text-library-ink transition hover:bg-library-paper disabled:opacity-75 disabled:cursor-not-allowed",
};