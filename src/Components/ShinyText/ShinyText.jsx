import { useTranslation } from 'react-i18next';
import './ShinyText.css';
import { append } from 'three/tsl';

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;
    const { t } = useTranslation();
    
    return (
        <div
        className={`shiny-text ${disabled ? 'disabled' : ''} ${className}` }
        data-text={t("app.subTitle")}
        style={{ animationDuration }}
        >
        {text}
        </div>
    );
};

export default ShinyText;
