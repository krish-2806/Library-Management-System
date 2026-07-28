import { Children, createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const SESSION_KEY = 'library-auth-session';
const TOKEN_KEY = 'library-auth-token';
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const defaultAccounts = [];

const mapUserToFrontend = (user) => {
    if (!user) return null;
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        department: user.department || "General",
        stream: user.stream || "General",
        academicYear: user.year || "1st Year",
        semester: user.semester || "Semester 1",
        rollNumber: user.rollNo || "",
        studentId: user.studentId || `ST-${user._id.slice(-6)}`,
        createdAt: user.createdAt,
    };
};// fetch all these details coming from the server side.

export const AuthProvider = ({ children }) => {
    const [accounts, setAccounts] = useState(defaultAccounts);
    const [currentUser, setCurrentUser] = useState(null);
    const [ready, setReady] = useState(false);

    //if user is admin then fetch all registered user
    const fetchRegisteredUsers = async (token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && Array.isArray(data.users)) {
                    const fetchedAccounts = data.users
                        .map(mapUserToFrontend)
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt ?? 0).getTime() -
                                new Date(a.createdAt ?? 0).getTime(),
                        );

                    setAccounts((current) => {
                        const merged = [...fetchedAccounts];
                        defaultAccounts.forEach((account) => {
                            const exists = merged.some(
                                (item) =>
                                    item.email.toLowerCase() === account.email.toLowerCase(),
                            );
                            if (!exists) {
                                merged.push(account);
                            }
                        });
                        return merged;
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching users from backend:", error);
        }
    };

    //to fetch user profile details
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            const session = localStorage.getItem(SESSION_KEY);

            if (token && session) {
                try {
                    const response = await fetch(`${API_BASE_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.user) {
                            const mappedUser = mapUserToFrontend(data.user);
                            setCurrentUser(mappedUser);
                            localStorage.setItem(SESSION_KEY, JSON.stringify(mappedUser));

                            if (mappedUser.role === "admin") {
                                await fetchRegisteredUsers(token);
                            }
                        } else {
                            logout();
                        }
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error(
                        "Backend auth init failed, falling back to local session:",
                        error,
                    );
                    try {
                        setCurrentUser(JSON.parse(session));
                    } catch {
                        logout();
                    }
                }
            } else {
                setCurrentUser(null);
            }
            setReady(true);
        };

        initializeAuth();
    }, []);

    //to login
    const login = async ({ email, password, role }) => {
        try {
            console.log("AuthContext: Sending login request to backend...");
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("AuthContext: Backend response:", {
                status: response.status,
                data,
            });

            if (!response.ok) {
                console.warn("AuthContext: Login failed with status", response.status);
                return {
                    ok: false,
                    error: data.message || "Invalid credentials. Please try again.",
                };
            }

            if (data.success && data.token && data.user) {
                const mappedUser = mapUserToFrontend(data.user);
                console.log("AuthContext: User mapped successfully:", mappedUser);

                if (role && mappedUser.role !== role) {
                    console.warn(
                        "AuthContext: Role mismatch. Expected:",
                        role,
                        "Got:",
                        mappedUser.role,
                    );
                    return {
                        ok: false,
                        error:
                            role === "admin"
                                ? "This account is not an admin account."
                                : "This account is not a student account.",
                    };
                }

                localStorage.setItem(TOKEN_KEY, data.token);
                localStorage.setItem(SESSION_KEY, JSON.stringify(mappedUser));
                setCurrentUser(mappedUser);
                console.log("AuthContext: User successfully logged in and stored");

                if (mappedUser.role === "admin") {
                    await fetchRegisteredUsers(data.token);
                }

                return { ok: true, user: mappedUser };
            }

            console.warn("AuthContext: Response missing required fields");
            return { ok: false, error: "Authentication failed" };
        } catch (error) {
            console.error("AuthContext: API login error:", error);
            const account = defaultAccounts.find(
                (item) =>
                    item.email.toLowerCase() === email.trim().toLowerCase() &&
                    item.password === password,
            );

            if (account) {
                console.log("AuthContext: Using offline fallback account");
                if (role && account.role !== role) {
                    return {
                        ok: false,
                        error:
                            role === "admin"
                                ? "This account is not an admin account."
                                : "This account is not a student account.",
                    };
                }
                localStorage.setItem(TOKEN_KEY, "mock-demo-token");
                localStorage.setItem(SESSION_KEY, JSON.stringify(account));
                setCurrentUser(account);
                return { ok: true, user: account };
            }

            console.error("AuthContext: No fallback available");
            return {
                ok: false,
                error: "Server connection failed. Please try again later.",
            };
        }
    };

    //to logout
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(SESSION_KEY);
        setCurrentUser(null);
    };

    //to register
    //step 1: To register account and trigger otp send
    const registerStudent = async ({ name, email, phone, password }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                return { ok: false, error: data.message || "Registration failed" };
            }
            return { ok: true, message: data.message };
        } catch (error) {
            console.error("Register API error:", error);
            return {
                ok: false,
                error: "Failed to connect to authentication server.",
            };
        }
    };

    //step 2: OTP verification
    const verifyOtpCode = async ({ email, otp }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (!response.ok) {
                return { ok: false, error: data.message || "OTP verification failed" };
            }
            return { ok: true, message: data.message };
        } catch (error) {
            console.error("OTP API error:", error);
            return {
                ok: false,
                error: "Failed to connect to authentication server.",
            };
        }
    };

    //final step to complete our profile
    const completeProfileData = async ({
        email,
        department,
        stream,
        semester,
        academicYear,
        rollNumber,
    }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/complete-profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    department,
                    stream,
                    semester,
                    year: academicYear,
                    rollNo: rollNumber,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                return {
                    ok: false,
                    error: data.message || "Profile completion failed",
                };
            }
            return { ok: true, message: data.message };
        } catch (error) {
            console.error("Complete Profile API error:", error);
            return {
                ok: false,
                error: "Failed to connect to authentication server.",
            };
        }
    };

    const signup = async (form) => {
        return completeProfileData(form);
    };

    const accountExists = async (email) => {
        return accounts.some(
            (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
        );
    };

    const updateProfile = async (updates) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return { ok: false, error: "No active token found." };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: updates.name,
                    email: updates.email,
                    phone: updates.phone,
                    department: updates.department,
                    stream: updates.stream,
                    semester: updates.semester,
                    academicYear: updates.academicYear,
                    rollNumber: updates.rollNumber,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                return { ok: false, error: data.message || "Profile update failed" };
            }

            if (data.success && data.user) {
                const mappedUser = mapUserToFrontend(data.user);
                localStorage.setItem(SESSION_KEY, JSON.stringify(mappedUser));
                setCurrentUser(mappedUser);

                setAccounts((current) =>
                    current.map((item) =>
                        item.email === mappedUser.email ? mappedUser : item,
                    ),
                );

                return { ok: true, user: mappedUser };
            }
            return { ok: false, error: "Failed to update profile details" };
        } catch (error) {
            console.error("Update Profile API error:", error);
            return {
                ok: false,
                error: "Failed to connect to authentication server.",
            };
        }
    }; // to update the profile

    return (
        <AuthContext.Provider
        value={{
            accounts,
            currentUser,
            login,
            logout,
            ready,
            signup,
            registerStudent,
            verifyOtpCode,
            completeProfileData,
            accountExists,
            updateProfile,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () =>{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}