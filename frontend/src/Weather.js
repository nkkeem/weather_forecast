// import React, { Component } from 'react';    // 클래스형 컴포넌트
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import useCurrentLocation from './hooks/useCurrentLocation';
import {geolocatoinOptions} from './constants/geolocationOptions';
import Location from './components/Location';

function Weather() {
    const { location, error } = useCurrentLocation(geolocatoinOptions);
    const [temp, setTemp] = useState("");
    const [icon, setIcon] = useState("");
    const [weather, setWeather] = useState({
        city: '',
        temp: '',
        desc: '',
        icon: '',
        loading: true,
    });
//    const [weather, setWeather] = useState([]);
    const apiKey = 'Enter your api key';

    useEffect(() => {
        if(!location) return;
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${location.latitude}&lon=${location.longitude}`;

        // axios 라이브러리 이용
        axios.get(url)
            .then(responseData => {
                console.log(responseData);
                const data = responseData.data;
                setWeather({
                    city: data.name,
                    temp: data.main.temp,
                    desc: data.weather[0].description,
                    icon: data.weather[0].icon,
                    loading: false
                });
                setTemp(`${data.main.temp}°C`);
                setIcon(data.weather[0].icon);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <div>
                <p>현재 {weather.city} 날씨</p>
                <img src={`https://openweathermap.com/img/w/${icon}.png`}/>
                <p>{temp}</p>
                <p>{weather.desc}</p>
            </div>
            {/*{!weather.loading == false ? (
                <div>
                    <img src={`https://openweathermap.com/img/w/${icon}.png`}/>
                    <p>{temp} 도</p>
                    <p>{weather.desc}</p>
                </div>
            ) : (
                <p>Loading</p>
            )}*/}
        </div>
    );
}

/*
class Weather extends Component {
    // 상태 변수 정의 -> class형 컴포넌트만 가능
    constructor(props) {
        super(props);
        this.state = { temp: 0, desc: '', icon: '', loading: true }
    }

    // 컴포넌트 생성 후 날씨 정보 조회
    componentDidMount() {
        // geolocation : 위치 조회
        const { location: currentLocation, error: currentError} = useCurrentLocation(geolocatoinOptions);
        console.log("@ "+ location.latitude);
        const cityName = 'Seoul';
        const apiKey = 'e7c9077a8f3c0c3a940e800183f49992';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        //const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${location.latitude}&lon=${location.longitude}`;

        // fetch() 함수를 이용
        // fetch(url)
        //     .then(response => response.json())
        //     .then(responseData => {
        //         this.setState({
        //             temp: responseData.main.temp,
        //             desc: responseData.weather[0].description,
        //             icon: responseData.weather[0].icon,
        //             loading: false
        //         });
        //     })
        //     .catch(error => console.log(error));

        // axios 라이브러리 이용
        axios.get(url)
            .then(responseData => {
                console.log(responseData);
                const data = responseData.data;
                this.setState({
                    temp: data.main.temp,
                    desc: data.weather[0].description,
                    icon: data.weather[0].icon,
                    loading: false
                });
            })
            .catch(error => console.log(error));

    }

    // render : 화면에서 보고자 하는 내용 반환 (날씨 정보 출력)
    render() {
        const imgSrc = `http://openweathermap.com/img/w/${this.state.icon}.png`;
        if (this.state.loading) {
            return <p>Loading</p>;
        } else {
            return (
                <div>
                    <img src={imgSrc}/>
                    <p>{this.state.temp}도</p>
                    <p>{this.state.desc}</p>
                </div>
            );
        }
    }
}
*/
export default Weather;
