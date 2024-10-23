import requests
from dotenv import load_dotenv
load_dotenv()
import os



def get_weather_data(city):
    API_KEY = os.getenv('OPEN_WEATHER_API_KEY')
    response = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}')
    data = response.json()
    
    if response.status_code == 200:
        main_data = data.get('main', {})
        weather_data = data.get('weather', [{}])[0]
        data_dict = {
            "min_temp": main_data.get('temp_min'),
            "max_temp": main_data.get('temp_max'),
            "temp": main_data.get('temp'),
            "feels_like": main_data.get('feels_like'),
            "humidity": main_data.get('humidity'),
            "pressure": main_data.get('pressure'),
            "desc": weather_data.get('description')
        }
        # for key, value in data_dict.items():
        #     print(f"{key}: {value}")
        return data_dict
    else:
        print(f"Error: {data.get('message', 'Unable to fetch weather data')}")



# get_weather_data('London')