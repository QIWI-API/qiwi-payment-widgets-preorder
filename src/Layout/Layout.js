import React, {Component} from 'react';

import Loader from '../components/Loader';

import Logo from '../components/Logo';
import Card from '../components/Card';
import TechnologiesPics from '../components/TechnologiesPics';
import Oferta from '../components/Oferta';

import {styleCode} from "../styles/index";

import {
    CardHolder,
    MerchantInfoCard,
    ContentBlock,
    Footer,
    HelpLink
} from './styled';
import OptionalRenderer from "../components/OptionalRenderer";
import Mobile from "../components/Mobile/Modile";
import CheckoutTypeSwitcher from "../components/CheckoutTypeSwitcher";

export default class Layout extends Component {
    updateDimensions() {
        this.setState({});
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        const props = Object.assign({}, this.props.widgetInfo);
        const {
            widgetMerchantMetric,
            widgetAliasCode,
            widgetMerchantName,
            widgetDescription,
            widgetMerchantOffer,
            widgetStyles,
            primaryColor,
            gradientColor,
            bgUrl,
            enableGradient
        } = this.props.widgetInfo;

        return (
            <div>
                <OptionalRenderer when={widgetMerchantMetric}>
                    <noscript>
                        <div>
                            <img
                                src={`https://mc.yandex.ru/watch/${widgetMerchantMetric}`}
                                style={{
                                    position: 'absolute',
                                    left: '-9999px'
                                }}
                                alt=""
                            />
                        </div>
                    </noscript>
                </OptionalRenderer>
                {widgetAliasCode ? (
                    <ContentBlock width="820px">
                        <CardHolder>
                            <CheckoutTypeSwitcher {...props}/>
                            <MerchantInfoCard width="382px" color={gradientColor} url={bgUrl} enableGradient={enableGradient}>
                                <Card.Header>
                                    <Logo {...this.props}/>
                                    <Card.Title color={gradientColor}>
                                        {widgetMerchantName || 'Наименование организации'}
                                    </Card.Title>
                                    <Card.Desc color={gradientColor}>{widgetDescription}</Card.Desc>
                                </Card.Header>
                            </MerchantInfoCard>
                        </CardHolder>
                        <Footer>
                            <OptionalRenderer when={widgetMerchantOffer}>
                                <Mobile>
                                    <Oferta link={widgetMerchantOffer}/>
                                </Mobile>
                            </OptionalRenderer>
                            <TechnologiesPics height="20px"/>
                            <HelpLink
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://qiwi.com/support.action">
                                Помощь
                            </HelpLink>
                        </Footer>
                    </ContentBlock>
                ) : (
                    <Loader error={this.props.errorLoading}/>
                )}
            </div>
        );
    }
}
