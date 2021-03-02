
function languageSwitcher(props) {
    if (props.language === "English") {
        document.documentElement.dir = "ltr"
        document.documentElement.lang = "en"

    } else {
        document.documentElement.dir = "rtl"
        document.documentElement.lang = "ar"
    }
}
export default languageSwitcher;