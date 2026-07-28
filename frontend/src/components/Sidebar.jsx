import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarStyles as s } from "../assets/dummyStyles";
import {
    ChartNoAxesCombined,
    ShieldCheck,
    Bell,
    BookCopy,
    UserRound,
    ChevronRight,
    Menu,
    X,
    UserPlus,
    LogIn
} from "lucide-react";

const iconMap = {
    dashboard: ChartNoAxesCombined,
    books: BookCopy,
    alerts: Bell,
    admin: ShieldCheck,
    users: UserRound
}

const Sidebar = ({
    title,
    subtitle,
    badge,
    navItems = [],
    footerItems = [],
    accent = "user",
    logoSrc
}) => {

    const location = useLocation();
    const [open, setOpen] = useState(false);

    const badgeStyles = accent === "admin" ? s.badgeAdmin : s.badgeUser;
  return (
    <>
    <button type="button" onClick={()=> setOpen(true)} className={s.mobileMenuButton}> 
        <Menu size={18} />
    </button>
    <div className={`${s.mobileOverlay} ${open ? s.mobileOverlayOpen : s.mobileOverlayClosed}`} onClick={()=> setOpen(false)} />

    <aside className={`${s.sidebar} ${open ? s.sidebarOpen : s.sidebarClosed}`}>
        <div className={ s.sidebarHeader}>
            <div className='min-w-0 pr-3'>
                <div className={s.logoWrapper}>
                    {logoSrc ? (
                        <img src={logoSrc} alt="logo" className={s.logoImage}/>
                    ):(
                        <BookCopy size={22} />
                    )}
                </div>
                    <h2 className={s.title}>{title}</h2>
                    <p className={s.subtitle}>{subtitle}</p>
                    {badge && (
                        <span className={`${s.badgeBase} ${badgeStyles}`}>{badge}</span>
                    )}
            </div>
                <button onClick={()=> setOpen(false)} type='button' className={s.closeButton}><X size={18}/></button>
        </div>
            <nav className={s.nav}>
                {navItems.map((item)=>{
                    const Icon = iconMap[item.icon] ?? ChevronRight;
                    const active = location.pathname === item.href ||
                        (item.match ? location.pathname.startsWith(item.match): false);

                    return (
                    <Link key={item.label} to={item.href} onClick={()=> setOpen(false)} className={`${s.navLink} ${active ? s.navLinkActive : s.navLinkInactive}`}>
                        <span className={`${s.navIconWrapper} ${ active ? s.navIconWrapperActive : s.navIconWrapperInactive}`}>
                            <Icon size={18} />
                        </span>
                        <span className='min-w-0 flex-1'>
                            <span className={s.navLabel}>{item.label}</span>
                            <span className={`${s.navDescription} ${active ? s.navDescriptionActive : s.navDescriptionInactive}`}>
                                {item.description}
                            </span>
                        </span>

                        <ChevronRight size={16} className={active ? s.navChevronActive : s.navChevronInactive}></ChevronRight>
                    </Link>
                    )
                })}
            </nav>
            <div className={s.footer}>
                { footerItems.map((item) => {
                    const Icon = item.icon === "signup" ? UserPlus : LogIn;

                    if(item.action) {
                        return (
                            <button key={item.label} type="button" onClick={item.action}
                                className={`${s.footerButton} ${item.kind === "primary" ? s.footerButtonPrimary : s.footerButtonSecondary}`}>
                                    <span className={s.footerIconWrapper}>
                                        <Icon size={16} />
                                        {item.label}
                                    </span>
                                    <ChevronRight size={16} />
                            </button>
                        );
                    }
                    return (
                        <Link key={item.label} to={item.href}
                                className={`${s.footerLink} ${item.kind === "primary" ? s.footerButtonPrimary : s.footerButtonSecondary}`}>
                                    <span className={s.footerIconWrapper}>
                                        <Icon size={16} />
                                        {item.label}
                                    </span>
                                    <ChevronRight size={16} />
                        </Link>
                    )
                })}
            </div>
    </aside>
    </>
  );
};

export default memo(Sidebar);