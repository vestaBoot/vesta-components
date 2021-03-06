import { Culture } from "@vesta/culture";
import React, { ChangeEvent, PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";
import { DatePicker } from "../core/DatePicker";
import { IFromControlProps } from "../core/FormWrapper";
import { Modal } from "../core/Modal";
import { extractClassNames } from "../util";

export interface IDateTimeInputProps extends IComponentProps, IFromControlProps {
    hasTime?: boolean;
    value?: number;
}

interface IDateTimeInputState {
    showPicker?: boolean;
    value: string;
}

export class DateTimeInput extends PureComponent<IDateTimeInputProps, IDateTimeInputState> {
    private dateTime = Culture.getDateTimeInstance();
    private dateTimeFormat: string;

    constructor(props: IDateTimeInputProps) {
        super(props);
        const locale = this.dateTime.locale;
        this.dateTimeFormat = this.props.hasTime ? locale.defaultDateTimeFormat : locale.defaultDateFormat;
        this.state = { value: props.value ? this.format(props.value) : "" };
    }

    public componentWillReceiveProps(newProps: IDateTimeInputProps) {
        const { value } = this.props;
        if (newProps.value !== value) {
            this.setState({ value: this.format(newProps.value as number) });
        }
    }

    public render() {
        const { name, label, error, hasTime } = this.props;
        const { value, showPicker } = this.state;

        const picker = showPicker ? (
            <Modal show={true} animation="modal-zoom">
                <DatePicker value={value} onChange={this.onChange} onAbort={this.hidePicker} hasTime={hasTime} />
            </Modal>) : <Modal show={false} animation="modal-zoom" />;
        const classNames = extractClassNames(this.props, { value: "is-dirty", error: "has-error" });

        return (
            <div className={`form-group date-time-input ${classNames}`}>
                <label htmlFor={name}>{label}</label>
                <input className="form-control" name={name} id={name} value={value}
                    onChange={this.onInputChange} readOnly={true} onClick={this.showPicker} />
                <p className="form-error">{error || ""}</p>
                {picker}
            </div>
        );
    }

    private format(value: number): string {
        if (!value) { return ""; }
        const timestamp = +value;
        if (!isNaN(timestamp)) {
            this.dateTime.setTime(timestamp);
        }
        return this.dateTime.format(this.dateTimeFormat);
    }

    private hidePicker = () => {
        this.setState({ showPicker: false });
    }

    private onChange = (value: string) => {
        const { name, onChange, hasTime } = this.props;
        // dateTime validation, also sets the correct values
        const timestamp = this.dateTime.validate(value, hasTime) ? this.dateTime.getTime() : 0;
        if (onChange) {
            onChange(name, timestamp);
        }
        this.setState({ value, showPicker: false });
    }

    private onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.onChange(value);
    }

    private showPicker = () => {
        this.setState({ showPicker: true });
    }
}
