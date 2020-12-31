import { FunctionComponent, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { FilterButtonEle, InnerEle, OuterEle } from './HideFilter.styles';

export const HideFilter: FunctionComponent = ({ children }) => {
    const isSmallScreen = useMediaQuery({
        query: '(min-width:900px)'
    });

    const [visible, setVisible] = useState(false);
    const [marginTop, setMarginTop] = useState(0);
    const formWrapRef = useRef<HTMLDivElement>(null);

    if (isSmallScreen) {
        return <>
            {children}
        </>;
    }

    const handleClick = () => {
        if (visible) {
            setVisible(false);
            setMarginTop(0);
        } else {
            setVisible(true);

            if (!formWrapRef?.current?.offsetHeight) {
                return;
            };
            setMarginTop(formWrapRef.current.offsetHeight);
        }
    };

    return <div>
        <OuterEle isVisible={visible}>
            <InnerEle ref={formWrapRef}>
                {children}
            </InnerEle>
            <FilterButtonEle
                style={{ marginTop }}
                onClick={handleClick}
            >Filter</FilterButtonEle>
        </OuterEle>
    </div>;
}