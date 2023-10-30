import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useEffect, useRef, useState} from 'react'
import SlideCaptcha from "./SlideCaptcha.jsx";

function App() {
    const imageListing = [
        {
            id: '1',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle01.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg01.webp',
            minPercentage: 0.82,
            maxPercentage: 0.89,
        },
        {
            id: '2',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle02.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg02.webp',
            minPercentage: 0.70,
            maxPercentage: 0.77,
        },
        {
            id: '3',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle03.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg03.webp',
            minPercentage: 0.30,
            maxPercentage: 0.37,
        },
        {
            id: '4',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle04.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg04.webp',
            minPercentage: 0.85,
            maxPercentage: 0.92,
        },
        {
            id: '5',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle05.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg05.webp',
            minPercentage: 0.52,
            maxPercentage: 0.59,
        },
        {
            id: '6',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle06.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg06.webp',
            minPercentage: 0.72,
            maxPercentage: 0.79,
        },
        {
            id: '7',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle07.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg07.webp',
            minPercentage: 0.83,
            maxPercentage: 0.90,
        },
        {
            id: '8',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle08.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg08.webp',
            minPercentage: 0.83,
            maxPercentage: 0.90,
        },
        {
            id: '9',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle09.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg09.webp',
            minPercentage: 0.15,
            maxPercentage: 0.22,
        },
        {
            id: '10',
            puzzleUrl: '/public/assets/images/slider_captcha/puzzle10.webp',
            bgUrl: '/public/assets/images/slider_captcha/bg10.webp',
            minPercentage: 0.70,
            maxPercentage: 0.77,
        },
    ];
    const [isOpen, setIsOpen] = useState(true);
    const [currentPuzzle, setCurrentPuzzle] = useState();
    const reset = useRef();
    const [wrongAttemptCount, setWrongAttemptCount] = useState(0);
    const sliderCaptcha = useRef();
    const [animationClasses, setAnimationClasses] = useState('');

    useEffect(() => {
        resetCaptcha();
    }, []);

    const getRandom = (list) => {
        // return list[4];
        return list[Math.floor((Math.random() * list.length))];
    }

    const resetCaptcha = () => {
        let image = getRandom(imageListing);
        if (currentPuzzle && currentPuzzle.id == image.id) {
            resetCaptcha();
            return true;
        }
        setCurrentPuzzle({...image});
        return true;
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const handleSuccess = () => {
        // $("#captchamodal").addClass('animate__animated animate__shakeX');
        alert('The verification is successful, the success code can be verified here');

        setTimeout(() => {
            // props.submitEvent();
            //submit event
        }, 500);
    }
    const handleFailed = () => {
        // $("#captchamodal").addClass('animate__animated animate__shakeX');
        if (wrongAttemptCount != 10) {
            setWrongAttemptCount(wrongAttemptCount + 1);
        }
        setAnimationClasses('animate-bounce-slow');
        resetCaptcha();
        setTimeout(() => {
            console.log("call");
            setAnimationClasses('');
        }, 2000);
        alert('Verification fails, the verification failure code can be processed');
    }

    const refreshPuzzle = () => {
        sliderCaptcha?.resetCaptcha();
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Open dialog
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className={`flex min-h-full items-center justify-center p-4 text-center ${animationClasses}`}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <div className="my-2 space-x-2">
                                        <button ref={reset}
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => refreshPuzzle()}
                                        >
                                            Refresh
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                            onClick={() => closeModal()}
                                        >
                                            Close
                                        </button>
                                    </div>
                                    {currentPuzzle ?
                                        <SlideCaptcha handleFailed={handleFailed} handleSuccess={handleSuccess} ref={sliderCaptcha}
                                                      displayType="static" currentPuzzle={currentPuzzle}
                                                      resetButton="auto" reset={reset.current} imagePosition="top"/>
                                        : ''}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default App
