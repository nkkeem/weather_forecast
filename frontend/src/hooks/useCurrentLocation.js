import { useState, useEffect } from "react";

const useCurrentLocation = (options = {}) => {
    // state에 위치 저장
    const [location, setLocation] = useState(); // 1은 변수, 2는 setter?
    // state에 에러 메시지 저장
    const [error, setError] = useState();

    // Success Handling
    const handleSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;

        setLocation({
            latitude,
            longitude,
        });
    }

    // Error Handling
    const handleError = (error) => {
        setError(error.message);
    }

    useEffect(() => {
        const { geolocation } = navigator;

        // geolocation이 브라우저에서 동작하지 않는 경우 에러 처리
        if (!geolocation){
            setError("Geolocation is not supported.");
            return;
        }

        // Call Geolocation API
        geolocation.getCurrentPosition(handleSuccess, handleError, options);
    }, [options]);

    return { location, error };
};

export default useCurrentLocation;