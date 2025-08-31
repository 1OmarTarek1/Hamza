import { useTranslation } from 'react-i18next';
import { LightRays, ShinyText } from '../../Components';

import './HomeHeader.css'

const HomeHeader = () => {
    const { t } = useTranslation();

    return (
        <header className='homeHeader'>
            <LightRays
                raysOrigin="top-center"
                raysColor="gold"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0}
                distortion={0.05}
                className="custom-rays"
            />
            <ShinyText 
                text={t("app.title")} 
                disabled={false} 
                speed={3} 
                className='custom-class' 
            />
        </header>
    )
}

export default HomeHeader

