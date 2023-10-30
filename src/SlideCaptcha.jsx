import {useEffect, useRef, useState} from "react";

let timeout = null;
export default function SlideCaptcha({
                                         currentPuzzle,
                                         offsetY = 5,
                                         reset,
                                         handleSuccess,
                                         handleFailed,
                                         resetButton,
                                         parentResetCaptcha,
                                         ...props
                                     }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isTouchEndSpan, setIsTouchEndSpan] = useState(false);
    const [originX, setOriginX] = useState(0);
    const [originY, setOriginY] = useState(0);
    const [validated, setValidated] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [totalY, setTotalY] = useState(0);
    const [isSliderHover, setIsSliderHover] = useState(false);
    const [imgDisplayStatusInt, setImgDisplayStatusInt] = useState(false);
    const [maxSlidedWidth, setMaxSlidedWidth] = useState();
    const ctrlWidth = useRef();
    const sliderWidth = useRef();
    const [otherHeight, setOtherHeight] = useState(0);

    const resetButtonMap = {
        none: 'none',
        inline: 'inline',
        outline: 'outline',
    }

    const validateStatus = {
        init: 0,
        success: 1,
        error: -1,
    }

    const imgDisplayStatus = {
        show: 'block',
        hidden: 'none',
    }

    useEffect(() => {
        document.addEventListener('mouseup', listenMouseUp);
        document.addEventListener('mousemove', listenMouseMove);
        timeout = setTimeout(() => {
            setMaxSlidedWidth(ctrlWidth.current.clientWidth - sliderWidth.current.clientWidth - 40);
            const resetHeight = reset && resetButton === resetButtonMap.outline
                ? reset.clientHeight + 1
                : 0;
            setOtherHeight(ctrlWidth.current.clientHeight + resetHeight + 1);
        }, 200);
    }, []);

    const getClientX = (e) => {
        if (e.type.indexOf('mouse') > -1) {
            return e.clientX;
        }
        if (e.type.indexOf('touch') > -1) {
            return e.touches[0].clientX;
        }
    }

    const getClientY = (e) => {
        if (e.type.indexOf('mouse') > -1) {
            return e.clientY;
        }
        if (e.type.indexOf('touch') > -1) {
            return e.touches[0].clientY;
        }
    }
    const handleTouchStart = (e) => {
        e.preventDefault();
        if (isTouchEndSpan || isLoading) {
            return;
        }
        handleMoveOver(e);
        setOriginX(getClientX(e));
        setOriginY(getClientY(e));
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (isTouchEndSpan || isLoading) {
            return;
        }
        move(e);
        setIsMoving(true);
    };

    const move = (e) => {
        const clientX = getClientX(e);
        const clientY = getClientY(e);
        let tempOffsetX = clientX - originX;
        const tempOffsetY = Math.abs(clientY - originY);
        setTotalY((prevY) => prevY + tempOffsetY);
        if (tempOffsetX > 0) {
            if (tempOffsetX > maxSlidedWidth) {
                tempOffsetX = maxSlidedWidth;
            }
            setOffsetX(tempOffsetX);
        }
    };

    const handleMoveOver = (e) => {
        e.preventDefault();
        if (validated === validateStatus.init) {
            setIsSliderHover(true);
        }

        if (imgDisplayStatusInt === imgDisplayStatus.hidden) {
            setImgDisplayStatusInt(imgDisplayStatus.show);
        }
    };

    const resetCaptcha = () => {
        setOffsetX(0);
        setOriginX(0);
        setOriginY(0);
        setTotalY(0);
        setIsTouchEndSpan(false);
        setIsMoving(false);
        setValidated(validateStatus.error);
        setImgDisplayStatusInt(imgDisplayStatus.hidden);
        setIsSliderHover(false);
        console.log("child resetting");
    };

    const handleTouchEnd = async (e) => {
        if (isTouchEndSpan || isLoading) {
            return;
        }
        if (totalY < ((offsetY) || 0)) {
            if (isMoving) {
                handleFailed();
                resetCaptcha();
                return;
            }

            await setOffsetX(0);
            await setOriginX(0);
            await setOriginY(0);
            await setTotalY(0);
            await setIsTouchEndSpan(false);
            await setIsMoving(false);
            await setValidated(validateStatus.error);
            await handleMoveOut(e);
            return;
        }

        if (offsetX > 0) {
            const validateValue = offsetX / maxSlidedWidth;
            setIsTouchEndSpan(true);
            setIsMoving(false);
            resultCallback(validateValue);
        } else {
            resetCaptcha();
        }
    };

    const handleMoveOut = (e) => {
        e.preventDefault();
        if (validated === validateStatus.init) {
            setIsSliderHover(false);
        }
        if (imgDisplayStatusInt === imgDisplayStatus.show
            && isMoving === false
            && validated === validateStatus.init
        ) {
            setImgDisplayStatusInt(imgDisplayStatus.hidden);
        }
    };

    const handlerMouseDown = (e) => {
        e.preventDefault();
        if (isTouchEndSpan || isLoading) {
            return;
        }
        setOriginX(getClientX(e));
        setOriginY(getClientY(e));
        setIsMoving(true);
    };

    const listenMouseUp = (e) => {
        if (isMoving === true) {
            console.log("listening to mouse up event");
            handlerMouseUp(e);
        }
    };

    const listenMouseMove = (e) => {
        console.log("listening to mouse move event");
        handlerMouseMove(e);
    };

    const handlerMouseMove = (e) => {
        e.preventDefault();
        if (isTouchEndSpan || isLoading) {
            return;
        }
        if (isMoving) {
            move(e);
        }
    };

    const handlerMouseUp = (e) => {
        e.preventDefault();
        if (isTouchEndSpan || isLoading) {
            return;
        }
        setIsMoving(false);
        handleTouchEnd(e).then(function () {
            console.log("finished");
        });
    };

    const resultCallback = (validateValue) => {


        var percentage = validateValue;
        let matched = false;
        switch (Number(currentPuzzle.id)) {
            case 1 :
                matched = percentage > 0.82 && percentage < 0.89; // 0.86
                break;
            case 2:
                matched = percentage > 0.70 && percentage < 0.77; // 0.74
                break;
            case 3:
                matched = percentage > 0.30 && percentage < 0.37; // 0.34
                break;
            case 4:
                matched = percentage > 0.85 && percentage < 0.92; // 0.89
                break;
            case 5:
                matched = percentage > 0.52 && percentage < 0.59; // 0.56
                break;
            case 6:
                matched = percentage > 0.72 && percentage < 0.79; // 0.76
                break;
            case 7:
                matched = percentage > 0.83 && percentage < 0.90; // 0.87
                break;
            case 8:
                matched = percentage > 0.83 && percentage < 0.90; // 0.87
                break;
            case 9:
                matched = percentage > 0.15 && percentage < 0.22; // 0.19
                break;
            case 10:
                matched = percentage > 0.70 && percentage < 0.77; // 0.74
                break;
        }

        if (matched == true) {
            handleSuccess();
        } else {
            handleFailed();
            resetCaptcha();
        }
    }


    return (
        <>
            <div className={"relative w-full h-full"}>
                <img src={currentPuzzle.puzzleUrl} style={{left: `${offsetX}px`}} className={"absolute h-full"}
                     alt={"slider-image"}/>
                <img src={currentPuzzle.bgUrl} className={"w-full h-full"} ref={ctrlWidth} alt={"background-image"}/>
            </div>
            <div className={"mt-2 border rounded-md relative h-[40px] w-full"} onMouseMove={handlerMouseMove}
                 onMouseUp={handlerMouseUp}>
                <div className={"my-1"}>
                    <p className={"text-lg text-center"}>Swipe to verify</p>
                </div>
                <div className={"bg-blue-100 border border-blue-500 absolute top-0 left-0 h-full rounded"}
                     style={{width: `${offsetX}px`}} ref={sliderWidth}></div>
                <button type={"button"} className={"bg-blue-100 absolute top-0 text-blue-500 px-2 h-full rounded"}
                        style={{left: `${offsetX}px`}}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handlerMouseDown}
                        onMouseOver={handleMoveOver}
                        onMouseOut={handleMoveOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                    </svg>
                    <span className={"sr-only"}>Swipe to verify</span>
                </button>
            </div>
        </>
    )
}