import User from '../models/User.js';

// to search the student by roll no
export async function searchStudentsByRoll(req, res) {
    try {
        const roll = String(req.query.roll || "").trim();
        if (!roll) {
            return res.status(200).json({ success: true, students: [] });
        }
        const rollRegex = new RegExp(roll, "i");
        const students = await User.find({
            rollNo: { $regex: rollRegex }
        }).select("name email department stream semester year rollNo")
            .limit(12);
        const mappedStudents = students.map((student) => ({
            name: student.name,
            email: student.email,
            department: student.department || "",
            stream: student.stream || "",
            academicYear: student.year || "",
            semester: student.semester || "",
            rollNumber: student.rollNo || "",
        }));

        res.status(200).json({
            success: true,
            students: mappedStudents
        });
    } catch (error) {
        console.error("Error searching students by roll:", error);
        res.status(500).json({
            success: false,
            message: "Error searching students by roll",
            error: error.message
        });
    }
}