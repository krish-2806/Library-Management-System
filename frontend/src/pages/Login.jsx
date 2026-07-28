import { memo, useState, useEffect } from 'react';
import { loginStyles as s } from '../assets/dummyStyles';
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, ShieldCheckIcon, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../shared/AuthContext';
import { Mail } from 'lucide-react';

const roleChoices = [
    { value: "user", label: "Student", icon: UserRound },
    { value: "admin", label: "Admin", icon: ShieldCheck },
];

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "user"
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.signupEmail || location.state?.signupPassword) {
            setForm((current) => ({
                ...current,
                email: location.state?.signupEmail ?? "",
                password: location.state?.signupPassword ?? "",
            }));
        }
    }, [location.state]);  // to see the field input

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError("");
        setForm((current) => ({
            ...current, [name]: value
        }));
    };

    // to submit the data to server and get the user/admin logged-in
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            console.log("Attempting login with:", {
                email: form.email,
                role: form.role,
            });
            const result = await login(form);
            console.log("Login result:", result);

            if (!result.ok) {
                setLoading(false);
                setError(result.error || "Login failed");
                console.error("Login failed:", result.error);
                return;
            }

            console.log("Login successful, navigating to dashboard...");
            await new Promise((resolve) => setTimeout(resolve, 100));
            setLoading(false);

            const fallbackPath =
                form.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
            let target = location.state?.from || fallbackPath;

            if (
                form.role === "user" &&
                typeof target === "string" &&
                target.startsWith("/admin")
            ) {
                console.warn(
                    "Login: preventing navigation to admin route for student; using fallback",
                );
                target = fallbackPath;
            } else if (
                form.role === "admin" &&
                typeof target === "string" &&
                target.startsWith("/user")
            ) {
                console.warn(
                    "Login: preventing navigation to user route for admin; using fallback",
                );
                target = fallbackPath;
            }

            console.log("Navigating to:", target);
            navigate(target, { replace: true });

        } catch (err) {
            setLoading(false);
            console.log("Login Error:",err);
            setError("An unexpected connection error occured.");
        }
    };
    return (
        <div className={s.pageContainer}>
            <div className={s.mainCard}>
                <section className={s.infoPanel}>
                    <span className={s.roleBadge}>College role login</span>
                    <h1 className={s.infoTitle}>
                        Choose student or admin first, then open the correct library panel.
                    </h1>
                    <p className={s.infoDescription}>
                        Select the role you want to enter, then login with the matching account.
                    </p>
                    <div className={s.infoBoxesContainer}>
                        <div className={s.infoBox}>
                            <p className={s.infoBoxTitle}>
                                <UserRound size={16} />
                                Student Sign In
                            </p>
                            <p className={s.infoBoxText}>
                                Register a new student account using the "Create account" link to test student functionality with real data.
                            </p>
                        </div>

                        <div className={s.infoBox}>
                            <p className={s.infoBoxTitle}>
                                <ShieldCheckIcon size={16} />
                                Admin Access
                            </p>
                            <p className={s.infoBoxText}>
                                Log in using your registered admin account to access the administrative dashboard and catalog features.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={s.formPanel}>
                    <div className={s.formInner}>
                        <Link to="/" className={s.backLink}>
                            Back to Home
                        </Link>
                        <h2 className={s.formTitle}>Login Account</h2>
                        <p className={s.formSubtitle}>
                            Select your role and your college library account credentials.
                        </p>

                        <form className={s.form} onSubmit={handleSubmit}>
                            <div className={s.roleContainer}>
                                <p className={s.roleLabel}>Choose login role</p>
                                <div className={s.roleGrid}>
                                    {roleChoices.map((choice) =>{
                                        const Icon = choice.icon;
                                        return (
                                            <label key={choice.value} className={`${s.roleOption} ${form.role === choice.value ? s.roleOptionSelected : s.roleOptionUnselected }`}>
                                                <input type="radio" name="role" value={choice.value}
                                                checked={form.role === choice.value} onChange={handleChange} className={s.roleRadio} />
                                                <span className={s.roleIconLabel}>
                                                    <Icon size={16} />
                                                    {choice.label}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <label className='block'>
                                <span className={s.fieldLabel}>
                                    <Mail size={15} />
                                    Email Address
                                </span>
                                <input type="email" name="email" value={form.email}
                                onChange={handleChange} placeholder='student@campus.edu' className={s.input} />
                            </label>
                            <label className='block'>
                                <span className={s.fieldLabel}>
                                    <LockKeyhole size={15} />
                                    Password
                                </span>
                                <div className={s.passwordWrapper}>
                                    <input type={showPassword ? "test": "password" } name="password" value={form.password}
                                onChange={handleChange} placeholder='Enter Password' className={s.input} />
                                <button type="button" onClick={() => setShowPassword((current) => !current)} className={s.togglePasswordButton}>
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                                </div>
                            </label>
                            
                            {error && (
                                <div className={s.errorMessage}>{error}</div>
                            )}
                            <div className={s.footerFlex}>
                                <span className={s.footerText}>
                                    {form.role === "admin" ? "Admin accounts use existing credentails" 
                                    : "Student signup is available below"}
                                </span>
                                {form.role === "user" && (
                                    <Link to="/signup" className={s.signupLink}>
                                        Create Account
                                    </Link>
                                )}
                            </div>
                            <button type="submit" disabled={loading} className={s.submitButton}>
                                {loading ? "Loging in..." : "Login now"}
                                {!loading && <ArrowRight size={15} />}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default memo(Login);