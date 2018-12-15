import React, { PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";
import { extractClassNames } from "../util";

interface ISelectProps extends IBaseComponentProps, IFromControlProps {
    options: Array<{}>;
    titleKey?: string;
    valueKey?: string;
}

interface IEmptyState { }

export class Select extends PureComponent<ISelectProps, IEmptyState> {
    public static defaultProps = { valueKey: "id", titleKey: "title" };

    public render() {
        const { label, name, options, error, titleKey, readonly } = this.props;
        // finding index of selected value
        const selectedIndex = this.getSelectedIndex();
        const optionsList = (options || []).map((o, i) => (<option key={i} value={i}>{o[titleKey]}</option>));
        const classNames = extractClassNames(this.props, { value: "is-dirty", error: "has-error" });

        return (
            <div className={`form-group select-input ${classNames}`}>
                <label htmlFor={name}>{label}</label>
                <select className="form-control" name={name} id={name} value={selectedIndex}
                    onChange={this.onChange} disabled={readonly}>
                    {optionsList}
                </select>
                <p className="form-error">{error || ""}</p>
            </div>
        );
    }

    private getSelectedIndex() {
        const { value, options, valueKey } = this.props;
        // value might be a number or an object
        const realValue = value && value[valueKey] || value;
        // finding index of selected value
        for (let i = options.length; i--;) {
            if (realValue == options[i][valueKey]) {
                return i;
            }
        }
        // in case no value is passed through props
        return undefined;
    }

    private onChange = (e) => {
        const { name, onChange, options, valueKey, readonly } = this.props;
        const index = e.target.value;
        const item = options[index];
        if (onChange && !readonly) {
            onChange(name, item ? item[valueKey] : null);
        }
    }
}
