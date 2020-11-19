import unittest
import requests

base = "https://api.travelwise.live/"


class DummyTests(unittest.TestCase):
    def test_one_eq_one(self):
        self.assertEqual(1, 1)

    def test_two_cities(self):
        response = requests.get(base + "cities").json()
        first_city = str(response[0]["name"])
        self.assertEqual("['Quezon City']", first_city)

    def test_three_airports(self):
        response = requests.get(base + "airports").json()
        first_airport = str(response[0]["airport_name"])
        self.assertEqual("['SUVARNABHUMI INTL']", first_airport)

    def test_four_covid(self):
        response = requests.get(base + "covid").json()
        first_covid = str(response[0]["country"])
        self.assertEqual("['Afghanistan']", first_covid)

    def test_five_cities_search(self):
        response = requests.get(base + "cities/search?safety=yes&name=Tokyo&region=Tokyo").json()
        first_city = str(response[0]["name"])
        self.assertEqual("['Tokyo']", first_city)

    def test_six_cities_search(self):
        response = requests.get(base + "cities/search?safety=yes&name=London").json()
        second_city = str(response[0]["name"])
        self.assertEqual("['London']", second_city)
        
    def test_seven_covid_search(self):
        response = requests.get(base + "covid/search?filter=total_deaths[GTE]100000&sort=-total_deaths").json()
        first_covid = str(response[0]["country"])
        self.assertEqual("['United States of America']", first_covid)

    def test_eight_covid_search_filter(self):
        response = requests.get(base + "covid/search?filter=total_deaths[GTE]100").json()
        first_covid = str(response[0]["country"])
        self.assertEqual("['Afghanistan']", first_covid)

    def test_nine_airports_search(self):
        response = requests.get(base + "airports/search?country_code=US&airport_name=airport").json()
        first_airport = str(response[0]["iata_code"])
        self.assertEqual("['GON']", first_airport)
    
    def test_ten_airports_search(self):
        response = requests.get(base + "airports/search?city_name=GIZAN").json()
        first_airport = str(response[0]["city_name"])
        self.assertEqual("['GIZAN']", first_airport)
    

if __name__ == "__main__":
    unittest.main()
