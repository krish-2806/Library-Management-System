import Issue from "../models/Issue.js";
import User from "../models/User.js";
import fineSetting from "../models/FineSetting.js";


// Helper Functions

const getLocalIsoDate = (value = new Date()) => {
    const d = new Date(value);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}; // get local date format

const getStartOfDay = (value) => new Date(new Date(value).setHours(0, 0, 0, 0));// start the day at 00

const getDiffInDays = (targetDateString) =>
    Math.round((getStartOfDay(targetDateString) - getStartOfDay(new Date())) / 86400000);
// to get days diffrence

const getOverdueUnits = (overdueDays, interval) => {
    if (overdueDays <= 0) return 0;
    const divisor = { week: 7, month: 30, year: 365 }[interval] || 1;
    return Math.ceil(overdueDays / divisor);
}; // how much time has passed since overdue

const calculateFine = (issue, fineRate = 10, fineInterval = "day") => {
    if (!issue || issue.fineCleared || issue.returnedOn) return 0;
    const overdueDays = Math.max(0, -getDiffInDays(issue.dueDate));
    return getOverdueUnits(overdueDays, fineInterval) * fineRate + (Number(issue.manualFine) || 0);
}; // to calculate fine according to overdue days

// 1. issue manual books to a student
export async function issueManualBooks(req, res) {
    try {
        const { studentDetails, books } = req.body;
        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ message: "No book were entered" })
        }
        const student = await User.findOne({ rollNo: studentDetails.rollNumber });
        if (!student) return res.status(404).json({
            success: false,
            message: "Student not found"
        });
        const todayIso = getLocalIsoDate();
        const validBooks = books.filter(b => b.title && b.bookCode && b.dueDate);
        if (validBooks.length === 0) {
            return res.status(400).json({
                message: "Please add at least one valid manual book entry with book code and a due date."
            });
        }

        const createdIssues = await Promise.all(validBooks.map(book => Issue.create({
            source: "manual",
            bookCode: book.bookCode.trim(),
            title: book.title.trim(),
            userEmail: student.email,
            userName: student.name,
            issuedOn: todayIso,
            dueDate: book.dueDate,
            returnedOn: null,
            fineRate: Number(book.fineRate ?? req.body.fineRate ?? 10),
            fineInterval: book.fineInterval ?? req.body.fineInterval ?? "day",
            manualFine: 0,
            fineCleared: false,
            clearedFineAmount: 0,
            department: studentDetails.department?.trim() || student.department || "General",
            stream: studentDetails.stream?.trim() || student.stream || "General",
            year: studentDetails.academicYear?.trim() || student.year || "1st Year",
            semester: studentDetails.semester?.trim() || student.semester || "Semester 1",
            rollNumber: studentDetails.rollNumber?.trim() || student.rollNo || "Not assigned",
            studentId: student.rollNo || `ST-${student._id.toString().slice(-4)}`
        })));

        re.status(201).json({
            success: true,
            message: `${createdIssues.length} manual books issued successfully!`,
            count: createdIssues.length,
            issues: createdIssues
        });
    } catch (error) {
        console.error("Error issuing manual books:", error);
        res.status(500).json({
            message: "Error issuing manual books", error: error.message
        })
    }
}

//2. Get all manual issues (admin)
export async function getIssues(req, rea) {
    try{
        const issues = await Issue.find({}).sort({ createdAt: -1});
        res.status(200).json({
            success: true,
            issues
        })
    }catch(error){
        console.error("Error fetching manual issues:", error);
        res.status(500).json({
            message: "Error fetching issues", error: error.message
        })
    }
}

//3. Get manual issues for logged-in student
export async function getStudentIssues(req, res){
    try {
        const issues = await Issue.find({
            userEmail: req.user.email.toLowerCase().trim()
        }).sort({ createAt: -1 });
        res.status(200).json({ success:true, issues});
    } catch (error) {
        console.error("Error fetching student issues:", error);
        res.status(500).json({
            message: "Error fetching student issues", error: error.message
        })
    }
}

//4. Return issued manual book
export async function returnBook(req, res) {
    try{
        const issue = await Issue.findById(req.params.id);
        if(!issue) return res.status(404).json({ message: "Issue record not found "});
        if(issue.returnedOn) return res.status(400).json({
            message: "Book already returned"
        });
        issue.returnedOn = getLocalIsoDate();
        await issue.save();
        res.status(200).json({
            success: true,
            message: "Book returned successfully!",
            issue
        })
    }catch(error){
        console.error("Error returning manual book:", error);
        res.status(500).json({
            message: "Error returning manual book", error: error.message
        })
    }
}

// 5. Apply manual fine
export async function applyFine(req, res) {
    try {
        const fineAmount = Number(req.body.amount);
        if(Number.isNaN(fineAmount)) return res.status(400).json({
            message: "Invalid fine amount"
        });

        const issue = await Issue.findById(req.params.id);
        if(!issue) return res.status(404).json({ message: "Issue record not found "});

        issue.manualFine = fineAmount;
        if(fineAmount > 0) issue.fineCleared = false;
        await issue.save();

        res.status(200).json({
            success: true,
            message: "Manual fine applied successfully!",
            issue
        });
    }catch(error){
        console.error("Error applying manual fine:", error);
        res.status(500).json({
            message: "Error applying manual fine", error: error.message
        })
    }
}

//6. Clear manual fine
export async function clearFine(req, res) {
    try{
        const issue = await Issue.findById(req.params.id);
        if(!issue) return res.status(404).json({ message: "Issue record not found "});

        Object.assign(issue, {
            manualFine: 0,
            fineCleared: true,
            clearedFineAmount: calculateFine( issue, issue.fineRate, issue.fineInterval)
        });
        await issue.save();

        res.status(200).json({
            success: true,
            message: "Fine cleared successfully!",
            issue
        });
    }catch(error){
        console.error("Error clearing manual fine:", error);
        res.status(500).json({
            message: "Error clearing manual fine", error: error.message
        })
    }
}

//7. Get Active fine settings
export async function getFineSettings(req, res){
    try{
        const settings = (await fineSetting.findOne({}) || (await fineSetting.create({ amount: 10, interval: "day" })))
        res.status(200).json({
            success: true,
            settings
        })
    }catch(error){
        console.error("Error fetching fine settings:", error);
        res.status(500).json({
            message: "Error fetching fine settings", error: error.message
        })
    }
}

//8. To update fine settings
export async function updateFineSettings(req, res){
    try{
        const { amount, interval } = req.body;
        let settings = await fineSetting.findOne({});

        if(settings){
            if(amount !== undefined ) settings.amount = Number(amount);
            if(interval !== undefined ) settings.interval = interval;
            await settings.save();
        }else{
            settings = await fineSetting.create({
                amount: Number(amount) || 10,
                interval: interval || "day"
            });
        }
        res.status(200).json({
            success: true,
            message: "Fine settings updated successfully!",
            settings
        });
    }catch(error){
        console.error("Error updating fine settings:", error);
        res.status(500).json({
            message: "Error updating fine settings", error: error.message
        })
    }
}