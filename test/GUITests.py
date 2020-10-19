from selenium import webdriver
import time
import unittest
PATH = "C:\Program Files (x86)\chromedriver.exe"


class Tests(unittest.TestCase):

    def init(self):
        self.driver = webdriver.Chrome(PATH)
        self.driver.get("https://www.travelwise.live/")


if __name__ == '__main__':
    unittest.main()
