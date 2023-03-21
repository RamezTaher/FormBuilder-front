import React, { ReactElement } from "react";

const Spinner: React.FC = (): ReactElement => {
    return (
        <div className="w-full h-full top-0 right-0 fixed block bg-primary z-50">
            <span
                className="block relative w-0 h-0 "
                style={{
                    top: "calc( 50% - ( 80px / 2) )",
                    left: "calc( 50% - ( 80px / 2) )",
                }}
            >
                <i className="fas fa-circle-notch fa-spin fa-5x text-primary-shade"></i>
            </span>
        </div>
    );
};

export default Spinner;
