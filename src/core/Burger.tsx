import React, { MouseEvent, PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";

export interface IBurgerProps extends IComponentProps {
    className?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

interface IBurgerState {
}

export class Burger extends PureComponent<IBurgerProps, IBurgerState> {

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
        const { onClick } = this.props;
        if (onClick) {
            onClick(e);
        }
    }
}
