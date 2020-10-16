import unittest
from application import appA

class DummyTests(unittest.TestCase):

    def test_one_eq_one(self):
        self.assertEqual(1,1)
    
    def test_import_from_app(self):
        self.assertEqual(10, appA)

if __name__ == '__main__':
    unittest.main()