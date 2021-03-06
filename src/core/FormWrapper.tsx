import React, { FormEvent, PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";

export type ChangeEventHandler = (name: string, value: any) => void;

export interface IFromControlProps {
    error?: string;
    label?: string;
    name: string;
    onChange?: ChangeEventHandler;
    readonly?: boolean;
    value?: any;
}

export interface IFormOption {
    id: number;
    title: string;
}

interface IFormWrapperProps extends IComponentProps {
    name?: string;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

interface IEmptyState { }

export class FormWrapper extends PureComponent<IFormWrapperProps, IEmptyState> {

    public render() {
        return (
            <div className="form-wrapper">
                <form name={this.props.name} onSubmit={this.onSubmit} noValidate={true}>
                    {this.props.children}
                </form>
            </div>
        );
    }

    private onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const { onSubmit } = this.props;
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    }
}
