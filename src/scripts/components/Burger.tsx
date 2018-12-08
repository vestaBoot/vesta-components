import { Dispatcher } from "@vesta/core";
import React, { PureComponent, MouseEvent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

export interface IBurgerProps extends IBaseComponentProps {
    event?: string;
    className?: string;
    onClick?: (e) => void;
}

export interface IBurgerState {
}

export class Burger extends PureComponent<IBurgerProps, IBurgerState> {
    private dispatch = Dispatcher.getInstance().dispatch;

    public render() {
        const { className = "" } = this.props;

        return (
            <a className={`burger ${className}`} onClick={this.onClick}>
                <span />
                <span />
                <span />
            </a>
        );
    }

    private onClick = (e: MouseEvent<HTMLElement>) => {
        const { event, onClick } = this.props;
        if (event) {
            return this.dispatch(event, {});
        }
        if (onClick) {
            onClick(e);
        }
    }
}
