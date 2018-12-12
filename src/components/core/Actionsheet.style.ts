import { HalfLight, ITheme, Lightblue, transparentize } from "@vesta/theme";
import { StyleCreator, Styles } from "react-jss";

export const actionsheetStyle: StyleCreator<string, ITheme> = (theme: ITheme): Styles => {
    const transitionEnterDuration = theme.timing.Default;
    const transitionLeaveDuration = Math.floor(2 * theme.timing.Default / 3);
    const transitionEffect = "ease-in-out";
    const bgColor = Lightblue;
    const offset = "5%";
    const itemPadding = 15;

    return {
        backdrop: {
            background: transparentize(HalfLight, .7),
            bottom: 0,
            left: 0,
            opacity: 1,
            position: "fixed",
            right: 0,
            top: 0,
            willChange: "opacity",
            zIndex: theme.zIndex.Actionsheet,
        },
        list: {
            background: bgColor,
            borderRadius: `${theme.size.borderRadius}px ${theme.size.borderRadius}px 0 0`,
            bottom: 0,
            left: offset,
            position: "fixed",
            right: offset,
            textAlign: "center",
            zIndex: theme.zIndex.Actionsheet,
            listStyle: "none",
            padding: 0,

            "& li": {
                borderBottom: `1px solid ${theme.color.Bordser}`,
                cursor: "pointer",
                padding: itemPadding,
            }
        },
        ".enter": {
            ".action-list": {
                transform: "translate3d(0, 100%, 0)",
            },
            ".actionsheet-backdrop": {
                opacity: .1,
            },
            "&.actionsheet-enter-active": {
                ".action-list": {
                    transform: "translate3d(0, 0, 0)",
                    transition: `transform ${transitionEnterDuration} ${transitionEffect}`,
                },
                ".actionsheet-backdrop": {
                    opacity: 1,
                    transition: `opacity ${transitionEnterDuration} ${transitionEffect}`,
                },
            },
        },
        ".leave": {
            "&.actionsheet-leave-active": {
                ".action-list": {
                    transform: "translate3d(0, 0, 0)",
                    transition: `transform ${transitionLeaveDuration} ${transitionEffect}`,
                },
                ".actionsheet-backdrop": {
                    opacity: .1,
                    transition: `opacity ${transitionLeaveDuration} ${transitionEffect}`,
                }
            }
        }
    }
}
