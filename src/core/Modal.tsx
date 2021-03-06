import { ITheme } from "@vesta/theme";
import React, { ComponentType, MouseEvent, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { withTheme } from "theming";
import { IComponentProps, IWithTransition } from "../BaseComponent";

export interface IModalProps extends IComponentProps, IWithTransition {
    show: boolean;
    animation?: string;
    className?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const Modal: ComponentType<IModalProps> = withTheme((props: IModalProps) => {
    (Modal as any).count = 0;
    const duration = (props.theme as ITheme).timing.Default;
    let isOpen = false;

    useEffect(() => {
        return () => updateStatus(false);
    });

    const { enter = duration, leave = duration } = props;

    updateStatus(props.show);

    const content = props.show ?
        <div className={`modal ${props.className}`} onClick={onModalClicked}>
            {props.children}
        </div> : null;
    const animation = `modal-${props.animation || "slide"}`;

    return (
        <ReactCSSTransitionGroup transitionName={animation} transitionEnterTimeout={enter}
            transitionLeaveTimeout={leave}>
            {content}
        </ReactCSSTransitionGroup>
    );

    function updateStatus(show: boolean) {
        if (show) {
            if (!isOpen) {
                isOpen = true;
                ++(Modal as any).count;
            }
        } else {
            if (isOpen) {
                isOpen = false;
                --(Modal as any).count;
            }
        }
        // add class name only on first time
        if ((Modal as any).count == 1) {
            document.documentElement.classList.add("modal-open");
        } else if (!(Modal as any).count) {
            document.documentElement.classList.remove("modal-open");
        }
    }

    function onModalClicked(e: MouseEvent<HTMLElement>) {
        const { onClick } = props;
        if (onClick) {
            e.stopPropagation();
            onClick(e);
        }
    }
});
