import React, { MouseEvent, PureComponent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { IBaseComponentProps } from "../BaseComponent";
import { Icon } from "./Icon";

export interface IMenuItem {
    abstract?: boolean;
    children: IMenuItem[];
    disabled?: boolean;
    hidden?: boolean;
    icon?: string;
    id?: string;
    link?: string;
    title: string;
}

interface IMenuProps extends IBaseComponentProps {
    horizontal?: boolean;
    items: IMenuItem[];
    name?: string;
    onItemSelect?: (id?: string) => void;
}

interface IMenuState { }

export class Menu extends PureComponent<IMenuProps, IMenuState> {
    public static defaultProps = { horizontal: false };
    private keyCounter = 1;

    public render() {
        const { name, items, horizontal } = this.props;
        const menuItems = this.renderMenuItems(items, "");
        const className = `menu ${name ? `${name}-menu` : ""} ${horizontal ? "menu-hr" : "menu-vr"}`;

        return (
            <nav className={className}>
                <ul>{menuItems}</ul>
            </nav>
        );
    }

    private renderMenuItems(routeItems: IMenuItem[], prefix: string): ReactNode[] {
        // const { onClick } = this.props;
        let links: ReactNode[] = [];
        const routeCount = routeItems.length;
        for (let i = 0, il = routeCount; i < il; ++i) {
            const item: IMenuItem = routeItems[i];
            if (!item.abstract && !item.hidden) {
                const basePath = prefix ? `/${prefix}` : "";
                const icon = <Icon name={item.icon as string} />;
                const className = `menu-item ${item.disabled ? "disabled" : ""}`;
                const itemComponent = item.link ?
                    (<NavLink to={`${basePath}/${item.link}`} activeClassName="active">
                        <span>{icon} {item.title}</span>
                    </NavLink>) :
                    <a data-id={item.id}>{icon} {item.title}</a>;
                links.push(
                    <li key={this.keyCounter++} className={className} data-id={item.id} onClick={this.onItemClick}>
                        {itemComponent}
                    </li>);
            }
            if (item.children) {
                links = links.concat(this.renderMenuItems(item.children, item.link || ""));
            }
        }
        return links;
    }

    private onItemClick = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.getAttribute("data-id");
        const { onItemSelect } = this.props;
        if (onItemSelect) {
            onItemSelect(id || "");
        }
        this.forceUpdate();
    }
}
