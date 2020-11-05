from selenium import webdriver
import time
import unittest

PATH = "test/chromedriver.exe"
driver = webdriver.Chrome(PATH)


class Tests(unittest.TestCase):

    def test_0(self):
        driver.get("https://www.travelwise.live/")
        time.sleep(2)
        expected = 'In an increasingly dangerous world, Travelwise is here to help you navigate.'
        actual = driver.find_elements_by_tag_name('h1')
        self.assertEqual(expected, actual[0].text)

    def test_1(self):
        driver.get("https://www.travelwise.live/")
        button_name = driver.find_element_by_link_text('About')
        button_name.click()
        time.sleep(2)
        expected = 'What is Travelwise'
        actual = driver.find_elements_by_tag_name('h1')
        self.assertEqual(expected, actual[0].text)

    def test_2(self):
        button_name = driver.find_element_by_link_text('Cities')
        button_name.click()
        time.sleep(2)
        button_name = driver.find_element_by_link_text('Abuja')
        button_name.click()
        time.sleep(2)
        button_name = driver.find_element_by_link_text('NNAMDI AZIKIWE INTL')
        button_name.click()
        expected = 'Covid Stats:'
        actual = driver.find_elements_by_tag_name('span')
        self.assertEqual(expected, actual[4].text)

    def test_3(self):
        button_name = driver.find_element_by_link_text('Airports')
        button_name.click()
        time.sleep(2)
        expected = 'Airport Code'
        actual = driver.find_elements_by_tag_name('th')
        self.assertEqual(expected, actual[1].text)

    def test_4(self):
        button_name = driver.find_element_by_link_text('ADOLFO SUAREZ BARAJAS')
        button_name.click()
        time.sleep(2)
        expected = 'City:'
        actual = driver.find_elements_by_tag_name('span')
        self.assertEqual(expected, actual[1].text)

    def test_5(self):
        button_name = driver.find_element_by_link_text('Covid-19')
        button_name.click()
        time.sleep(2)
        expected = 'Total Deaths'
        actual = driver.find_elements_by_tag_name('th')
        self.assertEqual(expected, actual[5].text)

    def test_6(self):
        button_name = driver.find_element_by_link_text('Angola')
        button_name.click()
        time.sleep(2)
        expected = 'Total Deaths:'
        actual = driver.find_elements_by_tag_name('span')
        self.assertEqual(expected, actual[4].text)

    def test_7(self):
        button_name = driver.find_element_by_link_text('TRAVELWISE')
        button_name.click()
        time.sleep(2)
        button_name = driver.find_element_by_link_text('Find a City')
        button_name.click()
        time.sleep(2)
        expected = '15th arrondissement of Paris'
        actual = driver.find_elements_by_tag_name('td')
        self.assertEqual(expected, actual[0].text)

    def test_8(self):
        button_name = driver.find_element_by_link_text(
            '15th arrondissement of Paris')
        button_name.click()
        time.sleep(2)
        button_name = driver.find_element_by_link_text('Link')
        button_name.click()
        time.sleep(2)
        expected = 28
        actual = driver.find_elements_by_tag_name('li')
        self.assertEqual(expected, len(actual))

    def test_9(self):
        button_name = driver.find_element_by_link_text('Cities')
        button_name.click()
        time.sleep(2)
        footer = driver.find_elements_by_tag_name('li')
        expected = 'Contact Us: 914-737-9938 | 2100 Nueces Street Unit 714, Austin, TX 78705'
        self.assertEqual(expected, footer[19].text)
        driver.close()


if __name__ == '__main__':
    unittest.main()
