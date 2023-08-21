/* eslint-disable jsx-a11y/alt-text */
import { Discord } from "./SvgList";

export default function Header() {
    return (
        <div className="container">
            <div className="flex justify-between items-center">
                <button>
                    <img src="/img/logo.svg" className="wb" />
                </button>
            </div>
            <div className="flex justify-between items-center gap-4">
                <button>
                    <img src="/img/twitter.webp" alt="" className="twitter" />
                </button>
                <button>
                    <Discord />
                </button>
                <button className="wallet">
                    Connect Wallet
                </button>
            </div>
        </div>
    )
}