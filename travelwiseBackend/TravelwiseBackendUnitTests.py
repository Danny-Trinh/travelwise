import unittest
import requests

base_url = "http://travelwisebackend.us-east-2.elasticbeanstalk.com/" 

class DummyTests(unittest.TestCase):

    def test_one_eq_one(self):
        self.assertEqual(1,1)

    def test_two_cities(self):
        response = requests.get(base_url + "cities").json()
        first_city = str(response[0]['name'])
        self.assertEqual("['Quezon City']", first_city)

    def test_three_aiport(self):
        response = requests.get(base_url + "airport").json()
        first_airport = str(response[0]['airport_name'])
        self.assertEqual("['SUVARNABHUMI INTL']", first_airport)

    def test_four_covid(self):
        response = requests.get(base_url + "covid").json()
        first_covid = str(response[0]['country'])
        self.assertEqual("['Afghanistan']", first_covid)


if __name__ == '__main__':
    unittest.main()