import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [weatherInfo, setWeatherInfo] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                setWeatherInfo(response.data)
            })
    }, [])

    if (weatherInfo.length === 0) {
        return null
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <b>temperature: </b> {weatherInfo.current.temperature} Celcius <br />
            {weatherInfo.current.weather_icons.map((icon) =>
                <img width="70" heigth="70" src={icon} alt="weatherIcon" border="1"></img>
            )}
            <br />
            <b>wind: </b> {weatherInfo.current.wind_speed} mph direction {weatherInfo.current.wind_dir}
        </div>
    )
}
export default Weather
