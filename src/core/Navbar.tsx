import React, { ComponentType, MouseEvent, PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Burger } from "./Burger";

export enum NavBarMainButtonType { Burger = 1, Back, Close }

interface INavbarParams { }

interface INavbarProps extends RouteComponentProps<INavbarParams> {
    title?: string;
    className?: string;
    backLink?: string;
    backAction?: (e) => void;
    showBurger?: boolean;
    hide?: boolean;
    mainButtonType?: NavBarMainButtonType;
    handleBackEvent?: boolean;
    onBurgerClick?: (e: MouseEvent<HTMLElement>) => void;
}

interface IEmptyState { }

class Navbar extends PureComponent<INavbarProps, IEmptyState> {

    private pathToExitApps = ["/"];

    // public componentDidMount() {
    //     if (this.hasBackBtn) {
    //         DevicePlugin.getInstance().registerBackButtonHandler(this.goBack);
    //     }
    // }

    // public componentWillUnmount() {
    //     if (this.hasBackBtn) {
    //         DevicePlugin.getInstance().unregisterBackButtonHandler(this.goBack);
    //     }
    // }

    public render() {
        const { title, className, backLink, showBurger, hide, backAction, mainButtonType } = this.props;
        if (hide) { return null; }
        let btnClassName = "back-btn";
        if (mainButtonType == NavBarMainButtonType.Close) {
            btnClassName = "close-btn";
        }
        const navBtn = (showBurger || location.pathname == "/") && !backLink && !backAction ?
            <Burger className="nav-btn" onClick={this.props.onBurgerClick} /> :
            <Burger className={`nav-btn ${btnClassName}`} onClick={this.goBack} />;

        return (
            <div className={`navbar ${className}`}>
                {navBtn}
                <p className="nav-title">{title || ""}</p>
                <div className="navbar-btn-group">
                    {this.props.children}
                </div>
            </div>
        );
    }

    private goBack = (e) => {
        if (e) {
            e.stopPropagation();
        }
        const { backAction } = this.props;
        if (backAction) {
            return backAction(e);
        }
        const { history, backLink } = this.props;
        if (backLink) { return history.replace(backLink); }
        if (this.props.handleBackEvent) {
            if (this.pathToExitApps.indexOf(this.props.location.pathname) >= 0) {
                return (navigator as any).app.exitApp();
            }
        }
        if (history.length) { return history.goBack(); }
        history.replace("/");
    }
}

export default withRouter(Navbar as ComponentType<INavbarProps>);
