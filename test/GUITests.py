from selenium import webdriver
import time
import unittest

PATH = "test/chromedriver.exe"
driver = webdriver.Chrome(PATH)


class Tests(unittest.TestCase):

    def test_one(self):
        driver.get("https://www.travelwise.live/")
        time.sleep(1)

    def test_two(self):
        time.sleep(1)


if __name__ == '__main__':
    unittest.main()
